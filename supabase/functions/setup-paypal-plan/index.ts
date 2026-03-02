import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[SETUP-PAYPAL-PLAN] ${step}${detailsStr}`);
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

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const accessToken = await getPayPalAccessToken();
    const apiUrl = Deno.env.get("PAYPAL_API_URL") || "https://api-m.sandbox.paypal.com";

    // Step 1: Create a PayPal Catalog Product
    logStep("Creating PayPal product");

    const productRes = await fetch(`${apiUrl}/v1/catalogs/products`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Foundry Club Membership",
        description: "Monthly membership for wholesale peptide pricing, priority support, and early access.",
        type: "SERVICE",
        category: "MEMBERSHIP_CLUBS_AND_ORGANIZATIONS",
      }),
    });

    if (!productRes.ok) {
      const text = await productRes.text();
      logStep("Product creation failed", { status: productRes.status, body: text });
      throw new Error(`Failed to create PayPal product: ${productRes.status} ${text}`);
    }

    const product = await productRes.json();
    logStep("Product created", { productId: product.id });

    // Step 2: Create a Billing Plan
    logStep("Creating billing plan");

    const planRes = await fetch(`${apiUrl}/v1/billing/plans`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_id: product.id,
        name: "Foundry Club Monthly",
        description: "Monthly $50 membership for The Foundry Club",
        billing_cycles: [
          {
            frequency: {
              interval_unit: "MONTH",
              interval_count: 1,
            },
            tenure_type: "REGULAR",
            sequence: 1,
            total_cycles: 0, // Infinite
            pricing_scheme: {
              fixed_price: {
                value: "50.00",
                currency_code: "USD",
              },
            },
          },
        ],
        payment_preferences: {
          auto_bill_outstanding: true,
          payment_failure_threshold: 3,
        },
      }),
    });

    if (!planRes.ok) {
      const text = await planRes.text();
      logStep("Plan creation failed", { status: planRes.status, body: text });
      throw new Error(`Failed to create PayPal plan: ${planRes.status} ${text}`);
    }

    const plan = await planRes.json();
    logStep("Plan created", { planId: plan.id });

    logStep("Setup complete", {
      productId: product.id,
      planId: plan.id,
      instructions: "Save planId as PAYPAL_PLAN_ID env var and VITE_PAYPAL_PLAN_ID in .env",
    });

    return new Response(JSON.stringify({
      success: true,
      productId: product.id,
      planId: plan.id,
      instructions: [
        `Set Supabase edge function secret: PAYPAL_PLAN_ID=${plan.id}`,
        `Add to .env: VITE_PAYPAL_PLAN_ID=${plan.id}`,
      ],
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
