import React from 'react';
import { BrainCircuit } from 'lucide-react';

export const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030712] text-white selection:bg-cyan-500/30">
      {/* Background Ambient Glow */}
      <div className="absolute w-72 h-72 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Quantum / Neural Glowing Spinner */}
      <div className="relative flex items-center justify-center mb-8">
        {/* Outer Orbit Ring */}
        <div className="w-20 h-20 rounded-full border-2 border-cyan-500/20 border-t-cyan-400 animate-spin" />
        
        {/* Inner Pulse Ring */}
        <div className="absolute w-14 h-14 rounded-full border-2 border-indigo-500/20 border-b-indigo-400 animate-[spin_1.5s_linear_infinite_reverse]" />
        
        {/* Center Icon */}
        <div className="absolute w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
          <BrainCircuit className="w-5 h-5 text-white animate-pulse" />
        </div>
      </div>

      {/* Brand Title */}
      <div className="flex flex-col items-center space-y-1.5 z-10">
        <span className="text-lg md:text-xl font-extrabold tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
          MD. SAMIM
        </span>
        <span className="text-[10px] md:text-xs font-mono font-semibold tracking-[0.35em] text-cyan-400 uppercase">
          AI & Backend Portfolio
        </span>
      </div>
    </div>
  );
};

export default Loader;
