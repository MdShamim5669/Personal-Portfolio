import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  BookOpen, ExternalLink, ArrowLeft, Search, Star,
  ChevronLeft, ChevronRight, GraduationCap, Zap, Clock,
  ChevronsLeft, ChevronsRight, ArrowUpDown, ArrowUp, ArrowDown,
  SlidersHorizontal,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { useCoursesQuery } from '../hooks/usePortfolioQueries';

const ITEMS_PER_PAGE = 3;

/* ─── Static fallback courses ─────────────────────────────────── */
const DEFAULT_COURSES = [
  {
    id: 1,
    title: 'Full-Stack Microservices Architecture with Node.js & React',
    description:
      'Production-ready RESTful microservices, JWT authentication, and stateful React interfaces with Prisma ORM.',
    imageUrl:
      'https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&w=1000&q=80',
    liveUrl: 'https://www.udemy.com',
    category: 'Backend & Microservices',
    rating: 4.8,
    hours: 42,
  },
  {
    id: 2,
    title: 'Applied Machine Learning & Predictive Modeling Pipelines',
    description:
      'Hands-on Python ML workflows using Scikit-Learn algorithms, PyTorch neural networks, and SMOTE class-balancing.',
    imageUrl:
      'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1000&q=80',
    liveUrl: 'https://www.udemy.com',
    category: 'Machine Learning & AI',
    rating: 4.9,
    hours: 38,
  },
  {
    id: 3,
    title: 'Modern Web Development with Next.js & 3D WebGL Graphics',
    description:
      'Building high-performance interactive web applications with Three.js 3D WebGL rendering & Framer Motion animations.',
    imageUrl:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
    liveUrl: 'https://www.udemy.com',
    category: 'Frontend & 3D UI',
    rating: 4.7,
    hours: 29,
  },
  {
    id: 4,
    title: 'Relational Database Engineering & PostgreSQL Optimization',
    description:
      'Mastering SQL queries, database indexing, foreign key constraints, Prisma ORM migrations, and database security.',
    imageUrl:
      'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1000&q=80',
    liveUrl: 'https://www.udemy.com',
    category: 'Databases & Cloud',
    rating: 4.6,
    hours: 25,
  },
  {
    id: 5,
    title: 'Python for Data Analytics, Pandas & Automated AI Workflows',
    description:
      'Comprehensive guide to data manipulation with Pandas & NumPy, AI prompt engineering, and automated Claude AI agents.',
    imageUrl:
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80',
    liveUrl: 'https://www.udemy.com',
    category: 'Machine Learning & AI',
    rating: 4.8,
    hours: 33,
  },
];

/* ─── Sort Options ─────────────────────────────────────────────── */
const SORT_OPTIONS = [
  { key: 'rating',  label: 'Rating' },
  { key: 'title',   label: 'Title'  },
  { key: 'hours',   label: 'Hours'  },
];

/* ─── Category Colours ─────────────────────────────────────────── */
const CATEGORY_COLORS = {
  'Backend & Microservices': {
    pill: 'bg-emerald-500/15 border-emerald-400/30 text-emerald-400',
    glow: 'rgba(16,185,129,0.18)',
    accent: '#10b981',
  },
  'Machine Learning & AI': {
    pill: 'bg-violet-500/15 border-violet-400/30 text-violet-400',
    glow: 'rgba(139,92,246,0.18)',
    accent: '#8b5cf6',
  },
  'Frontend & 3D UI': {
    pill: 'bg-cyan-500/15 border-cyan-400/30 text-cyan-400',
    glow: 'rgba(6,182,212,0.18)',
    accent: '#06b6d4',
  },
  'Databases & Cloud': {
    pill: 'bg-orange-500/15 border-orange-400/30 text-orange-400',
    glow: 'rgba(249,115,22,0.18)',
    accent: '#f97316',
  },
};
const getCatStyle = (cat) =>
  CATEGORY_COLORS[cat] ?? {
    pill: 'bg-slate-700/40 border-slate-600/40 text-slate-400',
    glow: 'rgba(100,116,139,0.12)',
    accent: '#64748b',
  };

/* ─── Star Rating ─────────────────────────────────────────────── */
const StarRating = ({ rating = 0 }) => {
  const full = Math.floor(rating);
  const partial = rating % 1;
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => {
        const fill = i < full ? 1 : i === full && partial > 0 ? partial : 0;
        return (
          <div key={i} className="relative w-3.5 h-3.5">
            <Star className="w-3.5 h-3.5 text-slate-700 fill-slate-700" />
            <div className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            </div>
          </div>
        );
      })}
      <span className="ml-1.5 text-xs font-bold text-amber-400">{rating.toFixed(1)}</span>
    </div>
  );
};

