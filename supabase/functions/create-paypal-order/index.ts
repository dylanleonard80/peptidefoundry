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
    .in('status', ['active', 'canceled'])
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
    const { type, items, shippingAddress, couponCode } = body;

    if (type !== "order") {
      throw new Error("Invalid type: must be 'order'");
    }

    // Authenticate the user
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

    if (!items || !Array.isArray(items) || items.length === 0) {
      throw new Error("Missing or empty items array");
    }

    // Check membership for pricing tier
    const isMember = await checkActiveMembership(supabaseClient, userId);
    logStep("Membership check", { isMember });

    // Look up each item's price from the database
    const paypalItems: Array<{ name: string; unit_amount: { currency_code: string; value: string }; quantity: string; category: string }> = [];
    const taxLineItems: Array<{ quantity: number; unit_price: number }> = [];
    const itemProductIds: Array<{ productId: string; lineTotal: number }> = [];

    for (const item of items) {
      if (!item.slug || !item.size || !item.quantity || item.quantity < 1) {
        throw new Error(`Invalid item: missing slug, size, or quantity`);
      }

      const { data: variant, error: variantError } = await supabaseClient
        .from('product_variants')
        .select('price, member_price, products!inner(id, slug, name)')
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

      itemProductIds.push({ productId: (variant.products as any).id, lineTotal });

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

    // Coupon validation & discount calculation
    let discountAmount = 0;
    let appliedCouponCode: string | null = null;

    if (couponCode) {
      const code = String(couponCode).toUpperCase().trim();
      logStep("Validating coupon", { code });

      const { data: coupon, error: couponError } = await supabaseClient
        .from('coupons')
        .select('*')
        .eq('code', code)
        .eq('is_active', true)
        .maybeSingle();

      if (couponError || !coupon) {
        return new Response(JSON.stringify({ error: "Invalid coupon code", couponError: true }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400,
        });
      }

      // Check expiration
      if (coupon.expires_at && new Date(coupon.expires_at) < new Date()) {
        return new Response(JSON.stringify({ error: "This coupon has expired", couponError: true }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400,
        });
      }

      // Check global usage limit
      if (coupon.max_uses != null && coupon.current_uses >= coupon.max_uses) {
        return new Response(JSON.stringify({ error: "This coupon has reached its usage limit", couponError: true }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400,
        });
      }

      // Check per-user usage limit
      const { count: userUses } = await supabaseClient
        .from('coupon_usages')
        .select('id', { count: 'exact', head: true })
        .eq('coupon_id', coupon.id)
        .eq('user_id', userId);

      if ((userUses ?? 0) >= coupon.max_uses_per_user) {
        return new Response(JSON.stringify({ error: "You have already used this coupon", couponError: true }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400,
        });
      }

      // Check minimum order amount
      if (coupon.min_order_amount != null && serverSubtotal < Number(coupon.min_order_amount)) {
        return new Response(JSON.stringify({
          error: `Minimum order of $${Number(coupon.min_order_amount).toFixed(2)} required for this coupon`,
          couponError: true,
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400,
        });
      }

      // Determine applicable amount (order-wide vs product-specific)
      const { data: couponProducts } = await supabaseClient
        .from('coupon_products')
        .select('product_id')
        .eq('coupon_id', coupon.id);

      let applicableAmount = serverSubtotal;
      if (couponProducts && couponProducts.length > 0) {
        const eligibleProductIds = new Set(couponProducts.map((cp: any) => cp.product_id));
        applicableAmount = itemProductIds
          .filter(ip => eligibleProductIds.has(ip.productId))
          .reduce((sum, ip) => sum + ip.lineTotal, 0);
      }

      if (applicableAmount <= 0) {
        return new Response(JSON.stringify({
          error: "This coupon does not apply to any items in your cart",
          couponError: true,
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400,
        });
      }

      // Calculate discount
      if (coupon.type === 'percentage') {
        discountAmount = applicableAmount * (Number(coupon.value) / 100);
      } else {
        discountAmount = Math.min(Number(coupon.value), applicableAmount);
      }
      discountAmount = Math.round(discountAmount * 100) / 100;
      appliedCouponCode = code;
      logStep("Coupon applied", { code, type: coupon.type, value: coupon.value, discountAmount });
    }

    // Calculate tax server-side via TaxJar (on post-discount amount)
    const taxableSubtotal = Math.round((serverSubtotal - discountAmount) * 100) / 100;
    if (shippingAddress?.state && shippingAddress?.zip) {
      // Scale line items proportionally if discount applied so tax is calculated on post-discount amount
      const discountRatio = serverSubtotal > 0 ? (serverSubtotal - discountAmount) / serverSubtotal : 1;
      const adjustedLineItems = taxLineItems.map(li => ({
        quantity: li.quantity,
        unit_price: Math.round(li.unit_price * discountRatio * 100) / 100,
      }));
      serverTax = await calculateTax({
        toAddress: {
          street: shippingAddress.street || "",
          city: shippingAddress.city || "",
          state: shippingAddress.state,
          zip: shippingAddress.zip || shippingAddress.zipCode || "",
        },
        shipping: serverShipping,
        lineItems: adjustedLineItems,
      });
    }
    logStep("Tax calculated", { serverTax });

    serverSubtotal = Math.round(serverSubtotal * 100) / 100;
    const serverTotal = Math.round((serverSubtotal - discountAmount + serverShipping + serverTax) * 100) / 100;

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
            ...(discountAmount > 0 ? {
              discount: {
                currency_code: "USD",
                value: discountAmount.toFixed(2),
              },
            } : {}),
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

    logStep("Creating PayPal order", { orderNumber, serverSubtotal, discountAmount, serverTax, serverTotal });

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
      discount: discountAmount,
      couponCode: appliedCouponCode,
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
