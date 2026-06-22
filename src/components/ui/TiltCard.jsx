import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '../../utils/cn';

export const TiltCard = ({ children, className = '' }) => {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    x.set(mouseX / width);
    y.set(mouseY / height);

    cardRef.current.style.setProperty('--x', `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty('--y', `${e.clientY - rect.top}px`);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={cn(`glass-panel rounded-2xl relative overflow-hidden group/card`, className)}
    >
      {/* Glow highlight layer */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_250px_at_var(--x,50%)_var(--y,50%),rgba(99,102,241,0.12)_0%,transparent_100%)] opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </motion.div>
  );
};
