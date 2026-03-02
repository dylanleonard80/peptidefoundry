import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[PAYPAL-WEBHOOK] ${step}${detailsStr}`);
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

async function verifyWebhookSignature(
  req: Request,
  rawBody: string,
): Promise<boolean> {
  const webhookId = Deno.env.get("PAYPAL_WEBHOOK_ID");
  if (!webhookId) {
    logStep("WARNING: PAYPAL_WEBHOOK_ID not set, skipping verification");
    return true;
  }

  const accessToken = await getPayPalAccessToken();
  const apiUrl = Deno.env.get("PAYPAL_API_URL") || "https://api-m.sandbox.paypal.com";

  const verifyBody = {
    auth_algo: req.headers.get("paypal-auth-algo") || "",
    cert_url: req.headers.get("paypal-cert-url") || "",
    transmission_id: req.headers.get("paypal-transmission-id") || "",
    transmission_sig: req.headers.get("paypal-transmission-sig") || "",
    transmission_time: req.headers.get("paypal-transmission-time") || "",
    webhook_id: webhookId,
    webhook_event: JSON.parse(rawBody),
  };

  const res = await fetch(`${apiUrl}/v1/notifications/verify-webhook-signature`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(verifyBody),
  });

  if (!res.ok) {
    const text = await res.text();
    logStep("Webhook verification request failed", { status: res.status, body: text });
    return false;
  }

  const result = await res.json();
  const verified = result.verification_status === "SUCCESS";
  logStep("Webhook signature verification", { status: result.verification_status });
  return verified;
}

async function getSubscriptionDetails(subscriptionId: string, accessToken: string): Promise<any> {
  const apiUrl = Deno.env.get("PAYPAL_API_URL") || "https://api-m.sandbox.paypal.com";

  const res = await fetch(`${apiUrl}/v1/billing/subscriptions/${subscriptionId}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const text = await res.text();
    logStep("Failed to fetch subscription details", { subscriptionId, status: res.status, body: text });
    return null;
  }

  return await res.json();
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Read raw body BEFORE parsing — required for signature verification
    const rawBody = await req.text();
    logStep("Webhook received", { bodyLength: rawBody.length });

    // Verify webhook signature
    const isValid = await verifyWebhookSignature(req, rawBody);
    if (!isValid) {
      logStep("Invalid webhook signature — rejecting");
      // Still return 200 to prevent PayPal retries
      return new Response(JSON.stringify({ ok: false, error: "Invalid signature" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    const event = JSON.parse(rawBody);
    const eventType = event.event_type;
    logStep("Processing event", { eventType, resourceId: event.resource?.id });

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    switch (eventType) {
      case "BILLING.SUBSCRIPTION.ACTIVATED": {
        const subscription = event.resource;
        const subscriptionId = subscription.id;
        const userId = subscription.custom_id;

        if (!userId) {
          logStep("No custom_id (user_id) in subscription", { subscriptionId });
          break;
        }

        // Fetch full subscription details for billing dates
        const accessToken = await getPayPalAccessToken();
        const details = await getSubscriptionDetails(subscriptionId, accessToken);

        const now = new Date();
        const periodEnd = details?.billing_info?.next_billing_time
          ? new Date(details.billing_info.next_billing_time)
          : new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

        const { error } = await supabaseClient
          .from("memberships")
          .upsert({
            user_id: userId,
            status: "active",
            paypal_subscription_id: subscriptionId,
            current_period_start: now.toISOString(),
            current_period_end: periodEnd.toISOString(),
          }, {
            onConflict: "user_id",
          });

        if (error) {
          logStep("Failed to upsert membership", { error: error.message, userId });
        } else {
          logStep("Membership activated", { userId, subscriptionId, periodEnd: periodEnd.toISOString() });
        }
        break;
      }

      case "PAYMENT.SALE.COMPLETED": {
        // resource is a Sale object — subscription ID is in billing_agreement_id
        const sale = event.resource;
        const subscriptionId = sale.billing_agreement_id;

        if (!subscriptionId) {
          logStep("No billing_agreement_id in sale — not a subscription payment, skipping");
          break;
        }

        // Fetch subscription details to get next_billing_time
        const accessToken = await getPayPalAccessToken();
        const details = await getSubscriptionDetails(subscriptionId, accessToken);

        if (!details) {
          logStep("Could not fetch subscription details", { subscriptionId });
          break;
        }

        const userId = details.custom_id;
        const nextBillingTime = details.billing_info?.next_billing_time;

        if (!userId) {
          logStep("No custom_id in subscription details", { subscriptionId });
          break;
        }

        if (nextBillingTime) {
          const { error } = await supabaseClient
            .from("memberships")
            .update({
              status: "active",
              current_period_end: new Date(nextBillingTime).toISOString(),
              updated_at: new Date().toISOString(),
            })
            .eq("paypal_subscription_id", subscriptionId);

          if (error) {
            logStep("Failed to update period end", { error: error.message, subscriptionId });
          } else {
            logStep("Membership period extended", { subscriptionId, nextBillingTime });
          }
        }
        break;
      }

      case "BILLING.SUBSCRIPTION.CANCELLED": {
        const subscription = event.resource;
        const subscriptionId = subscription.id;

        // Set status to canceled — user retains access until current_period_end
        const { error } = await supabaseClient
          .from("memberships")
          .update({
            status: "canceled",
            updated_at: new Date().toISOString(),
          })
          .eq("paypal_subscription_id", subscriptionId);

        if (error) {
          logStep("Failed to cancel membership", { error: error.message, subscriptionId });
        } else {
          logStep("Membership canceled", { subscriptionId });
        }
        break;
      }

      case "BILLING.SUBSCRIPTION.SUSPENDED": {
        const subscription = event.resource;
        const subscriptionId = subscription.id;

        // Suspended = payment failures exceeded threshold, immediate access loss
        const { error } = await supabaseClient
          .from("memberships")
          .update({
            status: "inactive",
            updated_at: new Date().toISOString(),
          })
          .eq("paypal_subscription_id", subscriptionId);

        if (error) {
          logStep("Failed to suspend membership", { error: error.message, subscriptionId });
        } else {
          logStep("Membership suspended", { subscriptionId });
        }
        break;
      }

      case "BILLING.SUBSCRIPTION.PAYMENT.FAILED": {
        const subscription = event.resource;
        logStep("Payment failed — PayPal will retry automatically", {
          subscriptionId: subscription.id,
        });
        break;
      }

      default:
        logStep("Unhandled event type", { eventType });
    }

    // Always return 200 to prevent PayPal retries
    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    // Always return 200 to prevent PayPal retries
    return new Response(JSON.stringify({ ok: false, error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  }
});
