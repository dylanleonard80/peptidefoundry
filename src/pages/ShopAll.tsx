import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Hexagon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { peptideSections, PeptideCard } from "@/data/peptides";
import { useMembership } from "@/hooks/useMembership";
import { useAllProductStock } from "@/hooks/useProductStock";
import peptideVial from "@/assets/peptide-vial-syringe.jpg";

const ShopAll = () => {
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
              return (
                <Link key={card.slug} to={`/${card.slug}`} className="block">
                  <Card className="h-full overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-t-2 border-t-primary/20 hover:border-t-primary group flex flex-col cursor-pointer">
                    <div className="relative min-h-24 h-32 bg-gradient-to-br from-primary/10 to-primary/5 overflow-hidden flex items-end justify-center">
                      <img
                        src={card.image || peptideVial}
                        alt={`${card.name} vial`}
                        className="w-20 h-20 object-contain transition-transform duration-300 group-hover:scale-110 mb-2"
                      />
                      {isBlend && (
                        <Badge variant="secondary" className="absolute top-2 right-2 text-xs shadow-md backdrop-blur-sm">
                          Blend
                        </Badge>
                      )}
                      {outOfStock && (
                        <Badge variant="destructive" className="absolute top-2 left-2 text-xs">
                          Out of Stock
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-3 sm:p-4 flex flex-col flex-1">
                      <div className="flex-1 mb-2">
                        <h3 className="font-display font-semibold text-sm sm:text-base mb-1 line-clamp-2">{card.name}</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mb-2">{card.benefit}</p>
                        {card.sizes && card.sizes.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {card.sizes.map((size, index) => {
                              const price = card.prices?.[size] ?? (index === 0 ? card.startingPrice : undefined);
                              const displayPrice = price && isMember ? getMemberPrice(price, card.slug, size) : price;
                              return (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className={`text-[10px] sm:text-xs px-1.5 py-0.5 whitespace-nowrap ${
                                    isMember && price
                                      ? 'bg-charcoal border-primary/50 text-primary font-medium shadow-[0_0_8px_rgba(255,107,0,0.3)]'
                                      : price
                                      ? 'bg-primary/10 border-primary/30 text-primary font-medium'
                                      : 'bg-primary/5 border-primary/20'
                                  }`}
                                >
                                  {displayPrice ? (
                                    <span className="flex items-center gap-0.5">
                                      {isMember && <Hexagon className="h-2 w-2 text-primary" />}
                                      {size} - ${displayPrice}
                                    </span>
                                  ) : size}
                                </Badge>
                              );
                            })}
                          </div>
                        )}
                      </div>
                      <Button variant="outline" size="sm" className="w-full group hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/5 hover:border-primary/50 transition-all duration-300 pointer-events-none text-xs sm:text-sm">
                        Learn more
                        <ChevronRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
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
