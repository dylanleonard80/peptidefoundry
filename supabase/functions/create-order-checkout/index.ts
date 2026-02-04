import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: Record<string, unknown>) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-ORDER-CHECKOUT] ${step}${detailsStr}`);
};

// Server-side validation functions
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return typeof email === 'string' && email.length <= 255 && emailRegex.test(email);
};

const isValidStreet = (street: string): boolean => {
  const streetRegex = /^[a-zA-Z0-9\s,.\-#']+$/;
  return typeof street === 'string' && street.length >= 5 && street.length <= 200 && streetRegex.test(street);
};

const isValidCity = (city: string): boolean => {
  const cityRegex = /^[a-zA-Z\s\-'.]+$/;
  return typeof city === 'string' && city.length >= 2 && city.length <= 100 && cityRegex.test(city);
};

const isValidState = (state: string): boolean => {
  const stateRegex = /^[A-Z]{2}$/;
  return typeof state === 'string' && stateRegex.test(state);
};

const isValidZip = (zip: string): boolean => {
  const zipRegex = /^\d{5}(-\d{4})?$/;
  return typeof zip === 'string' && zipRegex.test(zip);
};

const isValidName = (name: string): boolean => {
  return typeof name === 'string' && name.length >= 1 && name.length <= 100;
};

interface ShippingAddress {
  email: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  firstName?: string;
  lastName?: string;
}

interface OrderItem {
  peptide_name: string;
  size: string;
  price: number;
  quantity: number;
}

const validateShippingAddress = (address: unknown): { valid: boolean; error?: string; data?: ShippingAddress } => {
  if (!address || typeof address !== 'object') {
    return { valid: false, error: 'Shipping address is required' };
  }

  const addr = address as Record<string, unknown>;

  if (!isValidEmail(addr.email as string)) {
    return { valid: false, error: 'Invalid email address' };
  }
  if (!isValidStreet(addr.street as string)) {
    return { valid: false, error: 'Invalid street address (5-200 alphanumeric characters)' };
  }
  if (!isValidCity(addr.city as string)) {
    return { valid: false, error: 'Invalid city name' };
  }
  if (!isValidState(addr.state as string)) {
    return { valid: false, error: 'Invalid state (must be 2-letter code)' };
  }
  if (!isValidZip(addr.zip as string)) {
    return { valid: false, error: 'Invalid ZIP code' };
  }

  return {
    valid: true,
    data: {
      email: (addr.email as string).trim(),
      street: (addr.street as string).trim(),
      city: (addr.city as string).trim(),
      state: (addr.state as string).toUpperCase(),
      zip: (addr.zip as string).trim(),
      firstName: typeof addr.firstName === 'string' ? addr.firstName.trim().slice(0, 100) : undefined,
      lastName: typeof addr.lastName === 'string' ? addr.lastName.trim().slice(0, 100) : undefined,
    }
  };
};

const validateOrderItems = (items: unknown): { valid: boolean; error?: string; data?: OrderItem[] } => {
  if (!Array.isArray(items)) {
    return { valid: false, error: 'Items must be an array' };
  }
  if (items.length === 0) {
    return { valid: false, error: 'No items provided' };
  }
  if (items.length > 50) {
    return { valid: false, error: 'Too many items (max 50)' };
  }

  const validatedItems: OrderItem[] = [];
  for (const item of items) {
    if (!item || typeof item !== 'object') {
      return { valid: false, error: 'Invalid item format' };
    }
    
    const { peptide_name, size, price, quantity } = item as Record<string, unknown>;
    
    if (typeof peptide_name !== 'string' || peptide_name.length < 1 || peptide_name.length > 200) {
      return { valid: false, error: 'Invalid peptide name' };
    }
    if (typeof size !== 'string' || size.length < 1 || size.length > 50) {
      return { valid: false, error: 'Invalid size' };
    }
    if (typeof price !== 'number' || price <= 0 || price > 10000) {
      return { valid: false, error: 'Invalid price' };
    }
    if (typeof quantity !== 'number' || quantity < 1 || quantity > 100 || !Number.isInteger(quantity)) {
      return { valid: false, error: 'Invalid quantity' };
    }

    validatedItems.push({
      peptide_name: peptide_name.trim(),
      size: size.trim(),
      price: Math.round(price * 100) / 100, // Round to 2 decimal places
      quantity: Math.floor(quantity),
    });
  }

  return { valid: true, data: validatedItems };
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
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    // Parse request body
    const body = await req.json();
    const { items, shippingAddress, orderNotes } = body;

    // Server-side validation
    const itemsValidation = validateOrderItems(items);
    if (!itemsValidation.valid) {
      throw new Error(itemsValidation.error);
    }
    const validatedItems = itemsValidation.data!;

    const addressValidation = validateShippingAddress(shippingAddress);
    if (!addressValidation.valid) {
      throw new Error(addressValidation.error);
    }
    const validatedAddress = addressValidation.data!;

    // Validate order notes
    const validatedNotes = typeof orderNotes === 'string' ? orderNotes.trim().slice(0, 2000) : '';

    logStep("Input validation passed");

    // Try to authenticate user (optional for guest checkout)
    let userId: string | null = null;
    let userEmail: string = validatedAddress.email;
    
    const authHeader = req.headers.get("Authorization");
    if (authHeader) {
      try {
        const token = authHeader.replace("Bearer ", "");
        const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
        if (!userError && userData.user) {
          userId = userData.user.id;
          userEmail = userData.user.email || validatedAddress.email;
          logStep("User authenticated", { userId });
        }
      } catch (authError) {
        logStep("Guest checkout (no valid auth token)");
      }
    } else {
      logStep("Guest checkout (no auth header)");
    }

    logStep("Order details received", { itemCount: validatedItems.length, email: userEmail, isGuest: !userId });

    // Calculate totals
    const subtotal = validatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 0; // Free shipping on all orders
    const total = subtotal + shipping;

    logStep("Totals calculated", { subtotal, shipping, total });

    // Initialize Stripe
    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });

    // Check for existing Stripe customer by email
    const customers = await stripe.customers.list({ email: userEmail, limit: 1 });
    let customerId: string | undefined;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      logStep("Found existing Stripe customer", { customerId });
    }

    // Generate order number for tracking
    const orderNumber = `ORD-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
    logStep("Generated order number", { orderNumber });

    // Build line items for Stripe Checkout
    const lineItems = validatedItems.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: `${item.peptide_name} (${item.size})`,
        },
        unit_amount: Math.round(item.price * 100), // Convert to cents
      },
      quantity: item.quantity,
    }));

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : userEmail,
      line_items: lineItems,
      mode: "payment",
      success_url: `${req.headers.get("origin")}/order-success?session_id={CHECKOUT_SESSION_ID}&order=${orderNumber}`,
      cancel_url: `${req.headers.get("origin")}/checkout`,
      metadata: {
        order_number: orderNumber,
        user_id: userId || 'guest',
        guest_email: !userId ? userEmail : '',
        shipping_address: JSON.stringify(validatedAddress),
        order_notes: validatedNotes,
        items: JSON.stringify(validatedItems),
        subtotal: subtotal.toString(),
        shipping: shipping.toString(),
        total: total.toString(),
      },
    });

    logStep("Stripe checkout session created", { sessionId: session.id, orderNumber, isGuest: !userId });

    return new Response(JSON.stringify({ 
      url: session.url,
      orderNumber,
      sessionId: session.id 
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
