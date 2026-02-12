import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ShoppingCart, Plus, Minus, ChevronDown, AlertCircle, Activity, Hexagon, FileCheck, ExternalLink, BookOpen } from "lucide-react";
import { useState } from "react";
import { useCart } from '@/contexts/CartContext';
import { useToast } from "@/hooks/use-toast";
import { useMembership } from "@/hooks/useMembership";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import FoundryClubLink from "@/components/FoundryClubLink";
import peptideVial from "@/assets/peptide-vial-syringe.jpg";
import type { PeptideBenefit, PeptideAccordion } from "@/data/peptidePageData";
import { getSmallIcon, getLargeIcon } from "@/lib/iconUtils";

import { ReactNode } from "react";
import { usePrices } from "@/hooks/usePrices";
import { PopularStacks } from "@/components/PopularStacks";
import { ResearchStudiesSheet } from "@/components/ResearchStudiesSheet";
import { getResearchByArea, ResearchStudy } from "@/data/researchStudies";
import { useProductStock } from "@/hooks/useProductStock";

// Component specs for blend peptides
interface ComponentSpec {
  name: string;
  casNumber: string;
  molecularFormula?: string;
  molarMass: string;
}
interface PeptidePageTemplateProps {
  peptideName: string;
  slug: string; // Required for member price lookup
  subtitle?: string;
  description?: string;
  additionalDescription?: string;
  casNumber?: string;
  molecularFormula?: string;
  molarMass?: string;
  // For blends: array of component specs to display in a table
  components?: ComponentSpec[];
  prices?: Record<string, number>;
  benefits?: PeptideBenefit[];
  references?: string[];
  aboutParagraphs?: string[];
  howItWorksIntro?: string;
  howItWorksAccordions?: PeptideAccordion[];
  technicalPathways?: string[];
  coaSlot?: ReactNode;
  productImage?: string;
  productImages?: Record<string, string>; // Size-specific images (e.g., "10mg": "/path.png")
  /** Optional: Pass a static <img> element here to enable Visual Edits on the product photo */
  productImageSlot?: ReactNode;
}
const DEFAULT_PRODUCT_IMAGE = "/lovable-uploads/cb0b0417-d800-41b8-9e76-35437c03cd8c.png";

