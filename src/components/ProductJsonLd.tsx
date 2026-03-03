import { useEffect } from "react";

interface ProductJsonLdProps {
  name: string;
  description: string;
  slug: string;
  image?: string;
  sku?: string;
  casNumber?: string;
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

    script.textContent = JSON.stringify(productData);
    document.head.appendChild(script);

    return () => {
      const existing = document.getElementById(`product-jsonld-${slug}`);
      if (existing) existing.remove();
    };
  }, [name, description, slug, image, sku, casNumber]);

  return null;
}
