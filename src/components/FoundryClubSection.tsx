import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Hexagon, Percent, Truck, Clock, ArrowRight } from 'lucide-react';
import FoundryClubLink from './FoundryClubLink';

const FoundryClubSection = () => {
  const benefits = [
    { icon: Percent, text: 'Wholesale Pricing' },
    { icon: Truck, text: 'Priority Shipping' },
    { icon: Clock, text: 'Early Access' },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <Hexagon className="h-8 w-8 text-primary" />
            <Badge variant="secondary" className="text-sm">Members Only</Badge>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            The Foundry Club
          </h2>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join our exclusive membership program and unlock wholesale pricing on every peptide in our catalog. 
            Save significantly on every order.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {benefits.map((benefit) => (
              <div key={benefit.text} className="flex items-center gap-2 text-sm">
                <benefit.icon className="h-5 w-5 text-primary" />
                <span>{benefit.text}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <FoundryClubLink className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-11 px-8">
              Join for $50/month
              <ArrowRight className="h-4 w-4" />
            </FoundryClubLink>
            <p className="text-sm text-muted-foreground">Cancel anytime</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoundryClubSection;

