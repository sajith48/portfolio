import React from 'react';
import { motion } from 'framer-motion';

export const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[var(--bg-color)]"
    >
      <div className="relative flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-500 flex items-center justify-center font-bold text-white text-2xl tracking-wider shadow-[0_0_40px_rgba(99,102,241,0.5)]"
        >
          SR
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-6 flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" style={{ animationDelay: '0ms' }} />
          <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" style={{ animationDelay: '150ms' }} />
          <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" style={{ animationDelay: '300ms' }} />
        </motion.div>
      </div>
    </motion.div>
  );
};
