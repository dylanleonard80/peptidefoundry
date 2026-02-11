import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PeptidesCatalog from "@/components/PeptidesCatalog";
import Footer from "@/components/Footer";
import FoundryClubLink from "@/components/FoundryClubLink";
import { Truck, ShieldCheck, FlaskConical, Hexagon, ArrowRight, Plus } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { GradientButton } from "@/components/ui/gradient-button";

const Index = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-reveal-up");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observer.observe(el));
    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href")?.substring(1);
        if (!targetId) return;
        const targetElement = document.getElementById(targetId);
        if (!targetElement) return;
        const offset = window.innerWidth < 768 ? 100 : 80;
        window.scrollTo({
          top: targetElement.offsetTop - offset,
          behavior: "smooth",
        });
      });
    });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar className="my-0 py-0" />
      <main className="pt-[58px] sm:pt-[74px] md:pt-[98px]">
        <Hero />

          {/* Quality Assurance Section */}
          <div className="container px-4 sm:px-6 lg:px-8 py-4 md:py-6">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-16 items-center [&>*:nth-child(2)]:md:mt-0 [&>*:nth-child(2)]:-mt-20">

              {/* Left — Copy */}
              <div className="order-2 md:order-1">
                <h2 className="text-3xl md:text-4xl font-serif text-charcoal mb-4">
                  Research-Grade Quality,{" "}
                  <span className="text-primary">Every Batch</span>
                </h2>
                <p className="text-base text-muted-foreground leading-relaxed mb-4">
                  Every peptide we offer undergoes rigorous, multi-panel testing before it reaches your lab. We partner with accredited, independent laboratories so you never have to question what's in the vial.
                </p>
                <p className="text-base text-muted-foreground leading-relaxed mb-6">
                  Full Certificates of Analysis are published for every product and every lot. We test for what matters: peptide purity via HPLC, endotoxin levels via LAL assay, and heavy metal contamination via ICP-MS. No shortcuts, no exceptions.
                </p>
                <div className="flex flex-col sm:inline-flex sm:flex-row items-center sm:items-center gap-1 sm:gap-2.5 rounded-xl sm:rounded-full border border-primary/30 bg-primary/10 px-4 py-2.5 sm:py-2">
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-sm font-semibold text-foreground">Free 2-Day Shipping</span>
                  </div>
                  <span className="text-xs text-muted-foreground sm:pl-0">Same-day dispatch before 3 PM ET</span>
                </div>
              </div>

              {/* Right — Vial diagram */}
              <div className="relative flex items-center justify-center overflow-visible order-1 md:order-2">
                {/* Vial image */}
                <div className="relative">
                  <div className="w-80 h-[28rem] md:w-96 md:h-[32rem] relative">
                    <img
                      src="/bpc-157-mockup.webp"
                      alt="Peptide vial"
                      className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(255,107,0,0.15)]"
                    />
                  </div>

                  {/* Annotation: Purity Tested — top right */}
                  <Popover>
                    <div className="absolute top-36 -right-2 md:-right-10 flex items-center gap-0">
                      <div className="h-px w-6 md:w-16 bg-primary/40" />
                      <PopoverTrigger asChild>
                        <GradientButton className="min-w-0 rounded-full px-2 py-1 md:px-3 md:py-1.5 gap-1 md:gap-2 text-[10px] md:text-xs font-semibold shadow-sm">
                          <Plus className="h-3 w-3 md:h-3.5 md:w-3.5" />
                          <span className="whitespace-nowrap">Purity Tested</span>
                        </GradientButton>
                      </PopoverTrigger>
                    </div>
                    <PopoverContent side="bottom" className="w-72">
                      <h4 className="font-semibold text-sm mb-1">HPLC Purity Testing</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">Every batch is tested via High-Performance Liquid Chromatography (HPLC) to verify peptide identity and purity. We require &ge;98% purity before any product is released.</p>
                    </PopoverContent>
                  </Popover>

                  {/* Annotation: Heavy Metal Tested — middle left */}
                  <Popover>
                    <div className="absolute top-[38%] md:top-1/2 -translate-y-1/2 -left-7 md:-left-28 flex flex-row-reverse items-center gap-0">
                      <div className="h-px w-3 md:w-16 bg-primary/40" />
                      <PopoverTrigger asChild>
                        <GradientButton className="min-w-0 rounded-full px-2 py-1 md:px-3 md:py-1.5 gap-1 md:gap-2 text-[10px] md:text-xs font-semibold shadow-sm">
                          <Plus className="h-3 w-3 md:h-3.5 md:w-3.5" />
                          <span className="whitespace-nowrap">Heavy Metal Tested</span>
                        </GradientButton>
                      </PopoverTrigger>
                    </div>
                    <PopoverContent side="bottom" className="w-72">
                      <h4 className="font-semibold text-sm mb-1">ICP-MS Heavy Metal Testing</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">Each lot is screened for heavy metal contamination using Inductively Coupled Plasma Mass Spectrometry (ICP-MS), testing for lead, mercury, arsenic, and cadmium to ensure levels are well below USP limits.</p>
                    </PopoverContent>
                  </Popover>

                  {/* Annotation: Endotoxin Tested — bottom right */}
                  <Popover>
                    <div className="absolute bottom-28 -right-6 md:-right-20 flex items-center gap-0">
                      <div className="h-px w-6 md:w-16 bg-primary/40" />
                      <PopoverTrigger asChild>
                        <GradientButton className="min-w-0 rounded-full px-2 py-1 md:px-3 md:py-1.5 gap-1 md:gap-2 text-[10px] md:text-xs font-semibold shadow-sm">
                          <Plus className="h-3 w-3 md:h-3.5 md:w-3.5" />
                          <span className="whitespace-nowrap">Endotoxin Tested</span>
                        </GradientButton>
                      </PopoverTrigger>
                    </div>
                    <PopoverContent side="bottom" className="w-72">
                      <h4 className="font-semibold text-sm mb-1">LAL Endotoxin Testing</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">Bacterial endotoxin levels are measured using the Limulus Amebocyte Lysate (LAL) assay. Every batch must pass below the threshold to ensure the product is safe for research use.</p>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

            </div>
          </div>

          {/* Divider */}
          <div className="divider-organic max-w-4xl mx-auto" />

          <PeptidesCatalog showHeader={false} />

          {/* Foundry Club CTA */}
          <div className="container mx-auto px-6 lg:px-8 max-w-5xl py-16 md:py-24">
            <div className="relative overflow-hidden rounded-2xl bg-charcoal p-10 md:p-14 text-center">
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] opacity-25"
                style={{
                  background: "radial-gradient(circle, hsl(24, 72%, 50%) 0%, transparent 60%)",
                  filter: "blur(60px)",
                }}
              />
              <div className="relative z-10">
                <div className="inline-flex p-4 bg-primary/20 rounded-2xl mb-6">
                  <Hexagon className="w-10 h-10 text-primary" strokeWidth={1.5} />
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

      </main>
      <Footer />
    </div>
  );
};

export default Index;
