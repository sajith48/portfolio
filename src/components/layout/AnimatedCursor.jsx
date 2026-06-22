import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

export const AnimatedCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target || !target.closest) return;
      const isInteractive = 
        target.closest('a') !== null || 
        target.closest('button') !== null || 
        target.closest('.group') !== null ||
        target.closest('[role="button"]') !== null;
      setIsHovering(isInteractive);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  const smoothX = useSpring(cursorX, { stiffness: 100, damping: 25, mass: 0.5 });
  const smoothY = useSpring(cursorY, { stiffness: 100, damping: 25, mass: 0.5 });

  const gradient = theme === 'dark' 
    ? 'from-[#8B5CF6] via-[#6366F1] to-[#3B82F6]'
    : 'from-[#8B5CF6]/40 via-[#6366F1]/40 to-[#3B82F6]/40'; // Softer glow in light mode

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-50 hidden md:block"
      style={{
        x: smoothX,
        y: smoothY,
        translateX: '-50%',
        translateY: '-50%'
      }}
    >
      <motion.div
        animate={{
          width: isHovering ? 350 : 200,
          height: isHovering ? 350 : 200,
          opacity: isHovering ? 0.3 : 0.15,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`rounded-full bg-gradient-to-tr ${gradient} blur-[60px]`}
      />
    </motion.div>
  );
};
