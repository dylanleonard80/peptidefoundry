import { useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { GlassPeptideCard } from "@/components/GlassPeptideCard";
import { peptideSections, PeptideCard } from "@/data/peptides";
import { useMembership } from "@/hooks/useMembership";
import { useAllProductStock } from "@/hooks/useProductStock";
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
            {allPeptides.map(card => (
              <GlassPeptideCard
                key={card.slug}
                card={card}
                isMember={isMember}
                getMemberPrice={getMemberPrice}
                fullWidth
                showGlowEffect
                outOfStock={stockMap[card.slug] === false}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ShopAll;
