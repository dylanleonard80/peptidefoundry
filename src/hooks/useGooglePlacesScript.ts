import { useEffect, useState } from 'react';

let scriptLoadPromise: Promise<void> | null = null;

function isPlacesReady(): boolean {
  return typeof google !== 'undefined' && !!google.maps?.places;
}

export function useGooglePlacesScript(): boolean {
  const [isLoaded, setIsLoaded] = useState(isPlacesReady);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;
    if (!apiKey) {
      console.warn('[GooglePlaces] No API key found (VITE_GOOGLE_PLACES_API_KEY)');
      return;
    }

    if (isPlacesReady()) {
      setIsLoaded(true);
      return;
    }

    // Deduplicate: only create one script/promise
    if (!scriptLoadPromise) {
      scriptLoadPromise = new Promise<void>((resolve, reject) => {
        // Use the callback approach so we know the API is fully initialized
        const callbackName = '__googleMapsCallback_' + Date.now();
        (window as Record<string, unknown>)[callbackName] = () => {
          delete (window as Record<string, unknown>)[callbackName];
          resolve();
        };

        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=${callbackName}`;
        script.async = true;
        script.onerror = () => {
          delete (window as Record<string, unknown>)[callbackName];
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
