import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CAPTURE-PAYPAL-ORDER] ${step}${detailsStr}`);
};

function generateOrderNumber(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = 'ORD-';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

async function getPayPalAccessToken(): Promise<string> {
  const clientId = Deno.env.get("PAYPAL_CLIENT_ID");
  const clientSecret = Deno.env.get("PAYPAL_CLIENT_SECRET");
  const apiUrl = Deno.env.get("PAYPAL_API_URL") || "https://api-m.sandbox.paypal.com";

  if (!clientId || !clientSecret) {
    throw new Error("PayPal credentials not configured");
  }

  const res = await fetch(`${apiUrl}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      "Authorization": `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`PayPal auth failed: ${res.status} ${text}`);
  }

  const data = await res.json();
  return data.access_token;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  try {
    logStep("Function started");

    const body = await req.json();
    const {
      paypalOrderId,
      type,
      items,
      shippingAddress,
      shippingCost,
    } = body;

    if (!paypalOrderId) throw new Error("Missing paypalOrderId");
    if (!type || (type !== "order" && type !== "membership")) {
      throw new Error("Invalid type: must be 'order' or 'membership'");
    }

    // Authenticate the user (required for all requests)
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Authentication required" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 401 }
      );
    }

    const token = authHeader.replace("Bearer ", "").trim();
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);

    if (userError || !userData.user) {
      return new Response(
        JSON.stringify({ error: "Invalid authentication" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 401 }
      );
    }

    const userId = userData.user.id;
    logStep("User authenticated", { userId });

    // Fetch PayPal order details (should be APPROVED, not yet captured)
    const accessToken = await getPayPalAccessToken();
    const apiUrl = Deno.env.get("PAYPAL_API_URL") || "https://api-m.sandbox.paypal.com";

    const orderRes = await fetch(`${apiUrl}/v2/checkout/orders/${paypalOrderId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!orderRes.ok) {
      const text = await orderRes.text();
      logStep("PayPal order fetch failed", { status: orderRes.status, body: text });
      throw new Error(`PayPal order verification failed: ${orderRes.status}`);
    }

    const orderData = await orderRes.json();
    logStep("PayPal order status", { status: orderData.status });

    if (orderData.status !== "APPROVED") {
      throw new Error(`PayPal order not in APPROVED state: ${orderData.status}`);
    }

    const paypalAmount = parseFloat(
      orderData.purchase_units?.[0]?.amount?.value || "0"
    );
    logStep("PayPal order amount", { paypalAmount });

    if (type === "order") {
      // --- ORDER FLOW ---

      if (!items || !Array.isArray(items) || items.length === 0) {
        throw new Error("Missing or empty items array");
      }

      // Look up each item's price from the database
      const isMember = await checkActiveMembership(supabaseClient, userId);
      logStep("Membership check", { isMember });

      let expectedSubtotal = 0;
      const verifiedItems: Array<{
        slug: string;
        size: string;
        quantity: number;
        name: string;
        price: number;
      }> = [];

      for (const item of items) {
        if (!item.slug || !item.size || !item.quantity) {
          throw new Error(`Invalid item: missing slug, size, or quantity`);
        }

        const { data: variant, error: variantError } = await supabaseClient
          .from('product_variants')
          .select('price, member_price, products!inner(slug, name)')
          .eq('products.slug', item.slug)
          .eq('size_label', item.size)
          .single();

        if (variantError || !variant) {
          logStep("Variant lookup failed", { slug: item.slug, size: item.size, error: variantError?.message });
          throw new Error(`Product not found: ${item.slug} (${item.size})`);
        }

        const unitPrice = (isMember && variant.member_price != null)
          ? Number(variant.member_price)
          : Number(variant.price);
        const lineTotal = unitPrice * item.quantity;
        expectedSubtotal += lineTotal;

        verifiedItems.push({
          slug: item.slug,
          size: item.size,
          quantity: item.quantity,
          name: item.name || (variant.products as any).name,
          price: unitPrice,
        });

        logStep("Item verified", {
          slug: item.slug,
          size: item.size,
          quantity: item.quantity,
          unitPrice,
          lineTotal,
        });
      }

      const shippingAmount = Number(shippingCost) || 0;
      const expectedTotal = expectedSubtotal + shippingAmount;

      logStep("Price verification", {
        expectedSubtotal,
        shippingAmount,
        expectedTotal,
        paypalAmount,
      });

      // Compare expected total against PayPal order amount (allow +/- $0.01)
      if (Math.abs(expectedTotal - paypalAmount) > 0.01) {
        return new Response(
          JSON.stringify({
            error: `Price mismatch — expected $${expectedTotal.toFixed(2)}, PayPal order is $${paypalAmount.toFixed(2)}`,
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
        );
      }

      // Duplicate prevention: check if order with this paypalOrderId already exists
      const { data: existingOrder } = await supabaseClient
        .from('orders')
        .select('id, order_number')
        .eq('stripe_payment_id', paypalOrderId)
        .maybeSingle();

      if (existingOrder) {
        logStep("Duplicate order detected", { existingOrderId: existingOrder.id });
        return new Response(
          JSON.stringify({
            error: "This payment has already been processed",
            orderNumber: existingOrder.order_number,
            orderId: existingOrder.id,
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 409 }
        );
      }

      // Capture the payment via PayPal
      const captureRes = await fetch(`${apiUrl}/v2/checkout/orders/${paypalOrderId}/capture`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!captureRes.ok) {
        const text = await captureRes.text();
        logStep("PayPal capture failed", { status: captureRes.status, body: text });
        throw new Error(`PayPal capture failed: ${captureRes.status}`);
      }

      const captureData = await captureRes.json();
      logStep("PayPal capture response", { status: captureData.status });

      if (captureData.status !== "COMPLETED") {
        throw new Error(`Payment capture not completed: ${captureData.status}`);
      }

      // Insert order with server-calculated prices
      const orderNumber = generateOrderNumber();
      const orderItems = verifiedItems.map((v) => ({
        peptide_name: v.name,
        slug: v.slug,
        size: v.size,
        quantity: v.quantity,
        price: v.price,
      }));

      let order: any;
      try {
        const { data: insertedOrder, error: orderError } = await supabaseClient
          .from('orders')
          .insert([{
            order_number: orderNumber,
            user_id: userId,
            items: orderItems,
            subtotal: Math.round(expectedSubtotal * 100) / 100,
            shipping: Math.round(shippingAmount * 100) / 100,
            total: Math.round(expectedTotal * 100) / 100,
            shipping_address: shippingAddress || {},
            status: 'processing',
            stripe_payment_id: paypalOrderId,
          }])
          .select()
          .single();

        if (orderError) {
          // Check if it's a unique constraint violation (duplicate payment)
          if (orderError.code === '23505') {
            logStep("Duplicate payment ID on insert", { paypalOrderId });
            const { data: existingOrder } = await supabaseClient
              .from('orders')
              .select('id, order_number')
              .eq('stripe_payment_id', paypalOrderId)
              .maybeSingle();
            return new Response(JSON.stringify({
              error: "This payment has already been processed",
              orderNumber: existingOrder?.order_number,
              orderId: existingOrder?.id,
            }), {
              headers: { ...corsHeaders, "Content-Type": "application/json" },
              status: 409,
            });
          }
          throw orderError;
        }
        order = insertedOrder;
      } catch (insertErr) {
        // CRITICAL: Payment was captured but order insert failed.
        // Log everything needed for manual recovery.
        logStep("CRITICAL: Payment captured but order insert failed", {
          paypalOrderId,
          captureStatus: captureData.status,
          userId,
          orderNumber,
          items: orderItems,
          subtotal: expectedSubtotal,
          shipping: shippingAmount,
          total: expectedTotal,
          error: insertErr instanceof Error ? insertErr.message : String(insertErr),
        });
        // Return success to the user since their payment went through.
        // The order details are logged for manual recovery.
        return new Response(JSON.stringify({
          success: true,
          orderNumber,
          orderId: null,
          warning: "Order recorded for processing. Please contact support if you don't receive a confirmation email.",
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        });
      }

      logStep("Order created", { orderId: order.id, orderNumber });

      // Clear cart for authenticated user
      const { error: cartError } = await supabaseClient
        .from('carts')
        .delete()
        .eq('user_id', userId);

      if (cartError) {
        logStep("Warning: Failed to clear cart", { error: cartError.message });
      } else {
        logStep("Cart cleared");
      }

      return new Response(JSON.stringify({
        success: true,
        orderNumber,
        orderId: order.id,
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });

    } else {
      // --- MEMBERSHIP FLOW ---

      // Verify PayPal order amount is exactly $50.00
      if (Math.abs(paypalAmount - 50.00) > 0.01) {
        return new Response(
          JSON.stringify({
            error: `Invalid membership amount — expected $50.00, PayPal order is $${paypalAmount.toFixed(2)}`,
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
        );
      }

      // Duplicate prevention: check if membership was already activated with this transaction
      const { data: existingMembership } = await supabaseClient
        .from('memberships')
        .select('id, stripe_subscription_id')
        .eq('user_id', userId)
        .eq('stripe_subscription_id', paypalOrderId)
        .maybeSingle();

      if (existingMembership) {
        logStep("Duplicate membership transaction detected", { existingId: existingMembership.id });
        return new Response(
          JSON.stringify({ error: "This membership payment has already been processed" }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 409 }
        );
      }

      // Capture the payment via PayPal
      const captureRes = await fetch(`${apiUrl}/v2/checkout/orders/${paypalOrderId}/capture`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!captureRes.ok) {
        const text = await captureRes.text();
        logStep("PayPal capture failed", { status: captureRes.status, body: text });
        throw new Error(`PayPal capture failed: ${captureRes.status}`);
      }

      const captureData = await captureRes.json();
      logStep("PayPal capture response", { status: captureData.status });

      if (captureData.status !== "COMPLETED") {
        throw new Error(`Payment capture not completed: ${captureData.status}`);
      }

      const now = new Date();
      const periodEnd = new Date(now);
      periodEnd.setDate(periodEnd.getDate() + 30);

      let membership: any;
      try {
        const { data: upsertedMembership, error: upsertError } = await supabaseClient
          .from('memberships')
          .upsert({
            user_id: userId,
            status: 'active',
            stripe_subscription_id: paypalOrderId,
            current_period_start: now.toISOString(),
            current_period_end: periodEnd.toISOString(),
          }, {
            onConflict: 'user_id',
          })
          .select()
          .single();

        if (upsertError) throw upsertError;
        membership = upsertedMembership;
      } catch (upsertErr) {
        // Payment captured but membership upsert failed — log for manual recovery
        logStep("CRITICAL: Payment captured but membership upsert failed", {
          paypalOrderId,
          userId,
          error: upsertErr instanceof Error ? upsertErr.message : String(upsertErr),
        });
        return new Response(JSON.stringify({
          success: true,
          warning: "Payment received. Your membership will be activated shortly — please contact support if it doesn't appear within an hour.",
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        });
      }

      logStep("Membership activated", {
        membershipId: membership.id,
        periodEnd: periodEnd.toISOString(),
      });

      return new Response(JSON.stringify({
        success: true,
        membership: {
          id: membership.id,
          status: membership.status,
          currentPeriodEnd: membership.current_period_end,
        },
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});

async function checkActiveMembership(
  supabaseClient: any,
  userId: string,
): Promise<boolean> {
  const { data, error } = await supabaseClient
    .from('memberships')
    .select('id')
    .eq('user_id', userId)
    .eq('status', 'active')
    .gt('current_period_end', new Date().toISOString())
    .maybeSingle();

  if (error) {
    logStep("Membership check error", { message: error.message });
    return false;
  }

  return !!data;
}
