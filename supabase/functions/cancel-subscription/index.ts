import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CANCEL-SUBSCRIPTION] ${step}${detailsStr}`);
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

    // Authenticate user via Bearer JWT
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Authentication required" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 401 }
      );
    }

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

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

    // Look up active membership
    const { data: membership, error: memberError } = await supabaseClient
      .from("memberships")
      .select("id, paypal_subscription_id, current_period_end, status")
      .eq("user_id", userId)
      .eq("status", "active")
      .maybeSingle();

    if (memberError) {
      logStep("Membership lookup error", { error: memberError.message });
      throw new Error("Failed to look up membership");
    }

    if (!membership) {
      return new Response(
        JSON.stringify({ error: "No active membership found" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 404 }
      );
    }

    logStep("Found membership", {
      membershipId: membership.id,
      hasSubscriptionId: !!membership.paypal_subscription_id,
    });

    // Cancel on PayPal if subscription ID exists
    if (membership.paypal_subscription_id) {
      const accessToken = await getPayPalAccessToken();
      const apiUrl = Deno.env.get("PAYPAL_API_URL") || "https://api-m.sandbox.paypal.com";

      const cancelRes = await fetch(
        `${apiUrl}/v1/billing/subscriptions/${membership.paypal_subscription_id}/cancel`,
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            reason: "User requested cancellation from dashboard",
          }),
        }
      );

      // PayPal returns 204 on success
      if (!cancelRes.ok && cancelRes.status !== 204) {
        const text = await cancelRes.text();
        logStep("PayPal cancel failed", { status: cancelRes.status, body: text });
        throw new Error(`Failed to cancel PayPal subscription: ${cancelRes.status}`);
      }

      logStep("PayPal subscription canceled", { subscriptionId: membership.paypal_subscription_id });
    } else {
      logStep("Legacy membership (no PayPal subscription ID) — canceling locally only");
    }

    // Update local status immediately (webhook will also fire, but this gives instant feedback)
    const { error: updateError } = await supabaseClient
      .from("memberships")
      .update({
        status: "canceled",
        updated_at: new Date().toISOString(),
      })
      .eq("id", membership.id);

    if (updateError) {
      logStep("Failed to update local status", { error: updateError.message });
      throw new Error("Failed to update membership status");
    }

    logStep("Membership canceled successfully", {
      membershipId: membership.id,
      accessUntil: membership.current_period_end,
    });

    return new Response(JSON.stringify({
      success: true,
      accessUntil: membership.current_period_end,
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
