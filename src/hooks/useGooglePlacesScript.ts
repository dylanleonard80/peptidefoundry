import { useEffect, useState } from 'react';

function isPlacesReady(): boolean {
  return typeof google !== 'undefined' && !!google.maps?.places;
}

export function useGooglePlacesScript(): boolean {
  const [isLoaded, setIsLoaded] = useState(isPlacesReady);

  useEffect(() => {
    if (isPlacesReady()) {
      setIsLoaded(true);
      return;
    }

    // The script loads async from index.html — poll until ready
    const interval = setInterval(() => {
      if (isPlacesReady()) {
        setIsLoaded(true);
        clearInterval(interval);
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return isLoaded;
}
