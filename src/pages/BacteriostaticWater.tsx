import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/contexts/CartContext";
import { useMembership } from "@/hooks/useMembership";
import { toast } from "sonner";
import { Droplets, Thermometer, Clock, ShieldCheck, FlaskConical, AlertTriangle, CheckCircle2, Info, Plus, Minus } from "lucide-react";
import peptideVial from "@/assets/peptide-vial.png";
const BacteriostaticWater = () => {
  const {
    addItem,
    items,
    updateQuantity
  } = useCart();
  const {
    isMember
  } = useMembership();
  const [quantity, setQuantity] = useState(1);
  const regularPrice = 15;
  const memberPrice = 12;
  const currentPrice = isMember ? memberPrice : regularPrice;
  const handleAddToCart = async () => {
    const existingItem = items.find(i => i.peptide_name === "Bacteriostatic Water" && i.size === "30ml");
    if (existingItem) {
      await updateQuantity("Bacteriostatic Water", "30ml", existingItem.quantity + quantity);
    } else {
      await addItem({
        peptide_name: "Bacteriostatic Water",
        size: "30ml",
        price: currentPrice,
        slug: "bacteriostatic-water"
      });
      if (quantity > 1) {
        await updateQuantity("Bacteriostatic Water", "30ml", quantity);
      }
    }
    toast.success("Added to cart", {
      description: `${quantity}× Bacteriostatic Water (30ml) added to your cart.`
    });
    setQuantity(1);
  };
  return <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 lg:px-8 my-[40px]">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Product Image */}
            <div className="relative">
              <div className="aspect-square bg-muted/30 rounded-2xl flex items-center justify-center overflow-hidden">
                <img alt="Bacteriostatic Water Vial" className="w-3/4 h-3/4 object-contain" src="/lovable-uploads/f2e3c602-e551-44ce-aab1-d2cb063e201c.webp" />
              </div>
              <Badge variant="secondary" className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm">
                Research Supply
              </Badge>
            </div>
            
            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-3">
                  Bacteriostatic Water
                </h1>
                <p className="text-xl text-muted-foreground">
                  Sterile, multi-use bacteriostatic water used as a diluent for reconstituting peptides and other research compounds.
                </p>
              </div>
              
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold">${currentPrice}</span>
                {isMember && <span className="text-lg text-muted-foreground line-through">
                    ${regularPrice}
                  </span>}
                <span className="text-muted-foreground">/ 30ml vial</span>
              </div>
              
              {isMember && <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                  Foundry Club Member Price
                </Badge>}
              
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="gap-1">
                  <ShieldCheck className="h-3 w-3" />
                  USP Grade
                </Badge>
                <Badge variant="outline" className="gap-1">
                  <FlaskConical className="h-3 w-3" />
                  0.9% Benzyl Alcohol
                </Badge>
                <Badge variant="outline" className="gap-1">
                  <Droplets className="h-3 w-3" />
                  30ml Volume
                </Badge>
              </div>
              
              {/* Specifications Table */}
              <div className="border border-border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="px-4 py-3 text-muted-foreground bg-muted/30 font-medium w-1/3">CAS#</td>
                      <td className="px-4 py-3">7732-18-5</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="px-4 py-3 text-muted-foreground bg-muted/30 font-medium">Molecular Formula</td>
                      <td className="px-4 py-3">H₂O</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-muted-foreground bg-muted/30 font-medium">Molecular Weight</td>
                      <td className="px-4 py-3">18.015 g/mol</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 border border-border rounded-lg">
                  <Button variant="ghost" size="icon" className="h-10 w-10" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center font-medium">{quantity}</span>
                  <Button variant="ghost" size="icon" className="h-10 w-10" onClick={() => setQuantity(quantity + 1)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <Button size="lg" className="px-12" onClick={handleAddToCart}>
                  Add to Cart
                </Button>
              </div>
              
              <p className="text-xs text-muted-foreground/70">
                For Research Use Only | Not for Human Consumption
              </p>
            </div>
          </div>
        </section>
        
        {/* Usage Instructions */}
        
        
        {/* Storage Information */}
        <section className="container mx-auto px-4 lg:px-8 mt-20">
          <h2 className="text-2xl font-bold mb-8">Storage Information</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-green-200 dark:border-green-900">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                  <h3 className="font-semibold text-lg">Before Opening</h3>
                </div>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-green-500 flex-shrink-0" />
                    Store at room temperature (15-25°C / 59-77°F)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-green-500 flex-shrink-0" />
                    Keep away from direct sunlight
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-green-500 flex-shrink-0" />
                    Shelf life: 2 years from manufacture date
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-green-500 flex-shrink-0" />
                    Do not freeze
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-blue-200 dark:border-blue-900">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="h-6 w-6 text-blue-600" />
                  <h3 className="font-semibold text-lg">After Opening</h3>
                </div>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                    Refrigerate at 2-8°C (36-46°F) recommended
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                    Use within 28 days after first puncture
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                    Always use sterile technique when withdrawing
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                    Discard if solution becomes cloudy or discolored
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* Important Notes */}
        <section className="container mx-auto px-4 lg:px-8 mt-20">
          <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Important Notes</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Info className="h-4 w-4 mt-0.5 flex-shrink-0 text-amber-600" />
                      Bacteriostatic water contains 0.9% benzyl alcohol as a preservative, which inhibits bacterial growth.
                    </li>
                    <li className="flex items-start gap-2">
                      <Info className="h-4 w-4 mt-0.5 flex-shrink-0 text-amber-600" />
                      The benzyl alcohol allows for multiple withdrawals from the same vial while maintaining sterility.
                    </li>
                    <li className="flex items-start gap-2">
                      <Info className="h-4 w-4 mt-0.5 flex-shrink-0 text-amber-600" />
                      Do not use sterile water (without preservative) for reconstitution if multiple withdrawals are planned.
                    </li>
                    <li className="flex items-start gap-2">
                      <Info className="h-4 w-4 mt-0.5 flex-shrink-0 text-amber-600" />
                      This product is intended for laboratory research purposes only.
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
        
        {/* Product Specifications */}
        <section className="container mx-auto px-4 lg:px-8 mt-20">
          <h2 className="text-2xl font-bold mb-8">Product Specifications</h2>
          
          <Card>
            <CardContent className="pt-6">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Volume</p>
                  <p className="font-semibold">30ml</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Preservative</p>
                  <p className="font-semibold">0.9% Benzyl Alcohol</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Grade</p>
                  <p className="font-semibold">USP Grade</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Sterility</p>
                  <p className="font-semibold">Sterile Filtered</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">pH</p>
                  <p className="font-semibold">5.0 - 7.0</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Container</p>
                  <p className="font-semibold">Multi-dose Glass Vial</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Closure</p>
                  <p className="font-semibold">Rubber Stopper with Flip-off Cap</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Shelf Life</p>
                  <p className="font-semibold">2 Years (Unopened)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
      
      <Footer />
    </div>;
};
export default BacteriostaticWater;