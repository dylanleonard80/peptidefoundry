import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingHexagonBackground from '@/components/FloatingHexagonBackground';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useMembership } from '@/hooks/useMembership';
import { Hexagon, Loader2, Percent, Truck, Clock, ArrowRight, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { usePrices } from '@/hooks/usePrices';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { supabase } from '@/integrations/supabase/client';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';

const FoundryClub = () => {
  useDocumentMeta("Foundry Club Membership | Peptide Foundry");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, loading: authLoading } = useAuth();
  const {
    isMember,
    subscriptionEnd,
    canceled,
    loading: memberLoading,
    checkMembership
  } = useMembership();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const { prices: peptidePrices, memberPrices } = usePrices();

  useEffect(() => {
    if (searchParams.get('success') === 'true') {
      toast.success('Welcome to The Foundry Club!', {
        description: 'Your membership is now active. Enjoy wholesale pricing on all peptides!'
      });
      checkMembership();
    } else if (searchParams.get('canceled') === 'true') {
      toast.info('Checkout canceled', {
        description: 'No charges were made.'
      });
    }
  }, [searchParams, checkMembership]);

  const handleJoin = () => {
    if (!user) {
      navigate('/sign-in');
      return;
    }
    setShowPayment(true);
  };


  const benefits = [
    {
      icon: Percent,
      title: 'Wholesale Pricing',
      description: 'Save up to 25% on every peptide in our catalog'
    },
    {
      icon: Truck,
      title: 'Priority Shipping',
      description: 'Your orders are processed and shipped first'
    },
    {
      icon: Clock,
      title: 'Early Access',
      description: 'Be first to access new peptide releases'
    }
  ];

  const allPeptidePricing = [
    { name: 'AOD-9604', size: '5mg', slug: 'aod-9604' },
    { name: 'BPC-157', size: '10mg', slug: 'bpc-157' },
    { name: 'BPC-157 + TB-500', size: '10mg/10mg', slug: 'bpc-157-tb-500' },
    { name: 'Cagrilintide', size: '10mg', slug: 'cagrilintide' },
    { name: 'CJC-1295 + Ipamorelin', size: '5mg/5mg', slug: 'cjc-1295-ipamorelin' },
    { name: 'DSIP', size: '5mg', slug: 'dsip' },
    { name: 'Epithalon', size: '10mg', slug: 'epithalon' },
    { name: 'GHK-Cu', size: '100mg', slug: 'ghk-cu' },
    { name: 'GLOW', size: '50mg/10mg/10mg', slug: 'glow' },
    { name: 'KLOW', size: '50mg/10mg/10mg/10mg', slug: 'klow' },
    { name: 'GLP-1SG', size: '10mg', slug: 'glp-1sg' },
    { name: 'GLP-1 2TZ', size: '10mg', slug: 'glp-1tz' },
    { name: 'GLP-3RT', size: '12mg', slug: 'retatrutide' },
    { name: 'Glutathione', size: '1500mg', slug: 'glutathione' },
    { name: 'IGF-1 LR3', size: '1mg', slug: 'igf-1-lr3' },
    { name: 'Ipamorelin', size: '10mg', slug: 'ipamorelin' },
    { name: 'Melanotan 2', size: '10mg', slug: 'melanotan-2' },
    { name: 'MOTS-C', size: '10mg', slug: 'mots-c' },
    { name: 'Selank', size: '10mg', slug: 'selank' },
    { name: 'Semax', size: '10mg', slug: 'semax' },
    { name: 'NAD+ (Buffered)', size: '500mg', slug: 'nad-buffered' },
    { name: 'PT-141', size: '10mg', slug: 'pt-141' },
    { name: 'Sermorelin', size: '5mg', slug: 'sermorelin' },
    { name: 'TB-500', size: '10mg', slug: 'tb-500' },
    { name: 'Tesamorelin', size: '10mg', slug: 'tesamorelin' },
    { name: 'Tesamorelin / Ipamorelin', size: '12mg/2mg', slug: 'tesamorelin-ipamorelin' },
  ].map(item => {
    const regular = peptidePrices[item.slug]?.[item.size] ?? 0;
    const member = memberPrices[item.slug]?.[item.size] ?? Math.round(regular * 0.77);
    return {
      ...item,
      regular,
      member,
      savings: regular - member
    };
  }).sort((a, b) => b.savings - a.savings);

  const loading = authLoading || memberLoading;

  return (
    <div className="min-h-screen bg-charcoal relative overflow-x-hidden">
      <FloatingHexagonBackground />
      <Navbar />

      {/* Hero Section */}
      <main className="relative z-10 pt-40 md:pt-44">
        <section className="relative pb-10">
          {/* Subtle orange glow */}
          <div
            className="absolute -top-20 left-1/2 -translate-x-1/2 w-[1000px] h-[800px] pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, hsl(24, 72%, 50%) 0%, hsl(24, 72%, 50%, 0.4) 25%, hsl(24, 72%, 50%, 0.1) 50%, transparent 70%)',
              filter: 'blur(120px)',
              opacity: 0.2,
            }}
          />

          <div className="container mx-auto px-6 lg:px-8 max-w-5xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Icon */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex p-4 bg-primary/20 rounded-2xl mb-6"
            >
              <Hexagon className="w-12 h-12 text-primary" strokeWidth={1.5} />
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-4">
              The Foundry Club
            </h1>
            <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-8">
              Unlock wholesale pricing on all peptides with our exclusive membership.
              Priority support, early access, and more.
            </p>

            {/* Member Status or Join CTA */}
            {!loading && isMember ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex flex-col items-center gap-4"
              >
                <div className="flex items-center gap-2 px-4 py-2 bg-primary/20 rounded-full">
                  <Hexagon className="w-5 h-5 text-primary" />
                  <span className="text-primary font-medium">Active Member</span>
                </div>
                <p className="text-white/50 text-sm">
                  {canceled
                    ? `Access until ${new Date(subscriptionEnd!).toLocaleDateString()}`
                    : `Renews ${new Date(subscriptionEnd!).toLocaleDateString()}`}
                </p>
              </motion.div>
            ) : !loading && !showPayment ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex flex-col items-center gap-3"
              >
                <div className="text-4xl font-serif text-white">
                  $50<span className="text-lg text-white/50">/month</span>
                </div>
                <Button
                  onClick={handleJoin}
                  disabled={isProcessing}
                  size="lg"
                  className="group px-8 py-6 bg-primary text-white hover:bg-primary/90 rounded-full text-lg"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      {user ? 'Join The Foundry Club' : 'Sign In to Join'}
                      <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </Button>
                <p className="text-white/40 text-sm">Cancel anytime</p>
              </motion.div>
            ) : null}

            {/* PayPal Payment Widget */}
            <AnimatePresence>
              {showPayment && !isMember && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="w-full max-w-md mx-auto mt-6"
                >
                  <div className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-white">Complete Payment</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowPayment(false)}
                        className="text-white/50 hover:text-white hover:bg-white/10"
                      >
                        <ArrowLeft className="h-4 w-4 mr-1" />
                        Back
                      </Button>
                    </div>
                    <div className="text-center mb-4">
                      <p className="text-white/60 text-sm">Foundry Club Membership</p>
                      <p className="text-2xl font-serif text-white">$50<span className="text-sm text-white/50">/month</span></p>
                    </div>
                    <PayPalScriptProvider options={{
                      clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
                      currency: "USD",
                      intent: "capture",
                      "enable-funding": "venmo,applepay",
                      "disable-funding": "paylater",
                    }}>
                      <PayPalButtons
                        style={{
                          layout: "vertical",
                          color: "gold",
                          shape: "rect",
                          label: "paypal",
                        }}
                        createOrder={(_data, actions) => {
                          return actions.order.create({
                            purchase_units: [{
                              amount: {
                                currency_code: "USD",
                                value: "50.00",
                                breakdown: {
                                  item_total: { currency_code: "USD", value: "50.00" },
                                },
                              },
                              items: [{
                                name: "Foundry Club Membership - 30 Days",
                                unit_amount: { currency_code: "USD", value: "50.00" },
                                quantity: "1",
                                category: "DIGITAL_GOODS" as const,
                              }],
                            }],
                          });
                        }}
                        onApprove={async (data, _actions) => {
                          try {
                            const { data: { session } } = await supabase.auth.getSession();
                            if (!session) {
                              toast.error('Session expired. Please sign in and try again.');
                              return;
                            }
                            const { data: result, error } = await supabase.functions.invoke("capture-paypal-order", {
                              headers: { Authorization: `Bearer ${session.access_token}` },
                              body: {
                                paypalOrderId: data.orderID,
                                type: "membership",
                              },
                            });

                            if (error) {
                              console.error('Membership activation failed:', error);
                              let message = 'Payment failed. Please contact support.';
                              try {
                                const body = JSON.parse(error.message);
                                message = body.error || message;
                              } catch {}
                              toast.error(message);
                              return;
                            }

                            toast.success('Welcome to The Foundry Club!', {
                              description: 'Your membership is now active. Enjoy wholesale pricing on all peptides!'
                            });
                            setShowPayment(false);
                            checkMembership();
                          } catch (err) {
                            console.error('Error capturing membership payment:', err);
                            toast.error('Payment failed. Please contact support.');
                          }
                        }}
                        onCancel={() => {
                          toast.info('Payment cancelled', {
                            description: 'No charges were made.'
                          });
                        }}
                        onError={(err) => {
                          console.error('PayPal error:', err);
                          toast.error('Payment failed. Please try again.');
                        }}
                      />
                    </PayPalScriptProvider>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-10 relative">
        <div className="container mx-auto px-6 lg:px-8 max-w-5xl">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-serif text-white text-center mb-8"
          >
            Member Benefits
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-white/5 border border-white/10 rounded-2xl text-center hover:border-primary/30 transition-colors"
              >
                <div className="inline-flex p-3 bg-primary/10 rounded-xl mb-4">
                  <benefit.icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="font-medium text-white mb-2">{benefit.title}</h3>
                <p className="text-sm text-white/50">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Comparison - Carousel */}
      <section className="py-10 relative overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-8 px-6"
          >
            <h2 className="text-2xl md:text-3xl font-serif text-white mb-3">
              See Your Savings
            </h2>
            <p className="text-white/50">Wholesale pricing on every peptide</p>
          </motion.div>

          <div className="relative px-6">
            {/* Carousel container */}
            <div
              className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              {allPeptidePricing.map((item) => (
                <div
                  key={`${item.name}-${item.size}`}
                  className="flex-shrink-0 w-[150px] md:w-[170px] p-4 bg-white/5 border border-white/10 rounded-xl text-center hover:border-primary/30 transition-colors"
                >
                  <h3 className="font-medium text-white text-sm mb-1 line-clamp-1">{item.name}</h3>
                  <p className="text-xs text-white/40 mb-3">{item.size}</p>
                  <p className="text-white/40 line-through text-sm">${item.regular}</p>
                  <p className="text-xl font-semibold text-primary">${item.member}</p>
                  <span className="inline-block mt-2 px-2 py-1 bg-primary/20 text-primary text-xs rounded-full">
                    Save ${item.savings}
                  </span>
                </div>
              ))}
            </div>

            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-4 w-12 bg-gradient-to-r from-charcoal to-transparent pointer-events-none z-10" />
            <div className="absolute right-0 top-0 bottom-4 w-12 bg-gradient-to-l from-charcoal to-transparent pointer-events-none z-10" />
          </div>

          <p className="text-center text-white/40 text-sm mt-4 px-6">
            ← Scroll to see all {allPeptidePricing.length} peptides →
          </p>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-10 relative">
        <div className="container mx-auto px-6 lg:px-8 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 md:p-10 bg-white/5 border border-white/10 rounded-2xl"
          >
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
              <div className="flex-shrink-0 p-4 bg-primary/20 rounded-2xl">
                <svg className="w-10 h-10 text-primary" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-xl md:text-2xl font-serif text-white mb-2">
                  Join the Research Community
                </h3>
                <p className="text-white/60 mb-4">
                  Connect with fellow researchers in our private Discord server. Share insights,
                  discuss protocols, and stay updated on the latest peptide research.
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20">
                    Research Protocols
                  </span>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20">
                    Stack Discussions
                  </span>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20">
                    Product Q&A
                  </span>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20">
                    Direct Team Access
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Weekly Research Brief */}
      <section className="py-10 relative">
        <div className="container mx-auto px-6 lg:px-8 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 md:p-10 bg-white/5 border border-white/10 rounded-2xl"
          >
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
              <div className="flex-shrink-0 p-4 bg-primary/20 rounded-2xl">
                {/* Perplexity logo */}
                <svg className="w-10 h-10" viewBox="0 0 512 509.64" fill="currentColor">
                  <path className="text-primary" fill="currentColor" fillRule="nonzero" d="M348.851 128.063l-68.946 58.302h68.946v-58.302zm-83.908 48.709l100.931-85.349v94.942h32.244v143.421h-38.731v90.004l-94.442-86.662v83.946h-17.023v-83.906l-96.596 86.246v-89.628h-37.445V186.365h38.732V90.768l95.309 84.958v-83.16h17.023l-.002 84.206zm-29.209 26.616c-34.955.02-69.893 0-104.83 0v109.375h20.415v-27.121l84.415-82.254zm41.445 0l82.208 82.324v27.051h21.708V203.388c-34.617 0-69.274.02-103.916 0zm-42.874-17.023l-64.669-57.646v57.646h64.669zm13.617 124.076v-95.2l-79.573 77.516v88.731l79.573-71.047zm17.252-95.022v94.863l77.19 70.8c0-29.485-.012-58.943-.012-88.425l-77.178-77.268z"/>
                </svg>
              </div>
              <div className="text-center md:text-left">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-2">
                  <h3 className="text-xl md:text-2xl font-serif text-white">
                    Weekly Research Intelligence
                  </h3>
                  <span className="px-3 py-1 bg-primary/20 text-primary text-xs rounded-full border border-primary/30">
                    Powered by Perplexity
                  </span>
                </div>
                <p className="text-white/60 mb-4">
                  Stay ahead with Perplexity AI powered peptide research delivered every week. Get
                  the latest clinical trial findings, research publications, and industry news — all in one
                  digestible brief.
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20">
                    Clinical Trials
                  </span>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20">
                    Breaking Research
                  </span>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20">
                    Industry News
                  </span>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20">
                    Expert Insights
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-10 relative">
        <div className="container mx-auto px-6 lg:px-8 max-w-2xl">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-serif text-white text-center mb-8"
          >
            Questions & Answers
          </motion.h2>

          <div className="space-y-4">
            {[
              {
                q: 'How does billing work?',
                a: "You'll be charged $50 when you sign up, then $50 monthly on the same date. Cancel anytime."
              },
              {
                q: 'What happens if I cancel?',
                a: "You'll keep your member pricing until the end of your billing period."
              },
              {
                q: 'Is the discount applied automatically?',
                a: 'Yes! When logged in as a member, you see discounted prices across all peptide pages.'
              },
              {
                q: 'How do I access the Discord community?',
                a: "After joining, you'll receive an exclusive invite link via email."
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-white/5 border border-white/10 rounded-xl"
              >
                <h3 className="font-medium text-white mb-2">{faq.q}</h3>
                <p className="text-white/50 text-sm">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      {!loading && !isMember && !showPayment && (
        <section className="py-10 relative">
          <div className="container mx-auto px-6 lg:px-8 max-w-2xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl font-serif text-white mb-4">
                Ready to save on every order?
              </h2>
              <p className="text-white/50 mb-8">
                Join researchers who trust The Foundry Club for wholesale peptide pricing.
              </p>
              <Button
                onClick={handleJoin}
                disabled={isProcessing}
                size="lg"
                className="group px-8 py-6 bg-primary text-white hover:bg-primary/90 rounded-full text-lg"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    Join for $50/month
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>
            </motion.div>
          </div>
        </section>
      )}
      </main>

      <Footer />
    </div>
  );
};

export default FoundryClub;
