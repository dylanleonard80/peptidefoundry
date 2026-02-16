import { useMemo } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Hexagon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { peptideSections, PeptideCard } from "@/data/peptides";
import { useMembership } from "@/hooks/useMembership";
import { useAllProductStock } from "@/hooks/useProductStock";
import peptideVial from "@/assets/peptide-vial-syringe.jpg";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const ShopAll = () => {
  useDocumentMeta("Shop All Peptides | Peptide Foundry");

  const { isMember, getMemberPrice } = useMembership();
  const { stockMap } = useAllProductStock();

  const allPeptides = useMemo(() => {
    const all = peptideSections.flatMap(section => section.cards);
    const unique = all.reduce((acc, peptide) => {
      if (!acc.find(p => p.slug === peptide.slug)) {
        acc.push(peptide);
      }
      return acc;
    }, [] as PeptideCard[]);
    return unique.sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-[58px] sm:pt-[74px] md:pt-[98px]">
        <div className="container px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl sm:text-4xl font-serif text-charcoal mb-8">Shop All</h1>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {allPeptides.map(card => {
              const isBlend = card.tags.includes("Blend");
              const outOfStock = stockMap[card.slug] === false;
              const isGlowOrKlow = card.slug === 'glow' || card.slug === 'klow';
              return (
                <Link key={card.slug} to={`/${card.slug}`} className="block w-full">
                  <div className="w-full h-[320px] relative rounded-lg">
                    <GlowingEffect
                      spread={40}
                      glow={true}
                      disabled={false}
                      proximity={64}
                      inactiveZone={0.01}
                      borderWidth={3}
                    />
                    <Card className="h-full overflow-hidden transition-all duration-500 group flex flex-col cursor-pointer relative border-0 bg-transparent rounded-[inherit]">
                      {/* Frosted Glass Background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl rounded-[inherit] border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.12)] group-hover:shadow-[0_16px_48px_rgba(255,107,0,0.15)] group-hover:border-primary/30 transition-all duration-500" />

                      {/* Subtle Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/10 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Glowing Orb Effect */}
                      <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl opacity-0 group-hover:opacity-60 transition-all duration-700 group-hover:scale-150" />
                      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl opacity-0 group-hover:opacity-50 transition-all duration-700 group-hover:scale-125" />

                      {/* Content Container */}
                      <div className="relative z-10 flex flex-col h-full">
                        {/* Image Section */}
                        <div className="relative min-h-40 h-52 overflow-hidden flex items-center justify-center rounded-t-lg">
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent" />
                          <img src={card.image || peptideVial} alt={`${card.name} vial`} className="w-44 h-44 object-contain transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_20px_rgba(255,107,0,0.4)] relative z-10" />

                          {outOfStock && (
                            <div className="absolute top-2 left-2 z-20">
                              <Badge className="text-[10px] shadow-sm backdrop-blur-md bg-gray-500/70 border-gray-400/40 text-white">
                                Out of Stock
                              </Badge>
                            </div>
                          )}
                          {isBlend && (
                            <div className="absolute top-2 right-2 flex gap-2">
                              <Badge className="text-xs shadow-lg backdrop-blur-md bg-white/20 border-white/30 text-foreground">
                                Blend
                              </Badge>
                            </div>
                          )}

                          {isGlowOrKlow && card.composition && (
                            <div className="absolute bottom-2 left-2 right-2 z-20">
                              <Badge className="text-[9px] shadow-lg backdrop-blur-md bg-white/15 border-white/25 text-foreground/90 font-medium w-full justify-center">
                                {card.composition}
                              </Badge>
                            </div>
                          )}
                        </div>

                        {/* Content Section */}
                        <CardContent className="p-3 flex flex-col flex-1 relative">
                          <div className="flex-1">
                            <h3 className="font-display font-bold text-base mb-1 line-clamp-2 whitespace-pre-line bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent group-hover:from-primary group-hover:to-primary/80 transition-all duration-300">
                              {card.name}
                            </h3>
                            {card.composition && !isGlowOrKlow && (
                              <p className="text-[10px] text-muted-foreground/80 mb-1 font-medium backdrop-blur-sm">
                                {card.composition}
                              </p>
                            )}
                            <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{card.benefit}</p>

                            {card.sizes && card.sizes.length > 0 && (
                              <div className="flex gap-1 overflow-x-auto sm:flex-wrap sm:overflow-visible scrollbar-hide">
                                {card.sizes.map((size, index) => {
                                  const price = card.prices?.[size] ?? (index === 0 ? card.startingPrice : undefined);
                                  const displayPrice = price && isMember ? getMemberPrice(price, card.slug, size) : price;
                                  return (
                                    <Badge key={index} variant="outline" className={`text-xs px-2 py-0.5 whitespace-nowrap flex-shrink-0 backdrop-blur-md transition-all duration-300 ${isMember && price ? 'bg-primary/20 border-primary/50 text-primary font-medium shadow-[0_0_12px_rgba(255,107,0,0.3)]' : price ? 'bg-white/10 border-primary/30 text-primary font-medium group-hover:bg-primary/10' : 'bg-white/5 border-white/20'}`}>
                                      {displayPrice ? (
                                        <span className="flex items-center gap-1">
                                          {isMember && <Hexagon className="h-2.5 w-2.5 text-primary" />}
                                          {size} - ${displayPrice}
                                        </span>
                                      ) : size}
                                    </Badge>
                                  );
                                })}
                              </div>
                            )}
                          </div>

                          <Button variant="ghost" size="sm" className="w-full mt-2 h-7 text-xs text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 pointer-events-none">
                            Learn more
                            <ChevronRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </CardContent>
                      </div>
                    </Card>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ShopAll;
