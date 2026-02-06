import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface StockStatus {
  productInStock: boolean;
  variantStock: Record<string, boolean>; // size_label → in_stock
  loading: boolean;
}

/**
 * Check real-time stock status for a product by slug.
 * Returns product-level and per-variant (by size_label) stock booleans.
 */
export const useProductStock = (slug: string): StockStatus => {
  const [productInStock, setProductInStock] = useState(true);
  const [variantStock, setVariantStock] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStock = async () => {
      const { data, error } = await supabase
        .from("products" as any)
        .select("in_stock, product_variants(size_label, in_stock)")
        .eq("slug", slug)
        .maybeSingle();

      if (error || !data) {
        // If product not found in DB, assume in-stock (static fallback)
        setLoading(false);
        return;
      }

      const product = data as any;
      setProductInStock(product.in_stock);

      const vStock: Record<string, boolean> = {};
      (product.product_variants || []).forEach((v: any) => {
        vStock[v.size_label] = v.in_stock;
      });
      setVariantStock(vStock);
      setLoading(false);
    };

    fetchStock();
  }, [slug]);

  return { productInStock, variantStock, loading };
};

/**
 * Bulk-fetch stock status for all products.
 * Returns a map of slug → in_stock for use in catalog views.
 */
export const useAllProductStock = () => {
  const [stockMap, setStockMap] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      const { data, error } = await supabase
        .from("products" as any)
        .select("slug, in_stock");

      if (error || !data) {
        setLoading(false);
        return;
      }

      const map: Record<string, boolean> = {};
      (data as any[]).forEach((p) => {
        map[p.slug] = p.in_stock;
      });
      setStockMap(map);
      setLoading(false);
    };

    fetchAll();
  }, []);

  return { stockMap, loading };
};
