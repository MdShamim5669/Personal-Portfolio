import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Brain, Code, Cpu, Database, Layers, Wrench, Sparkles, Sliders, ExternalLink, X, ArrowLeft, CheckCircle2, GitFork, BarChart3 } from 'lucide-react';
import TypingHeading from '../ui/TypingHeading';
import SkillActivityChart from '../ui/SkillActivityChart';
import SkillCategoryChart from '../ui/SkillCategoryChart';

import claudeLogo from '../../../Docs/tech-logos/claude-ai.png';
import cloudinaryLogo from '../../../Docs/tech-logos/cloudinary.png';
import expressLogo from '../../../Docs/tech-logos/expressjs.png';
import jsLogo from '../../../Docs/tech-logos/javascript.png';
import nextLogo from '../../../Docs/tech-logos/nextjs.png';
import nodeLogo from '../../../Docs/tech-logos/nodejs.png';
import pgLogo from '../../../Docs/tech-logos/postgresql.png';
import prismaLogo from '../../../Docs/tech-logos/prisma.png';
import pythonLogo from '../../../Docs/tech-logos/python.png';
import pytorchLogo from '../../../Docs/tech-logos/pytorch.png';
import reactLogo from '../../../Docs/tech-logos/reactjs.png';
import tsLogo from '../../../Docs/tech-logos/typescript.png';

