import React from "react";
import {
  Truck,
  ShieldCheck,
  Hexagon,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import FoundryClubLink from "./FoundryClubLink";

interface HumanoidSectionProps {
  className?: string;
}

const HumanoidSection = ({ className }: HumanoidSectionProps) => {
  return (
    <section
      className={cn("py-16 md:py-24 bg-background", className)}
      id="why-peptide-foundry"
    >
      <div className="container mx-auto px-6 lg:px-8 max-w-5xl">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-charcoal">
            Why Researchers Choose Us
          </h2>
          <p className="mt-4 text-charcoal-light max-w-2xl mx-auto">
            Quality, transparency, and reliability in every order.
          </p>
        </div>

        {/* Shipping highlight - compact */}
        <div className="card-organic mb-8 relative overflow-hidden">
          <div className="flex items-center">
            <div className="flex-1 p-6 md:p-8 z-10">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex-shrink-0 p-2.5 bg-peach-light rounded-lg">
                  <Truck className="w-5 h-5 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg md:text-xl font-serif text-charcoal">
                  Free 2-Day Shipping
                </h3>
              </div>
              <p className="text-sm text-charcoal-light leading-relaxed">
                Orders placed before 3 PM ET ship same day with tracking included.
              </p>
            </div>

            {/* Shipping image */}
            <div className="relative hidden md:block w-1/3 h-32">
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/70 to-transparent z-10" />
              <img
                src="/shipping-package.webp"
                alt="Peptide Foundry shipping package"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Third-party verified card - compact inline */}
        <div className="card-organic p-6 md:p-8 mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex-shrink-0 p-2.5 bg-stone-light rounded-lg">
              <ShieldCheck
                className="w-5 h-5 text-charcoal"
                strokeWidth={1.5}
              />
            </div>
            <h4 className="text-lg md:text-xl font-serif text-charcoal">
              Third-Party Verified
            </h4>
          </div>
          <p className="text-sm text-charcoal-light leading-relaxed">
            Independent testing confirms identity, purity, and composition through{" "}
            <a
              href="https://freedomdiagnosticstesting.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Freedom Diagnostics
            </a>
            .
          </p>
        </div>
      </div>

      {/* Foundry Club - Own Section */}
      <div className="container mx-auto px-6 lg:px-8 max-w-5xl mt-16 md:mt-24">
        <div className="relative overflow-hidden rounded-2xl bg-charcoal p-10 md:p-14 text-center">
          {/* Subtle glow */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] opacity-25"
            style={{
              background:
                "radial-gradient(circle, hsl(24, 72%, 50%) 0%, transparent 60%)",
              filter: "blur(60px)",
            }}
          />

          <div className="relative z-10">
            <div className="inline-flex p-4 bg-primary/20 rounded-2xl mb-6">
              <Hexagon
                className="w-10 h-10 text-primary"
                strokeWidth={1.5}
              />
            </div>

            <h3 className="text-3xl md:text-4xl font-serif text-white mb-4">
              The Foundry Club
            </h3>
            <p className="text-white/70 max-w-lg mx-auto mb-8 leading-relaxed">
              Unlock wholesale pricing on all peptides with our exclusive membership.
              Priority support, early access to new products, and more.
            </p>

            <FoundryClubLink className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-white rounded-full font-medium transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30">
              <span>Join The Foundry Club</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </FoundryClubLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HumanoidSection;
