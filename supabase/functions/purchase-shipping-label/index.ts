import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[PURCHASE-SHIPPING-LABEL] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Require authenticated admin
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("Missing authorization");

    const token = authHeader.replace("Bearer ", "").trim();
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError || !userData.user) throw new Error("Invalid auth token");

    const { data: role } = await supabaseClient
      .from("user_roles")
      .select("role")
      .eq("user_id", userData.user.id)
      .eq("role", "admin")
      .single();

    if (!role) throw new Error("Admin access required");

    const { orderId, rateId, carrier, serviceName } = await req.json();
    if (!orderId || !rateId) throw new Error("Missing orderId or rateId");

    const shippoToken = Deno.env.get("SHIPPO_API_TOKEN");
    if (!shippoToken) throw new Error("SHIPPO_API_TOKEN not configured");

    // Purchase the label via Shippo transaction
    logStep("Purchasing label", { orderId, rateId, carrier });

    const txnRes = await fetch("https://api.goshippo.com/transactions/", {
      method: "POST",
      headers: {
        "Authorization": `ShippoToken ${shippoToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rate: rateId,
        label_file_type: "PDF",
        async: false,
      }),
    });

    if (!txnRes.ok) {
      const text = await txnRes.text();
      logStep("Shippo transaction failed", { status: txnRes.status, body: text });
      throw new Error(`Shippo label purchase failed: ${txnRes.status}`);
    }

    const txn = await txnRes.json();

    if (txn.status !== "SUCCESS") {
      const msgs = txn.messages?.map((m: any) => m.text).join("; ") || "Unknown error";
      logStep("Shippo transaction not successful", { status: txn.status, messages: msgs });
      throw new Error(`Label purchase failed: ${msgs}`);
    }

    const trackingNumber = txn.tracking_number || "";
    const labelUrl = txn.label_url || "";
    const transactionId = txn.object_id || "";

    logStep("Label purchased", { trackingNumber, transactionId });

    // Update order in DB
    const { error: updateError } = await supabaseClient
      .from("orders")
      .update({
        tracking_number: trackingNumber,
        carrier: carrier || txn.provider || "",
        shipping_label_url: labelUrl,
        shippo_transaction_id: transactionId,
        status: "shipped",
        shipped_at: new Date().toISOString(),
      } as any)
      .eq("id", orderId);

    if (updateError) {
      logStep("DB update failed", { error: updateError.message });
      throw new Error(`Failed to update order: ${updateError.message}`);
    }

    logStep("Order updated to shipped", { orderId });

    return new Response(JSON.stringify({
      success: true,
      tracking_number: trackingNumber,
      carrier: carrier || txn.provider || "",
      shipping_label_url: labelUrl,
      shippo_transaction_id: transactionId,
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
