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

  // Service-role client for DB operations (bypasses RLS)
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
    } = body;

    if (!paypalOrderId) throw new Error("Missing paypalOrderId");
    if (type !== "order") {
      throw new Error("Invalid type: must be 'order'");
    }

    // Authenticate the user (required for all requests)
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      logStep("No Authorization header present");
      return new Response(
        JSON.stringify({ error: "Authentication required" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 401 }
      );
    }

    // Use anon-key client with the user's JWT (recommended Supabase pattern)
    const userClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: { headers: { Authorization: authHeader } },
        auth: { persistSession: false },
      }
    );

    const { data: { user: authUser }, error: userError } = await userClient.auth.getUser();

    if (userError || !authUser) {
      logStep("Auth verification failed", { error: userError?.message });
      return new Response(
        JSON.stringify({ error: "Invalid authentication" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 401 }
      );
    }

    const userId = authUser.id;
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

    if (!items || !Array.isArray(items) || items.length === 0) {
      throw new Error("Missing or empty items array");
    }

    // Use prices from the PayPal order itself (set by our server at creation time).
    // Re-querying the DB here would cause a race condition if prices were changed
    // between order creation and capture.
    const purchaseUnit = orderData.purchase_units?.[0];
    if (!purchaseUnit) {
      throw new Error("PayPal order missing purchase unit");
    }

    const paypalOrderItems = purchaseUnit.items || [];
    const paypalBreakdown = purchaseUnit.amount?.breakdown || {};
    const expectedSubtotal = parseFloat(paypalBreakdown.item_total?.value || "0");
    const shippingAmount = parseFloat(paypalBreakdown.shipping?.value || "0");
    const taxAmount = parseFloat(paypalBreakdown.tax_total?.value || "0");
    const expectedTotal = paypalAmount;

    if (items.length !== paypalOrderItems.length) {
      logStep("Item count mismatch", { clientItems: items.length, paypalItems: paypalOrderItems.length });
      throw new Error("Item count mismatch between request and PayPal order");
    }

    const verifiedItems: Array<{
      slug: string;
      size: string;
      quantity: number;
      name: string;
      price: number;
    }> = [];

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const ppItem = paypalOrderItems[i];

      if (!item.slug || !item.size || !item.quantity) {
        throw new Error(`Invalid item: missing slug, size, or quantity`);
      }

      const unitPrice = parseFloat(ppItem.unit_amount?.value || "0");
      const ppQuantity = parseInt(ppItem.quantity || "0", 10);

      if (ppQuantity !== item.quantity) {
        logStep("Quantity mismatch", { index: i, clientQty: item.quantity, paypalQty: ppQuantity });
        throw new Error(`Quantity mismatch for ${item.slug}`);
      }

      verifiedItems.push({
        slug: item.slug,
        size: item.size,
        quantity: item.quantity,
        name: item.name || ppItem.name,
        price: unitPrice,
      });

      logStep("Item verified from PayPal order", {
        slug: item.slug,
        size: item.size,
        quantity: item.quantity,
        unitPrice,
      });
    }

    logStep("Order totals from PayPal", {
      expectedSubtotal,
      shippingAmount,
      taxAmount,
      expectedTotal,
    });

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
          tax: taxAmount,
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

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
