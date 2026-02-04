import { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Hexagon } from 'lucide-react';

// ============ Configuration Constants ============
const SWARM_CONFIG = {
  hexagonCount: 60,
  sizes: [12, 16, 20, 24, 28, 32],
  opacityRange: { min: 0.4, max: 0.9 },
  durationRange: { min: 0.8, max: 1.4 },
  delayRange: { min: 0.05, max: 0.5 },
};

const TIMING = {
  overlayFadeIn: 0.3,
  swarmDuration: 1.2,
  totalDuration: 1600, // ms before page handoff
};

// ============ Types ============
interface SwarmHexagon {
  id: number;
  size: number;
  opacity: number;
  startX: number;
  startY: number;
  delay: number;
  duration: number;
}

interface FoundryClubTransitionProps {
  isActive: boolean;
  onComplete: () => void;
}

// ============ Utility Functions ============
const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;
const randomFromArray = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const generateStartPosition = (): { x: number; y: number } => {
  // Randomly pick an edge (top, bottom, left, right) and position along it
  const edge = Math.floor(Math.random() * 4);
  const offset = randomInRange(-20, 120); // percentage along the edge
  
  switch (edge) {
    case 0: // top
      return { x: offset, y: -15 };
    case 1: // bottom
      return { x: offset, y: 115 };
    case 2: // left
      return { x: -15, y: offset };
    case 3: // right
    default:
      return { x: 115, y: offset };
  }
};

const generateSwarmHexagons = (count: number): SwarmHexagon[] => {
  return Array.from({ length: count }, (_, i) => {
    const startPos = generateStartPosition();
    return {
      id: i,
      size: randomFromArray(SWARM_CONFIG.sizes),
      opacity: randomInRange(SWARM_CONFIG.opacityRange.min, SWARM_CONFIG.opacityRange.max),
      startX: startPos.x,
      startY: startPos.y,
      delay: randomInRange(SWARM_CONFIG.delayRange.min, SWARM_CONFIG.delayRange.max),
      duration: randomInRange(SWARM_CONFIG.durationRange.min, SWARM_CONFIG.durationRange.max),
    };
  });
};

// ============ Swarm Hexagon Component ============
const SwarmHexagonItem = ({ hexagon }: { hexagon: SwarmHexagon }) => {
  // End position is center of screen with slight random variance
  const endX = 50 + randomInRange(-8, 8);
  const endY = 45 + randomInRange(-8, 8);
  
  return (
    <motion.div
      initial={{ 
        left: `${hexagon.startX}%`, 
        top: `${hexagon.startY}%`,
        opacity: 0,
        scale: 0.5,
      }}
      animate={{ 
        left: `${endX}%`, 
        top: `${endY}%`,
        opacity: [0, hexagon.opacity, hexagon.opacity, 0],
        scale: [0.5, 1, 1, 0.3],
      }}
      transition={{ 
        duration: hexagon.duration,
        delay: hexagon.delay,
        ease: [0.25, 0.1, 0.25, 1], // Custom easing for smooth flow
      }}
      className="absolute pointer-events-none"
      style={{
        width: hexagon.size,
        height: hexagon.size,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Hexagon 
        className="w-full h-full text-primary fill-primary/30" 
        strokeWidth={1.5}
      />
    </motion.div>
  );
};

// ============ Hexagon Swarm Container ============
const HexagonSwarm = ({ isActive }: { isActive: boolean }) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);
  
  const hexagons = useMemo(() => {
    if (prefersReducedMotion || !isActive) return [];
    return generateSwarmHexagons(SWARM_CONFIG.hexagonCount);
  }, [isActive, prefersReducedMotion]);
  
  if (prefersReducedMotion || !isActive) return null;
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {hexagons.map((hexagon) => (
        <SwarmHexagonItem key={hexagon.id} hexagon={hexagon} />
      ))}
    </div>
  );
};

// ============ Main Transition Component ============
const FoundryClubTransition = ({ isActive, onComplete }: FoundryClubTransitionProps) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);
  
  useEffect(() => {
    if (isActive) {
      const duration = prefersReducedMotion ? 600 : TIMING.totalDuration;
      const timer = setTimeout(() => {
        onComplete();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isActive, onComplete, prefersReducedMotion]);

  return createPortal(
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: TIMING.overlayFadeIn }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-foundry-club-dark overflow-hidden"
        >
          {/* Background gradient overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-gradient-to-br from-foundry-club-dark via-foundry-club-dark to-primary/10" 
          />
          
          {/* Radial glow at center */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.3, scale: 1.5 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-96 md:h-96 rounded-full bg-primary/20 blur-3xl pointer-events-none"
          />
          
          {/* Hexagon Swarm Layer */}
          <HexagonSwarm isActive={isActive} />
          
          {/* Main hexagon logo - stays on top */}
          <motion.div
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.2,
              type: "spring",
              stiffness: 150,
              damping: 20
            }}
            className="relative z-20"
          >
            {/* Outer glow ring */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ 
                opacity: [0, 0.8, 0.5], 
                scale: [0.6, 1.3, 1.2] 
              }}
              transition={{ duration: 1.2, delay: 0.4 }}
              className="absolute inset-0 blur-xl pointer-events-none"
            >
              <Hexagon 
                className="h-24 w-24 md:h-32 md:w-32 text-primary fill-primary/20" 
                strokeWidth={2} 
              />
            </motion.div>
            
            {/* Inner glow */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.6, 0.4] }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute inset-0 blur-md pointer-events-none"
            >
              <Hexagon 
                className="h-24 w-24 md:h-32 md:w-32 text-primary fill-primary/30" 
                strokeWidth={1.5} 
              />
            </motion.div>
            
            {/* Pulse effect when hexagons merge */}
            <motion.div
              initial={{ opacity: 0, scale: 1 }}
              animate={{ 
                opacity: [0, 0.5, 0], 
                scale: [1, 1.8, 2] 
              }}
              transition={{ 
                duration: 0.6, 
                delay: 1,
                ease: "easeOut" 
              }}
              className="absolute inset-0 pointer-events-none"
            >
              <Hexagon 
                className="h-24 w-24 md:h-32 md:w-32 text-primary" 
                strokeWidth={1} 
              />
            </motion.div>
            
            {/* Main solid hexagon */}
            <motion.div
              animate={{ 
                filter: ["brightness(1)", "brightness(1.3)", "brightness(1)"]
              }}
              transition={{ 
                duration: 0.4, 
                delay: 1.1 
              }}
            >
              <Hexagon 
                className="h-24 w-24 md:h-32 md:w-32 text-primary" 
                strokeWidth={1.5}
              />
            </motion.div>
          </motion.div>
          
          {/* Welcome text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="relative z-20 mt-8 text-center px-4"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Welcome to The Foundry Club
            </h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="text-white/70 text-sm md:text-base tracking-wide"
            >
              Exclusive wholesale access • Priority shipping • Early access
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default FoundryClubTransition;
