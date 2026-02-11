import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

const OrderSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [orderNumber, setOrderNumber] = useState<string | null>(null);

  useEffect(() => {
    const provider = searchParams.get('provider');

    if (provider !== 'paypal') {
      setStatus('error');
      return;
    }

    const recordOrder = async () => {
      const pendingOrderJson = sessionStorage.getItem('pendingOrder');
      if (!pendingOrderJson) {
        // Already recorded (page refresh) — check URL for order number
        const urlOrder = searchParams.get('order');
        if (urlOrder) {
          setOrderNumber(urlOrder);
        }
        setStatus('success');
        return;
      }

      const pendingOrder = JSON.parse(pendingOrderJson);
      console.log('[OrderSuccess] Recording order...', pendingOrder.paypalOrderId);

      // Generate order number client-side
      const generatedOrderNumber = `ORD-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;

      // Get authenticated user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        console.error('[OrderSuccess] No authenticated user — cannot record order');
        sessionStorage.removeItem('pendingOrder');
        setOrderNumber(pendingOrder.paypalOrderId);
        setStatus('success');
        return;
      }

      // Primary path: insert directly into Supabase
      const orderRow = {
        order_number: generatedOrderNumber,
        user_id: user.id,
        items: pendingOrder.items,
        subtotal: pendingOrder.subtotal,
        shipping: pendingOrder.shipping,
        total: pendingOrder.total,
        shipping_address: pendingOrder.shippingAddress,
        status: 'processing' as const,
        stripe_payment_id: pendingOrder.paypalOrderId,
      };

      const { error: insertError } = await supabase.from('orders').insert(orderRow);

      if (!insertError) {
        console.log('[OrderSuccess] Order recorded directly:', generatedOrderNumber);
        sessionStorage.removeItem('pendingOrder');
        setOrderNumber(generatedOrderNumber);
        // Update URL so page refreshes still show the order number
        window.history.replaceState({}, '', `/order-success?provider=paypal&order=${generatedOrderNumber}`);
        setStatus('success');

        // Fire-and-forget: call edge function for PayPal verification / shipping label
        fireEdgeFunction(pendingOrder).catch((err) =>
          console.warn('[OrderSuccess] Edge function (non-critical) failed:', err)
        );
      } else {
        console.error('[OrderSuccess] Direct insert failed:', insertError);
        // Fallback: try via edge function
        const fallbackOrder = await tryEdgeFunctionFallback(pendingOrder);
        sessionStorage.removeItem('pendingOrder');
        setOrderNumber(fallbackOrder || pendingOrder.paypalOrderId);
        setStatus('success');
      }
    };

    recordOrder();
  }, [searchParams]);

  // Fire-and-forget call to edge function for PayPal verification + shipping label
  const fireEdgeFunction = async (pendingOrder: Record<string, unknown>) => {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
    const session = (await supabase.auth.getSession()).data.session;
    const authToken = session?.access_token || supabaseKey;

    const res = await fetch(`${supabaseUrl}/functions/v1/capture-paypal-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
        'apikey': supabaseKey,
      },
      body: JSON.stringify(pendingOrder),
    });
    const data = await res.json();
    console.log('[OrderSuccess] Edge function (fire-and-forget):', res.status, data);
  };

  // Fallback: try recording via edge function if direct insert failed
  const tryEdgeFunctionFallback = async (pendingOrder: Record<string, unknown>): Promise<string | null> => {
    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
      const session = (await supabase.auth.getSession()).data.session;
      const authToken = session?.access_token || supabaseKey;

      const res = await fetch(`${supabaseUrl}/functions/v1/capture-paypal-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
          'apikey': supabaseKey,
        },
        body: JSON.stringify(pendingOrder),
      });
      const data = await res.json();
      console.log('[OrderSuccess] Edge function fallback:', res.status, data);
      if (res.ok && data.orderNumber) return data.orderNumber;
    } catch (err) {
      console.error('[OrderSuccess] Edge function fallback failed:', err);
    }
    return null;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 pt-24 flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            {status === 'loading' && (
              <>
                <Loader2 className="h-16 w-16 text-primary mx-auto mb-4 animate-spin" />
                <CardTitle>Processing Order...</CardTitle>
              </>
            )}
            {status === 'success' && (
              <>
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <CardTitle className="text-green-600">Order Confirmed!</CardTitle>
              </>
            )}
            {status === 'error' && (
              <>
                <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                <CardTitle className="text-red-600">Payment Issue</CardTitle>
              </>
            )}
          </CardHeader>
          <CardContent className="text-center space-y-4">
            {status === 'loading' && (
              <p className="text-muted-foreground">
                Please wait while we confirm your payment...
              </p>
            )}
            {status === 'success' && (
              <>
                <p className="text-muted-foreground">
                  Thank you for your order! Your payment has been processed successfully.
                </p>
                {orderNumber && (
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">Order Number</p>
                    <p className="font-mono font-bold text-lg">{orderNumber}</p>
                  </div>
                )}
                <p className="text-sm text-muted-foreground">
                  A confirmation email will be sent to your email address shortly.
                </p>
                <Button onClick={() => navigate('/')} className="w-full">
                  Continue Shopping
                </Button>
              </>
            )}
            {status === 'error' && (
              <>
                <p className="text-muted-foreground">
                  There was an issue processing your payment.
                </p>
                <div className="space-y-2">
                  <Button onClick={() => navigate('/checkout')} className="w-full">
                    Try Again
                  </Button>
                  <Button variant="outline" onClick={() => navigate('/')} className="w-full">
                    Return Home
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default OrderSuccess;
