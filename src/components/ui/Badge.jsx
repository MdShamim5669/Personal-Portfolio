import React from 'react';
import { cn } from '../../utils/cn';

export default function Badge({ children, variant = 'default', className }) {
  const variants = {
    default: 'bg-slate-800/80 text-cyan-300 border-slate-700/60 hover:border-cyan-500/50',
    cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/20',
    indigo: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30 hover:bg-indigo-500/20',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/30 hover:bg-purple-500/20',
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20',
    rose: 'bg-rose-500/10 text-rose-400 border-rose-500/30 hover:bg-rose-500/20',
    outline: 'bg-transparent text-slate-300 border-slate-700',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border backdrop-blur-md transition-colors duration-200',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
