import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
}

const CursorSparkles = () => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
    // Disable on mobile/touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    setIsEnabled(!isTouchDevice && !prefersReducedMotion);
  }, []);

  const createSparkle = useCallback((x: number, y: number) => {
    const sparkle: Sparkle = {
      id: Date.now() + Math.random(),
      x,
      y,
      size: Math.random() * 4 + 4, // 4-8px
    };
    
    setSparkles(prev => {
      // Limit to 40 sparkles max
      const newSparkles = [...prev, sparkle];
      if (newSparkles.length > 40) {
        return newSparkles.slice(-40);
      }
      return newSparkles;
    });

    // Remove sparkle after animation
    setTimeout(() => {
      setSparkles(prev => prev.filter(s => s.id !== sparkle.id));
    }, 800);
  }, []);

  useEffect(() => {
    if (!isEnabled) return;

    let lastTime = 0;
    const throttleMs = 60; // Create sparkle every 60ms max

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastTime < throttleMs) return;
      lastTime = now;

      // Only create sparkles with some randomness for organic feel
      if (Math.random() > 0.4) {
        createSparkle(e.clientX, e.clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isEnabled, createSparkle]);

  if (!isEnabled) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      <AnimatePresence>
        {sparkles.map(sparkle => (
          <motion.div
            key={sparkle.id}
            initial={{ 
              opacity: 0.8, 
              scale: 1,
              x: sparkle.x - sparkle.size / 2,
              y: sparkle.y - sparkle.size / 2,
            }}
            animate={{ 
              opacity: 0, 
              scale: 0.5,
              y: sparkle.y - sparkle.size / 2 - 20,
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 0.8, 
              ease: 'easeOut' 
            }}
            className="absolute rounded-full"
            style={{
              width: sparkle.size,
              height: sparkle.size,
              background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,248,240,0.6) 50%, transparent 100%)',
              boxShadow: '0 0 6px 2px rgba(255,255,255,0.4)',
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default CursorSparkles;
