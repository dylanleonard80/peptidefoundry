import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-PAYPAL-ORDER] ${step}${detailsStr}`);
};

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

function generateOrderNumber(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = 'ORD-';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const body = await req.json();
    const { type, items, shippingAddress, orderNotes, subtotal, shipping, total } = body;

    if (!type || (type !== "order" && type !== "membership")) {
      throw new Error("Invalid type: must be 'order' or 'membership'");
    }

    // Optional auth — required for membership, optional for orders
    let userId: string | null = null;
    let userEmail: string | null = null;
    const authHeader = req.headers.get("Authorization");

    if (authHeader) {
      const supabaseClient = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
        { auth: { persistSession: false } }
      );
      const token = authHeader.replace("Bearer ", "").trim();
      const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
      if (!userError && userData.user) {
        userId = userData.user.id;
        userEmail = userData.user.email || null;
        logStep("User authenticated", { userId });
      }
    }

    if (type === "membership" && !userId) {
      return new Response(
        JSON.stringify({ error: "Authentication required for membership purchase" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 401 }
      );
    }

    const accessToken = await getPayPalAccessToken();
    const apiUrl = Deno.env.get("PAYPAL_API_URL") || "https://api-m.sandbox.paypal.com";

    let paypalBody: Record<string, any>;
    let orderNumber: string | null = null;

    if (type === "order") {
      orderNumber = generateOrderNumber();

      const paypalItems = (items || []).map((item: any) => ({
        name: `${item.peptide_name} (${item.size})`,
        unit_amount: {
          currency_code: "USD",
          value: item.price.toFixed(2),
        },
        quantity: String(item.quantity),
        category: "PHYSICAL_GOODS",
      }));

      paypalBody = {
        intent: "CAPTURE",
        purchase_units: [{
          reference_id: orderNumber,
          description: `Peptide Foundry Order ${orderNumber}`,
          amount: {
            currency_code: "USD",
            value: Number(total).toFixed(2),
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: Number(subtotal).toFixed(2),
              },
              shipping: {
                currency_code: "USD",
                value: Number(shipping).toFixed(2),
              },
            },
          },
          items: paypalItems,
        }],
      };

      logStep("Creating PayPal order", { orderNumber, total });
    } else {
      // Membership
      paypalBody = {
        intent: "CAPTURE",
        purchase_units: [{
          description: "Foundry Club Membership - 30 Days",
          amount: {
            currency_code: "USD",
            value: "50.00",
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: "50.00",
              },
            },
          },
          items: [{
            name: "Foundry Club Membership - 30 Days",
            unit_amount: {
              currency_code: "USD",
              value: "50.00",
            },
            quantity: "1",
            category: "DIGITAL_GOODS",
          }],
        }],
      };

      logStep("Creating PayPal membership order", { userId });
    }

    const res = await fetch(`${apiUrl}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paypalBody),
    });

    if (!res.ok) {
      const text = await res.text();
      logStep("PayPal create order failed", { status: res.status, body: text });
      throw new Error(`PayPal create order failed: ${res.status}`);
    }

    const paypalOrder = await res.json();
    logStep("PayPal order created", { paypalOrderId: paypalOrder.id, orderNumber });

    return new Response(JSON.stringify({
      paypalOrderId: paypalOrder.id,
      orderNumber,
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
