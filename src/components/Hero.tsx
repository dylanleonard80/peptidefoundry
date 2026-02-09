import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Hexagon, ArrowRight } from "lucide-react";
import { StarButton } from "@/components/ui/star-button";
import FoundryClubTransition from "./FoundryClubTransition";

const Hero = () => {
  const [showTransition, setShowTransition] = useState(false);
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    setShowTransition(true);
  }, []);

  const handleTransitionComplete = useCallback(() => {
    navigate('/foundry-club');
    setShowTransition(false);
  }, [navigate]);

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
        {/* Mobile: bottom-up gradient */}
        <div
          className="absolute inset-0 pointer-events-none md:hidden"
          style={{
            background: 'linear-gradient(to top, hsl(25, 15%, 12%) 0%, hsl(25, 15%, 12%, 0.85) 15%, hsl(25, 15%, 12%, 0.5) 30%, transparent 45%)',
          }}
        />
        {/* Desktop: left-side gradient */}
        <div
          className="absolute inset-0 pointer-events-none hidden md:block"
          style={{
            background: 'linear-gradient(to right, hsl(25, 15%, 12%) 0%, hsl(25, 15%, 12%, 0.7) 25%, transparent 55%)',
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex items-end min-h-[92vh] md:min-h-[85vh] pb-6 md:pb-16">
        <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
          <div>
            <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-2xl mx-auto md:mx-0">
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
                className="mt-2 md:mt-4 text-sm md:text-lg text-cream/80 max-w-md leading-relaxed opacity-0 animate-reveal-up"
                style={{ animationDelay: "0.3s" }}
              >
                Quality peptides for research. Third-party tested, comprehensive COAs.
              </p>

              {/* CTA */}
              <div
                className="mt-3 md:mt-6 flex flex-col sm:flex-row gap-4 opacity-0 animate-reveal-up"
                style={{ animationDelay: "0.4s" }}
              >
                <StarButton
                  onClick={handleClick}
                  lightColor="#D4A84B"
                  backgroundColor="#2D2926"
                  className="h-auto px-7 py-3.5 gap-3 text-sm font-medium text-cream"
                >
                  <Hexagon className="w-4 h-4 text-primary" strokeWidth={1.5} />
                  <span className="text-cream">Join The Foundry Club</span>
                  <ArrowRight className="w-4 h-4 text-cream transition-transform duration-300 group-hover/star-button:translate-x-1" />
                </StarButton>
                <FoundryClubTransition
                  isActive={showTransition}
                  onComplete={handleTransitionComplete}
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
