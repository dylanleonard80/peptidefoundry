import { ShoppingCart, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

interface CartProps {
  isFoundryClubPage?: boolean;
  isDarkHero?: boolean;
}

export const Cart = ({ isFoundryClubPage = false, isDarkHero = false }: CartProps) => {
  const {
    items,
    itemCount,
    subtotal,
    shipping,
    total,
    updateQuantity,
    removeItem
  } = useCart();
  const navigate = useNavigate();
  return <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative" aria-label={`Shopping cart${itemCount > 0 ? `, ${itemCount} item${itemCount > 1 ? 's' : ''}` : ''}`}>
          <ShoppingCart className={`h-5 w-5 ${(isFoundryClubPage || isDarkHero) ? 'text-white' : ''}`} />
          {itemCount > 0 && <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
              {itemCount}
            </Badge>}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
          <SheetDescription>
            {itemCount > 0 ? `${itemCount} item${itemCount > 1 ? 's' : ''} in cart` : 'Your cart is empty'}
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col h-full pt-6">
          {items.length === 0 ? <div className="flex-1 flex flex-col items-center justify-center gap-4">
              <ShoppingCart className="h-16 w-16 text-muted-foreground" />
              <p className="text-muted-foreground">Your cart is empty</p>
              <Button onClick={() => navigate('/shop')}>
                Browse Peptides
              </Button>
            </div> : <>
              <div className="flex-1 overflow-y-auto space-y-4">
                {items.map(item => <div key={`${item.peptide_name}-${item.size}`} className="flex gap-4 p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{item.peptide_name}</h4>
                      <p className="text-sm text-muted-foreground">{item.size}</p>
                      <p className="text-sm font-medium mt-1">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeItem(item.peptide_name, item.size)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>

                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.peptide_name, item.size, item.quantity - 1)}>
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.peptide_name, item.size, item.quantity + 1)}>
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>)}
              </div>

              <div className="pt-4 space-y-4 mx-0 my-[80px]">
                <Separator />
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <Button className="w-full" size="lg" onClick={() => navigate('/checkout')}>
                  Checkout
                </Button>
              </div>
            </>}
        </div>
      </SheetContent>
    </Sheet>;
};