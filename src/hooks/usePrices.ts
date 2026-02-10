import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  peptidePrices as staticPrices,
  memberPrices as staticMemberPrices,
} from "@/data/priceData";

type PriceMap = Record<string, Record<string, number>>;

interface PriceRow {
  slug: string;
  product_variants: {
    size_label: string;
    price: number;
    member_price: number | null;
  }[];
}

async function fetchPrices(): Promise<{ prices: PriceMap; memberPrices: PriceMap }> {
  const { data, error } = await supabase
    .from("products" as any)
    .select("slug, product_variants(size_label, price, member_price)");

  if (error) throw error;

  const prices: PriceMap = {};
  const memberPrices: PriceMap = {};

  for (const row of (data as unknown as PriceRow[])) {
    const slugPrices: Record<string, number> = {};
    const slugMemberPrices: Record<string, number> = {};

    for (const v of row.product_variants) {
      slugPrices[v.size_label] = v.price;
      if (v.member_price != null) {
        slugMemberPrices[v.size_label] = v.member_price;
      }
    }

    if (Object.keys(slugPrices).length > 0) {
      prices[row.slug] = slugPrices;
    }
    if (Object.keys(slugMemberPrices).length > 0) {
      memberPrices[row.slug] = slugMemberPrices;
    }
  }

  return { prices, memberPrices };
}

export function usePrices() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["product-prices"],
    queryFn: fetchPrices,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: true,
  });

  // Fall back to static data while loading or on error
  const prices: PriceMap = data?.prices ?? staticPrices;
  const memberPrices: PriceMap = data?.memberPrices ?? staticMemberPrices;

  const getPrices = (slug: string): Record<string, number> | undefined => {
    return prices[slug];
  };

  const getStartingPrice = (slug: string): number => {
    const p = prices[slug];
    if (!p) return 0;
    return Math.min(...Object.values(p));
  };

  const getMemberPriceBySlug = (slug: string, size: string): number | undefined => {
    return memberPrices[slug]?.[size];
  };

  const getSavingsBySlug = (slug: string, size: string): number => {
    const regularPrice = prices[slug]?.[size];
    const memberPrice = memberPrices[slug]?.[size];
    if (regularPrice && memberPrice) {
      return regularPrice - memberPrice;
    }
    if (regularPrice) {
      return Math.round(regularPrice * 0.23);
    }
    return 0;
  };

  return {
    prices,
    memberPrices,
    isLoading,
    isError,
    getPrices,
    getStartingPrice,
    getMemberPriceBySlug,
    getSavingsBySlug,
  };
}
