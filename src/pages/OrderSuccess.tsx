import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useCart } from '@/contexts/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Loader2, XCircle } from 'lucide-react';

const OrderSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { clearCart } = useCart();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const verifyPayment = async () => {
      const sessionId = searchParams.get('session_id');
      const orderNum = searchParams.get('order');

      if (!sessionId) {
        setStatus('error');
        setErrorMessage('No payment session found');
        return;
      }

      try {
        const { data, error } = await supabase.functions.invoke('verify-order-payment', {
          body: { sessionId },
        });

        if (error) {
          throw new Error(error.message);
        }

        if (data?.success) {
          setStatus('success');
          setOrderNumber(data.orderNumber || orderNum);
          // Clear local cart as well
          await clearCart();
        } else {
          throw new Error(data?.error || 'Payment verification failed');
        }
      } catch (err) {
        console.error('Payment verification error:', err);
        setStatus('error');
        setErrorMessage(err instanceof Error ? err.message : 'Failed to verify payment');
      }
    };

    verifyPayment();
  }, [searchParams, clearCart]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 pt-24 flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            {status === 'verifying' && (
              <>
                <Loader2 className="h-16 w-16 animate-spin text-primary mx-auto mb-4" />
                <CardTitle>Verifying Payment...</CardTitle>
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
            {status === 'verifying' && (
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
                  {errorMessage || 'There was an issue processing your payment.'}
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
