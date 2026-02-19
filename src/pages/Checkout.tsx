import { useState, useEffect } from 'react';
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, ShieldCheck, Plus, Minus, LogIn, UserPlus } from 'lucide-react';
import { usePrices } from '@/hooks/usePrices';
import { useMembership } from '@/hooks/useMembership';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';

// Shipping address validation schema
const shippingSchema = z.object({
  street: z.string().min(5, "Street address must be at least 5 characters").max(200, "Street address must be less than 200 characters").regex(/^[a-zA-Z0-9\s,.-]+$/, "Street address contains invalid characters"),
  city: z.string().min(2, "City must be at least 2 characters").max(100, "City must be less than 100 characters").regex(/^[a-zA-Z\s-]+$/, "City contains invalid characters"),
  state: z.string().length(2, "State must be 2 letters").regex(/^[A-Z]{2}$/, "State must be uppercase 2-letter code"),
  zip: z.string().regex(/^\d{5}(-\d{4})?$/, "ZIP code must be in format 12345 or 12345-6789")
});
const Checkout = () => {
  useDocumentMeta("Checkout | Peptide Foundry");

  const navigate = useNavigate();
  const {
    items,
    subtotal,
    shipping,
    total,
    addItem,
    updateQuantity,
    clearCart,
    syncPrices
  } = useCart();
  const { prices: peptidePrices, memberPrices, isLoading: pricesLoading } = usePrices();
  const { isMember } = useMembership();
  const {
    user,
    profile,
    signIn,
    signUp
  } = useAuth();
  const {
    toast
  } = useToast();
  const [bacQuantity, setBacQuantity] = useState(1);
  const [orderCompleting, setOrderCompleting] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSignInMode, setIsSignInMode] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [street2, setStreet2] = useState('');
  const [shippingAddress, setShippingAddress] = useState({
    email: '',
    street: '',
    city: '',
    state: '',
    zip: ''
  });

  useEffect(() => {
    // Don't redirect to catalog if we just completed an order and cleared the cart
    if (orderCompleting) return;

    // Only redirect if cart is empty
    if (items.length === 0) {
      navigate('/shop');
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
  }, [user, items, profile, navigate, orderCompleting]);

  // Sync cart prices with DB on checkout load
  useEffect(() => {
    if (pricesLoading || items.length === 0) return;
    syncPrices(peptidePrices, memberPrices, isMember).then((changed) => {
      if (changed) {
        toast({
          title: 'Prices updated',
          description: 'Some prices have been updated since you added items to your cart.',
        });
      }
    });
  }, [pricesLoading]);

  const handleCreateAccount = async () => {
    if (!firstName.trim() || !lastName.trim()) {
      toast({ title: 'Name required', description: 'Please enter your first and last name.', variant: 'destructive' });
      return;
    }
    if (!shippingAddress.email || !z.string().email().safeParse(shippingAddress.email).success) {
      toast({ title: 'Valid email required', description: 'Please enter a valid email address.', variant: 'destructive' });
      return;
    }
    if (password.length < 6) {
      toast({ title: 'Password too short', description: 'Password must be at least 6 characters.', variant: 'destructive' });
      return;
    }

    setAuthLoading(true);
    const { error } = await signUp(shippingAddress.email, password, firstName.trim(), lastName.trim());
    if (error) {
      setAuthLoading(false);
      return;
    }

    // Wait for auth state to settle and profile to be created by DB trigger
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Update profile with address fields
    const { data: { user: newUser } } = await supabase.auth.getUser();
    if (newUser && (shippingAddress.street || shippingAddress.city || shippingAddress.state || shippingAddress.zip)) {
      await supabase.from('profiles').update({
        street_address: [shippingAddress.street, street2].filter(Boolean).join(', ') || null,
        city: shippingAddress.city || null,
        state: shippingAddress.state || null,
        zip_code: shippingAddress.zip || null,
      }).eq('id', newUser.id);
    }
    setAuthLoading(false);
  };

  const handleSignIn = async () => {
    if (!shippingAddress.email || !password) {
      toast({ title: 'Credentials required', description: 'Please enter your email and password.', variant: 'destructive' });
      return;
    }
    setAuthLoading(true);
    const { error } = await signIn(shippingAddress.email, password);
    setAuthLoading(false);
    if (error) return;
  };

  const shippingFields = (
    <>
      <div>
        <Label htmlFor="street">Street Address</Label>
        <Input id="street" value={shippingAddress.street} onChange={e => setShippingAddress({ ...shippingAddress, street: e.target.value })} placeholder="Street address" />
      </div>
      <div>
        <Label htmlFor="street2">Apt / Suite / Unit <span className="text-muted-foreground font-normal">(optional)</span></Label>
        <Input id="street2" value={street2} onChange={e => setStreet2(e.target.value)} placeholder="Apt 4B, Suite 200, etc." />
      </div>
      <div>
        <Label htmlFor="city">City</Label>
        <Input id="city" value={shippingAddress.city} onChange={e => setShippingAddress({ ...shippingAddress, city: e.target.value })} placeholder="City" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="state">State</Label>
          <Input id="state" value={shippingAddress.state} onChange={e => setShippingAddress({ ...shippingAddress, state: e.target.value.toUpperCase() })} placeholder="State" maxLength={2} />
        </div>
        <div>
          <Label htmlFor="zip">ZIP Code</Label>
          <Input id="zip" value={shippingAddress.zip} onChange={e => setShippingAddress({ ...shippingAddress, zip: e.target.value })} placeholder="ZIP code" />
        </div>
      </div>
    </>
  );

  return <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 pt-24 my-[48px]">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{user ? 'Shipping Address' : 'Account & Shipping'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {!user ? (
                  // Guest: account creation / sign-in form
                  <>
                    {!isSignInMode ? (
                      // Sign-up mode
                      <>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="firstName">First Name</Label>
                            <Input id="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="First name" />
                          </div>
                          <div>
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input id="lastName" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Last name" />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="email">Email Address</Label>
                          <Input id="email" type="email" value={shippingAddress.email} onChange={e => setShippingAddress({ ...shippingAddress, email: e.target.value })} placeholder="Email address" />
                        </div>
                        <div>
                          <Label htmlFor="password">Password</Label>
                          <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Create a password (min 6 characters)" />
                        </div>
                        <Separator />
                        {shippingFields}
                        <Button className="w-full" onClick={handleCreateAccount} disabled={authLoading}>
                          {authLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <UserPlus className="h-4 w-4 mr-2" />}
                          Create Account & Continue to Payment
                        </Button>
                        <p className="text-sm text-center text-muted-foreground">
                          Already have an account?{' '}
                          <button type="button" onClick={() => setIsSignInMode(true)} className="text-primary underline hover:text-primary/80">
                            Sign in
                          </button>
                        </p>
                      </>
                    ) : (
                      // Sign-in mode
                      <>
                        <div>
                          <Label htmlFor="email">Email Address</Label>
                          <Input id="email" type="email" value={shippingAddress.email} onChange={e => setShippingAddress({ ...shippingAddress, email: e.target.value })} placeholder="Email address" />
                        </div>
                        <div>
                          <Label htmlFor="password">Password</Label>
                          <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" onKeyDown={e => { if (e.key === 'Enter') handleSignIn(); }} />
                        </div>
                        <Button className="w-full" onClick={handleSignIn} disabled={authLoading}>
                          {authLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <LogIn className="h-4 w-4 mr-2" />}
                          Sign In
                        </Button>
                        <p className="text-sm text-center text-muted-foreground">
                          Need an account?{' '}
                          <button type="button" onClick={() => setIsSignInMode(false)} className="text-primary underline hover:text-primary/80">
                            Create one
                          </button>
                        </p>
                      </>
                    )}
                  </>
                ) : (
                  // Logged in: editable shipping address
                  shippingFields
                )}
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
                    <span>Secure payment via PayPal</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Pay with PayPal, Venmo, Apple Pay, or card.
                  </p>
                </div>

                {user ? (
                  <>
                    <div className="flex items-start gap-2">
                      <Checkbox
                        id="terms"
                        checked={agreedToTerms}
                        onCheckedChange={(checked) => setAgreedToTerms(checked === true)}
                      />
                      <label htmlFor="terms" className="text-sm text-muted-foreground leading-tight cursor-pointer">
                        I agree to the{' '}
                        <a href="/terms-of-service" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80">
                          Terms of Service
                        </a>{' '}
                        and{' '}
                        <a href="/refund-policy" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80">
                          Refund Policy
                        </a>
                      </label>
                    </div>

                    <PayPalScriptProvider options={{
                      clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
                      currency: "USD",
                      intent: "capture",
                      "enable-funding": "venmo,applepay",
                      "disable-funding": "paylater",
                    }}>
                      <PayPalButtons
                        disabled={!agreedToTerms}
                        style={{
                          layout: "vertical",
                          color: "gold",
                          shape: "rect",
                          label: "paypal",
                        }}
                        createOrder={(_data, actions) => {
                          if (!agreedToTerms) {
                            toast({
                              title: 'Terms required',
                              description: 'Please agree to the Terms of Service and Refund Policy.',
                              variant: 'destructive'
                            });
                            return Promise.reject(new Error('Terms not accepted'));
                          }

                          const validationResult = shippingSchema.safeParse(shippingAddress);
                          if (!validationResult.success) {
                            toast({
                              title: 'Invalid shipping address',
                              description: validationResult.error.errors[0].message,
                              variant: 'destructive'
                            });
                            return Promise.reject(new Error('Invalid shipping address'));
                          }

                          return actions.order.create({
                            purchase_units: [{
                              description: `Order - ${items.length} item${items.length > 1 ? 's' : ''}`,
                              amount: {
                                currency_code: "USD",
                                value: total.toFixed(2),
                                breakdown: {
                                  item_total: { currency_code: "USD", value: subtotal.toFixed(2) },
                                  shipping: { currency_code: "USD", value: shipping.toFixed(2) },
                                },
                              },
                              items: items.map((_i, idx) => ({
                                name: `Item ${idx + 1}`,
                                unit_amount: { currency_code: "USD", value: _i.price.toFixed(2) },
                                quantity: String(_i.quantity),
                                category: "PHYSICAL_GOODS" as const,
                              })),
                            }],
                          });
                        }}
                        onApprove={async (data, _actions) => {
                          try {
                            const { data: { session } } = await supabase.auth.getSession();
                            if (!session) {
                              toast({ title: 'Session expired', description: 'Please sign in and try again.', variant: 'destructive' });
                              return;
                            }
                            const { data: result, error } = await supabase.functions.invoke("capture-paypal-order", {
                              headers: { Authorization: `Bearer ${session.access_token}` },
                              body: {
                                paypalOrderId: data.orderID,
                                type: "order",
                                items: items.map(item => ({
                                  slug: item.slug || '',
                                  size: item.size,
                                  quantity: item.quantity,
                                  name: item.peptide_name,
                                })),
                                shippingAddress: {
                                  street: [shippingAddress.street, street2].filter(Boolean).join(', '),
                                  city: shippingAddress.city,
                                  state: shippingAddress.state,
                                  zipCode: shippingAddress.zip,
                                },
                                shippingCost: shipping,
                              },
                            });

                            if (error) {
                              console.error('[Checkout] Server capture error:', error);
                              let message = 'There was an issue processing your payment. Please try again.';
                              try {
                                const body = JSON.parse(error.message);
                                message = body.error || message;
                              } catch {}
                              toast({
                                title: 'Payment failed',
                                description: message,
                                variant: 'destructive',
                              });
                              return;
                            }

                            setOrderCompleting(true);
                            await clearCart();
                            navigate("/order-success", {
                              state: {
                                orderNumber: result.orderNumber,
                                orderId: result.orderId,
                                items: items,
                                total: total,
                              },
                            });
                          } catch (err) {
                            console.error('Payment capture error:', err);
                            toast({
                              title: 'Payment failed',
                              description: 'There was an issue processing your payment. Please try again.',
                              variant: 'destructive',
                            });
                          }
                        }}
                        onCancel={() => {
                          toast({
                            title: 'Payment cancelled',
                            description: 'You can try again when ready.',
                          });
                        }}
                        onError={(err) => {
                          console.error('PayPal error:', err);
                        }}
                      />
                    </PayPalScriptProvider>
                  </>
                ) : (
                  <div className="bg-muted/30 border border-dashed rounded-lg p-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      Create an account or sign in to complete your purchase.
                    </p>
                  </div>
                )}
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
                        price: peptidePrices['bacteriostatic-water']['30ml'],
                        slug: 'bacteriostatic-water'
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
