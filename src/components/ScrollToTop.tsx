import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getLenis } from "@/hooks/useSmoothScroll";

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Disable browser's automatic scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    // Small delay to ensure the page has rendered and Lenis is ready
    const timeoutId = setTimeout(() => {
      const lenis = getLenis();
      if (lenis) {
        // Use Lenis scrollTo for smooth scroll library compatibility
        lenis.scrollTo(0, { immediate: true });
      } else {
        // Fallback for when Lenis isn't available
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
      }
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return null;
};
