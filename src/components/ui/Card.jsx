import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

export default function Card({ children, className, hoverEffect = true, onClick, ...props }) {
  return (
    <motion.div
      whileHover={
        hoverEffect
          ? {
              y: -6,
              scale: 1.015,
              transition: { duration: 0.25, ease: 'easeOut' },
            }
          : {}
      }
      onClick={onClick}
      className={cn(
        'group relative bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 shadow-xl backdrop-blur-xl transition-shadow duration-300 hover:shadow-2xl hover:shadow-cyan-500/10 hover:border-slate-700/80 overflow-hidden',
        onClick && 'cursor-pointer',
        className
      )}
      {...props}
    >
      {/* Subtle Top Border Gradient Highlight */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      {children}
    </motion.div>
  );
}
