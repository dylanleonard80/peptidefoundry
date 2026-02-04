import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CHECK-MEMBERSHIP] ${step}${detailsStr}`);
};

// The Foundry Club product ID
const FOUNDRY_CLUB_PRODUCT_ID = "prod_Ta40ZiHKuceV4R";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");

    const authHeader = req.headers.get("Authorization");

    // If user is not logged in (or token is stale), do NOT error.
    // Membership should simply resolve to "not a member".
    if (!authHeader) {
      logStep("No authorization header; treating as non-member");
      return new Response(
        JSON.stringify({ isMember: false, subscriptionEnd: null, canceled: false }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        }
      );
    }

    const token = authHeader.replace("Bearer ", "").trim();
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);

    if (userError || !userData.user?.email) {
      logStep("Auth invalid; treating as non-member", { message: userError?.message });
      return new Response(
        JSON.stringify({ isMember: false, subscriptionEnd: null, canceled: false }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        }
      );
    }

    const user = userData.user;
    logStep("User authenticated", { userId: user.id, email: user.email });

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });

    if (customers.data.length === 0) {
      logStep("No Stripe customer found, checking local membership");
      
      // Check local memberships table for test/manual memberships
      const { data: localMembership } = await supabaseClient
        .from('memberships')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .single();
      
      if (localMembership && new Date(localMembership.current_period_end) > new Date()) {
        logStep("Found active local membership", { endDate: localMembership.current_period_end });
        return new Response(JSON.stringify({ 
          isMember: true,
          subscriptionEnd: localMembership.current_period_end,
          canceled: false
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        });
      }
      
      logStep("No membership found");
      return new Response(JSON.stringify({ 
        isMember: false,
        subscriptionEnd: null 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    const customerId = customers.data[0].id;
    logStep("Found Stripe customer", { customerId });

    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: "active",
      limit: 10,
    });

    // Check if any subscription is for The Foundry Club
    const foundryClubSub = subscriptions.data.find((sub: any) => {
      return sub.items.data.some((item: any) => 
        item.price.product === FOUNDRY_CLUB_PRODUCT_ID
      );
    });

    if (foundryClubSub) {
      const subscriptionEnd = new Date(foundryClubSub.current_period_end * 1000).toISOString();
      logStep("Active Foundry Club membership found", { 
        subscriptionId: foundryClubSub.id, 
        endDate: subscriptionEnd 
      });

      // Update local membership record
      await supabaseClient.from('memberships').upsert({
        user_id: user.id,
        stripe_customer_id: customerId,
        stripe_subscription_id: foundryClubSub.id,
        status: 'active',
        current_period_start: new Date(foundryClubSub.current_period_start * 1000).toISOString(),
        current_period_end: subscriptionEnd,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'user_id' });

      return new Response(JSON.stringify({
        isMember: true,
        subscriptionEnd,
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // Check for canceled but still active (until period end)
    const canceledSubs = await stripe.subscriptions.list({
      customer: customerId,
      status: "canceled",
      limit: 10,
    });

    const canceledFoundryClub = canceledSubs.data.find((sub: any) => {
      const periodEnd = new Date(sub.current_period_end * 1000);
      return periodEnd > new Date() && sub.items.data.some((item: any) => 
        item.price.product === FOUNDRY_CLUB_PRODUCT_ID
      );
    });

    if (canceledFoundryClub) {
      const subscriptionEnd = new Date(canceledFoundryClub.current_period_end * 1000).toISOString();
      logStep("Canceled but active until period end", { endDate: subscriptionEnd });

      return new Response(JSON.stringify({
        isMember: true,
        subscriptionEnd,
        canceled: true,
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    logStep("No active Foundry Club membership");
    return new Response(JSON.stringify({ 
      isMember: false,
      subscriptionEnd: null 
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
