import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Loader2, CreditCard, ShieldCheck, Plus, Minus, ChevronRight } from 'lucide-react';
import { peptidePrices } from '@/data/priceData';
import peptideVial from '@/assets/peptide-vial-syringe.jpg';

// Shipping address validation schema
const shippingSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  street: z.string().min(5, "Street address must be at least 5 characters").max(200, "Street address must be less than 200 characters").regex(/^[a-zA-Z0-9\s,.-]+$/, "Street address contains invalid characters"),
  city: z.string().min(2, "City must be at least 2 characters").max(100, "City must be less than 100 characters").regex(/^[a-zA-Z\s-]+$/, "City contains invalid characters"),
  state: z.string().length(2, "State must be 2 letters").regex(/^[A-Z]{2}$/, "State must be uppercase 2-letter code"),
  zip: z.string().regex(/^\d{5}(-\d{4})?$/, "ZIP code must be in format 12345 or 12345-6789")
});
const Checkout = () => {
  const navigate = useNavigate();
  const {
    items,
    subtotal,
    shipping,
    total,
    addItem,
    updateQuantity
  } = useCart();
  const {
    user,
    profile
  } = useAuth();
  const {
    toast
  } = useToast();
  const [loading, setLoading] = useState(false);
  const [orderNotes, setOrderNotes] = useState('');
  const [bacQuantity, setBacQuantity] = useState(1);
  const [shippingAddress, setShippingAddress] = useState({
    email: '',
    street: '',
    city: '',
    state: '',
    zip: ''
  });
  useEffect(() => {
    // Only redirect if cart is empty
    if (items.length === 0) {
      navigate('/all-peptides');
      return;
    }

    // Load shipping address from profile if user is logged in
    if (user && profile) {
      setShippingAddress({
        email: profile.email || user.email || '',
        street: profile.street_address || '',
        city: profile.city || '',
        state: profile.state || '',
        zip: profile.zip_code || ''
      });
    } else if (user?.email) {
      setShippingAddress(prev => ({
        ...prev,
        email: user.email || ''
      }));
    }
  }, [user, items, profile, navigate]);
  const handleProceedToPayment = async () => {
    // Validate shipping address (including email for guests)
    const validationResult = shippingSchema.safeParse(shippingAddress);
    if (!validationResult.success) {
      const firstError = validationResult.error.errors[0];
      toast({
        title: 'Invalid shipping address',
        description: firstError.message,
        variant: 'destructive'
      });
      return;
    }

    // Validate order notes length
    if (orderNotes.length > 2000) {
      toast({
        title: 'Order notes too long',
        description: 'Order notes must be less than 2000 characters',
        variant: 'destructive'
      });
      return;
    }
    setLoading(true);
    try {
      // Call edge function to create Stripe checkout session
      const {
        data,
        error
      } = await supabase.functions.invoke('create-order-checkout', {
        body: {
          items,
          shippingAddress,
          orderNotes
        }
      });
      if (error) {
        throw new Error(error.message);
      }
      if (data?.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error: unknown) {
      console.error('Error creating checkout session:', error);
      toast({
        title: 'Error processing payment',
        description: error instanceof Error ? error.message : 'An error occurred',
        variant: 'destructive'
      });
      setLoading(false);
    }
  };
  return <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 pt-24 my-[48px]">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Shipping Address</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Email field for guests */}
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" value={shippingAddress.email} onChange={e => setShippingAddress({
                  ...shippingAddress,
                  email: e.target.value
                })} placeholder="Email address" disabled={!!user} />
                  {!user && <p className="text-xs text-muted-foreground mt-1">
                      We'll send order confirmation to this email
                    </p>}
                </div>
                <div>
                  <Label htmlFor="street">Street Address</Label>
                  <Input id="street" value={shippingAddress.street} onChange={e => setShippingAddress({
                  ...shippingAddress,
                  street: e.target.value
                })} placeholder="Street address" />
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" value={shippingAddress.city} onChange={e => setShippingAddress({
                  ...shippingAddress,
                  city: e.target.value
                })} placeholder="City" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input id="state" value={shippingAddress.state} onChange={e => setShippingAddress({
                    ...shippingAddress,
                    state: e.target.value.toUpperCase()
                  })} placeholder="State" maxLength={2} />
                  </div>
                  <div>
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input id="zip" value={shippingAddress.zip} onChange={e => setShippingAddress({
                    ...shippingAddress,
                    zip: e.target.value
                  })} placeholder="ZIP code" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Order Notes (Optional)</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea value={orderNotes} onChange={e => setOrderNotes(e.target.value)} placeholder="Any special instructions..." rows={4} maxLength={2000} />
                <p className="text-xs text-muted-foreground mt-2">
                  {orderNotes.length}/2000 characters
                </p>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {items.map(item => <div key={`${item.peptide_name}-${item.size}`} className="flex justify-between text-sm">
                      <span>
                        {item.peptide_name} ({item.size}) x {item.quantity}
                      </span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>)}
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <ShieldCheck className="h-4 w-4 text-green-600" />
                    <span>Secure payment via Stripe</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    You'll be redirected to Stripe's secure checkout to complete your payment.
                  </p>
                </div>

                <Button className="w-full" size="lg" onClick={handleProceedToPayment} disabled={loading}>
                  {loading ? <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Preparing Checkout...
                    </> : <>
                      <CreditCard className="mr-2 h-4 w-4" />
                      Proceed to Payment
                    </>}
                </Button>
              </CardContent>
            </Card>

            {/* Bacteriostatic Water Upsell - Glass Card Style */}
            {!items.some(item => item.peptide_name.toLowerCase().includes('bacteriostatic')) && <Card className="mt-4 w-full h-auto overflow-hidden transition-all duration-500 group flex flex-col relative border-0 bg-transparent">
                {/* Frosted Glass Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl rounded-lg border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.12)] group-hover:shadow-[0_16px_48px_rgba(255,107,0,0.15)] group-hover:border-primary/30 transition-all duration-500" />
                
                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Glowing Orb Effect */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl opacity-0 group-hover:opacity-60 transition-all duration-700 group-hover:scale-150" />
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl opacity-0 group-hover:opacity-50 transition-all duration-700 group-hover:scale-125" />

                {/* Content Container */}
                <div className="relative z-10 flex flex-col h-full">
                  {/* Requirement Banner at Top */}
                  <div className="bg-primary/20 backdrop-blur-md px-3 py-2 rounded-t-lg border-b border-primary/30">
                    <p className="text-sm font-semibold text-center text-foreground">
                      BAC Water is Required for Peptide Reconstitution
                    </p>
                  </div>

                  {/* Image Section with Glass Effect - Same as AllPeptides */}
                  <div className="relative min-h-32 h-44 overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent" />
                    <img alt="Bacteriostatic Water" className="w-36 h-36 object-contain transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_20px_rgba(255,107,0,0.4)] relative z-10" src="/lovable-uploads/7ab040b5-aa74-42dc-b185-992059b06595.webp" />
                    
                    {/* Badge */}
                    <div className="absolute top-2 right-2">
                      <Badge className="text-xs shadow-lg backdrop-blur-md bg-white/20 border-white/30 text-foreground">
                        Essential
                      </Badge>
                    </div>
                  </div>

                  {/* Content Section */}
                  <CardContent className="p-3 flex flex-col flex-1 relative">
                    <div className="flex-1">
                      <h3 className="font-display font-bold text-base mb-2 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent group-hover:from-primary group-hover:to-primary/80 transition-all duration-300">
                        Bacteriostatic Water
                      </h3>
                      
                      {/* Price Badge */}
                      <Badge variant="outline" className="text-xs px-2 py-0.5 backdrop-blur-md bg-white/10 border-primary/30 text-primary font-medium group-hover:bg-primary/10 transition-all duration-300">
                        30ml - ${peptidePrices['bacteriostatic-water']['30ml']}
                      </Badge>
                    </div>
                    
                    {/* Quantity Selector and Add Button */}
                    <div className="flex items-center gap-2 mt-3">
                      <div className="flex items-center gap-1 bg-white/10 backdrop-blur-md rounded-md border border-white/20">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-white/10" onClick={() => setBacQuantity(Math.max(1, bacQuantity - 1))}>
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-6 text-center text-sm font-medium">{bacQuantity}</span>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-white/10" onClick={() => setBacQuantity(bacQuantity + 1)}>
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <Button size="sm" className="flex-1 h-8 text-xs gap-1" onClick={async () => {
                    const existingBac = items.find(item => item.peptide_name === 'Bacteriostatic Water' && item.size === '30ml');
                    if (existingBac) {
                      await updateQuantity('Bacteriostatic Water', '30ml', existingBac.quantity + bacQuantity);
                    } else {
                      await addItem({
                        peptide_name: 'Bacteriostatic Water',
                        size: '30ml',
                        price: peptidePrices['bacteriostatic-water']['30ml']
                      });
                      if (bacQuantity > 1) {
                        await updateQuantity('Bacteriostatic Water', '30ml', bacQuantity);
                      }
                    }
                    setBacQuantity(1);
                  }}>
                        <Plus className="h-3 w-3" />
                        Add to Order
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>}
          </div>
        </div>
      </main>
      <Footer />
    </div>;
};
export default Checkout;