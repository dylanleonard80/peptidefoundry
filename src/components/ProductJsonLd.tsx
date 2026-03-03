import { useEffect } from "react";

interface ProductJsonLdProps {
  name: string;
  description: string;
  slug: string;
  image?: string;
  sku?: string;
  casNumber?: string;
  price?: number;
  priceCurrency?: string;
  inStock?: boolean;
}

/**
 * Injects Product structured data (JSON-LD) into the page head.
 * Google uses this for rich product results in search.
 */
export function ProductJsonLd({
  name,
  description,
  slug,
  image,
  sku,
  casNumber,
  price,
  priceCurrency = "USD",
  inStock = true,
}: ProductJsonLdProps) {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = `product-jsonld-${slug}`;

    const productData: Record<string, unknown> = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: name,
      description: description,
      url: `https://peptidefoundry.com/${slug}`,
      image: image || `https://peptidefoundry.com/products/${slug}.webp`,
      brand: {
        "@type": "Brand",
        name: "Peptide Foundry",
      },
      category: "Research Peptides",
      manufacturer: {
        "@type": "Organization",
        name: "Peptide Foundry",
        url: "https://peptidefoundry.com",
      },
    };

    if (sku) productData.sku = sku;
    if (casNumber) {
      productData.additionalProperty = {
        "@type": "PropertyValue",
        name: "CAS Number",
        value: casNumber,
      };
    }
    if (price) {
      productData.offers = {
        "@type": "Offer",
        url: `https://peptidefoundry.com/${slug}`,
        priceCurrency,
        price: price.toFixed(2),
        availability: inStock
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
        seller: {
          "@type": "Organization",
          name: "Peptide Foundry",
        },
      };
    }

    script.textContent = JSON.stringify(productData);
    document.head.appendChild(script);

    return () => {
      const existing = document.getElementById(`product-jsonld-${slug}`);
      if (existing) existing.remove();
    };
  }, [name, description, slug, image, sku, casNumber, price, priceCurrency, inStock]);

  return null;
}
