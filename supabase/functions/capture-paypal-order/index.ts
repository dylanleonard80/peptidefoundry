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
      subtotal,
      shipping,
      total,
    } = body;

    if (!paypalOrderId) throw new Error("Missing paypalOrderId");
    if (!type || (type !== "order" && type !== "membership")) {
      throw new Error("Invalid type: must be 'order' or 'membership'");
    }

    // Optional auth — required for membership, optional for orders
    let userId: string | null = null;
    let guestEmail: string | null = null;
    const authHeader = req.headers.get("Authorization");

    if (authHeader) {
      const token = authHeader.replace("Bearer ", "").trim();
      const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
      if (!userError && userData.user) {
        userId = userData.user.id;
        logStep("User authenticated", { userId });
      }
    }

    if (type === "membership" && !userId) {
      return new Response(
        JSON.stringify({ error: "Authentication required for membership" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 401 }
      );
    }

    // Verify the PayPal order status (already captured client-side)
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

    if (orderData.status !== "COMPLETED") {
      throw new Error(`Payment not completed: ${orderData.status}`);
    }

    const captureId = orderData.purchase_units?.[0]?.payments?.captures?.[0]?.id || paypalOrderId;
    logStep("Payment verified", { captureId });

    if (type === "order") {
      // --- ORDER FLOW ---
      const orderNumber = generateOrderNumber();

      // Determine guest email from shipping address
      if (!userId) {
        guestEmail = shippingAddress?.email || '';
      }

      const dbOrderData: Record<string, unknown> = {
        order_number: orderNumber,
        items: items || [],
        subtotal: Number(subtotal) || 0,
        shipping: Number(shipping) || 0,
        total: Number(total) || 0,
        shipping_address: shippingAddress || {},
        status: 'processing',
        stripe_payment_id: captureId,
      };

      if (userId) {
        dbOrderData.user_id = userId;
      } else {
        dbOrderData.user_id = null;
        dbOrderData.guest_email = guestEmail;
      }

      const { data: order, error: orderError } = await supabaseClient
        .from('orders')
        .insert([dbOrderData])
        .select()
        .single();

      if (orderError) {
        logStep("Error creating order", { error: orderError.message });
        throw new Error(`Failed to create order: ${orderError.message}`);
      }

      logStep("Order created", { orderId: order.id, orderNumber });

      // Clear cart for authenticated users
      if (userId) {
        const { error: cartError } = await supabaseClient
          .from('carts')
          .delete()
          .eq('user_id', userId);

        if (cartError) {
          logStep("Warning: Failed to clear cart", { error: cartError.message });
        } else {
          logStep("Cart cleared");
        }
      }

      // Trigger shipping label creation (fire and forget)
      const supabaseUrl = Deno.env.get("SUPABASE_URL");
      const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

      if (supabaseUrl && serviceRoleKey) {
        logStep("Triggering shipping label creation");
        fetch(`${supabaseUrl}/functions/v1/create-shipping-label`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${serviceRoleKey}`,
          },
          body: JSON.stringify({
            orderId: order.id,
            orderNumber,
            shippingAddress: {
              name: [shippingAddress?.firstName, shippingAddress?.lastName].filter(Boolean).join(' ') || shippingAddress?.name || '',
              street: shippingAddress?.address || shippingAddress?.street || '',
              city: shippingAddress?.city || '',
              state: shippingAddress?.state || '',
              zip: shippingAddress?.zipCode || shippingAddress?.zip || '',
              email: shippingAddress?.email || guestEmail || '',
              phone: shippingAddress?.phone || '',
            },
            items,
          }),
        }).then(res => {
          if (res.ok) logStep("Shipping label triggered successfully");
          else logStep("Warning: Shipping label trigger failed", { status: res.status });
        }).catch(err => {
          logStep("Warning: Shipping label trigger error", { error: err.message });
        });
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
      const now = new Date();
      const periodEnd = new Date(now);
      periodEnd.setDate(periodEnd.getDate() + 30);

      const { data: membership, error: upsertError } = await supabaseClient
        .from('memberships')
        .upsert({
          user_id: userId,
          status: 'active',
          current_period_start: now.toISOString(),
          current_period_end: periodEnd.toISOString(),
        }, {
          onConflict: 'user_id',
        })
        .select()
        .single();

      if (upsertError) {
        logStep("Membership upsert error", { message: upsertError.message });
        throw new Error("Failed to activate membership");
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
