import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  disabled,
  isLoading,
  icon: Icon,
  ...props
}) {
  const baseStyles =
    'group relative inline-flex items-center justify-center font-semibold transition-all duration-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/40 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden shadow-md active:scale-95';

  const variants = {
    primary:
      'bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:via-blue-500 hover:to-indigo-500 text-white shadow-cyan-500/25 hover:shadow-cyan-500/50 border border-cyan-400/30 hover:border-cyan-300/60 hover:shadow-[0_0_25px_rgba(6,182,212,0.4)]',
    secondary:
      'bg-slate-900/90 hover:bg-slate-800 text-slate-100 border border-slate-700/80 hover:border-slate-500/80 backdrop-blur-md hover:shadow-[0_0_20px_rgba(148,163,184,0.2)] text-slate-200 hover:text-white',
    outline:
      'bg-transparent border border-slate-700 hover:border-cyan-400/80 text-slate-300 hover:text-cyan-300 hover:bg-cyan-500/10 hover:shadow-[0_0_18px_rgba(6,182,212,0.25)]',
    ghost:
      'bg-transparent text-slate-400 hover:text-slate-100 hover:bg-slate-800/60',
    danger:
      'bg-rose-600/90 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/25 border border-rose-500/30 hover:shadow-[0_0_25px_rgba(244,63,94,0.4)]',
    glow:
      'bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 hover:from-cyan-400 hover:via-indigo-400 hover:to-purple-500 text-white border border-cyan-300/40 shadow-[0_0_20px_rgba(99,102,241,0.35)] hover:shadow-[0_0_30px_rgba(168,85,247,0.55)]',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-5 py-2.5 text-sm gap-2',
  };

  return (
    <motion.button
      whileHover={{ scale: disabled || isLoading ? 1 : 1.02, y: disabled || isLoading ? 0 : -1 }}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.97, y: 0 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {/* Light Sweep Shimmer Effect on Hover */}
      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-1000 ease-in-out pointer-events-none" />

      {/* Button Glow Backdrop */}
      <span className="absolute -inset-px rounded-xl bg-gradient-to-r from-cyan-500/0 via-indigo-500/20 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none blur-sm" />

      {isLoading ? (
        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin relative z-10" />
      ) : Icon ? (
        <Icon className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
      ) : null}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
