import { useMemo, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Hexagon } from 'lucide-react';

interface FloatingHexagon {
  id: number;
  size: number;
  opacity: number;
  left: number;
  top: number;
  duration: number;
  delay: number;
  xOffset: number;
  yOffset: number;
  rotation: number;
}

const CONFIG = {
  count: 30,
  mobileCount: 12,
  sizes: { min: 30, max: 100 },
  opacity: { min: 0.15, max: 0.35 },
  duration: { min: 12, max: 20 },
  drift: { x: 120, y: 150 },
  rotation: { min: -180, max: 180 },
};

const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

const generateHexagons = (count: number): FloatingHexagon[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    size: randomInRange(CONFIG.sizes.min, CONFIG.sizes.max),
    opacity: randomInRange(CONFIG.opacity.min, CONFIG.opacity.max),
    left: randomInRange(-10, 110),
    top: randomInRange(-10, 110),
    duration: randomInRange(CONFIG.duration.min, CONFIG.duration.max),
    delay: randomInRange(0, 5),
    xOffset: randomInRange(-CONFIG.drift.x, CONFIG.drift.x),
    yOffset: randomInRange(-CONFIG.drift.y, CONFIG.drift.y),
    rotation: randomInRange(CONFIG.rotation.min, CONFIG.rotation.max),
  }));
};

const FloatingHexagonBackground = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const hexagons = useMemo(() => generateHexagons(CONFIG.count), []);
  const mobileHexagons = useMemo(() => generateHexagons(CONFIG.mobileCount), []);

  // Disable animations if user prefers reduced motion
  if (prefersReducedMotion) {
    return null;
  }

  const displayHexagons = isMobile ? mobileHexagons : hexagons;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {displayHexagons.map((hex) => (
        <motion.div
          key={hex.id}
          className="absolute"
          style={{
            left: `${hex.left}%`,
            top: `${hex.top}%`,
            width: hex.size,
            height: hex.size,
          }}
          initial={{
            x: 0,
            y: 0,
            rotate: 0,
            opacity: hex.opacity,
          }}
          animate={{
            x: [0, hex.xOffset, -hex.xOffset * 0.7, hex.xOffset * 0.5, 0],
            y: [0, -hex.yOffset, hex.yOffset * 0.6, -hex.yOffset * 0.4, 0],
            rotate: [0, hex.rotation, -hex.rotation * 0.5, hex.rotation * 0.3, 0],
          }}
          transition={{
            duration: hex.duration,
            delay: hex.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Hexagon
            className="w-full h-full text-primary"
            strokeWidth={1}
            style={{
              opacity: hex.opacity,
            }}
          />
          {/* Subtle glow layer */}
          <Hexagon
            className="w-full h-full text-primary absolute inset-0"
            strokeWidth={0}
            style={{
              opacity: hex.opacity * 0.5,
              filter: 'blur(4px)',
              fill: 'currentColor',
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingHexagonBackground;
