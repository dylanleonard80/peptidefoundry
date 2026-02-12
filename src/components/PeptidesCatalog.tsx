import React, { useState, useMemo, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, Dumbbell, Flame, Sparkles, Brain, Activity, Droplets, Hexagon, LucideIcon, LayoutGrid, SortAsc, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import peptideVial from "@/assets/peptide-vial-syringe.jpg";
import healingRecoveryBg from "/category-repair-regeneration.webp";
import musclePerformanceBg from "/category-muscle-performance.webp";
import fatLossMetabolicBg from "/category-fat-loss-metabolic.webp";
import cellularHealthBg from "/category-cellular-health.webp";
import hormonalSexualBg from "/category-hormonal-sexual.jpg";
import cognitionMoodBg from "/category-cognition-mood.webp";
import { useMembership } from "@/hooks/useMembership";
import { useAllProductStock } from "@/hooks/useProductStock";
import { peptideSections, PeptideCard } from "@/data/peptides";

// Category data for the selector
const categoryItems = [{
  id: "repair",
  label: "Tissue Repair\nResearch",
  image: healingRecoveryBg,
  sectionTitle: "Tissue Repair Research"
}, {
  id: "muscle",
  label: "Muscle &\nPerformance Research",
  image: musclePerformanceBg,
  sectionTitle: "Muscle & Performance Research"
}, {
  id: "fat-loss",
  label: "Metabolic\nResearch",
  image: fatLossMetabolicBg,
  sectionTitle: "Metabolic Research"
}, {
  id: "cellular-health",
  label: "Cellular Health\nResearch",
  image: cellularHealthBg,
  sectionTitle: "Cellular Health Research"
}, {
  id: "cognition-mood",
  label: "Cognition &\nMood Research",
  image: cognitionMoodBg,
  sectionTitle: "Cognition & Mood Research"
}];

// Icon mapping for categories
const getCategoryIcon = (title: string): LucideIcon => {
  const iconMap: Record<string, LucideIcon> = {
    "Tissue Repair Research": Activity,
    "Muscle & Performance Research": Dumbbell,
    "Metabolic Research": Flame,
    "Cellular Health Research": Brain,
    "Cognition & Mood Research": Sparkles,
    "Research Supplies": Droplets,
    "Best Sellers": Activity
  };
  return iconMap[title] || Activity;
};

// Background image mapping for categories
const getCategoryBackground = (title: string): string | null => {
  const bgMap: Record<string, string> = {
    "Tissue Repair Research": healingRecoveryBg,
    "Muscle & Performance Research": musclePerformanceBg,
    "Metabolic Research": fatLossMetabolicBg,
    "Cellular Health Research": cellularHealthBg,
    "Cognition & Mood Research": hormonalSexualBg
  };
  return bgMap[title] || null;
};

// Glass Morphism Card Component
const GlassCardComponent = ({
  card,
  isMember,
  getMemberPrice,
  fullWidth = false,
  outOfStock = false
}: {
  card: PeptideCard;
  isMember: boolean;
  getMemberPrice: (price: number, slug?: string, size?: string) => number;
  fullWidth?: boolean;
  outOfStock?: boolean;
}) => {
  const isBlend = card.tags.includes("Blend");
  const isGlowOrKlow = card.slug === 'glow' || card.slug === 'klow';
  return <Link to={`/${card.slug}`} className={fullWidth ? "block w-full" : "block"}>
      <div className={`${fullWidth ? 'w-full' : 'w-[200px] sm:w-[240px] flex-shrink-0'} h-[320px] relative rounded-lg`}>
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={true}
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
            {/* Image Section with Glass Effect */}
            <div className="relative min-h-40 h-52 overflow-hidden flex items-center justify-center rounded-t-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent" />
              <img src={card.image || peptideVial} alt={`${card.name} vial`} className="w-44 h-44 object-contain transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_20px_rgba(255,107,0,0.4)] relative z-10" />

              {/* Floating Badges */}
              {outOfStock && <div className="absolute top-2 left-2 z-20">
                  <Badge className="text-[10px] shadow-sm backdrop-blur-md bg-gray-500/70 border-gray-400/40 text-white">
                    Out of Stock
                  </Badge>
                </div>}
              {isBlend && <div className="absolute top-2 right-2 flex gap-2">
                  <Badge className="text-xs shadow-lg backdrop-blur-md bg-white/20 border-white/30 text-foreground">
                    Blend
                  </Badge>
                </div>}

              {/* Composition Badge for GLOW/KLOW */}
              {isGlowOrKlow && card.composition && <div className="absolute bottom-2 left-2 right-2 z-20">
                  <Badge className="text-[9px] shadow-lg backdrop-blur-md bg-white/15 border-white/25 text-foreground/90 font-medium w-full justify-center">
                    {card.composition}
                  </Badge>
                </div>}
            </div>

            {/* Content Section */}
            <CardContent className="p-3 flex flex-col flex-1 relative">
              <div className="flex-1">
                <h3 className="font-display font-bold text-base mb-1 line-clamp-2 whitespace-pre-line bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent group-hover:from-primary group-hover:to-primary/80 transition-all duration-300">
                  {card.name}
                </h3>
                {card.composition && !isGlowOrKlow && <p className="text-[10px] text-muted-foreground/80 mb-1 font-medium backdrop-blur-sm">
                    {card.composition}
                  </p>}
                <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{card.benefit}</p>

                {/* Size Badges with Glass Effect */}
                {card.sizes && card.sizes.length > 0 && <div className="flex gap-1 overflow-x-auto sm:flex-wrap sm:overflow-visible scrollbar-hide">
                    {card.sizes.map((size, index) => {
                  const price = card.prices?.[size] ?? (index === 0 ? card.startingPrice : undefined);
                  const displayPrice = price && isMember ? getMemberPrice(price, card.slug, size) : price;
                  return <Badge key={index} variant="outline" className={`text-xs px-2 py-0.5 whitespace-nowrap flex-shrink-0 backdrop-blur-md transition-all duration-300 ${isMember && price ? 'bg-primary/20 border-primary/50 text-primary font-medium shadow-[0_0_12px_rgba(255,107,0,0.3)]' : price ? 'bg-white/10 border-primary/30 text-primary font-medium group-hover:bg-primary/10' : 'bg-white/5 border-white/20'}`}>
                          {displayPrice ? <span className="flex items-center gap-1">
                              {isMember && <Hexagon className="h-2.5 w-2.5 text-primary" />}
                              {size} - ${displayPrice}
                            </span> : size}
                        </Badge>;
                })}
                  </div>}
              </div>

              {/* Learn More Button */}
              <Button variant="ghost" size="sm" className="w-full mt-2 h-7 text-xs text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 pointer-events-none">
                Learn more
                <ChevronRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </div>
        </Card>
      </div>
    </Link>;
};

// Default Card Component
const PeptideCardComponent = ({
  card,
  isMember,
  getMemberPrice,
  outOfStock = false
}: {
  card: PeptideCard;
  isMember: boolean;
  getMemberPrice: (price: number, slug?: string, size?: string) => number;
  outOfStock?: boolean;
}) => {
  if (card.cardStyle === 'glass') {
    return <GlassCardComponent card={card} isMember={isMember} getMemberPrice={getMemberPrice} outOfStock={outOfStock} />;
  }
  const isBlend = card.tags.includes("Blend");
  return <Link to={`/${card.slug}`} className="block">
      <Card className="w-[200px] sm:w-[240px] h-[320px] flex-shrink-0 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-t-2 border-t-primary/20 hover:border-t-primary group flex flex-col cursor-pointer">
        <div className="relative min-h-24 h-32 bg-gradient-to-br from-primary/10 to-primary/5 overflow-hidden flex items-end justify-center">
          <img src={card.image || peptideVial} alt={`${card.name} vial`} className="w-20 h-20 object-contain transition-transform duration-300 group-hover:scale-110 mb-2" />
          {isBlend && <div className="absolute top-2 right-2 flex gap-2">
              <Badge variant="secondary" className="text-xs shadow-md backdrop-blur-sm">
                Blend
              </Badge>
            </div>}
        </div>
        <CardContent className="p-4 flex flex-col flex-1">
          <div className="flex-1 mb-3">
            <h3 className="font-display font-semibold text-lg mb-2 line-clamp-2 whitespace-pre-line">{card.name}</h3>
            {card.composition && <p className="text-xs text-muted-foreground mb-2 font-medium">{card.composition}</p>}
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{card.benefit}</p>
            {card.sizes && card.sizes.length > 0 && <div className="flex gap-1 mt-2 overflow-x-auto sm:flex-wrap sm:overflow-visible scrollbar-hide pb-1 -mb-1">
                {card.sizes.map((size, index) => {
              const price = card.prices?.[size] ?? (index === 0 ? card.startingPrice : undefined);
              const displayPrice = price && isMember ? getMemberPrice(price, card.slug, size) : price;
              return <Badge key={index} variant="outline" className={`text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 whitespace-nowrap flex-shrink-0 ${isMember && price ? 'bg-charcoal border-primary/50 text-primary font-medium shadow-[0_0_8px_rgba(255,107,0,0.3)]' : price ? 'bg-primary/10 border-primary/30 text-primary font-medium' : 'bg-primary/5 border-primary/20'}`}>
                      {displayPrice ? <span className="flex items-center gap-1">
                          {isMember && <Hexagon className="h-2 sm:h-2.5 w-2 sm:w-2.5 text-primary" />}
                          {size} - ${displayPrice}
                        </span> : size}
                    </Badge>;
            })}
              </div>}
          </div>
          <Button variant="outline" className="w-full group hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/5 hover:border-primary/50 transition-all duration-300 pointer-events-none">
            Learn more
            <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </CardContent>
      </Card>
    </Link>;
};
interface PeptidesCatalogProps {
  showHeader?: boolean;
  className?: string;
}
const PeptidesCatalog = ({
  showHeader = true,
  className = ""
}: PeptidesCatalogProps) => {
  const [viewMode, setViewMode] = useState<'category' | 'alphabetical'>('category');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const {
    isMember,
    getMemberPrice
  } = useMembership();
  const { stockMap } = useAllProductStock();

  // Get all unique peptides sorted alphabetically
  const alphabeticalPeptides = useMemo(() => {
    const allPeptides = peptideSections.flatMap(section => section.cards);
    const uniquePeptides = allPeptides.reduce((acc, peptide) => {
      if (!acc.find(p => p.slug === peptide.slug)) {
        acc.push(peptide);
      }
      return acc;
    }, [] as PeptideCard[]);
    return uniquePeptides.sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  // Group by first letter
  const groupedByLetter = useMemo(() => {
    const groups: Record<string, PeptideCard[]> = {};
    alphabeticalPeptides.forEach(peptide => {
      const firstChar = peptide.name.charAt(0).toUpperCase();
      const letter = /[A-Z]/.test(firstChar) ? firstChar : '#';
      if (!groups[letter]) {
        groups[letter] = [];
      }
      groups[letter].push(peptide);
    });
    return groups;
  }, [alphabeticalPeptides]);
  const letters = Object.keys(groupedByLetter).sort();

  // Get filtered peptides for selected category
  const selectedCategoryData = useMemo(() => {
    if (!selectedCategory) return null;
    const section = peptideSections.find(s => s.title === selectedCategory);
    return section ? {
      title: section.title,
      cards: section.cards
    } : null;
  }, [selectedCategory]);
  return <div id="shop" className={className}>
      {/* Header Section */}
      {showHeader && <section className="bg-gradient-to-b from-background to-secondary/20 px-0 mx-0 py-0 my-[44px]">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12 my-0 py-[46px]">
              <h1 className="text-4xl sm:text-5xl font-display font-bold tracking-tight mb-4">All Peptides</h1>
              <p className="text-lg text-muted-foreground mb-6">
                Explore our complete range of research-grade peptides, all compounded and tested in the U.S.A.
              </p>
              
              {/* View Toggle */}
              <div className="flex justify-center gap-2">
                <Button variant={viewMode === 'category' ? 'default' : 'outline'} size="sm" onClick={() => setViewMode('category')} className="gap-2">
                  <LayoutGrid className="h-4 w-4" />
                  By Category
                </Button>
                <Button variant={viewMode === 'alphabetical' ? 'default' : 'outline'} size="sm" onClick={() => setViewMode('alphabetical')} className="gap-2">
                  <SortAsc className="h-4 w-4" />
                  A-Z
                </Button>
              </div>
            </div>
          </div>
        </section>}

      {/* Category Selector Bar */}
      {!showHeader && <div className="py-8 sm:py-12">
          <div className="container px-4 sm:px-6 lg:px-8">
            {/* Category Pills */}
            <div className="flex justify-start md:justify-center gap-4 sm:gap-6 lg:gap-8 overflow-x-auto pb-2 scrollbar-hide py-[16px] pl-4 md:pl-0">
              {categoryItems.map(category => {
            const isSelected = selectedCategory === category.sectionTitle;
            return <button key={category.id} onClick={() => {
              setSelectedCategory(category.sectionTitle);
              setViewMode('category');
            }} className="flex flex-col items-center gap-3 group flex-shrink-0">
                    {/* Pill-shaped image container */}
                    <div className={`relative w-28 h-20 sm:w-36 sm:h-24 lg:w-44 lg:h-28 rounded-full overflow-hidden transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl ${isSelected ? 'ring-4 ring-primary shadow-[0_0_20px_rgba(255,107,0,0.4)] scale-105' : ''}`}>
                      <img src={category.image} alt={category.label} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      {/* Subtle overlay on hover/selected */}
                      <div className={`absolute inset-0 transition-colors duration-300 ${isSelected ? 'bg-primary/20' : 'bg-primary/0 group-hover:bg-primary/10'}`} />
                    </div>
                    {/* Label */}
                    <span className={`text-xs sm:text-sm font-medium text-center transition-colors duration-300 whitespace-pre-line leading-tight uppercase tracking-wide ${isSelected ? 'text-primary font-semibold' : 'text-muted-foreground group-hover:text-foreground'}`}>
                      {category.label}
                    </span>
                  </button>;
          })}
            </div>

            {/* View Toggle - only show when no category is selected */}
            {!selectedCategory && <div className="flex justify-center gap-2 mt-8">
                <Button variant={viewMode === 'category' ? 'default' : 'outline'} size="sm" onClick={() => setViewMode('category')} className="gap-2">
                  <LayoutGrid className="h-4 w-4" />
                  By Category
                </Button>
                <Button variant={viewMode === 'alphabetical' ? 'default' : 'outline'} size="sm" onClick={() => setViewMode('alphabetical')} className="gap-2">
                  <SortAsc className="h-4 w-4" />
                  A-Z
                </Button>
              </div>}

            {/* Back to All button when category is selected */}
            {selectedCategory && <div className="flex justify-center mt-8">
                <Button variant="outline" size="sm" onClick={() => setSelectedCategory(null)} className="gap-2">
                  <ChevronRight className="h-4 w-4 rotate-180" />
                  View All Peptides
                </Button>
              </div>}
          </div>
        </div>}

      {/* Selected Category View - Grid like CategoryPageTemplate */}
      {selectedCategory && selectedCategoryData ? <section className="py-8 overflow-x-hidden">
          <div className="container px-4 sm:px-6 lg:px-8">
            {/* Category Title */}
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight mb-4">
                {selectedCategoryData.title}
              </h2>
            </div>

            {/* Peptides Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
              {selectedCategoryData.cards.map(card => <GlassCardComponent key={card.slug} card={card} isMember={isMember} getMemberPrice={getMemberPrice} fullWidth outOfStock={stockMap[card.slug] === false} />)}
            </div>
          </div>
        </section> : viewMode === 'category' ?
    // All Categories View
    <>
      {/* All Peptides Title */}
      <div className="max-w-3xl mx-auto text-center mb-8 pt-4">
        <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight">
          All Peptides
        </h2>
      </div>
      {peptideSections.map((section, index) => <section key={index} id={`category-section-${index}`} className="border-b py-[13px] scroll-mt-24">
            <div className="container px-4 sm:px-6 lg:px-8">
              <div className="relative">
                <div className="overflow-x-auto py-1 pb-4 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
                  <div className="flex gap-4 w-max">
                    {/* Title Card - Glassmorphism Style */}
                    {section.link ? <Link to={section.link} className="block group">
                        <Card className="w-[140px] sm:w-[240px] h-[320px] flex-shrink-0 overflow-hidden rounded-3xl border border-primary/40 bg-gradient-to-br from-primary/60 via-primary/40 to-primary/20 backdrop-blur-xl shadow-[0_8px_32px_rgba(255,107,0,0.25)] relative cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_16px_48px_rgba(255,107,0,0.4)] hover:border-primary/60">
                          {/* Glowing orb effects */}
                          <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/70 rounded-full blur-2xl transition-transform duration-500 group-hover:scale-150" />
                          <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-primary/60 rounded-full blur-2xl transition-transform duration-500 group-hover:scale-150" />
                          <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />
                          
                          {/* Background image if available */}
                          {getCategoryBackground(section.title) && <div className="absolute inset-0 bg-cover bg-center opacity-20 transition-all duration-500 group-hover:opacity-30 group-hover:scale-105" style={{
                    backgroundImage: `url(${getCategoryBackground(section.title)})`
                  }} />}
                          
                          {/* Glass-morphism content */}
                          <CardContent className="relative h-full flex flex-col justify-center items-center text-center p-6 z-10">
                            {/* Icon with glow */}
                            {(() => {
                      const IconComponent = getCategoryIcon(section.title);
                      return <div className="mb-6 relative">
                                  <div className="absolute inset-0 bg-primary/40 blur-2xl rounded-full scale-150 transition-all duration-500 group-hover:scale-[2] group-hover:bg-primary/60" />
                                </div>;
                    })()}
                            
                            {/* Text content */}
                            <h3 className="text-2xl font-display font-bold text-white mb-3 transition-transform duration-500 group-hover:scale-105">
                              {section.title}
                            </h3>
                            
                            {/* Hover indicator */}
                            <div className="flex items-center gap-2 mt-4 transition-all duration-300 group-hover:gap-3 text-primary-foreground">
                              <span className="text-sm font-medium">Explore</span>
                              <ChevronRight className="w-5 h-5" />
                            </div>
                          </CardContent>
                        </Card>
                      </Link> : <Card className="w-[140px] sm:w-[240px] h-[320px] flex-shrink-0 overflow-hidden rounded-3xl border border-primary/40 bg-gradient-to-br from-primary/60 via-primary/40 to-primary/20 backdrop-blur-xl shadow-[0_8px_32px_rgba(255,107,0,0.25)] relative">
                        {/* Glowing orb effects */}
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/70 rounded-full blur-2xl" />
                        <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-primary/60 rounded-full blur-2xl" />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />

                        {/* Glass-morphism content */}
                        <CardContent className="relative h-full flex flex-col justify-center items-center text-center p-6 z-10">
                          {/* Icon with glow - only for non-Research Supplies */}
                          {section.title !== "Research Supplies" && (
                            <div className="mb-6 relative">
                              <div className="absolute inset-0 bg-primary/40 blur-2xl rounded-full scale-150" />
                              <div className="relative p-3 rounded-2xl bg-primary/30 backdrop-blur-sm shadow-[0_0_20px_rgba(255,107,0,0.3)]">
                                <TrendingUp className="w-8 h-8 text-primary" />
                              </div>
                            </div>
                          )}

                          {/* Text content */}
                          <h3 className="text-2xl font-display font-bold text-white mb-3">
                            {section.title}
                          </h3>
                        </CardContent>
                      </Card>}

                    {/* Peptide Cards */}
                    {section.cards.map(card => <PeptideCardComponent key={card.slug} card={card} isMember={isMember} getMemberPrice={getMemberPrice} outOfStock={stockMap[card.slug] === false} />)}
                  </div>
                </div>
              </div>
            </div>
          </section>)}
    </> :
    // Alphabetical View
    <section className="py-8">
          <div className="container px-4 sm:px-6 lg:px-8">
            {/* Letter Navigation */}
            <div className="sticky top-20 z-10 bg-background/95 backdrop-blur-sm py-3 mb-6 border-b">
              <div className="flex flex-wrap gap-2 justify-center">
                {letters.map(letter => <Button key={letter} variant="ghost" size="sm" className="w-8 h-8 p-0 font-semibold hover:bg-primary hover:text-primary-foreground" onClick={() => {
              document.getElementById(`letter-${letter}`)?.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              });
            }}>
                    {letter}
                  </Button>)}
              </div>
            </div>

            {/* Peptides by Letter */}
            <div className="space-y-8">
              {letters.map(letter => <div key={letter} id={`letter-${letter}`} className="scroll-mt-36">
                  <h2 className="text-3xl font-display font-bold text-primary mb-4 border-b pb-2">
                    {letter}
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {groupedByLetter[letter].map(card => {
                const isBlend = card.tags.includes("Blend");
                return <Link key={card.slug} to={`/${card.slug}`} className="block">
                          <Card className="h-full overflow-hidden transition-all duration-500 group cursor-pointer relative border-0 bg-transparent">
                            {/* Frosted Glass Background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl rounded-lg border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.12)] group-hover:shadow-[0_16px_48px_rgba(255,107,0,0.15)] group-hover:border-primary/30 transition-all duration-500" />
                            
                            {/* Subtle Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            
                            {/* Glowing Orb Effect */}
                            <div className="absolute -top-10 -right-10 w-20 h-20 bg-primary/20 rounded-full blur-2xl opacity-0 group-hover:opacity-60 transition-all duration-700 group-hover:scale-150" />
                            <div className="absolute -bottom-5 -left-5 w-16 h-16 bg-primary/10 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-all duration-700 group-hover:scale-125" />

                            {/* Content Container */}
                            <div className="relative z-10 h-full flex flex-col">
                              <div className="relative h-24 overflow-hidden flex items-center justify-center rounded-t-lg">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent" />
                                <img src={card.image || peptideVial} alt={`${card.name} vial`} className="w-16 h-16 object-contain transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(255,107,0,0.4)] relative z-10" />
                                {isBlend && <Badge className="absolute top-2 right-2 text-xs shadow-lg backdrop-blur-md bg-white/20 border-white/30 text-foreground">
                                    Blend
                                  </Badge>}
                              </div>
                              <CardContent className="p-3 flex-1 flex flex-col">
                                <h3 className="font-display font-bold text-sm mb-1 line-clamp-2 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent group-hover:from-primary group-hover:to-primary/80 transition-all duration-300">
                                  {card.name}
                                </h3>
                                <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{card.benefit}</p>
                                {card.sizes && card.sizes.length > 0 && <div className="flex flex-wrap gap-1 mt-auto">
                                    {card.sizes.map((size, index) => {
                            const price = card.prices?.[size] ?? (index === 0 ? card.startingPrice : undefined);
                            const displayPrice = price && isMember ? getMemberPrice(price, card.slug, size) : price;
                            return <Badge key={index} variant="outline" className={`text-xs px-1.5 py-0.5 backdrop-blur-md transition-all duration-300 ${isMember && price ? 'bg-primary/20 border-primary/50 text-primary font-medium shadow-[0_0_12px_rgba(255,107,0,0.3)]' : price ? 'bg-white/10 border-primary/30 text-primary font-medium group-hover:bg-primary/10' : 'bg-white/5 border-white/20'}`}>
                                          {displayPrice ? <span className="flex items-center gap-0.5">
                                              {isMember && <Hexagon className="h-2 w-2 text-primary" />}
                                              {size} - ${displayPrice}
                                            </span> : size}
                                        </Badge>;
                          })}
                                  </div>}
                              </CardContent>
                            </div>
                          </Card>
                        </Link>;
              })}
                  </div>
                </div>)}
            </div>
          </div>
        </section>}
    </div>;
};
export default PeptidesCatalog;