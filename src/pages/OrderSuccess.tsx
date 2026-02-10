import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle } from 'lucide-react';

const OrderSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'success' | 'error'>('error');
  const [orderNumber, setOrderNumber] = useState<string | null>(null);

  useEffect(() => {
    const orderNum = searchParams.get('order');
    const provider = searchParams.get('provider');

    // PayPal payments are verified server-side via capture edge function
    // The order was already created and cart cleared before redirecting here
    if (provider === 'paypal' && orderNum) {
      setStatus('success');
      setOrderNumber(orderNum);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 pt-24 flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
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
