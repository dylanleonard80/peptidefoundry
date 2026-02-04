import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Users, Award, Hexagon, DollarSign, ShieldCheck } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
const values = [{
  icon: Check,
  title: "Scientific Excellence",
  description: "Every peptide undergoes rigorous third-party testing and quality verification"
}, {
  icon: Users,
  title: "Family Commitment",
  description: "Family business dedicated to supporting the research community"
}, {
  icon: Award,
  title: "Quality Assurance",
  description: "We work directly with a US-Based manufacturer that follows strict cGMP guidelines"
}];
const About = () => {
  return <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        <section className="py-16 bg-gradient-to-b from-background to-secondary/20">
          <div className="container px-4 sm:px-6 lg:px-8 my-[37px]">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-4xl sm:text-5xl font-display font-bold tracking-tight mb-6">About Peptide Foundry</h1>
                <div className="prose prose-lg mx-auto text-muted-foreground">
                  <p className="text-lg leading-relaxed mb-6">Peptide Foundry is a family-owned and operated company dedicated to providing high-purity research peptides to laboratories, academic institutions, and independent researchers. Founded on principles of scientific integrity and quality, we take pride in supporting the research community.</p>
                  
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                {values.map(value => <Card key={value.title} className="text-center">
                    <CardHeader>
                      <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <value.icon className="w-8 h-8 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{value.description}</p>
                    </CardContent>
                  </Card>)}
              </div>

              {/* Third-Party Testing Section */}
              <div className="bg-card rounded-2xl p-8 border shadow-sm mb-8 text-center">
                <h2 className="text-2xl font-display font-bold mb-4">
                  Independent Third-Party Testing
                </h2>
                <p className="text-muted-foreground mb-4">Every peptide we supply is verified through independent laboratory testing. Search our product COAs (Certificates of Analysis) to verify purity and authenticity. Search codes are found on COAs on product pages.</p>
                <a href="https://freedomdiagnosticstesting.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary hover:underline font-medium">
                  View Testing Results at Freedom Diagnostics →
                </a>
              </div>

              <div className="bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 rounded-2xl p-8 border border-primary/30 shadow-lg transition-all duration-300 hover:shadow-[0_0_50px_rgba(220,119,54,0.6)] hover:border-primary/60">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <Hexagon className="w-8 h-8 text-primary fill-primary/20" />
                  <h2 className="text-3xl font-display font-bold text-white">
                    The Foundry Club Promise
                  </h2>
                  <Hexagon className="w-8 h-8 text-primary fill-primary/20" />
                </div>
                
                <div className="space-y-4 text-zinc-300 mb-8">
                  <p className="text-base leading-relaxed">
                    Peptide Foundry was founded by a former NFL player whose post-career interest in regenerative science led him to explore the research potential of peptides. That curiosity sparked a mission: to make high-quality, U.S.-manufactured research peptides accessible to laboratories and researchers everywhere.
                  </p>
                  <p className="text-base leading-relaxed">Think of The Foundry Club like your favorite wine club, a community of curious minds who share a passion for discovery. Members connect to discuss their research, exchange insights, and stay at the forefront of peptide science. We're not just a supplier; we're building a network of researchers united by a commitment to quality and innovation.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 border-t border-primary/20 pt-6">
                  <div className="text-center p-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
                      <DollarSign className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2 text-white">Accessible Pricing</h3>
                    <p className="text-sm text-zinc-400">Top-tier research materials without top-tier prices</p>
                  </div>
                  <div className="text-center p-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
                      <ShieldCheck className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2 text-white">American Quality</h3>
                    <p className="text-sm text-zinc-400">Manufactured in the USA under strict cGMP guidelines</p>
                  </div>
                  <div className="text-center p-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2 text-white">Research Community</h3>
                    <p className="text-sm text-zinc-400">Connect with fellow researchers and share insights</p>
                  </div>
                </div>
              </div>

              {/* RUO Disclaimer */}
              
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>;
};
export default About;