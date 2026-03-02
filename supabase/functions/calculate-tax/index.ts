import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const TAXJAR_API_URL = "https://api.taxjar.com/v2/taxes";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get("TAXJAR_API_KEY");
    if (!apiKey) {
      throw new Error("TaxJar API key not configured");
    }

    const body = await req.json();
    const { toState, toZip, toCity, toStreet, lineItems, shipping } = body;

    if (!toState || !toZip) {
      return new Response(JSON.stringify({ taxAmount: 0, taxRate: 0 }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    const fromState = Deno.env.get("TAXJAR_FROM_STATE") || "FL";
    const fromZip = Deno.env.get("TAXJAR_FROM_ZIP") || "";
    const fromCity = Deno.env.get("TAXJAR_FROM_CITY") || "";
    const fromStreet = Deno.env.get("TAXJAR_FROM_STREET") || "";

    const taxjarPayload = {
      from_country: "US",
      from_state: fromState,
      from_zip: fromZip,
      from_city: fromCity,
      from_street: fromStreet,
      to_country: "US",
      to_state: toState,
      to_zip: toZip,
      to_city: toCity || "",
      to_street: toStreet || "",
      shipping: Number(shipping) || 0,
      line_items: (lineItems || []).map((item: any, i: number) => ({
        id: String(i),
        quantity: item.quantity,
        unit_price: item.unit_price,
      })),
    };

    const taxjarRes = await fetch(TAXJAR_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taxjarPayload),
    });

    if (!taxjarRes.ok) {
      const text = await taxjarRes.text();
      console.error(`[calculate-tax] TaxJar error: ${taxjarRes.status} ${text}`);
      return new Response(JSON.stringify({ taxAmount: 0, taxRate: 0 }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    const data = await taxjarRes.json();
    const taxAmount = Number(data.tax?.amount_to_collect) || 0;
    const taxRate = Number(data.tax?.rate) || 0;

    console.log(`[calculate-tax] ${toState} ${toZip} → $${taxAmount} (${(taxRate * 100).toFixed(2)}%)`);

    return new Response(JSON.stringify({ taxAmount, taxRate }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`[calculate-tax] ERROR: ${message}`);
    return new Response(JSON.stringify({ taxAmount: 0, taxRate: 0 }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  }
});
