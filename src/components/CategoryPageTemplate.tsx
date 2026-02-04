import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight, Hexagon } from "lucide-react";
import peptideVial from "@/assets/peptide-vial-syringe.jpg";
import type { PeptideCard } from "@/data/peptides";
import { useMembership } from "@/hooks/useMembership";

interface CategoryPageTemplateProps {
  title: string;
  subtitle: string;
  getPeptides: () => PeptideCard[];
}

// Glass Morphism Card Component (matching AllPeptides)
const GlassPeptideCard = ({
  card,
  isMember,
  getMemberPrice
}: {
  card: PeptideCard;
  isMember: boolean;
  getMemberPrice: (price: number, slug?: string, size?: string) => number;
}) => {
  const isBlend = card.tags.includes("Blend");
  const isGlowOrKlow = card.slug === 'glow' || card.slug === 'klow';
  
  return (
    <Link to={`/${card.slug}`} className="block">
      <Card className="h-[320px] overflow-hidden transition-all duration-500 group flex flex-col cursor-pointer relative border-0 bg-transparent">
        {/* Frosted Glass Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl rounded-lg border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.12)] group-hover:shadow-[0_16px_48px_rgba(255,107,0,0.15)] group-hover:border-primary/30 transition-all duration-500" />
        
        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Glowing Orb Effect */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl opacity-0 group-hover:opacity-60 transition-all duration-700 group-hover:scale-150" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl opacity-0 group-hover:opacity-50 transition-all duration-700 group-hover:scale-125" />

        {/* Content Container */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Image Section with Glass Effect */}
          <div className="relative min-h-40 h-52 overflow-hidden flex items-center justify-center rounded-t-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent" />
            <img 
              src={card.image || peptideVial} 
              alt={`${card.name} vial`} 
              className="w-44 h-44 object-contain transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_20px_rgba(255,107,0,0.4)] relative z-10" 
            />
            
            {/* Floating Badges */}
            {isBlend && (
              <div className="absolute top-2 right-2 flex gap-2">
                <Badge className="text-xs shadow-lg backdrop-blur-md bg-white/20 border-white/30 text-foreground">
                  Blend
                </Badge>
              </div>
            )}
            
            {/* Composition Badge for GLOW/KLOW */}
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
              
              {/* Size Badges with Glass Effect */}
              {card.sizes && card.sizes.length > 0 && (
                <div className="flex gap-1 overflow-x-auto sm:flex-wrap sm:overflow-visible scrollbar-hide">
                  {card.sizes.map((size, index) => {
                    const price = card.prices?.[size] ?? (index === 0 ? card.startingPrice : undefined);
                    const displayPrice = price && isMember ? getMemberPrice(price, card.slug, size) : price;
                    return (
                      <Badge 
                        key={index} 
                        variant="outline" 
                        className={`text-xs px-2 py-0.5 whitespace-nowrap flex-shrink-0 backdrop-blur-md transition-all duration-300 ${
                          isMember && price 
                            ? 'bg-primary/20 border-primary/50 text-primary font-medium shadow-[0_0_12px_rgba(255,107,0,0.3)]' 
                            : price 
                              ? 'bg-white/10 border-primary/30 text-primary font-medium group-hover:bg-primary/10' 
                              : 'bg-white/5 border-white/20'
                        }`}
                      >
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
            
            {/* Learn More Button */}
            <Button variant="ghost" size="sm" className="w-full mt-2 h-7 text-xs text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 pointer-events-none">
              Learn more
              <ChevronRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
            </Button>
          </CardContent>
        </div>
      </Card>
    </Link>
  );
};

const CategoryPageTemplate = ({ title, subtitle, getPeptides }: CategoryPageTemplateProps) => {
  const peptides = getPeptides();
  const { isMember, getMemberPrice } = useMembership();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-32 sm:pt-36 pb-16">
        {/* Hero Section - matching AllPeptides title style */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-display font-bold tracking-tight mb-4">
            {title}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Peptides Grid - using glass cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {peptides.map((peptide, index) => (
            <GlassPeptideCard 
              key={index} 
              card={peptide} 
              isMember={isMember} 
              getMemberPrice={getMemberPrice} 
            />
          ))}
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default CategoryPageTemplate;
