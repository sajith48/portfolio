import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronUp } from 'react-icons/fi';
import { Magnetic } from '../ui/Magnetic';

export const BackToTop = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {showBackToTop && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed bottom-8 right-8 z-40"
        >
          <Magnetic>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-12 h-12 rounded-full glass-panel border-white/10 hover:border-indigo-500/30 text-[var(--color-text)] flex items-center justify-center shadow-2xl cursor-pointer"
              aria-label="Back to top"
            >
              <FiChevronUp className="w-6 h-6 animate-pulse" />
            </button>
          </Magnetic>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
