import { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export interface CartItem {
  peptide_name: string;
  size: string;
  quantity: number;
  price: number;
}

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  shipping: number;
  total: number;
  loading: boolean;
  addItem: (item: Omit<CartItem, 'quantity'>) => Promise<boolean>;
  updateQuantity: (peptideName: string, size: string, quantity: number) => Promise<void>;
  removeItem: (peptideName: string, size: string) => Promise<void>;
  clearCart: () => Promise<void>;
}

const CART_STORAGE_KEY = 'peptide-cart';

const CartContext = createContext<CartContextType | undefined>(undefined);

// Helper to get cart from localStorage
const getLocalCart = (): CartItem[] => {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

// Helper to save cart to localStorage
const saveLocalCart = (items: CartItem[]) => {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const hasFetchedRef = useRef(false);
  const previousUserRef = useRef<string | null>(null);

  // Load cart on mount and when user changes
  useEffect(() => {
    const loadCart = async () => {
      if (user) {
        // User is logged in - fetch from database
        if (!hasFetchedRef.current || previousUserRef.current !== user.id) {
          const localItems = getLocalCart();
          await fetchAndMergeCart(localItems);
          hasFetchedRef.current = true;
          previousUserRef.current = user.id;
        }
      } else {
        // No user - load from localStorage
        const localItems = getLocalCart();
        setItems(localItems);
        setLoading(false);
        hasFetchedRef.current = false;
        previousUserRef.current = null;
      }
    };

    loadCart();
  }, [user?.id]);

  const fetchAndMergeCart = async (localItems: CartItem[]) => {
    if (!user) return;

    const { data, error } = await supabase
      .from('carts')
      .select('items')
      .eq('user_id', user.id)
      .maybeSingle();

    if (error) {
      console.error('Error fetching cart:', error);
      toast({
        title: 'Error loading cart',
        description: 'Could not load your cart. Please refresh.',
        variant: 'destructive',
      });
      setLoading(false);
      return;
    }

    const dbItems = (data?.items as unknown as CartItem[]) || [];
    
    // Merge local cart with database cart
    let mergedItems = [...dbItems];
    
    for (const localItem of localItems) {
      const existingIndex = mergedItems.findIndex(
        (i) => i.peptide_name === localItem.peptide_name && i.size === localItem.size
      );
      
      if (existingIndex >= 0) {
        // Item exists in DB - add quantities
        mergedItems[existingIndex].quantity += localItem.quantity;
      } else {
        // New item - add to cart
        mergedItems.push(localItem);
      }
    }

    // Clear local storage after merge
    localStorage.removeItem(CART_STORAGE_KEY);
    
    // Save merged cart to database
    if (mergedItems.length > 0 || localItems.length > 0) {
      await syncCart(mergedItems);
    }
    
    setItems(mergedItems);
    setLoading(false);
  };

  const syncCart = async (newItems: CartItem[]) => {
    if (!user) {
      // Save to localStorage for anonymous users
      saveLocalCart(newItems);
      return;
    }
    
    const { error } = await supabase
      .from('carts')
      .upsert({
        user_id: user.id,
        items: newItems as any,
      }, {
        onConflict: 'user_id'
      });

    if (error) {
      console.error('Error syncing cart:', error);
      toast({
        title: 'Error updating cart',
        description: 'Please try again',
        variant: 'destructive',
      });
    }
  };

  const addItem = async (item: Omit<CartItem, 'quantity'>) => {
    let nextItems: CartItem[] = [];

    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (i) => i.peptide_name === item.peptide_name && i.size === item.size
      );

      if (existingIndex >= 0) {
        nextItems = prev.map((i) =>
          i.peptide_name === item.peptide_name && i.size === item.size
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      } else {
        nextItems = [...prev, { ...item, quantity: 1 }];
      }

      return nextItems;
    });

    await syncCart(nextItems);

    toast({
      title: 'Added to cart',
      description: `${item.peptide_name} (${item.size})`,
    });

    return true;
  };

  const updateQuantity = async (peptideName: string, size: string, quantity: number) => {
    if (quantity < 1) {
      await removeItem(peptideName, size);
      return;
    }

    let nextItems: CartItem[] = [];

    setItems((prev) => {
      nextItems = prev.map((item) =>
        item.peptide_name === peptideName && item.size === size
          ? { ...item, quantity }
          : item
      );
      return nextItems;
    });

    await syncCart(nextItems);
  };

  const removeItem = async (peptideName: string, size: string) => {
    let nextItems: CartItem[] = [];

    setItems((prev) => {
      nextItems = prev.filter((item) => !(item.peptide_name === peptideName && item.size === size));
      return nextItems;
    });

    await syncCart(nextItems);

    toast({
      title: 'Removed from cart',
      description: `${peptideName} (${size})`,
    });
  };

  const clearCart = async () => {
    setItems([]);
    localStorage.removeItem(CART_STORAGE_KEY);
    if (user) {
      await syncCart([]);
    }
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 0; // Free shipping on all orders
  const total = subtotal + shipping;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        shipping,
        total,
        loading,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