export const SkillsSection = ({ skills = [] }) => {
  const [activeModalSkill, setActiveModalSkill] = useState(null);
  const [modalTilt, setModalTilt] = useState({ x: 0, y: 0 });

  const handleModalMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setModalTilt({ x: -(y / (rect.height / 2)) * 10, y: (x / (rect.width / 2)) * 10 });
  };

  const handleModalMouseLeave = () => {
    setModalTilt({ x: 0, y: 0 });
  };

  const categories = [
    { id: 'LANGUAGES', label: 'Languages', icon: Code },
    { id: 'BACKEND', label: 'Backend', icon: Cpu },
    { id: 'FRONTEND', label: 'Frontend', icon: Layers },
    { id: 'DATABASES', label: 'Databases', icon: Database },
    { id: 'ML_AI', label: 'Machine Learning', icon: Brain },
    { id: 'AI_TOOLS', label: 'AI Tools', icon: Bot },
    { id: 'TOOLS', label: 'Dev Tools', icon: Wrench },
  ];

  const [activeCategory, setActiveCategory] = useState('LANGUAGES');

  // Category specific data mapping for both charts
  const categorySkillData = {
    LANGUAGES: [
      { name: 'JavaScript', target: 'Client Logic', leftVal: 88, rightVal: 95 },
      { name: 'Python', target: 'ML & Analytics', leftVal: 92, rightVal: 94 },
      { name: 'TypeScript', target: 'Type Safety', leftVal: 85, rightVal: 90 },
      { name: 'SQL', target: 'Query Engine', leftVal: 90, rightVal: 92 },
      { name: 'C++', target: 'Algorithms', leftVal: 78, rightVal: 80 },
    ],
    BACKEND: [
      { name: 'Node.js', target: 'Microservices', leftVal: 90, rightVal: 95 },
      { name: 'Express.js', target: 'REST Routing', leftVal: 92, rightVal: 96 },
      { name: 'PostgreSQL', target: 'ACID Schemas', leftVal: 88, rightVal: 92 },
      { name: 'Prisma ORM', target: 'Type-Safe ORM', leftVal: 94, rightVal: 95 },
      { name: 'REST APIs', target: 'JWT Auth', leftVal: 95, rightVal: 98 },
    ],
    FRONTEND: [
      { name: 'React.js', target: 'Component UI', leftVal: 92, rightVal: 96 },
      { name: 'Next.js', target: 'SSR & SSG', leftVal: 90, rightVal: 94 },
      { name: 'Tailwind CSS', target: 'Utility System', leftVal: 95, rightVal: 98 },
      { name: 'Framer Motion', target: 'Micro Animations', leftVal: 88, rightVal: 92 },
      { name: 'Redux Toolkit', target: 'State Store', leftVal: 85, rightVal: 88 },
    ],
    DATABASES: [
      { name: 'PostgreSQL', target: 'Relational DB', leftVal: 92, rightVal: 95 },
      { name: 'Prisma ORM', target: 'DB Migrations', leftVal: 94, rightVal: 96 },
      { name: 'MongoDB', target: 'Document Store', leftVal: 85, rightVal: 88 },
      { name: 'Redis', target: 'In-Memory Cache', leftVal: 82, rightVal: 86 },
      { name: 'Cloudinary', target: 'Asset CDN', leftVal: 90, rightVal: 92 },
    ],
    ML_AI: [
      { name: 'PyTorch', target: 'Neural Networks', leftVal: 88, rightVal: 92 },
      { name: 'Scikit-Learn', target: 'ML Classifiers', leftVal: 92, rightVal: 94 },
      { name: 'Pandas', target: 'Data Analytics', leftVal: 95, rightVal: 96 },
      { name: 'NumPy', target: 'Matrix Compute', leftVal: 94, rightVal: 95 },
      { name: 'SMOTE', target: 'Class Balance', leftVal: 90, rightVal: 91 },
    ],
    AI_TOOLS: [
      { name: 'Claude AI', target: 'Code Generation', leftVal: 95, rightVal: 98 },
      { name: 'ChatGPT', target: 'Architecture', leftVal: 94, rightVal: 96 },
      { name: 'Prompt Eng.', target: 'Context Tuning', leftVal: 96, rightVal: 97 },
      { name: 'AI Agents', target: 'Auto Workflows', leftVal: 92, rightVal: 94 },
      { name: 'Cursor IDE', target: 'Pair Agent', leftVal: 90, rightVal: 95 },
    ],
    TOOLS: [
      { name: 'Git', target: 'Version Control', leftVal: 95, rightVal: 98 },
      { name: 'GitHub', target: 'CI/CD Pipelines', leftVal: 96, rightVal: 97 },
      { name: 'VS Code', target: 'IDE Workspace', leftVal: 98, rightVal: 99 },
      { name: 'Vite', target: 'Fast Bundler', leftVal: 94, rightVal: 96 },
      { name: 'Postman', target: 'API Testing', leftVal: 92, rightVal: 95 },
    ],
  };

  const activeCategoryObj = categories.find((c) => c.id === activeCategory) || categories[0];

  // Helper to extract skills for selected category dynamically from props or fallback
  const getSkillsForCategory = (catId) => {
    const fromProps = skills.filter((s) => s.category?.toUpperCase() === catId.toUpperCase());
    if (fromProps.length > 0) {
      return fromProps.map((s) => ({
        name: s.name,
        proficiency: s.proficiency || 85,
        category: s.category,
      }));
    }
    return (categorySkillData[catId] || []).map((s) => ({
      name: s.name,
      proficiency: s.rightVal || s.leftVal || 90,
      category: catId,
    }));
  };

  const activeCategorySkills = getSkillsForCategory(activeCategory);

  // Ribbon Colors matching Left Image (Purple, Cyan, Yellow, Orange, Emerald)
  const ribbonColors = [
    { start: '#c084fc', end: '#a855f7', fill: '#a855f7' }, // Purple
    { start: '#38bdf8', end: '#06b6d4', fill: '#06b6d4' }, // Cyan
    { start: '#fde047', end: '#eab308', fill: '#eab308' }, // Yellow
    { start: '#fb923c', end: '#ea580c', fill: '#d97706' }, // Orange / Bronze
    { start: '#2dd4bf', end: '#10b981', fill: '#14b8a6' }, // Emerald / Teal
  ];

  return (
    <section id="skills" className="w-full py-20 px-4 lg:px-8 bg-[#090D16] border-t border-slate-800/60 relative">
      <div className="max-w-7xl mx-auto relative">
        {/* Background glow */}
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <span className="text-cyan-400 font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-1.5 mb-1">
          <Sparkles className="w-4 h-4 text-cyan-400" /> Technical Expertise
        </span>
        <TypingHeading 
          text="Skills & Competencies" 
          className="text-3xl sm:text-4xl font-extrabold text-white mt-1 tracking-tight" 
        />
        <p className="text-slate-400 text-sm mt-3 leading-relaxed">
          A breakdown of my technical stack across full-stack web platforms, machine learning frameworks, databases, and development tools.
        </p>
      </div>

      {/* Marquee Infinite Ticker Row */}
      <div className="mb-10">
        <div className="bg-slate-900/80 backdrop-blur-2xl p-4 sm:p-5 rounded-3xl border border-slate-800/90 shadow-xl overflow-hidden">
          <div className="flex-1 overflow-hidden relative z-10 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <motion.div
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              className="flex items-center gap-4 whitespace-nowrap w-max"
            >
              {[
                { name: 'Next.js', category: 'Frontend Framework', desc: 'React SSR Framework', fullDesc: 'SSR/SSG Web platform builder.', features: ['SSR', 'Static Sites', 'API Routes'], logo: nextLogo, url: 'https://nextjs.org' },
                { name: 'Python', category: 'ML & Data Science', desc: 'AI Runtime', fullDesc: 'Primary language for ML & PyTorch pipelines.', features: ['PyTorch', 'Scikit-Learn', 'Pandas'], logo: pythonLogo, url: 'https://python.org' },
                { name: 'Node.js', category: 'Backend Runtime', desc: 'JS Engine', fullDesc: 'Asynchronous event-driven backend runtime.', features: ['REST APIs', 'Async I/O', 'Prisma Integration'], logo: nodeLogo, url: 'https://nodejs.org' },
                { name: 'React.js', category: 'Frontend UI', desc: 'UI Library', fullDesc: 'Component UI rendering and hooks state.', features: ['Virtual DOM', 'React Hooks', 'Framer Motion'], logo: reactLogo, url: 'https://react.dev' },
                { name: 'PostgreSQL', category: 'Database', desc: 'Relational SQL', fullDesc: 'Enterprise relational SQL engine.', features: ['Relational Data', 'Prisma ORM', 'ACID Transactions'], logo: pgLogo, url: 'https://postgresql.org' },
                { name: 'TypeScript', category: 'Language', desc: 'Typed JS', fullDesc: 'Compile-time strongly-typed JavaScript.', features: ['Compile-Time Types', 'Strict Interfaces', 'Generics'], logo: tsLogo, url: 'https://typescriptlang.org' },
                { name: 'PyTorch', category: 'Deep Learning', desc: 'Neural Networks', fullDesc: 'Deep learning matrix computation library.', features: ['Dynamic Tensors', 'Neural Nets', 'GPU Acceleration'], logo: pytorchLogo, url: 'https://pytorch.org' },
                { name: 'Prisma ORM', category: 'Backend Tool', desc: 'Type-Safe ORM', fullDesc: 'Node.js & TypeScript ORM schema tool.', features: ['Type-Safe Queries', 'DB Migrations', 'PostgreSQL Binding'], logo: prismaLogo, url: 'https://prisma.io' },
                { name: 'Claude AI', category: 'AI Assistant', desc: 'LLM Code Model', fullDesc: 'State-of-the-art AI assistant for software architecture.', features: ['Code Generation', 'AI Pair Agent', 'System Prompting'], logo: claudeLogo, url: 'https://claude.ai' },
                { name: 'Express.js', category: 'Backend Framework', desc: 'REST Microservices', fullDesc: 'Minimalist fast web framework for Node.js.', features: ['Middleware Stack', 'REST Endpoints', 'High Throughput'], logo: expressLogo, url: 'https://expressjs.com' },
                { name: 'JavaScript', category: 'Programming Language', desc: 'Web Runtime', fullDesc: 'Core language powering web frontends and backends.', features: ['ES6+ Syntax', 'Async/Await', 'Event Loop'], logo: jsLogo, url: 'https://javascript.info' },
                { name: 'Cloudinary', category: 'Media CDN', desc: 'Cloud Asset Storage', fullDesc: 'Cloud-based image CDN management.', features: ['WebP Compression', 'Dynamic Image Resizing', 'CDN Distribution'], logo: cloudinaryLogo, url: 'https://cloudinary.com' },
                // Duplicated for gapless infinite chain looping
                { name: 'Next.js', category: 'Frontend Framework', desc: 'React SSR Framework', fullDesc: 'SSR/SSG Web platform builder.', features: ['SSR', 'Static Sites', 'API Routes'], logo: nextLogo, url: 'https://nextjs.org' },
                { name: 'Python', category: 'ML & Data Science', desc: 'AI Runtime', fullDesc: 'Primary language for ML & PyTorch pipelines.', features: ['PyTorch', 'Scikit-Learn', 'Pandas'], logo: pythonLogo, url: 'https://python.org' },
                { name: 'Node.js', category: 'Backend Runtime', desc: 'JS Engine', fullDesc: 'Asynchronous event-driven backend runtime.', features: ['REST APIs', 'Async I/O', 'Prisma Integration'], logo: nodeLogo, url: 'https://nodejs.org' },
                { name: 'React.js', category: 'Frontend UI', desc: 'UI Library', fullDesc: 'Component UI rendering and hooks state.', features: ['Virtual DOM', 'React Hooks', 'Framer Motion'], logo: reactLogo, url: 'https://react.dev' },
                { name: 'PostgreSQL', category: 'Database', desc: 'Relational SQL', fullDesc: 'Enterprise relational SQL engine.', features: ['Relational Data', 'Prisma ORM', 'ACID Transactions'], logo: pgLogo, url: 'https://postgresql.org' },
                { name: 'TypeScript', category: 'Language', desc: 'Typed JS', fullDesc: 'Compile-time strongly-typed JavaScript.', features: ['Compile-Time Types', 'Strict Interfaces', 'Generics'], logo: tsLogo, url: 'https://typescriptlang.org' },
                { name: 'PyTorch', category: 'Deep Learning', desc: 'Neural Networks', fullDesc: 'Deep learning matrix computation library.', features: ['Dynamic Tensors', 'Neural Nets', 'GPU Acceleration'], logo: pytorchLogo, url: 'https://pytorch.org' },
                { name: 'Prisma ORM', category: 'Backend Tool', desc: 'Type-Safe ORM', fullDesc: 'Node.js & TypeScript ORM schema tool.', features: ['Type-Safe Queries', 'DB Migrations', 'PostgreSQL Binding'], logo: prismaLogo, url: 'https://prisma.io' },
                { name: 'Claude AI', category: 'AI Assistant', desc: 'LLM Code Model', fullDesc: 'State-of-the-art AI assistant for software architecture.', features: ['Code Generation', 'AI Pair Agent', 'System Prompting'], logo: claudeLogo, url: 'https://claude.ai' },
                { name: 'Express.js', category: 'Backend Framework', desc: 'REST Microservices', fullDesc: 'Minimalist fast web framework for Node.js.', features: ['Middleware Stack', 'REST Endpoints', 'High Throughput'], logo: expressLogo, url: 'https://expressjs.com' },
                { name: 'JavaScript', category: 'Programming Language', desc: 'Web Runtime', fullDesc: 'Core language powering web frontends and backends.', features: ['ES6+ Syntax', 'Async/Await', 'Event Loop'], logo: jsLogo, url: 'https://javascript.info' },
                { name: 'Cloudinary', category: 'Media CDN', desc: 'Cloud Asset Storage', fullDesc: 'Cloud-based image CDN management.', features: ['WebP Compression', 'Dynamic Image Resizing', 'CDN Distribution'], logo: cloudinaryLogo, url: 'https://cloudinary.com' },
              ].map((s, idx) => (
                <button
                  key={`${s.name}-${idx}`}
                  onClick={() => setActiveModalSkill(s)}
                  title={`View details for ${s.name}`}
                  className="group relative p-2.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-400/80 transition-all duration-300 shadow-md hover:scale-110 cursor-pointer shrink-0 z-10"
                >
                  <img
                    src={s.logo}
                    alt={s.name}
                    className="w-9 h-9 object-contain filter drop-shadow-[0_0_6px_rgba(255,255,255,0.4)] group-hover:drop-shadow-[0_0_10px_rgba(6,182,212,0.8)] transition-all"
                  />
                </button>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Category Selection Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-8 border-b border-slate-800/80 pb-3">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`relative flex items-center gap-2 py-2 px-1 text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 ${
                isActive
                  ? 'text-cyan-400 drop-shadow-[0_0_12px_rgba(6,182,212,0.7)]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className={`w-4 h-4 transition-transform duration-300 ${isActive ? 'scale-110 text-cyan-400' : 'text-slate-400'}`} />
              <span>{cat.label}</span>

              {isActive && (
                <motion.div
                  layoutId="activeCategoryUnderline"
                  className="absolute -bottom-[13px] left-0 right-0 h-[2.5px] bg-gradient-to-r from-cyan-400 via-indigo-500 to-amber-400 rounded-full shadow-[0_0_10px_#06b6d4]"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Category Mastery ApexChart (Driven by activeCategory tabs above) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.25 }}
          className="mb-8"
        >
          <SkillCategoryChart
            categoryTitle={activeCategoryObj.label}
            skillsData={activeCategorySkills}
          />
        </motion.div>
      </AnimatePresence>

      {/* Repository & Skill Commit Activity Timeline Chart */}
      <div className="mt-8">
        <SkillActivityChart skills={skills} />
      </div>

      {/* Large Interactive 3D Skill Detail Modal Window */}
      <AnimatePresence>
        {activeModalSkill && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotateX: modalTilt.x, rotateY: modalTilt.y }}
              exit={{ opacity: 0, scale: 0.85, y: 25 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              onMouseMove={handleModalMouseMove}
              onMouseLeave={handleModalMouseLeave}
              style={{ transformStyle: 'preserve-3d' }}
              className="relative w-full max-w-lg rounded-3xl bg-slate-950/95 border border-cyan-500/50 p-6 sm:p-8 shadow-[0_0_70px_rgba(6,182,212,0.4)] text-left overflow-hidden group/modal"
            >
              <button
                onClick={() => setActiveModalSkill(null)}
                className="absolute top-5 right-5 p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 hover:border-slate-700 transition-all z-20 hover:rotate-90"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="w-20 h-20 rounded-2xl bg-slate-900 border border-cyan-400/50 p-3.5 flex items-center justify-center shadow-xl shrink-0">
                  <img src={activeModalSkill.logo} alt={activeModalSkill.name} className="w-full h-full object-contain filter drop-shadow-[0_0_12px_rgba(6,182,212,0.9)]" />
                </div>
                <div>
                  <span className="px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-400 text-xs font-bold uppercase tracking-wider inline-block">
                    {activeModalSkill.category}
                  </span>
                  <h3 className="text-2xl font-black text-white mt-1.5 tracking-tight">{activeModalSkill.name}</h3>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">{activeModalSkill.desc}</p>
                </div>
              </div>

              <div className="space-y-4 mb-8 relative z-10">
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800/90 text-sm text-slate-200 leading-relaxed">
                  {activeModalSkill.fullDesc}
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-300">
                  {activeModalSkill.features?.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span className="truncate text-slate-200 font-semibold">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-800/80 relative z-10">
                <button
                  onClick={() => setActiveModalSkill(null)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-slate-300 hover:text-white border border-slate-800 text-sm font-semibold transition-all"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>

                <a
                  href={activeModalSkill.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold text-sm shadow-lg shadow-cyan-500/30 border border-cyan-400/40 hover:scale-105 transition-all"
                >
                  <span>Visit Official Site</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      </div>
    </section>
  );
};
