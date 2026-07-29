import { motion } from 'framer-motion';
import { BookOpen, Briefcase, Calendar, ExternalLink, Sparkles, CheckCircle2, ArrowRight, LayoutGrid, Monitor, Server, BrainCircuit, ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TypingHeading from '../ui/TypingHeading';

export const TimelineSection = ({ experiences = [], courses = [] }) => {
  const [activeTab, setActiveTab] = useState('All');
  const [currentPage, setCurrentPage] = useState(0);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(0); // Reset page to 0 when tab changes
  };

  // Default experience if none provided from database
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
    },
    {
      id: 2,
      title: 'Applied Machine Learning & Predictive Modeling Pipelines',
      category: 'AI & Machine Learning',
      description: 'Hands-on Python ML workflows using Scikit-Learn algorithms, PyTorch neural networks, and SMOTE class-balancing.',
      imageUrl: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1000&q=80',
      liveUrl: 'https://www.udemy.com',
    },
    {
      id: 3,
      title: 'Modern Web Development with Next.js & 3D WebGL Graphics',
      category: 'Frontend',
      description: 'Building high-performance interactive web applications with Three.js 3D WebGL rendering & Framer Motion animations.',
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
      liveUrl: 'https://www.udemy.com',
    },
    {
      id: 4,
      title: 'Advanced React Design Patterns & Performance Optimization',
      category: 'Frontend',
      description: 'Master advanced React concepts, custom hooks, context, and performance tuning for large-scale applications.',
      imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80',
      liveUrl: 'https://www.udemy.com',
    },
    {
      id: 5,
      title: 'Serverless Cloud Architecture with AWS & Node.js',
      category: 'Backend',
      description: 'Deploy auto-scaling backend APIs using AWS Lambda, API Gateway, DynamoDB, and Serverless Framework.',
      imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&q=80',
      liveUrl: 'https://www.udemy.com',
    },
    {
      id: 6,
      title: 'AI Prompt Engineering & Autonomous Agent Architecture',
      category: 'AI & Machine Learning',
      description: 'Building intelligent autonomous AI agents using Claude, LangChain, vector databases, and system prompting.',
      imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1000&q=80',
      liveUrl: 'https://www.udemy.com',
    },
  ];

  const expList = experiences.length > 0 ? experiences : defaultExperiences;
  const courseList = courses.length > 0 ? courses : defaultCourses;

  const filteredCourses = activeTab === 'All' 
    ? courseList 
    : courseList.filter(c => c.category === activeTab || (activeTab === 'Frontend' && c.title?.includes('Next.js')) || (activeTab === 'Backend' && c.title?.includes('Node.js')) || (activeTab === 'AI & Machine Learning' && c.title?.includes('Machine Learning')));

  const ITEMS_PER_PAGE = 3;
  const totalItems = filteredCourses.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  
  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);
  const currentCourses = filteredCourses.slice(startIndex, endIndex);

  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage(prev => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) setCurrentPage(prev => prev + 1);
  };

  return (
    <section id="experience" className="w-full py-20 px-4 lg:px-8 bg-[#080C16] border-t border-slate-800/60 relative">
      <div className="max-w-7xl mx-auto relative">
        {/* Ambient background glow */}
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* TOP SECTION: Professional Journey & Work Experience */}
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

        {/* Vertical Glassmorphic 3D Timeline Tree */}
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
              {/* Pulsing Animated Glowing Node Dot */}
              <div className="absolute -left-[31px] top-4 w-4 h-4 rounded-full bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 border-4 border-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.9)] group-hover:scale-125 transition-all duration-300 animate-pulse" />

              {/* 3D Glassmorphic Experience Card */}
              <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800/90 hover:border-cyan-500/50 shadow-xl backdrop-blur-xl group-hover:-translate-y-1 transition-all duration-300 space-y-4">
                {/* Header Info */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                  <span className="text-xs text-cyan-400 font-mono font-bold flex items-center gap-1.5 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" /> {exp.startDate} – {exp.endDate}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                    {exp.company || 'ALGORIZIN'}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                    {exp.role}
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {exp.description}
                  </p>
                </div>

                {/* Key Achievement Highlights */}
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

      {/* BOTTOM SECTION: Udemy Courses Developed */}
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row items-start justify-between mb-8 gap-6 md:gap-4">
          <div className="w-full">
            <div className="flex flex-col md:flex-row md:items-end justify-between w-full mb-6 gap-4">
              <div>
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-widest mb-2">
                  <BookOpen className="w-4 h-4 text-cyan-400" /> E-Learning Curriculum
                </div>
                <TypingHeading 
                  text="Udemy Courses Developed" 
                  highlightText="Developed"
                  className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2" 
                />
                <p className="text-slate-400 text-sm max-w-xl">
                  Explore professional programming courses and comprehensive e-learning solutions.
                </p>
              </div>

              {/* Pagination Controls */}
              {totalItems > ITEMS_PER_PAGE && (
                 <div className="flex items-center gap-4 text-xs font-semibold text-slate-400 bg-slate-900/50 py-1.5 px-3 rounded-full border border-slate-800 self-start md:self-auto">
                   <button 
                     onClick={handlePrev} 
                     disabled={currentPage === 0} 
                     className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-slate-700 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors"
                   >
                     <ChevronLeft className="w-4 h-4" />
                   </button>
                   <span className="tracking-widest">
                     {currentPage + 1} <span className="opacity-50 mx-1">of</span> {totalPages}
                   </span>
                   <button 
                     onClick={handleNext} 
                     disabled={currentPage >= totalPages - 1} 
                     className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-slate-700 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors"
                   >
                     <ChevronRight className="w-4 h-4" />
                   </button>
                 </div>
              )}
            </div>

            <div className="hidden md:flex gap-3 overflow-x-auto">
               <div className="flex items-center gap-6 text-sm font-semibold text-slate-400 border-b border-slate-800/80 pb-2 w-full">
                  <span 
                    onClick={() => handleTabChange('All')}
                    className={`flex items-center gap-1.5 pb-2 cursor-pointer transition-colors whitespace-nowrap ${activeTab === 'All' ? 'text-white border-b-2 border-indigo-500' : 'hover:text-white'}`}
                  >
                    <LayoutGrid className="w-4 h-4" /> All
                  </span>
                  <span 
                    onClick={() => handleTabChange('Frontend')}
                    className={`flex items-center gap-1.5 pb-2 cursor-pointer transition-colors whitespace-nowrap ${activeTab === 'Frontend' ? 'text-white border-b-2 border-indigo-500' : 'hover:text-white'}`}
                  >
                    <Monitor className="w-4 h-4" /> Frontend
                  </span>
                  <span 
                    onClick={() => handleTabChange('Backend')}
                    className={`flex items-center gap-1.5 pb-2 cursor-pointer transition-colors whitespace-nowrap ${activeTab === 'Backend' ? 'text-white border-b-2 border-indigo-500' : 'hover:text-white'}`}
                  >
                    <Server className="w-4 h-4" /> Backend
                  </span>
                  <span 
                    onClick={() => handleTabChange('AI & Machine Learning')}
                    className={`flex items-center gap-1.5 pb-2 cursor-pointer transition-colors whitespace-nowrap ${activeTab === 'AI & Machine Learning' ? 'text-white border-b-2 border-indigo-500' : 'hover:text-white'}`}
                  >
                    <BrainCircuit className="w-4 h-4" /> AI & Machine Learning
                  </span>
               </div>
            </div>
          </div>
        </div>

        {/* Course Cards Grid (3 Items Per Page with Mount Fuji Palette) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentCourses.map((course, idx) => (
            <motion.div
              key={course.id || course.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="relative flex flex-col bg-[#0B0C10]/90 backdrop-blur-md rounded-[2.2rem] overflow-hidden border border-slate-800/80 hover:border-sky-400/60 transition-all duration-500 shadow-2xl group hover:-translate-y-2"
            >
              {/* Top Banner (Mount Fuji Vibrant Palette + Animated Blob) */}
              <div className="relative w-full h-56 overflow-hidden bg-gradient-to-tr from-[#0284c7] via-[#2563eb] to-[#38bdf8] flex items-center justify-center p-2 sm:p-2.5">
                
                {/* Mount Fuji Cherry Blossom Pink & Sky-Blue Animated Blob */}
                <motion.div 
                   className="absolute -right-12 -top-12 w-64 h-64 rounded-full bg-gradient-to-br from-[#f43f5e] via-[#ec4899] to-[#38bdf8] opacity-75 blur-md"
                   animate={{ 
                     scale: [1, 1.2, 1],
                     borderRadius: ['50% 50% 70% 30% / 30% 60% 40% 70%', '60% 40% 30% 70% / 60% 30% 70% 40%', '50% 50% 70% 30% / 30% 60% 40% 70%']
                   }}
                   transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                />

                {/* Watermark Category Name */}
                <div className="absolute top-4 right-6 text-3xl font-black text-white/30 uppercase tracking-widest z-10 pointer-events-none mix-blend-overlay font-mono">
                  {course.category ? course.category.split(' ')[0] : 'COURSE'}
                </div>

                {/* Course Image */}
                <div className="relative z-20 w-[96%] h-[92%] p-0 group-hover:scale-[1.03] group-hover:-rotate-1 transition-transform duration-500 ease-out">
                   <img
                     src={course.imageUrl || course.thumbnailUrl || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'}
                     alt={course.title}
                     className="w-full h-full object-cover rounded-2xl shadow-2xl border-2 border-white/20"
                   />
                </div>
              </div>

              {/* Bottom Details Content */}
              <div className="p-7 flex flex-col justify-between flex-1 bg-[#090C15]/95">
                <div>
                  {/* Tags Row */}
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="px-3.5 py-1 text-xs font-black tracking-wide text-black bg-white rounded-full shadow-md">
                      {course.category || 'Development'}
                    </span>
                    <span className="text-xs font-bold text-slate-400 group-hover:text-sky-300 transition-colors">
                      Featured
                    </span>
                    <span className="text-xs font-bold text-slate-400 group-hover:text-pink-300 transition-colors">
                      Course
                    </span>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3 tracking-tight leading-snug group-hover:text-sky-200 transition-colors line-clamp-2">
                    {course.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-slate-400 leading-relaxed text-xs sm:text-sm mb-6 line-clamp-3">
                    {course.description}
                  </p>
                </div>

                {/* Button & Tech Stack Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
                  <a
                    href={course.liveUrl || course.courseUrl || 'https://www.udemy.com'}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center px-6 py-2.5 bg-white text-black hover:bg-gradient-to-r hover:from-sky-400 hover:to-pink-500 hover:text-white transition-all font-extrabold rounded-full text-xs shadow-lg hover:scale-105"
                  >
                    More Info
                  </a>
                  
                  {/* Tech Stack */}
                  <div className="flex items-center gap-1.5">
                    {course.techStack ? (
                       course.techStack.slice(0,2).map(tech => (
                         <span key={tech} className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">{tech}</span>
                       ))
                    ) : (
                       <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">REACT • NODE.JS</span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
};
