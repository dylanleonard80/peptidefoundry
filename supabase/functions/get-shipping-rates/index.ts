import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[GET-SHIPPING-RATES] ${step}${detailsStr}`);
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

    const { orderId } = await req.json();
    if (!orderId) throw new Error("Missing orderId");

    // Fetch order
    const { data: order, error: orderError } = await supabaseClient
      .from("orders")
      .select("id, shipping_address")
      .eq("id", orderId)
      .single();

    if (orderError || !order) throw new Error("Order not found");

    const addr = order.shipping_address as any;
    if (!addr) throw new Error("Order has no shipping address");

    const toName = [addr.firstName, addr.lastName].filter(Boolean).join(" ") || addr.name || "";
    const toStreet = addr.address || addr.street || "";
    const toCity = addr.city || "";
    const toState = addr.state || "";
    const toZip = addr.zipCode || addr.zip || "";

    if (!toStreet || !toCity || !toState || !toZip) {
      throw new Error("Incomplete shipping address on order");
    }

    // Build Shippo shipment request
    const shippoToken = Deno.env.get("SHIPPO_API_TOKEN");
    if (!shippoToken) throw new Error("SHIPPO_API_TOKEN not configured");

    const shipmentPayload = {
      address_from: {
        name: Deno.env.get("SHIPPO_FROM_NAME") || "Peptide Foundry",
        street1: Deno.env.get("SHIPPO_FROM_STREET1") || "",
        city: Deno.env.get("SHIPPO_FROM_CITY") || "",
        state: Deno.env.get("SHIPPO_FROM_STATE") || "",
        zip: Deno.env.get("SHIPPO_FROM_ZIP") || "",
        country: Deno.env.get("SHIPPO_FROM_COUNTRY") || "US",
        email: Deno.env.get("SHIPPO_FROM_EMAIL") || "",
        phone: Deno.env.get("SHIPPO_FROM_PHONE") || "",
      },
      address_to: {
        name: toName,
        street1: toStreet,
        city: toCity,
        state: toState,
        zip: toZip,
        country: "US",
      },
      parcels: [
        {
          length: "6",
          width: "4",
          height: "2",
          distance_unit: "in",
          weight: "0.5",
          mass_unit: "lb",
        },
      ],
      async: false,
    };

    logStep("Creating Shippo shipment", { to: `${toCity}, ${toState} ${toZip}` });

    const shippoRes = await fetch("https://api.goshippo.com/shipments/", {
      method: "POST",
      headers: {
        "Authorization": `ShippoToken ${shippoToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(shipmentPayload),
    });

    if (!shippoRes.ok) {
      const text = await shippoRes.text();
      logStep("Shippo shipment creation failed", { status: shippoRes.status, body: text });
      throw new Error(`Shippo API error: ${shippoRes.status}`);
    }

    const shipment = await shippoRes.json();

    // Filter to valid rates and sort by price
    const rates = (shipment.rates || [])
      .filter((r: any) => r.amount && r.provider && r.servicelevel?.name)
      .map((r: any) => ({
        object_id: r.object_id,
        provider: r.provider,
        servicelevel_name: r.servicelevel.name,
        amount: r.amount,
        currency: r.currency || "USD",
        estimated_days: r.estimated_days,
        duration_terms: r.duration_terms || "",
      }))
      .sort((a: any, b: any) => parseFloat(a.amount) - parseFloat(b.amount));

    logStep("Rates fetched", { count: rates.length });

    return new Response(JSON.stringify({ rates }), {
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
