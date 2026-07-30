import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { Navbar } from '../components/common/Navbar';

export const NotFoundPage = () => {
  useEffect(() => {
    // Load dotlottie-wc script dynamically
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@lottiefiles/dotlottie-wc@0.9.4/dist/dotlottie-wc.js';
    script.type = 'module';
    document.head.appendChild(script);

    return () => {
      // Cleanup on unmount
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#070A14] text-white flex flex-col">
      <Navbar />

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden">
        {/* Ambient Background Glows */}
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />

        {/* Lottie Animation */}
        <div className="relative z-10 mb-6">
          <dotlottie-wc
            src="https://lottie.host/71b278b0-b2f6-4f45-ac7d-259101daf566/8TXte4OOtl.lottie"
            style={{ width: '320px', height: '320px' }}
            autoplay
            loop
          />
        </div>

        {/* Error Text */}
        <div className="relative z-10 text-center max-w-lg space-y-4">
          <h1 className="text-7xl sm:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 tracking-tight">
            404
          </h1>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Page Not Found
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed max-w-md mx-auto">
            Oops! The page you're looking for doesn't exist or has been moved. 
            Let's get you back on track.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <Link
              to="/"
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:via-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 border border-cyan-400/30 hover:scale-105 transition-all duration-300"
            >
              <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
              Back to Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-slate-500/80 backdrop-blur-md hover:scale-105 transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Go Back
            </button>
          </div>
        </div>

        {/* Decorative floating elements */}
        <div className="absolute top-20 right-20 opacity-10 animate-pulse">
          <Search className="w-24 h-24 text-cyan-400" />
        </div>
      </div>
    </div>
  );
};
