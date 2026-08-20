import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, 
  ArrowLeft, 
  FolderGit2, 
  GraduationCap, 
  Mail, 
  Copy, 
  Check, 
  Terminal,
  ShieldAlert,
  SearchX,
  Compass,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { toast } from 'sonner';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';

export const NotFoundPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const quickLinks = [
    {
      title: 'Portfolio Home',
      description: 'Back to overview, timeline & bio',
      path: '/',
      icon: Home,
      color: 'from-cyan-500 to-blue-600',
      badge: 'Main',
    },
    {
      title: 'Projects Archive',
      description: 'AI models & full-stack systems',
      path: '/projects',
      icon: FolderGit2,
      color: 'from-indigo-500 to-purple-600',
      badge: 'Projects',
    },
    {
      title: 'Courses & Certs',
      description: 'Academic background & training',
      path: '/courses',
      icon: GraduationCap,
      color: 'from-emerald-500 to-teal-600',
      badge: 'Academics',
    },
    {
      title: 'Contact Samim',
      description: 'Send a message or report a bug',
      path: '/#contact',
      icon: Mail,
      color: 'from-amber-500 to-orange-600',
      badge: 'Contact',
      isHash: true,
    },
  ];

  const handleCopyPath = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    toast.success('URL copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleQuickNav = (link) => {
    if (link.isHash) {
      navigate('/');
      setTimeout(() => {
        const elem = document.getElementById('contact');
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    } else {
      navigate(link.path);
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      <Navbar />

      {/* Main Hero Container */}
      <main className="flex-1 relative flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-12 sm:py-20 overflow-hidden">
        
        {/* Background Ambient Glows & Cyber Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-gradient-to-tr from-cyan-600/15 via-indigo-600/15 to-purple-600/15 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute top-20 right-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-purple-500/10 rounded-full blur-[140px] pointer-events-none" />

        {/* Master Professional 404 Card */}
        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-3xl rounded-3xl bg-[#090e1a]/85 border border-slate-800/90 shadow-[0_20px_70px_rgba(0,0,0,0.7)] backdrop-blur-2xl p-6 sm:p-10 md:p-12 overflow-hidden"
        >
          {/* Subtle Top Border Glow Line */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/80 to-transparent" />
          <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Status & Meta Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-800/80">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700/60 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
              </span>
              <span className="font-mono text-[11px] sm:text-xs text-slate-300 font-medium tracking-wider uppercase">
                Status: 404 // Not Found
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-slate-500 hidden sm:inline-block">
                Route Target:
              </span>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/80 border border-slate-800 text-cyan-400 font-mono text-xs">
                <span className="max-w-[180px] sm:max-w-[240px] truncate">{location.pathname}</span>
                <button
                  onClick={handleCopyPath}
                  className="p-1 hover:text-white transition-colors ml-1 text-slate-400"
                  title="Copy Path"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Card Hero Section (Clean Tech Iconography, NO Cartoon Lottie) */}
          <div className="text-center py-8 sm:py-10">
            
            {/* Tech Icon Visual with Radar Pulse */}
            <div className="relative inline-flex items-center justify-center mb-6">
              <div className="absolute inset-0 rounded-2xl bg-cyan-500/20 blur-xl animate-pulse" />
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700/80 flex items-center justify-center shadow-xl">
                <SearchX className="w-10 h-10 sm:w-12 sm:h-12 text-cyan-400" />
              </div>
            </div>

            {/* 404 Big Title */}
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 leading-none">
              404
            </h1>

            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-2">
              Page Coordinate Not Found
            </h2>

            <p className="text-sm sm:text-base text-slate-400 mt-3 max-w-lg mx-auto leading-relaxed">
              The requested page does not exist or has been relocated to another section. You can return home or use the directory shortcuts below.
            </p>
          </div>

          {/* Action Hub Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 pb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 via-indigo-600 to-blue-600 hover:from-cyan-400 hover:via-indigo-500 hover:to-blue-500 shadow-lg shadow-indigo-500/20 hover:shadow-cyan-500/30 border border-cyan-400/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <Home className="w-4 h-4" />
              <span>Back to Homepage</span>
            </Link>

            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-slate-200 bg-slate-900/90 hover:bg-slate-800 hover:text-white border border-slate-700/80 hover:border-slate-500 shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous Page</span>
            </button>
          </div>

          {/* Quick Navigation Cards Grid Inside Card */}
          <div className="pt-6 border-t border-slate-800/80">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-cyan-400" />
                Suggested Destinations
              </span>
              <span className="text-[11px] font-mono text-slate-500">
                Quick Jump
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {quickLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.title}
                    onClick={() => handleQuickNav(item)}
                    className="group w-full text-left p-3.5 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-600 transition-all duration-200 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                          {item.title}
                        </div>
                        <div className="text-xs text-slate-400 line-clamp-1">
                          {item.description}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all flex-shrink-0 ml-2" />
                  </button>
                );
              })}
            </div>
          </div>

        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFoundPage;
