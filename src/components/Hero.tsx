import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowRight, Hexagon, Shield, FlaskConical, Truck } from "lucide-react";
import FoundryClubLink from "./FoundryClubLink";

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const trustIndicators = [
    { icon: FlaskConical, text: "USA Lab Tested" },
    { icon: Shield, text: "COA Included" },
    { icon: Truck, text: "Free 2-Day Shipping" },
  ];

  return (
    <section className="relative overflow-hidden min-h-[92vh] md:min-h-[85vh]" id="hero">
      {/* Video background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hero-bg.webm" type="video/webm" />
        </video>
        {/* Mobile: bottom-up gradient so video shows at top, text readable at bottom */}
        <div
          className="absolute inset-0 pointer-events-none md:hidden"
          style={{
            background: 'linear-gradient(to top, hsl(25, 15%, 12%) 0%, hsl(25, 15%, 12%, 0.7) 40%, transparent 70%)',
          }}
        />
        {/* Desktop: dark fade on the left for text readability */}
        <div
          className="absolute inset-0 pointer-events-none hidden md:block"
          style={{
            background: 'linear-gradient(to right, hsl(25, 15%, 12%) 0%, hsl(25, 15%, 12%, 0.7) 25%, transparent 55%)',
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 pt-auto mt-auto pb-10 md:py-24 lg:py-32 flex items-end md:items-start min-h-[92vh] md:min-h-0">
        <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
          <div>
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-2xl">
              {/* Main headline */}
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-serif text-cream opacity-0 animate-reveal-up"
                style={{ animationDelay: "0.2s" }}
              >
                Research-Grade<br />
                <span className="text-editorial-italic text-primary">Peptides</span>
              </h1>

              {/* Subheadline */}
              <p
                className="mt-4 text-base md:text-lg text-cream/80 max-w-md leading-relaxed opacity-0 animate-reveal-up"
                style={{ animationDelay: "0.3s" }}
              >
                Quality peptides for research. Third-party tested, comprehensive COAs.
              </p>

              {/* Trust indicators */}
              <div
                className="mt-5 flex flex-wrap justify-center lg:justify-start gap-3 opacity-0 animate-reveal-up"
                style={{ animationDelay: "0.4s" }}
              >
                {trustIndicators.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-sm text-cream/70"
                  >
                    <item.icon className="w-4 h-4 text-primary" strokeWidth={1.5} />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div
                className="mt-3 flex flex-col sm:flex-row gap-4 opacity-0 animate-reveal-up"
                style={{ animationDelay: "0.5s" }}
              >
                <FoundryClubLink
                  className="group inline-flex items-center justify-center gap-3 px-7 py-3.5 bg-charcoal text-cream rounded-full font-medium transition-all duration-500 hover:bg-charcoal-light hover:shadow-lg hover:shadow-charcoal/10"
                >
                  <Hexagon className="w-4 h-4 text-primary" strokeWidth={1.5} />
                  <span>Join The Foundry Club</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </FoundryClubLink>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
