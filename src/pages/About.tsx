import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Users, Award, Hexagon, DollarSign, ShieldCheck, FlaskConical, ArrowRight, Microscope, FileCheck } from "lucide-react";
import FoundryClubLink from "@/components/FoundryClubLink";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20">

        {/* Hero / Founder Story */}
        <section className="py-16 bg-gradient-to-b from-background to-secondary/20">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <p className="text-sm font-medium text-primary uppercase tracking-widest mb-3">Our Story</p>
                <h1 className="text-4xl sm:text-5xl font-display font-bold tracking-tight mb-6">
                  Built by Curiosity,{" "}
                  <span className="text-primary">Driven by Quality</span>
                </h1>
                <div className="prose prose-lg mx-auto text-muted-foreground max-w-3xl">
                  <p className="text-lg leading-relaxed mb-4">
                    Peptide Foundry was started by a former NFL player whose post-career interest in regenerative science led him to explore the research potential of peptides. What began as personal curiosity quickly became a mission: to make high-quality research peptides accessible to laboratories and independent researchers everywhere.
                  </p>
                  <p className="text-lg leading-relaxed">
                    As a family-owned and operated company, we hold ourselves to a higher standard. Every product we carry is selected for its research value, rigorously tested by independent laboratories, and backed by full documentation. We believe researchers deserve materials they can trust — without the markup.
                  </p>
                </div>
              </div>

              {/* Mission Statement */}
              <div className="relative rounded-2xl border border-primary/20 bg-primary/5 p-8 md:p-10 text-center mb-16">
                <p className="text-xl md:text-2xl font-serif text-charcoal leading-relaxed">
                  "Our mission is simple: provide research-grade peptides with full transparency, rigorous third-party testing, and pricing that doesn't gatekeep scientific discovery."
                </p>
              </div>

              {/* Core Values */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                <Card className="text-center">
                  <CardHeader>
                    <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <FlaskConical className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">Scientific Rigor</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Every peptide undergoes multi-panel third-party testing. We publish Certificates of Analysis for every product and every lot — no exceptions.</p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardHeader>
                    <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">Family Operated</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">We're not a faceless distributor. Peptide Foundry is family-owned, and every order is handled with the care and accountability that comes with it.</p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardHeader>
                    <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <DollarSign className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">Accessible Pricing</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Quality research materials shouldn't break the budget. We keep our margins fair so more labs and researchers can access what they need.</p>
                  </CardContent>
                </Card>
              </div>

              {/* Third-Party Testing — Detailed */}
              <div className="mb-16">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-display font-bold mb-3">Third-Party Testing</h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">Every batch is independently tested before it's made available. Here's exactly what we screen for.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="rounded-xl border bg-card p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Check className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-display font-bold text-lg">Purity (HPLC)</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      High-performance liquid chromatography confirms peptide identity and purity levels. Each COA reports exact purity percentages so you know precisely what you're working with.
                    </p>
                  </div>
                  <div className="rounded-xl border bg-card p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <ShieldCheck className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-display font-bold text-lg">Endotoxins (LAL)</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Limulus Amebocyte Lysate testing screens for bacterial endotoxins that could compromise research results. We test every lot to ensure levels fall well within acceptable limits.
                    </p>
                  </div>
                  <div className="rounded-xl border bg-card p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Microscope className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-display font-bold text-lg">Heavy Metals (ICP-MS)</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Inductively coupled plasma mass spectrometry detects trace heavy metal contamination. This ensures your research materials are free from lead, mercury, arsenic, and cadmium.
                    </p>
                  </div>
                </div>
                <div className="text-center mt-6">
                  <a
                    href="https://freedomdiagnosticstesting.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
                  >
                    <FileCheck className="w-4 h-4" />
                    Verify COAs at Freedom Diagnostics →
                  </a>
                </div>
              </div>

              {/* Foundry Club CTA */}
              <div className="bg-charcoal rounded-2xl p-8 md:p-12 border border-primary/30 shadow-lg mb-16">
                <div className="text-center">
                  <div className="inline-flex p-4 bg-primary/20 rounded-2xl mb-6">
                    <Hexagon className="w-10 h-10 text-primary" strokeWidth={1.5} />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                    The Foundry Club
                  </h2>
                  <p className="text-zinc-300 max-w-2xl mx-auto mb-4 leading-relaxed">
                    Think of it like a membership for serious researchers. Foundry Club members unlock wholesale pricing on every peptide in our catalog, get priority order handling, and receive early access to new products as they're released.
                  </p>
                  <p className="text-zinc-400 max-w-2xl mx-auto mb-8 leading-relaxed">
                    More than a discount — it's a community of curious minds who share a passion for discovery. Members connect to discuss their research, exchange insights, and stay at the forefront of peptide science.
                  </p>
                  <FoundryClubLink className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-white rounded-full font-medium transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30">
                    <span>Join The Foundry Club</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </FoundryClubLink>
                </div>
              </div>

              {/* RUO Disclaimer */}
              <div className="rounded-xl border border-muted bg-muted/30 p-6 text-center">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <span className="font-semibold">For Research Use Only.</span> All products sold by Peptide Foundry are intended strictly for laboratory research and educational purposes. They are not intended for human or animal consumption, therapeutic use, or any diagnostic procedures. By purchasing from Peptide Foundry, you acknowledge that these products will be used solely in a research setting by qualified professionals.
                </p>
              </div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
