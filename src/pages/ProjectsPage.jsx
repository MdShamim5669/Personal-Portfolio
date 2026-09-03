import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Search, Sparkles, Layers, ExternalLink, FolderGit2, Github,
  ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ArrowUp, ArrowDown,
  SlidersHorizontal, Star, LayoutGrid,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { useProjectsQuery } from '../hooks/usePortfolioQueries';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

/* ─── Sort Button ──────────────────────────────────────────────── */
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

export const ProjectsPage = () => {
  const { data: projects = [] } = useProjectsQuery();
  const [searchQuery, setSearchQuery]         = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentPage, setCurrentPage]         = useState(1);
  const [activeFilter, setActiveFilter]       = useState('All');
  const [sortKey, setSortKey]                 = useState('featured');
  const [sortDir, setSortDir]                 = useState('desc');
  const itemsPerPage = 6;

  /* ── Build dynamic filter tabs ── */
  const filterTabs = useMemo(() => {
    const tabs = ['All', 'Featured'];
    const techSet = new Set();
    projects.forEach((p) => {
      p.techStack?.forEach((t) => {
        const tl = t.toLowerCase();
        if (tl.includes('react') || tl.includes('next') || tl.includes('vue')) techSet.add('Frontend');
        if (tl.includes('node') || tl.includes('express') || tl.includes('spring')) techSet.add('Backend');
        if (tl.includes('python') || tl.includes('ml') || tl.includes('pytorch') || tl.includes('scikit')) techSet.add('AI / ML');
        if (tl.includes('postgres') || tl.includes('mongo') || tl.includes('mysql')) techSet.add('Database');
      });
    });
    return [...tabs, ...techSet];
  }, [projects]);

  /* ── Filter ── */
  const filtered = useMemo(() => {
    return projects.filter((p) => {
      // Search text filter
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || (
        p.title?.toLowerCase().includes(q) ||
        p.tagline?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.techStack?.some((t) => t.toLowerCase().includes(q))
      );
      if (!matchesSearch) return false;

      // Category tab filter
      if (activeFilter === 'All') return true;
      if (activeFilter === 'Featured') return !!p.isFeatured;
      return p.techStack?.some((t) => {
        const tl = t.toLowerCase();
        if (activeFilter === 'Frontend') return tl.includes('react') || tl.includes('next') || tl.includes('vue');
        if (activeFilter === 'Backend')  return tl.includes('node')  || tl.includes('express') || tl.includes('spring');
        if (activeFilter === 'AI / ML')  return tl.includes('python') || tl.includes('ml') || tl.includes('pytorch') || tl.includes('scikit');
        if (activeFilter === 'Database') return tl.includes('postgres') || tl.includes('mongo') || tl.includes('mysql');
        return false;
      });
    });
  }, [projects, searchQuery, activeFilter]);

  /* ── Sort ── */
  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      if (sortKey === 'featured') {
        const af = a.isFeatured ? 1 : 0;
        const bf = b.isFeatured ? 1 : 0;
        return sortDir === 'desc' ? bf - af : af - bf;
      }
      if (sortKey === 'title') {
        const at = (a.title ?? '').toLowerCase();
        const bt = (b.title ?? '').toLowerCase();
        if (at < bt) return sortDir === 'asc' ? -1 : 1;
        if (at > bt) return sortDir === 'asc' ?  1 : -1;
        return 0;
      }
      return 0;
    });
  }, [filtered, sortKey, sortDir]);

  /* ── Paginate ── */
  const totalPages        = Math.max(1, Math.ceil(sorted.length / itemsPerPage));
  const validPage         = Math.min(currentPage, totalPages);
  const displayedProjects = sorted.slice((validPage - 1) * itemsPerPage, validPage * itemsPerPage);

  const handleFilter = (tab) => { setActiveFilter(tab); setCurrentPage(1); };
  const handleSort   = (key) => {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortKey(key); setSortDir('desc'); }
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-300">
      <Navbar />

      <main className="flex-1 py-16 px-4 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Back Button */}
        <div className="mb-8">
          <Link to="/">
            <Button
              variant="secondary"
              size="sm"
              className="rounded-full bg-slate-900/90 border-slate-800 hover:border-cyan-500/50 text-slate-300 hover:text-white px-4 py-2 shadow-lg backdrop-blur-xl group"
            >
              <ArrowLeft className="w-4 h-4 text-cyan-400 group-hover:-translate-x-1 transition-transform duration-300" />
              <span>Back to Home</span>
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 pb-8 border-b border-slate-800/80">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-3">
              <Layers className="w-3.5 h-3.5" /> All Projects &amp; Systems
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Featured Works &amp; Architecture
            </h1>
            <p className="text-slate-400 text-sm mt-3 max-w-2xl leading-relaxed">
              Explore full-stack applications, distributed microservices, AI workflows, and cloud-native solutions engineered for production.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by title, technology..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all shadow-inner"
            />
          </div>
        </div>

        {/* Toolbar: Filter Tabs + Sort */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
        >
          {/* Tabs */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {(projects.length > 0 ? filterTabs : ['All', 'Featured']).map((tab) => (
              <button
                key={tab}
                onClick={() => handleFilter(tab)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all duration-200
                  ${activeFilter === tab
                    ? 'bg-indigo-500/20 border-indigo-400/40 text-indigo-300 shadow-sm'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                  }`}
              >
                {tab === 'All'      && <LayoutGrid className="w-3.5 h-3.5" />}
                {tab === 'Featured' && <Star        className="w-3.5 h-3.5" />}
                {tab}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-slate-500">
              <span className="text-white font-semibold">{sorted.length}</span> projects
            </span>
            <span className="text-slate-700">|</span>
            <span className="flex items-center gap-1 text-[11px] text-slate-500 font-semibold">
              <SlidersHorizontal className="w-3 h-3" /> Sort:
            </span>
            <SortBtn label="Featured" sk="featured" sortKey={sortKey} sortDir={sortDir} onSort={handleSort} />
            <SortBtn label="Title"    sk="title"    sortKey={sortKey} sortDir={sortDir} onSort={handleSort} />
          </div>
        </motion.div>

        {/* Projects Grid */}
        {displayedProjects.length > 0 ? (
          <AnimatePresence mode="popLayout">
            <motion.div
              key={`${validPage}-${activeFilter}-${sortKey}-${sortDir}-${searchQuery}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12"
            >
              {displayedProjects.map((project, idx) => (
                <motion.div
                  key={project.id || project.title || idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="rounded-3xl bg-slate-900/80 border border-slate-800/90 hover:border-cyan-500/50 shadow-2xl overflow-hidden group transition-all duration-300 hover:-translate-y-1.5 backdrop-blur-xl flex flex-col justify-between"
                >
                  {/* Thumbnail */}
                  {project.thumbnailUrl && (
                    <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-slate-950/90 group">
                          <img
                            src={project.thumbnailUrl}
                            alt={project.title}
                            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
                      {project.isFeatured && (
                        <div className="absolute top-3 right-3">
                          <Badge variant="indigo" className="gap-1 border-amber-500/40 text-amber-300 bg-slate-950/80 backdrop-blur-md shadow-lg">
                            <Sparkles className="w-3 h-3 text-amber-400" /> Featured
                          </Badge>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                        {project.title}
                      </h3>
                      {project.tagline && (
                        <p className="text-xs font-semibold text-indigo-400 mt-1 mb-3">{project.tagline}</p>
                      )}
                      <p className="text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed mb-6">
                        {project.description}
                      </p>

                      {/* Tech Badges */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.techStack?.map((tech) => (
                          <Badge key={tech} variant="outline" className="font-mono text-[11px] py-0.5 px-2.5 bg-slate-950/60 border-slate-800 text-slate-300">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 underline underline-offset-4 transition-colors"
                      >
                        View Details
                      </button>

                      <div className="flex items-center gap-3">
                        {project.clientGithubUrl && (
                          <a
                            href={project.clientGithubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"
                          >
                            <Github className="w-4 h-4" /> Client
                          </a>
                        )}
                        {project.serverGithubUrl && (
                          <a
                            href={project.serverGithubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"
                          >
                            <FolderGit2 className="w-4 h-4" /> Server
                          </a>
                        )}
                        {project.liveDemoUrl && (
                          <a href={project.liveDemoUrl} target="_blank" rel="noreferrer">
                            <Button variant="primary" size="sm" icon={ExternalLink}>
                              Live Demo
                            </Button>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="text-center py-24 text-slate-400 text-sm bg-slate-900/40 rounded-3xl border border-slate-800 mb-12">
            No projects found matching the selected filter or search query.
          </div>
        )}

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-800/80">
            <span className="text-xs text-slate-400 font-medium">
              Showing <span className="text-white font-semibold">{(validPage - 1) * itemsPerPage + 1}</span> to{' '}
              <span className="text-white font-semibold">
                {Math.min(validPage * itemsPerPage, sorted.length)}
              </span>{' '}
              of <span className="text-cyan-400 font-semibold">{sorted.length}</span> projects
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={validPage === 1}
                className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1 transition-all ${
                  validPage === 1
                    ? 'bg-slate-900/50 border-slate-800/60 text-slate-600 cursor-not-allowed'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-cyan-500/50 hover:text-white hover:bg-slate-800'
                }`}
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                      validPage === pageNum
                        ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/20'
                        : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={validPage === totalPages}
                className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1 transition-all ${
                  validPage === totalPages
                    ? 'bg-slate-900/50 border-slate-800/60 text-slate-600 cursor-not-allowed'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-cyan-500/50 hover:text-white hover:bg-slate-800'
                }`}
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Modal */}
        <Modal
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          title={selectedProject?.title}
          subtitle={selectedProject?.tagline}
          maxWidth="max-w-3xl"
        >
          {selectedProject && (
            <div className="space-y-6">
              {selectedProject.thumbnailUrl && (
                <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800/80 w-full flex items-center justify-center p-1">
                  <img
                    src={selectedProject.thumbnailUrl}
                    alt={selectedProject.title}
                    className="w-full max-h-[420px] object-contain rounded-xl shadow-2xl"
                  />
                </div>
              )}

              <p className="text-sm text-slate-200 leading-relaxed">
                {selectedProject.description}
              </p>

              <div>
                <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-2">
                  Tech Stack Architecture
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.techStack?.map((tech) => (
                    <Badge key={tech} variant="cyan" className="text-xs font-mono py-1 px-3">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-end gap-3 pt-6 border-t border-slate-800">
                {selectedProject.clientGithubUrl && (
                  <a href={selectedProject.clientGithubUrl} target="_blank" rel="noreferrer">
                    <Button variant="outline" size="sm" icon={Github}>
                      Client Repository
                    </Button>
                  </a>
                )}
                {selectedProject.serverGithubUrl && (
                  <a href={selectedProject.serverGithubUrl} target="_blank" rel="noreferrer">
                    <Button variant="outline" size="sm" icon={FolderGit2}>
                      Server Repository
                    </Button>
                  </a>
                )}
                {selectedProject.liveDemoUrl && (
                  <a href={selectedProject.liveDemoUrl} target="_blank" rel="noreferrer">
                    <Button variant="glow" size="sm" icon={ExternalLink}>
                      Launch Live Demo
                    </Button>
                  </a>
                )}
              </div>
            </div>
          )}
        </Modal>
      </main>

      <Footer />
    </div>
  );
};
