import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

const OrderSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderData = location.state as {
    orderNumber?: string;
    orderId?: string;
    items?: unknown[];
    total?: number;
  } | null;

  // If user navigated directly (no state), show a generic message
  if (!orderData) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8 pt-24 flex items-center justify-center">
          <Card className="max-w-md w-full">
            <CardHeader className="text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <CardTitle className="text-green-600">Thank You!</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-muted-foreground">
                If you recently placed an order, a confirmation email will be sent to your email address shortly.
              </p>
              <Button onClick={() => navigate('/')} className="w-full">
                Continue Shopping
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 pt-24 flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <CardTitle className="text-green-600">Order Confirmed!</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              Thank you for your order! Your payment has been processed successfully.
            </p>
            {orderData.orderNumber && (
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">Order Number</p>
                <p className="font-mono font-bold text-lg">{orderData.orderNumber}</p>
              </div>
            )}
            <p className="text-sm text-muted-foreground">
              A confirmation email will be sent to your email address shortly.
            </p>
            <Button onClick={() => navigate('/')} className="w-full">
              Continue Shopping
            </Button>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default OrderSuccess;
