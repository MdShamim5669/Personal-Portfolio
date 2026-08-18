import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  BookOpen, Briefcase, Calendar, Sparkles, CheckCircle2,
  LayoutGrid, Monitor, Server, BrainCircuit,
  ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight,
  ExternalLink, ArrowUp, ArrowDown, SlidersHorizontal,
  Clock, Star, Zap,
} from 'lucide-react';
import React, { useState, useRef } from 'react';
import TypingHeading from '../ui/TypingHeading';

/* ─── Category colour map ────────────────────────────────────────── */
const CAT_STYLE = {
  'Backend':               { pill: 'bg-emerald-500/15 border-emerald-400/30 text-emerald-400', accent: '#10b981', glow: 'rgba(16,185,129,0.22)'  },
  'AI & Machine Learning': { pill: 'bg-violet-500/15  border-violet-400/30  text-violet-400',  accent: '#8b5cf6', glow: 'rgba(139,92,246,0.22)'  },
  'Frontend':              { pill: 'bg-cyan-500/15    border-cyan-400/30    text-cyan-400',    accent: '#06b6d4', glow: 'rgba(6,182,212,0.22)'    },
};
const getCatStyle = (cat) =>
  CAT_STYLE[cat] ?? { pill: 'bg-slate-700/40 border-slate-600/40 text-slate-400', accent: '#64748b', glow: 'rgba(100,116,139,0.15)' };

/* ─── Star Rating ────────────────────────────────────────────────── */
const StarRating = ({ rating = 0 }) => {
  const full    = Math.floor(rating);
  const partial = rating % 1;
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => {
        const fill = i < full ? 1 : i === full && partial > 0 ? partial : 0;
        return (
          <div key={i} className="relative w-3 h-3">
            <Star className="w-3 h-3 text-slate-700 fill-slate-700" />
            <div className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            </div>
          </div>
        );
      })}
      <span className="ml-1 text-[11px] font-bold text-amber-400">{rating.toFixed(1)}</span>
    </div>
  );
};

