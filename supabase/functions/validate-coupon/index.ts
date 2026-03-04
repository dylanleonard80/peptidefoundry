import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[VALIDATE-COUPON] ${step}${detailsStr}`);
};

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
    const { couponCode, items } = body;

    if (!couponCode || typeof couponCode !== 'string') {
      return new Response(JSON.stringify({ valid: false, error: "Coupon code is required" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200,
      });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return new Response(JSON.stringify({ valid: false, error: "Cart items are required" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200,
      });
    }

    // Authenticate the user
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ valid: false, error: "Authentication required" }),
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
        JSON.stringify({ valid: false, error: "Invalid authentication" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 401 }
      );
    }

    const userId = userData.user.id;
    logStep("User authenticated", { userId });

    // Check membership for pricing tier
    const isMember = await checkActiveMembership(supabaseClient, userId);
    logStep("Membership check", { isMember });

    // Look up each item's price from the database
    let serverSubtotal = 0;
    const itemProductIds: Array<{ productId: string; lineTotal: number }> = [];

    for (const item of items) {
      if (!item.slug || !item.size || !item.quantity || item.quantity < 1) {
        return new Response(JSON.stringify({ valid: false, error: "Invalid cart item" }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200,
        });
      }

      const { data: variant, error: variantError } = await supabaseClient
        .from('product_variants')
        .select('price, member_price, products!inner(id, slug, name)')
        .eq('products.slug', item.slug)
        .eq('size_label', item.size)
        .single();

      if (variantError || !variant) {
        logStep("Variant lookup failed", { slug: item.slug, size: item.size, error: variantError?.message });
        return new Response(JSON.stringify({ valid: false, error: `Product not found: ${item.slug} (${item.size})` }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200,
        });
      }

      const unitPrice = (isMember && variant.member_price != null)
        ? Number(variant.member_price)
        : Number(variant.price);
      const lineTotal = unitPrice * item.quantity;
      serverSubtotal += lineTotal;

      itemProductIds.push({ productId: (variant.products as any).id, lineTotal });
    }

    serverSubtotal = Math.round(serverSubtotal * 100) / 100;

    // Validate coupon
    const code = String(couponCode).toUpperCase().trim();
    logStep("Validating coupon", { code });

    const { data: coupon, error: couponError } = await supabaseClient
      .from('coupons')
      .select('*')
      .eq('code', code)
      .eq('is_active', true)
      .maybeSingle();

    if (couponError || !coupon) {
      return new Response(JSON.stringify({ valid: false, error: "Invalid coupon code" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200,
      });
    }

    // Check expiration
    if (coupon.expires_at && new Date(coupon.expires_at) < new Date()) {
      return new Response(JSON.stringify({ valid: false, error: "This coupon has expired" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200,
      });
    }

    // Check global usage limit
    if (coupon.max_uses != null && coupon.current_uses >= coupon.max_uses) {
      return new Response(JSON.stringify({ valid: false, error: "This coupon has reached its usage limit" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200,
      });
    }

    // Check per-user usage limit
    const { count: userUses } = await supabaseClient
      .from('coupon_usages')
      .select('id', { count: 'exact', head: true })
      .eq('coupon_id', coupon.id)
      .eq('user_id', userId);

    if ((userUses ?? 0) >= coupon.max_uses_per_user) {
      return new Response(JSON.stringify({ valid: false, error: "You have already used this coupon" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200,
      });
    }

    // Check minimum order amount
    if (coupon.min_order_amount != null && serverSubtotal < Number(coupon.min_order_amount)) {
      return new Response(JSON.stringify({
        valid: false,
        error: `Minimum order of $${Number(coupon.min_order_amount).toFixed(2)} required for this coupon`,
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200,
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
        valid: false,
        error: "This coupon does not apply to any items in your cart",
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200,
      });
    }

    // Calculate discount
    let discountAmount: number;
    if (coupon.type === 'percentage') {
      discountAmount = applicableAmount * (Number(coupon.value) / 100);
    } else {
      discountAmount = Math.min(Number(coupon.value), applicableAmount);
    }
    discountAmount = Math.round(discountAmount * 100) / 100;

    logStep("Coupon valid", { code, type: coupon.type, value: coupon.value, discountAmount });

    return new Response(JSON.stringify({
      valid: true,
      discount: discountAmount,
      couponCode: code,
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    return new Response(JSON.stringify({ valid: false, error: "Failed to validate coupon" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
