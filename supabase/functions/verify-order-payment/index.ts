import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: Record<string, unknown>) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[VERIFY-ORDER-PAYMENT] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Try to authenticate user (optional - supports guest checkout)
    let userId: string | null = null;
    const authHeader = req.headers.get("Authorization");
    
    if (authHeader) {
      try {
        const token = authHeader.replace("Bearer ", "");
        const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
        if (!userError && userData.user) {
          userId = userData.user.id;
          logStep("User authenticated", { userId });
        }
      } catch (authError) {
        logStep("Auth token invalid, treating as guest");
      }
    } else {
      logStep("No auth header, treating as guest checkout");
    }

    // Parse request body
    const { sessionId } = await req.json();
    if (!sessionId) throw new Error("No session ID provided");

    logStep("Verifying session", { sessionId });

    // Initialize Stripe and retrieve session
    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    logStep("Session retrieved", { 
      status: session.payment_status,
      orderNumber: session.metadata?.order_number,
      sessionUserId: session.metadata?.user_id
    });

    // Verify payment was successful
    if (session.payment_status !== 'paid') {
      throw new Error(`Payment not completed. Status: ${session.payment_status}`);
    }

    // Determine if this is a guest order
    const sessionUserId = session.metadata?.user_id;
    const isGuest = sessionUserId === 'guest';
    const guestEmail = session.metadata?.guest_email || session.customer_email || '';

    // Verify ownership for authenticated users
    if (!isGuest && sessionUserId !== userId) {
      throw new Error("Session does not belong to this user");
    }

    logStep("Order ownership verified", { isGuest, sessionUserId, authenticatedUserId: userId });

    // Parse metadata
    const orderNumber = session.metadata?.order_number;
    const shippingAddress = JSON.parse(session.metadata?.shipping_address || '{}');
    const items = JSON.parse(session.metadata?.items || '[]');
    const subtotal = parseFloat(session.metadata?.subtotal || '0');
    const shipping = parseFloat(session.metadata?.shipping || '0');
    const total = parseFloat(session.metadata?.total || '0');

    // Check if order already exists
    const { data: existingOrder } = await supabaseClient
      .from('orders')
      .select('id')
      .eq('order_number', orderNumber)
      .single();

    if (existingOrder) {
      logStep("Order already exists", { orderNumber });
      return new Response(JSON.stringify({ 
        success: true, 
        orderNumber,
        message: "Order already created" 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // Create the order in database
    // For guest orders, user_id is null; for authenticated users, use their ID
    const orderData: Record<string, unknown> = {
      order_number: orderNumber,
      items: items,
      subtotal: subtotal,
      shipping: shipping,
      total: total,
      shipping_address: shippingAddress,
      status: 'processing',
      stripe_payment_id: session.payment_intent as string,
      stripe_payment_intent_id: session.payment_intent as string,
    };

    // Set user_id for authenticated orders, null for guests
    if (!isGuest && userId) {
      orderData.user_id = userId;
    } else {
      orderData.user_id = null;
      orderData.guest_email = guestEmail;
    }

    const { data: order, error: orderError } = await supabaseClient
      .from('orders')
      .insert([orderData])
      .select()
      .single();

    if (orderError) {
      logStep("Error creating order", { error: orderError.message });
      throw new Error(`Failed to create order: ${orderError.message}`);
    }

    logStep("Order created successfully", { orderId: order.id, orderNumber, isGuest });

    // Clear user's cart (only for authenticated users)
    if (!isGuest && userId) {
      const { error: cartError } = await supabaseClient
        .from('carts')
        .delete()
        .eq('user_id', userId);

      if (cartError) {
        logStep("Warning: Failed to clear cart", { error: cartError.message });
      } else {
        logStep("Cart cleared");
      }
    }

    return new Response(JSON.stringify({ 
      success: true, 
      orderNumber,
      orderId: order.id,
      message: "Order created successfully" 
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
