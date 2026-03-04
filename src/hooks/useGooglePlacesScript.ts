import { useEffect, useState } from 'react';

let scriptLoadPromise: Promise<void> | null = null;

export function useGooglePlacesScript(): boolean {
  const [isLoaded, setIsLoaded] = useState(
    typeof google !== 'undefined' && !!google.maps?.places
  );

  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;
    if (!apiKey) return;

    // Already loaded
    if (typeof google !== 'undefined' && google.maps?.places) {
      setIsLoaded(true);
      return;
    }

    // Deduplicate: only create one script/promise
    if (!scriptLoadPromise) {
      scriptLoadPromise = new Promise<void>((resolve, reject) => {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = () => resolve();
        script.onerror = () => {
          scriptLoadPromise = null;
          reject(new Error('Failed to load Google Maps script'));
        };
        document.head.appendChild(script);
      });
    }

    scriptLoadPromise.then(() => setIsLoaded(true)).catch(console.error);
  }, []);

  return isLoaded;
}
