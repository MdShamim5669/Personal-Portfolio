import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ExternalLink, ArrowLeft, Search, Sparkles, Star, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { useCoursesQuery } from '../hooks/usePortfolioQueries';

export const CoursesPage = () => {
  const { data: courses = [] } = useCoursesQuery();
  const [searchQuery, setSearchQuery] = useState('');

  const defaultCourses = [
    {
      id: 1,
      title: 'Full-Stack Microservices Architecture with Node.js & React',
      description: 'Production-ready RESTful microservices, JWT authentication, and stateful React interfaces with Prisma ORM.',
      imageUrl: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&w=1000&q=80',
      liveUrl: 'https://www.udemy.com',
      category: 'Backend & Microservices',
    },
    {
      id: 2,
      title: 'Applied Machine Learning & Predictive Modeling Pipelines',
      description: 'Hands-on Python ML workflows using Scikit-Learn algorithms, PyTorch neural networks, and SMOTE class-balancing.',
      imageUrl: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1000&q=80',
      liveUrl: 'https://www.udemy.com',
      category: 'Machine Learning & AI',
    },
    {
      id: 3,
      title: 'Modern Web Development with Next.js & 3D WebGL Graphics',
      description: 'Building high-performance interactive web applications with Three.js 3D WebGL rendering & Framer Motion animations.',
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
      liveUrl: 'https://www.udemy.com',
      category: 'Frontend & 3D UI',
    },
    {
      id: 4,
      title: 'Relational Database Engineering & PostgreSQL Optimization',
      description: 'Mastering SQL queries, database indexing, foreign key constraints, Prisma ORM migrations, and database security.',
      imageUrl: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1000&q=80',
      liveUrl: 'https://www.udemy.com',
      category: 'Databases & Cloud',
    },
    {
      id: 5,
      title: 'Python for Data Analytics, Pandas & Automated AI Workflows',
      description: 'Comprehensive guide to data manipulation with Pandas & NumPy, AI prompt engineering, and automated Claude AI agents.',
      imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80',
      liveUrl: 'https://www.udemy.com',
      category: 'Machine Learning & AI',
    },
  ];

  const allCourses = courses.length > 0 ? courses : defaultCourses;

  const filteredCourses = allCourses.filter((course) =>
    course.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.subtitle?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-300">
      <Navbar />

      <main className="flex-1 py-16 px-4 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-400/50 text-xs font-semibold transition-all hover:-translate-x-1"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-cyan-400" /> Back to Portfolio Home
          </Link>
        </div>

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 pb-8 border-b border-slate-800/80">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-3">
              <BookOpen className="w-3.5 h-3.5" /> All E-Learning Courses
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Udemy Courses & Curriculum
            </h1>
            <p className="text-slate-400 text-sm mt-3 max-w-2xl leading-relaxed">
              Explore all industry-aligned video courses, technical curriculums, and full-stack engineering modules developed for software engineers.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search courses..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all shadow-inner"
            />
          </div>
        </div>

        {/* Courses Grid (Photo + Description + Live Link) */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course, idx) => (
              <motion.div
                key={course.id || course.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="rounded-3xl bg-slate-900/80 border border-slate-800/90 hover:border-cyan-500/50 shadow-xl overflow-hidden group transition-all duration-300 hover:-translate-y-1 backdrop-blur-xl flex flex-col justify-between"
              >
                {/* 1. Photo */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                  <img
                    src={course.imageUrl || course.thumbnailUrl || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                </div>

                {/* 2. Description */}
                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                      {course.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed mt-2">
                      {course.description || course.subtitle}
                    </p>
                  </div>
                </div>

                {/* 3. Live Link */}
                <div className="p-6 pt-0">
                  <a
                    href={course.liveUrl || course.courseUrl || 'https://www.udemy.com'}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-cyan-500/20 border border-cyan-400/40 hover:scale-[1.02] transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Live Link</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-slate-400 text-sm">
            No courses found matching "{searchQuery}".
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};
