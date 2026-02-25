import { useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { GlassPeptideCard } from "@/components/GlassPeptideCard";
import type { PeptideCard } from "@/data/peptides";
import { useMembership } from "@/hooks/useMembership";
import { usePrices } from "@/hooks/usePrices";

interface CategoryPageTemplateProps {
  title: string;
  subtitle: string;
  getPeptides: () => PeptideCard[];
}

const CategoryPageTemplate = ({ title, subtitle, getPeptides }: CategoryPageTemplateProps) => {
  const peptides = getPeptides();
  const { isMember, getMemberPrice } = useMembership();
  const { getPrices: getDbPrices, getStartingPrice: getDbStartingPrice } = usePrices();

  const enhanceCard = useCallback((card: PeptideCard): PeptideCard => {
    const dbPrices = getDbPrices(card.slug);
    if (!dbPrices) return card;
    return {
      ...card,
      prices: Object.keys(dbPrices).length > 1 ? dbPrices : card.prices,
      startingPrice: getDbStartingPrice(card.slug),
    };
  }, [getDbPrices, getDbStartingPrice]);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
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
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 mb-16 overflow-hidden">
          {peptides.map((peptide, index) => (
            <GlassPeptideCard
              key={index}
              card={enhanceCard(peptide)}
              isMember={isMember}
              getMemberPrice={getMemberPrice}
              fullWidth
            />
          ))}
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default CategoryPageTemplate;