export const PeptidePageTemplate = ({
  peptideName,
  slug,
  subtitle,
  description,
  additionalDescription,
  casNumber = "000000-00-0",
  molecularFormula,
  molarMass = "0000.00 g/mol",
  components,
  prices = {
    "10mg": 89
  },
  benefits = [],
  references = [],
  aboutParagraphs = [],
  howItWorksIntro,
  howItWorksAccordions = [],
  technicalPathways = [],
  coaSlot,
  productImage = DEFAULT_PRODUCT_IMAGE,
  productImages,
  productImageSlot
}: PeptidePageTemplateProps) => {
  const {
    addItem
  } = useCart();
  const {
    toast
  } = useToast();
  const {
    isMember,
    getMemberPrice,
    loading: memberLoading
  } = useMembership();
  const { productInStock, variantStock } = useProductStock(slug);
  const { getPrices: getDbPrices, getMemberPriceBySlug, getSavingsBySlug } = usePrices();
  // Prefer DB prices, fall back to prop
  const activePrices = getDbPrices(slug) ?? prices;
  const [selectedSize, setSelectedSize] = useState(Object.keys(activePrices)[0] || "10mg");
  const [quantity, setQuantity] = useState(1);
  const selectedSizeKey = selectedSize.trim();
  const isSizeOutOfStock = !productInStock || variantStock[selectedSizeKey] === false;
  const selectedSizeNoSpaces = selectedSizeKey.replace(/\s+/g, "");

  const baseImage =
    productImages?.[selectedSizeKey] ||
    productImages?.[selectedSizeNoSpaces] ||
    productImage;

  // Bust browser cache when switching variants
  const currentImage = baseImage.startsWith("/") && !baseImage.includes("?")
    ? `${baseImage}?v=${encodeURIComponent(selectedSizeNoSpaces)}`
    : baseImage;
  const [coaDialogOpen, setCoaDialogOpen] = useState(false);
  const [researchSheetOpen, setResearchSheetOpen] = useState(false);
  const [selectedResearchArea, setSelectedResearchArea] = useState<{
    title: string;
    studies: ResearchStudy[];
  } | null>(null);
  const basePrice = activePrices[selectedSize as keyof typeof activePrices];
  const displayPrice = getMemberPrice(basePrice, slug, selectedSize);
  const totalPrice = displayPrice * quantity;
  const savings = isMember ? (basePrice - displayPrice) * quantity : 0;

  // Get actual member price and savings for upsell box (doesn't depend on isMember state)
  const upsellMemberPrice = getMemberPriceBySlug(slug, selectedSize) ?? Math.round(basePrice * 0.77);
  const upsellSavings = getSavingsBySlug(slug, selectedSize);

  // Default benefits if none provided
  const displayBenefits = benefits.length > 0 ? benefits : [{
    iconName: "Activity",
    iconBgClass: "",
    title: "Primary Effect",
    description: "Description pending - to be added",
    link: "(Clinical Study)"
  }, {
    iconName: "Shield",
    iconBgClass: "",
    title: "Secondary Effect",
    description: "Description pending - to be added",
    link: "(Clinical Study)"
  }, {
    iconName: "Target",
    iconBgClass: "",
    title: "Tertiary Effect",
    description: "Description pending - to be added",
    link: "(Clinical Study)"
  }];

  // Default references if none provided
  const displayReferences = references.length > 0 ? references : ["[Author, et al.]. (Year). [Study title]. Journal Name, Volume(Issue), pages."];

  // Default about paragraphs if none provided
  const displayAboutParagraphs = aboutParagraphs.length > 0 ? aboutParagraphs : [`${peptideName} is a peptide compound with [general description]. This section will contain detailed information about the peptide's characteristics, origin, and general properties.`, "[Additional paragraph about mechanism of action, biochemical properties, and therapeutic context to be added here.]"];
  return <div className="min-h-screen bg-background pb-52 lg:pb-0">
      <Navbar />

      {/* Checkout Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-7xl my-[45px]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Left Column - Image (sticky) */}
            <div className="lg:sticky lg:top-40 space-y-3 max-w-md mx-auto lg:max-w-none lg:mx-0">
              <Card className="overflow-hidden border-0 bg-transparent relative group">
                {/* Radial Glow Background */}
                <div className="absolute inset-0 rounded-lg" style={{
                background: 'radial-gradient(ellipse at center, hsl(var(--primary) / 0.25) 0%, hsl(var(--primary) / 0.1) 40%, transparent 70%)'
              }} />
                
                {/* Outer Glow Ring */}
                <div className="absolute inset-0 rounded-lg" style={{
                background: 'radial-gradient(ellipse at center, transparent 50%, hsl(var(--primary) / 0.05) 70%, transparent 100%)'
              }} />
                
                <CardContent className="p-0 relative z-10">
                  {productImageSlot ? (
                    productImageSlot
                  ) : (
                    <img
                      key={currentImage}
                      alt={`${peptideName} vial product photo`}
                      className="w-full h-auto rounded-md object-contain drop-shadow-[0_0_40px_rgba(255,107,0,0.3)] transition-all duration-300 hover:scale-105"
                      src={currentImage}
                      loading="eager"
                      decoding="async"
                      onError={(e) => {
                        // Fall back to the default image if a variant path 404s
                        console.warn("Product image failed to load:", currentImage);
                        if (e.currentTarget.src.includes(productImage)) return;
                        e.currentTarget.src = productImage;
                      }}
                    />
                  )}
                </CardContent>
              </Card>
              <button onClick={() => setCoaDialogOpen(true)} className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-primary/10 hover:bg-primary/20 border border-primary/20 rounded-lg transition-all cursor-pointer group">
                <FileCheck className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-foreground">COA Available</span>
              </button>
            </div>

            {/* COA Dialog */}
            <Dialog open={coaDialogOpen} onOpenChange={setCoaDialogOpen}>
              <DialogContent className="max-w-3xl max-h-[90vh] flex flex-col overflow-hidden" data-lenis-prevent>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <FileCheck className="h-5 w-5 text-primary" />
                    Certificate of Analysis - {peptideName}
                  </DialogTitle>
                  <DialogDescription>
                    Third-party tested by Freedom Diagnostics
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 overflow-y-auto flex-1 overscroll-contain" data-lenis-prevent-wheel data-lenis-prevent-touch>
                  {coaSlot && <div className="rounded-lg overflow-hidden border border-border">
                      {coaSlot}
                    </div>}
                  <div className="bg-muted/50 rounded-lg p-6 text-center space-y-4">
                    <FileCheck className="h-12 w-12 text-primary mx-auto" />
                    <div>
                      <h3 className="font-semibold text-lg">COA Document</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        All {peptideName} batches are independently tested for purity and identity verification.
                      </p>
                    </div>
                    <Button asChild className="mt-4">
                      <a href="https://freedomdiagnosticstesting.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                        View on Freedom Diagnostics
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                  <div className="text-xs text-muted-foreground text-center">
                    COA documents are updated with each new batch. Contact support for batch-specific documentation.
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* Middle Column - Product Info (scrolls naturally) */}
            <div className="space-y-6">
              <div>
                <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                  99% Purity | Research Use Only | Not for Human Consumption
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">{peptideName}</h1>
                <p className="text-lg text-muted-foreground mb-4">{subtitle || "[Chemical Name - To Be Added]"}</p>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {description || `${peptideName} is a peptide compound with [general description to be added].`}
                </p>
                {additionalDescription && <p className="text-base text-muted-foreground leading-relaxed mt-4">
                    {additionalDescription}
                  </p>}
              </div>

              {/* Specs Section - Table for blends, simple layout for single peptides */}
              {components && components.length > 0 ? <div className="border-t border-border pt-6">
                  <h3 className="text-sm font-semibold text-foreground mb-3">Blend Components</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-2 pr-3 text-muted-foreground font-medium">Component</th>
                          <th className="text-left py-2 px-3 text-muted-foreground font-medium">CAS#</th>
                          <th className="text-left py-2 px-3 text-muted-foreground font-medium">Formula</th>
                          <th className="text-left py-2 pl-3 text-muted-foreground font-medium">Molar Mass</th>
                        </tr>
                      </thead>
                      <tbody>
                        {components.map((component, index) => <tr key={index} className="border-b border-border/50 last:border-b-0">
                            <td className="py-2.5 pr-3 font-medium text-foreground">{component.name}</td>
                            <td className="py-2.5 px-3 text-foreground">{component.casNumber}</td>
                            <td className="py-2.5 px-3 text-foreground">{component.molecularFormula || "—"}</td>
                            <td className="py-2.5 pl-3 text-foreground">{component.molarMass}</td>
                          </tr>)}
                      </tbody>
                    </table>
                  </div>
                </div> : <div className="border-t border-border pt-6">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="py-2.5 pr-3 text-left text-muted-foreground font-medium">CAS#</th>
                          <th className="py-2.5 px-3 text-left text-muted-foreground font-medium">Formula</th>
                          <th className="py-2.5 pl-3 text-left text-muted-foreground font-medium">Molar Mass</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="py-2.5 pr-3 text-foreground">{casNumber}</td>
                          <td className="py-2.5 px-3 text-foreground">{molecularFormula || "—"}</td>
                          <td className="py-2.5 pl-3 text-foreground">{molarMass}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>}

              <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg border border-border">
                <AlertCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  All products are shipped in lyophilized or powder form and must be reconstituted to a liquid for research and testing. We are unable to provide any dosing instructions, however all products should be considered pharmaceutical grade.
                </p>
              </div>
            </div>

            {/* Right Column - Checkout (sticky) - Hidden on mobile */}
            <div className="hidden lg:block lg:sticky lg:top-40">
              <Card>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <Label className="text-base font-semibold mb-3 block">Select Size</Label>
                    <div className="grid gap-3 grid-cols-1">
                      {Object.keys(activePrices).map(size => <Button key={size} variant={selectedSize === size ? "default" : "outline"} onClick={() => setSelectedSize(size)} className="w-full">
                          {size}
                        </Button>)}
                    </div>
                  </div>

                  <div>
                    <Label className="text-base font-semibold mb-3 block">Quantity</Label>
                    <div className="flex items-center gap-3 w-full">
                      <Button variant="outline" size="icon" className="h-10 w-10" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input type="number" value={quantity} onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} className="flex-1 text-center h-10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                      <Button variant="outline" size="icon" className="h-10 w-10" onClick={() => setQuantity(quantity + 1)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="border-t border-border pt-6 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Price per unit</span>
                      <div className="text-right">
                        {isMember ? <div className="flex items-center gap-2">
                            <span className="text-muted-foreground line-through text-xs">${basePrice}</span>
                            <span className="font-medium text-primary">${displayPrice}</span>
                          </div> : <span className="font-medium">${basePrice}</span>}
                      </div>
                    </div>
                    
                    {isMember && savings > 0 && <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <Hexagon className="h-3 w-3 text-primary" /> Member Savings
                        </span>
                        <span className="font-medium text-green-600">-${savings}</span>
                      </div>}
                    
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-primary">${totalPrice}</span>
                    </div>
                  </div>

                  {!isMember && !memberLoading && <FoundryClubLink className="block w-full text-left">
                      <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg hover:bg-primary/10 transition-all cursor-pointer hover:shadow-[0_0_20px_hsl(var(--primary)/0.5)]">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Hexagon className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium">Join Foundry Club</span>
                          </div>
                          <Badge variant="secondary" className="text-xs">$50/month</Badge>
                        </div>
                      <p className="text-xs text-muted-foreground mt-1">
                          Get this for ${upsellMemberPrice * quantity} — <span className="text-green-600 font-medium">Save ${upsellSavings * quantity}</span>
                        </p>
                      </div>
                    </FoundryClubLink>}

                  <Button size="lg" className="w-full group" disabled={isSizeOutOfStock} onClick={async () => {
                  await addItem({
                    peptide_name: peptideName,
                    size: selectedSize,
                    price: displayPrice,
                    slug
                  });
                  toast({
                    title: "Added to cart",
                    description: `${peptideName} (${selectedSize}) has been added to your cart.`
                  });
                }}>
                    <ShoppingCart className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                    {isSizeOutOfStock ? "Out of Stock" : "Add to Cart"}
                  </Button>


                  <div className="text-xs text-muted-foreground text-center">
                    Research use only.
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Fixed Bottom Checkout Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 lg:hidden z-50 safe-area-inset-bottom">
        <div className="space-y-3">
          {/* Top Row: Size & Quantity */}
          <div className="flex items-center gap-3">
            {/* Size Pills */}
            <div className="flex gap-1.5">
              {Object.keys(activePrices).map(size => <button key={size} onClick={() => setSelectedSize(size)} className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${selectedSize === size ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}>
                  {size}
                </button>)}
            </div>
            
            {/* Quantity */}
            <div className="flex items-center gap-2 ml-auto">
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                <Minus className="h-3 w-3" />
              </Button>
              <span className="w-8 text-center text-sm font-medium">{quantity}</span>
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setQuantity(quantity + 1)}>
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* Foundry Club Upsell (non-members) */}
          {!isMember && !memberLoading && <FoundryClubLink className="block w-full">
              <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg hover:bg-primary/10 transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Hexagon className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Join Foundry Club</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">$50/month</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Get this for ${upsellMemberPrice * quantity} — <span className="text-green-600 font-medium">Save ${upsellSavings * quantity}</span>
                </p>
              </div>
            </FoundryClubLink>}

          {/* Bottom Row: Price & Add to Cart */}
          <div className="flex items-center gap-3">
            {/* Price Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                {isMember ? <>
                    <span className="text-xs text-muted-foreground line-through">${basePrice * quantity}</span>
                    <span className="text-xl font-bold text-primary">${totalPrice}</span>
                    {savings > 0 && <span className="text-xs text-green-600 font-medium flex items-center gap-0.5">
                        <Hexagon className="h-2.5 w-2.5" /> -${savings}
                      </span>}
                  </> : <span className="text-xl font-bold">${totalPrice}</span>}
              </div>
              <span className="text-xs text-muted-foreground">Total • Research use only</span>
            </div>
            
            {/* Add to Cart Button */}
            <Button size="default" className="shrink-0" disabled={isSizeOutOfStock} onClick={async () => {
            await addItem({
              peptide_name: peptideName,
              size: selectedSize,
              price: displayPrice,
              slug
            });
            toast({
              title: "Added to cart",
              description: `${peptideName} (${selectedSize}) has been added to your cart.`
            });
          }}>
              <ShoppingCart className="mr-2 h-4 w-4" />
              {isSizeOutOfStock ? "Out of Stock" : "Add to Cart"}
            </Button>
          </div>

        </div>
      </div>

      {/* Tabbed Content Section */}
      <section className="py-20 px-4 bg-card">
        <div className="container mx-auto max-w-6xl">
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-2 sm:grid-cols-4 mb-12 h-auto gap-2 bg-muted/50 p-2 rounded-xl">
              <TabsTrigger
                value="about"
                className="py-3 px-4 text-sm font-medium rounded-lg data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-md data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:text-foreground data-[state=inactive]:hover:bg-background/50 transition-all"
              >
                About
              </TabsTrigger>
              <TabsTrigger
                value="how-it-works"
                className="py-3 px-4 text-sm font-medium rounded-lg data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-md data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:text-foreground data-[state=inactive]:hover:bg-background/50 transition-all"
              >
                Preclinical Findings
              </TabsTrigger>
              <TabsTrigger
                value="benefits"
                className="py-3 px-4 text-sm font-medium rounded-lg data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-md data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:text-foreground data-[state=inactive]:hover:bg-background/50 transition-all"
              >
                Research Areas
              </TabsTrigger>
              <TabsTrigger
                value="storage"
                className="py-3 px-4 text-sm font-medium rounded-lg data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-md data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:text-foreground data-[state=inactive]:hover:bg-background/50 transition-all"
              >
                Storage
              </TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="mt-0">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-foreground">About {peptideName}</h2>
                <div className="prose prose-lg max-w-none text-muted-foreground space-y-6 leading-relaxed">
                  {displayAboutParagraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="how-it-works" className="mt-0">
              <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-foreground">Preclinical Findings: {peptideName}</h2>
                
                {howItWorksIntro && <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-6 rounded-xl border border-primary/20 mb-12">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Research Summary</h3>
                    <p className="text-muted-foreground leading-relaxed">{howItWorksIntro}</p>
                  </div>}

                {howItWorksAccordions.length > 0 && <>
                    <h3 className="text-2xl font-bold mb-6 text-foreground">Cellular Mechanisms</h3>
                    <Accordion type="single" collapsible className="space-y-4 mb-12">
                      {howItWorksAccordions.map(item => <AccordionItem key={item.value} value={item.value} className="border rounded-lg px-4 bg-card">
                          <AccordionTrigger className="hover:no-underline py-6">
                            <div className="flex items-center gap-4">
                              <div className={`p-2 rounded-lg ${item.iconBgClass}`}>
                                {getSmallIcon(item.iconName)}
                              </div>
                              <span className="font-semibold text-left">{item.title}</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pt-4 pb-6 text-muted-foreground">
                            {item.content}
                          </AccordionContent>
                        </AccordionItem>)}
                    </Accordion>
                  </>}

                {technicalPathways.length > 0 && <Collapsible>
                    <div className="border rounded-lg p-4 bg-card">
                      <CollapsibleTrigger className="flex items-center justify-between w-full group">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold text-foreground">Technical Biochemical Pathways</h3>
                          <span className="text-xs text-muted-foreground">(Advanced)</span>
                        </div>
                        <ChevronDown className="w-5 h-5 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="pt-4 mt-4 border-t">
                          <ul className="space-y-3 text-sm text-muted-foreground">
                            {technicalPathways.map((pathway, index) => <li key={index}>• {pathway}</li>)}
                          </ul>
                        </div>
                      </CollapsibleContent>
                    </div>
                  </Collapsible>}

                {howItWorksAccordions.length === 0 && !howItWorksIntro && <div className="bg-card p-8 rounded-lg">
                    <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
                      <p>
                        Mechanism of action for {peptideName} - detailed scientific information will be added here,
                        including biochemical pathways and molecular interactions.
                      </p>
                    </div>
                  </div>}
              </div>
            </TabsContent>

            <TabsContent value="benefits" className="mt-0">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-foreground">
                  Research Areas
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {displayBenefits.map((benefit, index) => {
                  const studies = getResearchByArea(slug, benefit.title);
                  const hasStudies = studies && studies.length > 0;
                  return <Card key={index} className="hover:shadow-lg transition-shadow h-full">
                        <CardContent className="p-6 h-full flex flex-col">
                          <div className="mb-4">{getLargeIcon(benefit.iconName)}</div>
                          <h3 className="text-xl font-semibold mb-3 text-foreground">{benefit.title}</h3>
                          <p className="text-muted-foreground mb-3 flex-1">{benefit.description}</p>
                          <div className="mt-auto pt-2">
                            {hasStudies ? <button onClick={() => {
                          setSelectedResearchArea({
                            title: benefit.title,
                            studies: studies
                          });
                          setResearchSheetOpen(true);
                        }} className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline font-medium">
                                <BookOpen className="h-4 w-4" />
                                View Studies ({studies.length})
                              </button> : benefit.link.startsWith("http") ? <a href={benefit.link} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                                View Study
                              </a> : <span className="text-sm text-primary">{benefit.link}</span>}
                          </div>
                        </CardContent>
                      </Card>;
                })}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="storage" className="mt-0">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-foreground">
                  Storage Instructions
                </h2>
                <Card>
                  <CardContent className="p-8">
                    <div className="space-y-6 text-muted-foreground">
                      <p className="text-lg leading-relaxed">
                        All of our products are manufactured using the <strong className="text-foreground">Lyophilization (Freeze Drying)</strong> process, which ensures that our products remain 100% stable for shipping for up to 3-4 months.
                      </p>
                      <p className="text-lg leading-relaxed">
                        Once the peptides are <strong className="text-foreground">reconstituted</strong> (mixed with bacteriostatic water), they must be stored in the fridge to maintain stability.
                      </p>
                      <p className="text-lg leading-relaxed">
                        After reconstitution, the peptides will remain stable for up to <strong className="text-foreground">30 days</strong>.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Popular Stacks Section */}
      <PopularStacks currentSlug={slug} peptideName={peptideName} />

      {/* Clinical References Section */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-foreground">Clinical References</h2>
          <Card>
            <CardContent className="p-8">
              <ol className="space-y-4">
                {displayReferences.map((ref, index) => <li key={index} className="text-sm text-muted-foreground">
                    {index + 1}. {ref}
                  </li>)}
              </ol>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer Text Section */}
      <section className="py-12 px-4 bg-card text-center">
        <div className="container mx-auto max-w-2xl">
          <p className="text-muted-foreground mb-2">
            {peptideName} is available for laboratory research purposes only.
          </p>
          <p className="text-sm text-muted-foreground">© Path Peptides 2025 | Product Catalog | Research Use Only</p>
        </div>
      </section>

      {/* Research Studies Sheet */}
      {selectedResearchArea && <ResearchStudiesSheet open={researchSheetOpen} onOpenChange={setResearchSheetOpen} areaTitle={selectedResearchArea.title} studies={selectedResearchArea.studies} peptideName={peptideName} />}

      <Footer />
    </div>;
};