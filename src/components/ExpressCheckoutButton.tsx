import { useState, useEffect } from 'react';
import { Elements, ExpressCheckoutElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { stripePromise, isStripeConfigured } from '@/lib/stripe';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

interface ExpressCheckoutButtonProps {
  peptideName: string;
  size: string;
  quantity: number;
  priceInCents: number;
}

const ExpressCheckoutForm = ({ 
  peptideName, 
  size, 
  quantity, 
  priceInCents 
}: ExpressCheckoutButtonProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onConfirm = async () => {
    if (!stripe || !elements) return;

    setIsLoading(true);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/order-success`,
        },
      });

      if (error) {
        toast({
          title: "Payment failed",
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Payment error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const [isReady, setIsReady] = useState(false);

  return (
    <div className="w-full">
      {isLoading && (
        <div className="flex items-center justify-center py-2">
          <Loader2 className="h-4 w-4 animate-spin" />
        </div>
      )}
      <ExpressCheckoutElement 
        onConfirm={onConfirm}
        onReady={({ availablePaymentMethods }) => {
          // Only show if Apple Pay or Google Pay is available
          setIsReady(!!availablePaymentMethods);
        }}
        options={{
          buttonType: {
            applePay: 'buy',
            googlePay: 'buy',
          },
        }}
      />
      {!isReady && !isLoading && (
        <p className="text-xs text-muted-foreground text-center py-2">
          Apple Pay / Google Pay available on supported devices
        </p>
      )}
    </div>
  );
};

export const ExpressCheckoutButton = (props: ExpressCheckoutButtonProps) => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const createPaymentIntent = async () => {
      if (!isStripeConfigured) {
        setError("Stripe not configured");
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase.functions.invoke('create-payment-intent', {
          body: {
            amount: props.priceInCents,
            peptideName: props.peptideName,
            size: props.size,
            quantity: props.quantity,
          },
        });

        if (error) throw error;
        
        if (data?.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          throw new Error("No client secret received");
        }
      } catch (err) {
        console.error("Failed to create payment intent:", err);
        setError("Express checkout unavailable");
      } finally {
        setIsLoading(false);
      }
    };

    createPaymentIntent();
  }, [props.priceInCents, props.peptideName, props.size, props.quantity]);

  if (!isStripeConfigured || error) {
    return null; // Don't show button if Stripe isn't configured
  }

  if (isLoading) {
    return (
      <div className="w-full h-11 flex items-center justify-center bg-muted/50 rounded-md">
        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!clientSecret || !stripePromise) {
    return null;
  }

  return (
    <Elements 
      stripe={stripePromise} 
      options={{ 
        clientSecret,
        appearance: {
          theme: 'stripe',
          variables: {
            borderRadius: '6px',
          },
        },
      }}
    >
      <ExpressCheckoutForm {...props} />
    </Elements>
  );
};