/* ─── Course Card ──────────────────────────────────────────────── */
const CourseCard = ({ course, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const catStyle = getCatStyle(course.category);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48, scale: 0.96 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      exit={{ opacity: 0, y: -20, scale: 0.97 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-3xl overflow-hidden flex flex-col"
      style={{ background: 'rgba(15,23,42,0.85)' }}
    >
      {/* Outer glow border */}
      <div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          boxShadow: `0 0 0 1.5px ${catStyle.accent}55, 0 0 40px ${catStyle.glow}`,
        }}
      />
      {/* Base border */}
      <div className="absolute inset-0 rounded-3xl border border-slate-800/90 group-hover:border-transparent transition-colors duration-500 pointer-events-none" />

      {/* Thumbnail */}
      <div className="relative h-52 w-full overflow-hidden bg-slate-950 flex-shrink-0">
        <img
          src={
            course.imageUrl ||
            course.thumbnailUrl ||
            'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'
          }
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />

        {/* Dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        {/* Shimmer sweep */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/6 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[800ms] ease-out pointer-events-none" />

        {/* Accent bottom line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
          style={{ background: `linear-gradient(90deg, transparent, ${catStyle.accent}, transparent)` }}
        />

        {/* Category badge */}
        {course.category && (
          <div className="absolute top-3 left-3">
            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow ${catStyle.pill}`}>
              <Zap className="w-2.5 h-2.5" />
              {course.category}
            </span>
          </div>
        )}

        {/* Hours badge */}
        {course.hours && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-950/80 border border-slate-700/60 text-slate-300 text-[10px] font-semibold backdrop-blur-md">
              <Clock className="w-2.5 h-2.5 text-cyan-400" />
              {course.hours}h
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-6 flex-1 flex flex-col gap-3 relative z-10">
        {/* Rating */}
        {course.rating && <StarRating rating={course.rating} />}

        <h3 className="text-base font-bold text-white group-hover:text-cyan-200 transition-colors duration-300 leading-snug line-clamp-2">
          {course.title}
        </h3>

        <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 flex-1">
          {course.description || course.subtitle}
        </p>

        {/* Divider */}
        <div className="w-full h-px bg-slate-800/80 my-1" />

        {/* CTA */}
        <a
          href={course.liveUrl || course.courseUrl || 'https://www.udemy.com'}
          target="_blank"
          rel="noreferrer"
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-white text-xs font-bold
                     shadow-lg border border-white/10
                     hover:scale-[1.02] active:scale-95 transition-all duration-200"
          style={{
            background: `linear-gradient(135deg, ${catStyle.accent}cc, ${catStyle.accent}88)`,
            boxShadow: `0 4px 20px ${catStyle.glow}`,
          }}
        >
          <ExternalLink className="w-3.5 h-3.5" />
          View Course
        </a>
      </div>
    </motion.div>
  );
};

/* ─── Sort Button ──────────────────────────────────────────────── */
const SortBtn = ({ label, sortKey, currentKey, direction, onToggle }) => {
  const isActive = currentKey === sortKey;
  return (
    <button
      onClick={() => onToggle(sortKey)}
      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all duration-200
        ${isActive
          ? 'bg-cyan-500/15 border-cyan-400/40 text-cyan-300 shadow-sm shadow-cyan-500/10'
          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
        }`}
    >
      {label}
      <span className="flex flex-col gap-[1px]">
        <ArrowUp
          className={`w-2.5 h-2.5 transition-colors ${isActive && direction === 'asc' ? 'text-cyan-400' : 'text-slate-600'}`}
        />
        <ArrowDown
          className={`w-2.5 h-2.5 transition-colors ${isActive && direction === 'desc' ? 'text-cyan-400' : 'text-slate-600'}`}
        />
      </span>
    </button>
  );
};

/* ─── Pagination ───────────────────────────────────────────────── */
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  /* Visible page numbers — show up to 5 around the current page */
  const getPageNums = () => {
    const delta = 1;
    const range = [];
    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    const pages = [];
    if (currentPage - delta > 2) pages.push('...');
    pages.unshift(1);
    range.forEach((p) => pages.push(p));
    if (currentPage + delta < totalPages - 1) pages.push('...');
    if (totalPages > 1) pages.push(totalPages);
    return pages;
  };

  const btnBase =
    'h-9 min-w-[36px] rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center px-2';
  const btnActive =
    'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/25';
  const btnIdle =
    'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-600';
  const btnDisabled =
    'bg-slate-900/40 border border-slate-800/50 text-slate-700 cursor-not-allowed';
  const btnNav =
    'bg-slate-900 border border-slate-800 text-slate-300 hover:border-cyan-500/40 hover:text-white';

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-slate-800/80">
      {/* Info */}
      <span className="text-xs text-slate-400 font-medium">
        Page <span className="text-white font-bold">{currentPage}</span> of{' '}
        <span className="text-cyan-400 font-bold">{totalPages}</span>
      </span>

      {/* Controls */}
      <div className="flex items-center gap-1.5">
        {/* First */}
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          title="First page"
          className={`${btnBase} ${currentPage === 1 ? btnDisabled : btnNav}`}
        >
          <ChevronsLeft className="w-4 h-4" />
        </button>

        {/* Prev */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          title="Previous page"
          className={`${btnBase} gap-1 px-3 ${currentPage === 1 ? btnDisabled : btnNav}`}
        >
          <ChevronLeft className="w-4 h-4" /> Prev
        </button>

        {/* Page numbers */}
        <div className="flex items-center gap-1">
          {getPageNums().map((p, i) =>
            p === '...' ? (
              <span key={`dot-${i}`} className="w-9 text-center text-slate-600 text-xs">…</span>
            ) : (
              <button
                key={p}
                onClick={() => onPageChange(p)}
                className={`${btnBase} ${currentPage === p ? btnActive : btnIdle}`}
              >
                {p}
              </button>
            )
          )}
        </div>

        {/* Next */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          title="Next page"
          className={`${btnBase} gap-1 px-3 ${currentPage === totalPages ? btnDisabled : btnNav}`}
        >
          Next <ChevronRight className="w-4 h-4" />
        </button>

        {/* Last */}
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          title="Last page"
          className={`${btnBase} ${currentPage === totalPages ? btnDisabled : btnNav}`}
        >
          <ChevronsRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

/* ─── Main Page ─────────────────────────────────────────────────── */
export const CoursesPage = () => {
  const { data: courses = [] } = useCoursesQuery();
  const [searchQuery, setSearchQuery]   = useState('');
  const [currentPage, setCurrentPage]   = useState(1);
  const [sortKey, setSortKey]           = useState('rating');
  const [sortDir, setSortDir]           = useState('desc');

  const allCourses = courses.length > 0 ? courses : DEFAULT_COURSES;

  /* ── Filter ── */
  const filtered = allCourses.filter(
    (c) =>
      c.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.subtitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  /* ── Sort ── */
  const sorted = [...filtered].sort((a, b) => {
    let av, bv;
    if (sortKey === 'rating') { av = a.rating ?? 0;   bv = b.rating ?? 0; }
    else if (sortKey === 'hours') { av = a.hours ?? 0; bv = b.hours ?? 0; }
    else { av = (a.title ?? '').toLowerCase(); bv = (b.title ?? '').toLowerCase(); }

    if (av < bv) return sortDir === 'asc' ? -1 : 1;
    if (av > bv) return sortDir === 'asc' ? 1 : -1;
    return 0;
  });

  /* ── Paginate ── */
  const totalPages = Math.max(1, Math.ceil(sorted.length / ITEMS_PER_PAGE));
  const validPage  = Math.min(currentPage, totalPages);
  const displayed  = sorted.slice((validPage - 1) * ITEMS_PER_PAGE, validPage * ITEMS_PER_PAGE);

  /* ── Reset page on search/sort change ── */
  useEffect(() => { setCurrentPage(1); }, [searchQuery, sortKey, sortDir]);

  /* ── Toggle sort ── */
  const handleSort = (key) => {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortKey(key); setSortDir('desc'); }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-300">
      <Navbar />

      <main className="flex-1 py-16 px-4 lg:px-8 max-w-7xl mx-auto w-full">

        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800
                       text-slate-300 hover:text-white hover:border-cyan-400/50
                       text-xs font-semibold transition-all duration-200 hover:-translate-x-1"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-cyan-400" />
            Back to Portfolio Home
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 pb-8 border-b border-slate-800/80"
        >
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-3">
              <GraduationCap className="w-3.5 h-3.5" /> Udemy Courses Developed
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Courses &amp; Curriculum
            </h1>
            <p className="text-slate-400 text-sm mt-3 max-w-xl leading-relaxed">
              Industry-aligned video courses, technical curriculums, and full-stack engineering
              modules built for software engineers.
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full md:w-72 flex-shrink-0">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search courses..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5
                         text-xs text-white placeholder-slate-500
                         focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20
                         transition-all shadow-inner"
            />
          </div>
        </motion.div>

        {/* Toolbar — stats + sort */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.12 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
        >
          {/* Stats */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs text-slate-500">
              Showing{' '}
              <span className="text-white font-semibold">{displayed.length}</span> of{' '}
              <span className="text-cyan-400 font-semibold">{sorted.length}</span>{' '}
              {sorted.length === 1 ? 'course' : 'courses'}
            </span>
            {searchQuery && (
              <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-400">
                "{searchQuery}"
              </span>
            )}
          </div>

          {/* Sort controls */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="flex items-center gap-1 text-xs text-slate-500 font-semibold">
              <SlidersHorizontal className="w-3.5 h-3.5" /> Sort by:
            </span>
            {SORT_OPTIONS.map((opt) => (
              <SortBtn
                key={opt.key}
                label={opt.label}
                sortKey={opt.key}
                currentKey={sortKey}
                direction={sortDir}
                onToggle={handleSort}
              />
            ))}
          </div>
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="popLayout">
          {displayed.length > 0 ? (
            <motion.div
              key={`page-${validPage}-${searchQuery}-${sortKey}-${sortDir}`}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {displayed.map((course, idx) => (
                <CourseCard key={course.id || course.title || idx} course={course} index={idx} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-24 text-slate-400 text-sm bg-slate-900/40 rounded-3xl border border-slate-800 mb-10"
            >
              <BookOpen className="w-10 h-10 text-slate-700 mx-auto mb-4" />
              No courses found matching &ldquo;{searchQuery}&rdquo;.
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pagination */}
        <Pagination
          currentPage={validPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </main>

      <Footer />
    </div>
  );
};
