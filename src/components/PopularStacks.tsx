import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Plus, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getStackRecommendations, StackRecommendation } from "@/data/peptideStacks";
import { getAllUniquePeptides, PeptideCard } from "@/data/peptides";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { useMembership } from "@/hooks/useMembership";
import { usePrices } from "@/hooks/usePrices";
import { getProductImageBySlug } from "@/data/peptidePageData";
import peptideVial from "@/assets/peptide-vial-syringe.jpg";
import { useState } from "react";

interface PopularStacksProps {
  currentSlug: string;
  peptideName: string;
}

interface StackItemData extends StackRecommendation {
  peptideData: PeptideCard | undefined;
  displayPrice: number;
  basePrice: number;
  defaultSize: string;
  productImage?: string;
}

export const PopularStacks = ({ currentSlug, peptideName }: PopularStacksProps) => {
  const recommendations = getStackRecommendations(currentSlug);
  const allPeptides = getAllUniquePeptides();
  const { addItem } = useCart();
  const { toast } = useToast();
  const { isMember, getMemberPrice } = useMembership();
  const { prices: peptidePrices, getMemberPriceBySlug } = usePrices();
  const [addingAll, setAddingAll] = useState(false);

  if (recommendations.length === 0) return null;

  // Enrich recommendations with peptide data and prices
  const stackItems: StackItemData[] = recommendations.map((rec) => {
    const peptideData = allPeptides.find((p) => p.slug === rec.slug);
    const prices = peptidePrices[rec.slug] || {};
    const defaultSize = Object.keys(prices)[0] || "";
    const basePrice = prices[defaultSize] || 0;
    const displayPrice = isMember
      ? getMemberPriceBySlug(rec.slug, defaultSize) ?? getMemberPrice(basePrice, rec.slug, defaultSize)
      : basePrice;
    const productImage = getProductImageBySlug(rec.slug);

    return {
      ...rec,
      peptideData,
      displayPrice,
      basePrice,
      defaultSize,
      productImage,
    };
  }).filter((item) => item.peptideData && item.basePrice > 0);

  if (stackItems.length === 0) return null;

  const handleAddToCart = async (item: StackItemData) => {
    if (!item.peptideData) return;
    
    await addItem({
      peptide_name: item.peptideData.name,
      size: item.defaultSize,
      price: item.displayPrice,
    });

    toast({
      title: "Added to cart",
      description: `${item.peptideData.name} (${item.defaultSize}) has been added to your cart.`,
    });
  };

  const handleAddAllToCart = async () => {
    setAddingAll(true);
    try {
      for (const item of stackItems) {
        if (item.peptideData) {
          await addItem({
            peptide_name: item.peptideData.name,
            size: item.defaultSize,
            price: item.displayPrice,
          });
        }
      }

      toast({
        title: "Stack added to cart",
        description: `${stackItems.length} items have been added to your cart.`,
      });
    } finally {
      setAddingAll(false);
    }
  };

  const totalStackPrice = stackItems.reduce((sum, item) => sum + item.displayPrice, 0);
  const totalBasePrice = stackItems.reduce((sum, item) => sum + item.basePrice, 0);

  return (
    <section className="py-16 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">
            Popular Stacks
          </h2>
          <p className="text-muted-foreground">
            Commonly bought with {peptideName}
          </p>
        </div>

        {/* Stack Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {stackItems.map((item) => (
            <Card key={item.slug} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
              <CardContent className="p-0">
                {/* Product Image */}
                <Link to={`/${item.slug}`} className="block relative">
                  <div className="aspect-square bg-muted/30 p-4 relative overflow-hidden">
                    <img
                      src={item.productImage || peptideVial}
                      alt={item.peptideData?.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge
                      variant="secondary"
                      className="absolute top-3 left-3 text-xs bg-background/90 backdrop-blur-sm"
                    >
                      {item.label}
                    </Badge>
                  </div>
                </Link>

                {/* Product Info */}
                <div className="p-4 space-y-3">
                  <div>
                    <Link to={`/${item.slug}`}>
                      <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                        {item.peptideData?.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-muted-foreground mt-1">
                      {item.defaultSize}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2">
                    {isMember && item.displayPrice < item.basePrice ? (
                      <>
                        <span className="text-lg font-bold text-primary">
                          ${item.displayPrice}
                        </span>
                        <span className="text-sm text-muted-foreground line-through">
                          ${item.basePrice}
                        </span>
                      </>
                    ) : (
                      <span className="text-lg font-bold text-foreground">
                        ${item.basePrice}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      variant="default"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleAddToCart(item)}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add to Cart
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                    >
                      <Link to={`/${item.slug}`}>
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add All Button */}
        {stackItems.length > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t border-border">
            <div className="text-center sm:text-left">
              <p className="text-sm text-muted-foreground">
                Add all {stackItems.length} items to your cart
              </p>
              <div className="flex items-center justify-center sm:justify-start gap-2 mt-1">
                {isMember && totalStackPrice < totalBasePrice ? (
                  <>
                    <span className="text-xl font-bold text-primary">
                      ${totalStackPrice}
                    </span>
                    <span className="text-sm text-muted-foreground line-through">
                      ${totalBasePrice}
                    </span>
                    <Badge variant="secondary" className="text-xs text-green-600 bg-green-600/10">
                      Save ${totalBasePrice - totalStackPrice}
                    </Badge>
                  </>
                ) : (
                  <span className="text-xl font-bold text-foreground">
                    ${totalBasePrice}
                  </span>
                )}
              </div>
            </div>
            <Button
              size="lg"
              onClick={handleAddAllToCart}
              disabled={addingAll}
              className="min-w-[200px]"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              {addingAll ? "Adding..." : "Add All to Cart"}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};
