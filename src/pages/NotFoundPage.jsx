import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  ArrowLeft, 
  Search, 
  Compass, 
  Terminal, 
  FolderGit2, 
  GraduationCap, 
  Mail, 
  Sparkles, 
  Copy, 
  Check, 
  RefreshCw, 
  Layers, 
  Cpu,
  CornerDownRight,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { toast } from 'sonner';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';

export const NotFoundPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [isDiagnosing, setIsDiagnosing] = useState(false);
  const [diagnosticsLogs, setDiagnosticsLogs] = useState([
    `[INFO] Initializing route analyzer for: "${location.pathname}"`,
    `[WARN] Target endpoint rejected with HTTP/1.1 404 (Resource Not Found)`,
    `[RESOLVE] Scanning active routing tables... Found 0 matching endpoints`,
    `[STATUS] Ready to redirect user to verified operational nodes.`
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  const quickLinks = [
    {
      title: 'Portfolio Home',
      description: 'Return to the main neural hub, biography, experience, and overview.',
      path: '/',
      icon: Home,
      color: 'from-cyan-500 to-blue-600',
      badge: 'Main Hub',
      isExternal: false,
    },
    {
      title: 'Featured Projects',
      description: 'Explore AI systems, full-stack architectures, models, and open-source work.',
      path: '/projects',
      icon: FolderGit2,
      color: 'from-indigo-500 to-purple-600',
      badge: 'Projects',
      isExternal: false,
    },
    {
      title: 'Courses & Certs',
      description: 'Browse academic coursework, specialized AI tracks, and technical certificates.',
      path: '/courses',
      icon: GraduationCap,
      color: 'from-emerald-500 to-teal-600',
      badge: 'Academics',
      isExternal: false,
    },
    {
      title: 'Contact & Inquiries',
      description: 'Report a broken link, discuss a project, or connect directly with Samim.',
      path: '/#contact',
      icon: Mail,
      color: 'from-amber-500 to-orange-600',
      badge: 'Direct Connect',
      isExternal: false,
      isHash: true,
    },
  ];

  const filteredLinks = quickLinks.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.badge.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopyPath = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    toast.success('Current URL copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunDiagnostics = () => {
    if (isDiagnosing) return;
    setIsDiagnosing(true);
    toast.info('Running route traceroute & neural diagnostics...');
    
    setTimeout(() => {
      setDiagnosticsLogs(prev => [
        ...prev,
        `[PING] Route check initiated at ${new Date().toLocaleTimeString()}`,
        `[TRACE] Node: cluster-asia-se1 -> personal-gateway -> 404_HANDLER`,
        `[SUGGESTION] Recommended vector transition: "/" or "/projects"`
      ]);
      setIsDiagnosing(false);
      toast.success('Diagnostics completed. Recovery links verified.');
    }, 1200);
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

      {/* Main Container */}
      <main className="flex-1 relative overflow-hidden flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        
        {/* Background Cybernetic Grid & Glowing Orbs */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_45%,#000_70%,transparent_100%)] pointer-events-none" />
        
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-gradient-to-tr from-cyan-600/15 via-indigo-600/15 to-purple-600/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Content Wrapper */}
        <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center">
          
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/70 shadow-lg shadow-black/40 backdrop-blur-md mb-6"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
            </span>
            <span className="font-mono text-xs text-slate-300 tracking-wider">
              HTTP 404 // ROUTE_UNRESOLVED
            </span>
            <span className="w-1 h-1 rounded-full bg-slate-600" />
            <span className="font-mono text-xs text-rose-400 font-semibold">
              ERR_NODE_DISCONNECTED
            </span>
          </motion.div>

          {/* Hero Glitch 404 Headline */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center relative mb-4"
          >
            <div className="relative inline-block select-none">
              <h1 className="text-8xl sm:text-9xl md:text-[11rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-600 leading-none drop-shadow-2xl">
                404
              </h1>
              {/* Subtle Glowing Underlay */}
              <div className="absolute inset-0 -z-10 text-8xl sm:text-9xl md:text-[11rem] font-black tracking-tighter text-cyan-500/20 blur-xl leading-none select-none">
                404
              </div>
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mt-1"
            >
              Lost in <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400">Latent Space</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-sm sm:text-base text-slate-400 mt-3 max-w-xl mx-auto leading-relaxed"
            >
              The requested coordinate <code className="text-cyan-300 bg-cyan-950/60 border border-cyan-800/60 px-2 py-0.5 rounded-md font-mono text-xs sm:text-sm font-semibold">{location.pathname}</code> does not correspond to an active endpoint in this neural portfolio.
            </motion.p>
          </motion.div>

          {/* Primary Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex flex-wrap items-center justify-center gap-3.5 my-6"
          >
            <Link
              to="/"
              className="group relative inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-cyan-500 via-indigo-600 to-blue-600 hover:from-cyan-400 hover:via-indigo-500 hover:to-blue-500 shadow-lg shadow-indigo-500/25 hover:shadow-cyan-500/35 border border-cyan-400/30 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
            >
              <Home className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
              <span>Return to Home Base</span>
            </Link>

            <button
              onClick={() => window.history.back()}
              className="group inline-flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-semibold text-slate-200 bg-slate-900/90 hover:bg-slate-800 hover:text-white border border-slate-700/80 hover:border-slate-500 shadow-md backdrop-blur-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Step Backward</span>
            </button>

            <button
              onClick={handleCopyPath}
              className="group inline-flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-slate-300 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-600 backdrop-blur-md transition-all duration-200"
              title="Copy URL"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400 font-mono text-xs">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-400 group-hover:text-slate-200 transition-colors" />
                  <span className="text-xs font-mono text-slate-400 group-hover:text-slate-300">Copy URL</span>
                </>
              )}
            </button>
          </motion.div>

          {/* Quick Navigation Cluster (Card Grid) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="w-full mt-6"
          >
            <div className="flex items-center justify-between mb-4 px-1">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-cyan-400" />
                <span className="text-xs sm:text-sm font-semibold tracking-wide uppercase text-slate-300">
                  Verified Destination Clusters
                </span>
              </div>
              <span className="text-xs text-slate-500 font-mono">
                {filteredLinks.length} destinations ready
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredLinks.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    onClick={() => handleQuickNav(item)}
                    className="group relative cursor-pointer p-4 sm:p-5 rounded-2xl bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800/90 hover:border-indigo-500/50 backdrop-blur-xl transition-all duration-300 shadow-lg hover:shadow-indigo-500/10 flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Row: Icon & Badge */}
                      <div className="flex items-center justify-between mb-3">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-md shadow-black/40 group-hover:scale-110 transition-transform duration-300`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700/60">
                          {item.badge}
                        </span>
                      </div>

                      {/* Title & Desc */}
                      <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1.5 leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    {/* Bottom Action Hint */}
                    <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-cyan-400 transition-colors">
                      <span>Navigate</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Interactive Diagnostic Terminal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="w-full mt-10 rounded-2xl bg-[#090e1a]/90 border border-slate-800 shadow-2xl overflow-hidden backdrop-blur-xl"
          >
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-slate-800/90">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                </div>
                <span className="text-xs font-mono text-slate-400 ml-2 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  neural-route-diagnostics.sh
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleRunDiagnostics}
                  disabled={isDiagnosing}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white border border-slate-700 disabled:opacity-50 transition-colors"
                >
                  <RefreshCw className={`w-3 h-3 ${isDiagnosing ? 'animate-spin text-cyan-400' : ''}`} />
                  {isDiagnosing ? 'Analyzing...' : 'Run Traceroute'}
                </button>
              </div>
            </div>

            {/* Terminal Body */}
            <div className="p-4 sm:p-5 font-mono text-xs space-y-2 text-slate-300 bg-black/40 overflow-x-auto">
              <div className="flex items-start gap-2 text-slate-500">
                <span className="text-cyan-400">samim@portfolio-node:~$</span>
                <span>curl -I https://samim.dev{location.pathname}</span>
              </div>
              {diagnosticsLogs.map((log, idx) => (
                <div 
                  key={idx} 
                  className={`leading-relaxed ${
                    log.includes('[WARN]') 
                      ? 'text-amber-400' 
                      : log.includes('[PING]') || log.includes('[TRACE]') 
                      ? 'text-cyan-300' 
                      : log.includes('[SUGGESTION]') 
                      ? 'text-emerald-400 font-semibold' 
                      : 'text-slate-300'
                  }`}
                >
                  {log}
                </div>
              ))}
              <div className="flex items-center gap-2 pt-1 text-slate-400">
                <span className="text-emerald-400">➜</span>
                <span className="animate-pulse">Waiting for telemetry input...</span>
              </div>
            </div>
          </motion.div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFoundPage;
