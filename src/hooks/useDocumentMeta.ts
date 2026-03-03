import { useEffect } from "react";

interface DocumentMetaOptions {
  title: string;
  description?: string;
  canonicalPath?: string;
  ogImage?: string;
  ogType?: string;
}

/**
 * Sets document title, meta description, canonical URL, and Open Graph tags.
 * Cleans up by restoring defaults on unmount.
 */
export function useDocumentMeta(
  titleOrOptions: string | DocumentMetaOptions,
  description?: string
) {
  useEffect(() => {
    const opts: DocumentMetaOptions =
      typeof titleOrOptions === "string"
        ? { title: titleOrOptions, description }
        : titleOrOptions;

    // Title
    document.title = opts.title;

    // Meta description
    if (opts.description) {
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute("content", opts.description);
    }

    // Canonical URL
    if (opts.canonicalPath) {
      const canonical = document.querySelector('link[rel="canonical"]');
      const url = `https://peptidefoundry.com${opts.canonicalPath}`;
      if (canonical) {
        canonical.setAttribute("href", url);
      }

      // Update OG URL too
      const ogUrl = document.querySelector('meta[property="og:url"]');
      if (ogUrl) ogUrl.setAttribute("content", url);
    }

    // OG Title
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", opts.title);

    // OG Description
    if (opts.description) {
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute("content", opts.description);

      const twDesc = document.querySelector('meta[name="twitter:description"]');
      if (twDesc) twDesc.setAttribute("content", opts.description);
    }

    // Twitter Title
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute("content", opts.title);

    // OG Image (if page-specific)
    if (opts.ogImage) {
      const ogImage = document.querySelector('meta[property="og:image"]');
      if (ogImage) ogImage.setAttribute("content", opts.ogImage);

      const twImage = document.querySelector('meta[name="twitter:image"]');
      if (twImage) twImage.setAttribute("content", opts.ogImage);
    }

    // OG Type
    if (opts.ogType) {
      const ogType = document.querySelector('meta[property="og:type"]');
      if (ogType) ogType.setAttribute("content", opts.ogType);
    }

    // Cleanup: restore defaults on unmount
    return () => {
      document.title = "Peptide Foundry | Premium Research Peptides";
      const meta = document.querySelector('meta[name="description"]');
      if (meta) {
        meta.setAttribute(
          "content",
          "Peptide Foundry offers high-purity research peptides with verified quality, fast shipping, and exceptional customer support. Shop premium peptides trusted nationwide."
        );
      }
      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) canonical.setAttribute("href", "https://peptidefoundry.com/");
      const ogUrl = document.querySelector('meta[property="og:url"]');
      if (ogUrl) ogUrl.setAttribute("content", "https://peptidefoundry.com/");
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute("content", "Peptide Foundry | Premium Research Peptides");
      const ogType = document.querySelector('meta[property="og:type"]');
      if (ogType) ogType.setAttribute("content", "website");
    };
  }, [
    typeof titleOrOptions === "string" ? titleOrOptions : JSON.stringify(titleOrOptions),
    description,
  ]);
}
