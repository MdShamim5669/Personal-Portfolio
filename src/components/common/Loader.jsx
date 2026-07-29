import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950">
      <div className="w-64 h-64 md:w-96 md:h-96 -mb-10 md:-mb-16">
        <DotLottieReact
          src="https://lottie.host/16852e1d-fce5-4700-9ff3-45b86b23d725/OxZS0H1u70.json"
          loop
          autoplay
        />
      </div>
      <div className="flex flex-col items-center animate-pulse">
        <span className="text-xl mt-10 md:text-3xl font-extrabold tracking-[0.3em] text-white">
          MD. SAMIM
        </span>
        <span className="text-xs md:text-sm font-semibold tracking-[0.4em] text-cyan-400 uppercase mt-2">
          Portfolio
        </span>
      </div>
    </div>
  );
};
