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
    <section className="relative" id="hero">
      {/* Warm gradient background */}
      <div className="absolute inset-0 bg-hero-warm" />

      {/* Orange gradient accent - top right */}
      <div
        className="absolute -top-[20%] -right-[15%] w-[700px] h-[700px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, hsl(24, 85%, 55%) 0%, hsl(24, 75%, 50%) 40%, transparent 70%)',
          filter: 'blur(60px)',
          opacity: 0.35,
        }}
      />

      {/* Secondary orange glow - center right behind product */}
      <div
        className="absolute top-[20%] right-[5%] w-[500px] h-[500px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, hsl(20, 80%, 50%) 0%, transparent 60%)',
          filter: 'blur(50px)',
          opacity: 0.25,
        }}
      />

      {/* Main content */}
      <div className="relative z-10 py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left side - Text content */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              {/* Eyebrow */}
              <div
                className="opacity-0 animate-reveal-up mb-4"
                style={{ animationDelay: "0.1s" }}
              >
                <span className="trust-badge">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  For Research Use Only
                </span>
              </div>

              {/* Main headline */}
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-serif text-charcoal opacity-0 animate-reveal-up"
                style={{ animationDelay: "0.2s" }}
              >
                Research-Grade{" "}
                <span className="text-editorial-italic text-primary">Peptides</span>
              </h1>

              {/* Subheadline */}
              <p
                className="mt-4 text-base md:text-lg text-charcoal-light max-w-md leading-relaxed opacity-0 animate-reveal-up"
                style={{ animationDelay: "0.3s" }}
              >
                Premium quality peptides for in-vitro research.
                U.S. manufactured, third-party tested, shipped with COA.
              </p>

              {/* Trust indicators */}
              <div
                className="mt-5 flex flex-wrap justify-center lg:justify-start gap-3 opacity-0 animate-reveal-up"
                style={{ animationDelay: "0.4s" }}
              >
                {trustIndicators.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-sm text-charcoal-light"
                  >
                    <item.icon className="w-4 h-4 text-primary" strokeWidth={1.5} />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div
                className="mt-6 flex flex-col sm:flex-row gap-4 opacity-0 animate-reveal-up"
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

            {/* Right side - Product image */}
            <div
              className="relative flex justify-center items-center opacity-0 animate-reveal-up"
              style={{ animationDelay: "0.4s" }}
            >
              {/* Soft glow behind product */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="w-64 h-64 rounded-full opacity-15"
                  style={{
                    background: 'radial-gradient(circle, hsl(25, 60%, 85%) 0%, transparent 70%)',
                  }}
                />
              </div>

              {/* Product image */}
              <img
                src="/lovable-uploads/500d5bab-c326-410a-a7f1-301e4d576dc4.webp"
                alt="Research-grade peptide vial"
                className="relative z-10 w-full max-w-[280px] lg:max-w-[340px] h-auto object-contain drop-shadow-lg"
                width={340}
                height={340}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
