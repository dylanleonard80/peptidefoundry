import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";
import { sendOrderDelivered } from "../_shared/emails.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[SHIPPO-WEBHOOK] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    logStep("Webhook received", { event: body.event, tracking_status: body.data?.tracking_status?.status });

    // Only care about track_updated events
    if (body.event !== "track_updated") {
      return new Response(JSON.stringify({ ok: true, skipped: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    const trackingStatus = body.data?.tracking_status?.status;
    const trackingNumber = body.data?.tracking_number;

    if (!trackingNumber) {
      logStep("No tracking number in webhook payload");
      return new Response(JSON.stringify({ ok: true, skipped: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    if (trackingStatus === "DELIVERED") {
      logStep("Marking order as delivered", { trackingNumber });

      const { data, error } = await supabaseClient
        .from("orders")
        .update({
          status: "delivered",
          delivered_at: new Date().toISOString(),
        } as any)
        .eq("tracking_number", trackingNumber)
        .select("id, order_number, user_id")
        .single();

      if (error) {
        logStep("DB update failed", { error: error.message, trackingNumber });
      } else if (data) {
        logStep("Order delivered", { orderId: data.id, orderNumber: data.order_number });

        // Send delivered email
        try {
          if (data.user_id) {
            const { data: profile } = await supabaseClient
              .from('profiles')
              .select('email, first_name')
              .eq('id', data.user_id)
              .maybeSingle();

            if (profile?.email) {
              await sendOrderDelivered({
                to: profile.email,
                firstName: profile.first_name || "",
                orderNumber: data.order_number,
              });
              logStep("Delivered email sent", { email: profile.email });
            } else {
              logStep("Warning: No profile email found for delivered email", { userId: data.user_id });
            }
          }
        } catch (emailErr) {
          logStep("Warning: Failed to send delivered email", {
            error: emailErr instanceof Error ? emailErr.message : String(emailErr),
          });
        }
      } else {
        logStep("No order found for tracking number", { trackingNumber });
      }
    } else {
      logStep("Non-delivery status, ignoring", { trackingStatus, trackingNumber });
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    // Always return 200 to Shippo so it doesn't retry endlessly
    return new Response(JSON.stringify({ ok: false, error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  }
});