/* ─── Course Card ────────────────────────────────────────────────── */
const CourseCard = ({ course, index }) => {
  const ref   = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const cs    = getCatStyle(course.category);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 44, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.52, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col rounded-3xl overflow-hidden backdrop-blur-xl"
      style={{ background: 'rgba(9,12,21,0.92)' }}
    >
      {/* Glow border on hover */}
      <div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: `0 0 0 1.5px ${cs.accent}66, 0 8px 40px ${cs.glow}` }}
      />
      <div className="absolute inset-0 rounded-3xl border border-slate-800/80 group-hover:border-transparent transition-colors duration-500 pointer-events-none" />

      {/* Thumbnail */}
      <div className="relative h-52 w-full overflow-hidden flex-shrink-0 bg-slate-950">
        <img
          src={course.imageUrl || course.thumbnailUrl || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#090c15] via-[#090c15]/30 to-transparent" />
        {/* Shimmer sweep */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
        {/* Accent bottom line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
          style={{ background: `linear-gradient(90deg, transparent, ${cs.accent}, transparent)` }}
        />

        {/* Category pill */}
        {course.category && (
          <div className="absolute top-3 left-3">
            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow ${cs.pill}`}>
              <Zap className="w-2.5 h-2.5" /> {course.category}
            </span>
          </div>
        )}

        {/* Hours pill */}
        {course.hours && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-950/80 border border-slate-700/50 text-slate-300 text-[10px] font-semibold backdrop-blur-md">
              <Clock className="w-2.5 h-2.5 text-cyan-400" /> {course.hours}h
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-6 flex-1 flex flex-col gap-3 relative z-10">
        {course.rating && <StarRating rating={course.rating} />}

        <h3 className="text-base font-bold text-white group-hover:text-cyan-200 transition-colors duration-300 leading-snug line-clamp-2">
          {course.title}
        </h3>

        <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 flex-1">
          {course.description || course.subtitle}
        </p>

        <div className="w-full h-px bg-slate-800/70 my-1" />

        <a
          href={course.liveUrl || course.courseUrl || 'https://www.udemy.com'}
          target="_blank"
          rel="noreferrer"
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-white text-xs font-bold border border-white/10 hover:scale-[1.02] active:scale-95 transition-all duration-200"
          style={{
            background: `linear-gradient(135deg, ${cs.accent}cc, ${cs.accent}88)`,
            boxShadow: `0 4px 20px ${cs.glow}`,
          }}
        >
          <ExternalLink className="w-3.5 h-3.5" /> View Course
        </a>
      </div>
    </motion.div>
  );
};

/* ─── Sort Button ────────────────────────────────────────────────── */
const SortBtn = ({ label, sk, sortKey, sortDir, onSort }) => {
  const active = sortKey === sk;
  return (
    <button
      onClick={() => onSort(sk)}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-semibold border transition-all duration-200
        ${active
          ? 'bg-cyan-500/15 border-cyan-400/40 text-cyan-300'
          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
        }`}
    >
      {label}
      <span className="flex flex-col gap-[1px]">
        <ArrowUp   className={`w-2.5 h-2.5 ${active && sortDir === 'asc'  ? 'text-cyan-400' : 'text-slate-600'}`} />
        <ArrowDown className={`w-2.5 h-2.5 ${active && sortDir === 'desc' ? 'text-cyan-400' : 'text-slate-600'}`} />
      </span>
    </button>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   Main Component
═══════════════════════════════════════════════════════════════════ */
export const TimelineSection = ({ experiences = [], courses = [] }) => {

  /* ── Tab, Sort, Page state ── */
  const [activeTab, setActiveTab] = useState('All');
  const [sortKey,   setSortKey]   = useState('rating');
  const [sortDir,   setSortDir]   = useState('desc');
  const [page,      setPage]      = useState(0);

  const handleTabChange = (tab) => { setActiveTab(tab); setPage(0); };
  const handleSort = (key) => {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortKey(key); setSortDir('desc'); }
    setPage(0);
  };

  /* ── Default data ── */
  const defaultExperiences = [
    {
      id: 1,
      role: 'Full-Stack & AI Engineer (Contract)',
      company: 'ALGORIZIN',
      startDate: '2023',
      endDate: 'Present',
      description: 'Built scalable microservices with Node.js/PostgreSQL and designed interactive web courses & 3D UI interfaces.',
      highlights: [
        'Developed production REST APIs with Prisma ORM & PostgreSQL.',
        'Engineered machine learning pipelines for automated content & research.',
        'Designed technical curriculum & video modules for software engineers.',
      ],
    },
  ];

  const defaultCourses = [
    {
      id: 1,
      title: 'Full-Stack Microservices Architecture with Node.js & React',
      category: 'Backend',
      description: 'Production-ready RESTful microservices, JWT authentication, and stateful React interfaces with Prisma ORM.',
      imageUrl: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&w=1000&q=80',
      liveUrl: 'https://www.udemy.com',
      rating: 4.8,
      hours: 42,
    },
    {
      id: 2,
      title: 'Applied Machine Learning & Predictive Modeling Pipelines',
      category: 'AI & Machine Learning',
      description: 'Hands-on Python ML workflows using Scikit-Learn algorithms, PyTorch neural networks, and SMOTE class-balancing.',
      imageUrl: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1000&q=80',
      liveUrl: 'https://www.udemy.com',
      rating: 4.9,
      hours: 38,
    },
    {
      id: 3,
      title: 'Modern Web Development with Next.js & 3D WebGL Graphics',
      category: 'Frontend',
      description: 'Building high-performance interactive web applications with Three.js 3D WebGL rendering & Framer Motion animations.',
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
      liveUrl: 'https://www.udemy.com',
      rating: 4.7,
      hours: 29,
    },
    {
      id: 4,
      title: 'Advanced React Design Patterns & Performance Optimization',
      category: 'Frontend',
      description: 'Master advanced React concepts, custom hooks, context, and performance tuning for large-scale applications.',
      imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80',
      liveUrl: 'https://www.udemy.com',
      rating: 4.7,
      hours: 35,
    },
    {
      id: 5,
      title: 'Serverless Cloud Architecture with AWS & Node.js',
      category: 'Backend',
      description: 'Deploy auto-scaling backend APIs using AWS Lambda, API Gateway, DynamoDB, and Serverless Framework.',
      imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&q=80',
      liveUrl: 'https://www.udemy.com',
      rating: 4.6,
      hours: 28,
    },
    {
      id: 6,
      title: 'AI Prompt Engineering & Autonomous Agent Architecture',
      category: 'AI & Machine Learning',
      description: 'Building intelligent autonomous AI agents using Claude, LangChain, vector databases, and system prompting.',
      imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1000&q=80',
      liveUrl: 'https://www.udemy.com',
      rating: 4.9,
      hours: 31,
    },
  ];

  const expList    = experiences.length > 0 ? experiences : defaultExperiences;
  const courseList = courses.length > 0 ? courses : defaultCourses;

  /* ── Filter ── */
  const TABS = [
    { key: 'All',                icon: LayoutGrid    },
    { key: 'Frontend',           icon: Monitor       },
    { key: 'Backend',            icon: Server        },
    { key: 'AI & Machine Learning', icon: BrainCircuit },
  ];

  const filtered = activeTab === 'All'
    ? courseList
    : courseList.filter((c) => c.category === activeTab);

  /* ── Sort ── */
  const sorted = [...filtered].sort((a, b) => {
    let av = sortKey === 'rating' ? (a.rating ?? 0) : (a.title ?? '').toLowerCase();
    let bv = sortKey === 'rating' ? (b.rating ?? 0) : (b.title ?? '').toLowerCase();
    if (av < bv) return sortDir === 'asc' ? -1 : 1;
    if (av > bv) return sortDir === 'asc' ?  1 : -1;
    return 0;
  });

  /* ── Paginate ── */
  const ITEMS_PER_PAGE = 3;
  const totalPages = Math.max(1, Math.ceil(sorted.length / ITEMS_PER_PAGE));
  const safePage   = Math.min(page, totalPages - 1);
  const paginated  = sorted.slice(safePage * ITEMS_PER_PAGE, (safePage + 1) * ITEMS_PER_PAGE);
  const goTo       = (p) => setPage(Math.max(0, Math.min(p, totalPages - 1)));

  /* smart page numbers with ellipsis */
  const getPageNums = () => {
    const delta  = 1;
    const nums   = new Set([0, totalPages - 1]);
    for (let i = Math.max(1, safePage - delta); i <= Math.min(totalPages - 2, safePage + delta); i++) nums.add(i);
    const arr = [...nums].sort((a, b) => a - b);
    const result = [];
    arr.forEach((p, i) => {
      if (i > 0 && p - arr[i - 1] > 1) result.push('...');
      result.push(p);
    });
    return result;
  };

  /* pagination button styles */
  const btnBase   = 'h-8 min-w-[32px] rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center px-2';
  const btnActive = 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-md shadow-cyan-500/20';
  const btnIdle   = 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-600';
  const btnOff    = 'bg-slate-900/40 border border-slate-800/40 text-slate-700 cursor-not-allowed';
  const btnNav    = 'bg-slate-900 border border-slate-800 text-slate-300 hover:border-cyan-500/40 hover:text-white';

  return (
    <section id="experience" className="w-full py-20 px-4 lg:px-8 bg-[#080C16] border-t border-slate-800/60 relative">
      <div className="max-w-7xl mx-auto relative">

        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

        {/* ══ WORK EXPERIENCE ══ */}
        <div className="relative z-10 mb-24 max-w-4xl mx-auto">
          <div className="flex flex-col items-center text-center mb-12">
            <div className="flex items-center justify-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-widest mb-2">
              <Briefcase className="w-4 h-4 text-cyan-400" /> Professional Journey
            </div>
            <TypingHeading
              text="Work Experience"
              highlightText="Experience"
              className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
            />
          </div>

          <div className="relative border-l-2 border-slate-800/80 pl-6 ml-2 space-y-8">
            {expList.map((exp) => (
              <motion.div
                key={exp.id || exp.role}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="relative group"
              >
                {/* Node dot */}
                <div className="absolute -left-[31px] top-4 w-4 h-4 rounded-full bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 border-4 border-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.9)] group-hover:scale-125 transition-all duration-300 animate-pulse" />

                <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800/90 hover:border-cyan-500/50 shadow-xl backdrop-blur-xl group-hover:-translate-y-1 transition-all duration-300 space-y-4">
                  {/* Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                    <span className="text-xs text-cyan-400 font-mono font-bold flex items-center gap-1.5 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400" /> {exp.startDate} – {exp.endDate}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                      {exp.company || 'ALGORIZIN'}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">{exp.role}</h3>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">{exp.description}</p>
                  </div>

                  {exp.highlights && (
                    <div className="space-y-2 pt-1 border-t border-slate-800/60">
                      <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-indigo-400" /> Key Engineering Deliverables
                      </span>
                      <ul className="space-y-2 text-xs text-slate-300">
                        {exp.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-cyan-500/40 transition-colors">
                            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ══ UDEMY COURSES ══ */}
        <div className="relative z-10">

          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-widest mb-2">
              <BookOpen className="w-4 h-4" /> E-Learning Curriculum
            </div>
            <TypingHeading
              text="Udemy Courses Developed"
              highlightText="Developed"
              className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2"
            />
            <p className="text-slate-400 text-sm max-w-xl">
              Explore professional programming courses and comprehensive e-learning solutions.
            </p>
          </motion.div>

          {/* Toolbar: Tabs + Sort */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.07 }}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6"
          >
            {/* Category tabs */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {TABS.map(({ key, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => handleTabChange(key)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all duration-200
                    ${activeTab === key
                      ? 'bg-indigo-500/20 border-indigo-400/40 text-indigo-300'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                >
                  <Icon className="w-3.5 h-3.5" /> {key}
                </button>
              ))}
            </div>

            {/* Sort + count */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-slate-500">
                <span className="text-white font-semibold">{sorted.length}</span> courses
              </span>
              <span className="text-slate-700">|</span>
              <span className="flex items-center gap-1 text-[11px] text-slate-500 font-semibold">
                <SlidersHorizontal className="w-3 h-3" /> Sort:
              </span>
              <SortBtn label="Rating" sk="rating" sortKey={sortKey} sortDir={sortDir} onSort={handleSort} />
              <SortBtn label="Title"  sk="title"  sortKey={sortKey} sortDir={sortDir} onSort={handleSort} />
            </div>
          </motion.div>

          {/* Cards grid */}
          <AnimatePresence mode="popLayout">
            {paginated.length > 0 ? (
              <motion.div
                key={`${safePage}-${activeTab}-${sortKey}-${sortDir}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mb-8"
              >
                {paginated.map((course, idx) => (
                  <CourseCard key={course.id || course.title || idx} course={course} index={idx} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 text-slate-500 text-sm bg-slate-900/40 rounded-3xl border border-slate-800 mb-8"
              >
                <BookOpen className="w-8 h-8 text-slate-700 mx-auto mb-3" />
                No courses in this category.
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-800/70">
              <span className="text-xs text-slate-400">
                Page <span className="text-white font-bold">{safePage + 1}</span> of{' '}
                <span className="text-cyan-400 font-bold">{totalPages}</span>
              </span>

              <div className="flex items-center gap-1.5">
                {/* First */}
                <button onClick={() => goTo(0)} disabled={safePage === 0} title="First page" className={`${btnBase} ${safePage === 0 ? btnOff : btnNav}`}>
                  <ChevronsLeft className="w-4 h-4" />
                </button>
                {/* Prev */}
                <button onClick={() => goTo(safePage - 1)} disabled={safePage === 0} className={`${btnBase} gap-1 px-3 ${safePage === 0 ? btnOff : btnNav}`}>
                  <ChevronLeft className="w-3.5 h-3.5" /> Prev
                </button>

                {/* Page numbers */}
                <div className="flex items-center gap-1">
                  {getPageNums().map((p, i) =>
                    p === '...' ? (
                      <span key={`dot-${i}`} className="w-8 text-center text-slate-600 text-xs">…</span>
                    ) : (
                      <button
                        key={p}
                        onClick={() => goTo(p)}
                        className={`${btnBase} ${safePage === p ? btnActive : btnIdle}`}
                      >
                        {p + 1}
                      </button>
                    )
                  )}
                </div>

                {/* Next */}
                <button onClick={() => goTo(safePage + 1)} disabled={safePage >= totalPages - 1} className={`${btnBase} gap-1 px-3 ${safePage >= totalPages - 1 ? btnOff : btnNav}`}>
                  Next <ChevronRight className="w-3.5 h-3.5" />
                </button>
                {/* Last */}
                <button onClick={() => goTo(totalPages - 1)} disabled={safePage >= totalPages - 1} title="Last page" className={`${btnBase} ${safePage >= totalPages - 1 ? btnOff : btnNav}`}>
                  <ChevronsRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};
