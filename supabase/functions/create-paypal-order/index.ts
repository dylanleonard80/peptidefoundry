import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";
import { calculateTax } from "../_shared/taxjar.ts";

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

async function checkActiveMembership(
  supabaseClient: any,
  userId: string,
): Promise<boolean> {
  const { data, error } = await supabaseClient
    .from('memberships')
    .select('id')
    .eq('user_id', userId)
    .eq('status', 'active')
    .gt('current_period_end', new Date().toISOString())
    .maybeSingle();

  if (error) {
    logStep("Membership check error", { message: error.message });
    return false;
  }

  return !!data;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const body = await req.json();
    const { type, items, shippingAddress } = body;

    if (!type || (type !== "order" && type !== "membership")) {
      throw new Error("Invalid type: must be 'order' or 'membership'");
    }

    // Authenticate the user (required for both order and membership)
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

    const accessToken = await getPayPalAccessToken();
    const apiUrl = Deno.env.get("PAYPAL_API_URL") || "https://api-m.sandbox.paypal.com";

    let paypalBody: Record<string, any>;
    let orderNumber: string | null = null;
    let serverSubtotal = 0;
    let serverTax = 0;
    const serverShipping = 0; // Free shipping

    if (type === "order") {
      // --- ORDER FLOW: Server-side price authority ---

      if (!items || !Array.isArray(items) || items.length === 0) {
        throw new Error("Missing or empty items array");
      }

      // Check membership for pricing tier
      const isMember = await checkActiveMembership(supabaseClient, userId);
      logStep("Membership check", { isMember });

      // Look up each item's price from the database
      const paypalItems: Array<{ name: string; unit_amount: { currency_code: string; value: string }; quantity: string; category: string }> = [];
      const taxLineItems: Array<{ quantity: number; unit_price: number }> = [];

      for (const item of items) {
        if (!item.slug || !item.size || !item.quantity || item.quantity < 1) {
          throw new Error(`Invalid item: missing slug, size, or quantity`);
        }

        const { data: variant, error: variantError } = await supabaseClient
          .from('product_variants')
          .select('price, member_price, products!inner(slug, name)')
          .eq('products.slug', item.slug)
          .eq('size_label', item.size)
          .single();

        if (variantError || !variant) {
          logStep("Variant lookup failed", { slug: item.slug, size: item.size, error: variantError?.message });
          throw new Error(`Product not found: ${item.slug} (${item.size})`);
        }

        const unitPrice = (isMember && variant.member_price != null)
          ? Number(variant.member_price)
          : Number(variant.price);
        const lineTotal = unitPrice * item.quantity;
        serverSubtotal += lineTotal;

        paypalItems.push({
          name: `${(variant.products as any).name} (${item.size})`,
          unit_amount: {
            currency_code: "USD",
            value: unitPrice.toFixed(2),
          },
          quantity: String(item.quantity),
          category: "PHYSICAL_GOODS",
        });

        taxLineItems.push({
          quantity: item.quantity,
          unit_price: unitPrice,
        });

        logStep("Item verified", {
          slug: item.slug,
          size: item.size,
          quantity: item.quantity,
          unitPrice,
          lineTotal,
        });
      }

      // Calculate tax server-side via TaxJar
      if (shippingAddress?.state && shippingAddress?.zip) {
        serverTax = await calculateTax({
          toAddress: {
            street: shippingAddress.street || "",
            city: shippingAddress.city || "",
            state: shippingAddress.state,
            zip: shippingAddress.zip || shippingAddress.zipCode || "",
          },
          shipping: serverShipping,
          lineItems: taxLineItems,
        });
      }
      logStep("Tax calculated", { serverTax });

      serverSubtotal = Math.round(serverSubtotal * 100) / 100;
      const serverTotal = Math.round((serverSubtotal + serverShipping + serverTax) * 100) / 100;

      orderNumber = generateOrderNumber();

      paypalBody = {
        intent: "CAPTURE",
        purchase_units: [{
          reference_id: orderNumber,
          description: `Peptide Foundry Order ${orderNumber}`,
          amount: {
            currency_code: "USD",
            value: serverTotal.toFixed(2),
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: serverSubtotal.toFixed(2),
              },
              shipping: {
                currency_code: "USD",
                value: serverShipping.toFixed(2),
              },
              ...(serverTax > 0 ? {
                tax_total: {
                  currency_code: "USD",
                  value: serverTax.toFixed(2),
                },
              } : {}),
            },
          },
          items: paypalItems,
        }],
      };

      logStep("Creating PayPal order", { orderNumber, serverSubtotal, serverTax, serverTotal });
    } else {
      // --- MEMBERSHIP FLOW: Hardcoded $50 ---
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
      subtotal: serverSubtotal,
      taxAmount: serverTax,
      shipping: serverShipping,
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
