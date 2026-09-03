import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ExternalLink, FolderGit2, Github, Sparkles, Layers,
  ChevronLeft, ChevronRight, ArrowRight, ArrowUp, ArrowDown,
  SlidersHorizontal, Star, LayoutGrid,
} from 'lucide-react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import Card from '../ui/Card';
import ElectricBorder from '../ui/ElectricBorder';
import TypingHeading from '../ui/TypingHeading';

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

export const ProjectsSection = ({ projects = [] }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentPage, setCurrentPage]         = useState(1);
  const [activeFilter, setActiveFilter]       = useState('All');
  const [sortKey, setSortKey]                 = useState('featured');
  const [sortDir, setSortDir]                 = useState('desc');
  const itemsPerPage = 2;

  /* ── Build dynamic filter tabs from the projects data ── */
  const filterTabs = useMemo(() => {
    const tabs = ['All', 'Featured'];
    // Collect tech categories by scanning techStack
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
    if (activeFilter === 'All')      return projects;
    if (activeFilter === 'Featured') return projects.filter((p) => p.isFeatured);
    // Tech-based filters
    return projects.filter((p) => {
      return p.techStack?.some((t) => {
        const tl = t.toLowerCase();
        if (activeFilter === 'Frontend') return tl.includes('react') || tl.includes('next') || tl.includes('vue');
        if (activeFilter === 'Backend')  return tl.includes('node')  || tl.includes('express') || tl.includes('spring');
        if (activeFilter === 'AI / ML')  return tl.includes('python') || tl.includes('ml') || tl.includes('pytorch') || tl.includes('scikit');
        if (activeFilter === 'Database') return tl.includes('postgres') || tl.includes('mongo') || tl.includes('mysql');
        return false;
      });
    });
  }, [projects, activeFilter]);

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
  const totalPages      = Math.max(1, Math.ceil(sorted.length / itemsPerPage));
  const validPage       = Math.min(currentPage, totalPages);
  const displayedProjects = sorted.slice((validPage - 1) * itemsPerPage, validPage * itemsPerPage);

  /* ── Handlers ── */
  const handleFilter = (tab) => { setActiveFilter(tab); setCurrentPage(1); };
  const handleSort   = (key) => {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortKey(key); setSortDir('desc'); }
    setCurrentPage(1);
  };

  return (
    <section id="projects" className="w-full py-20 px-4 lg:px-8 bg-[#080B14] border-t border-slate-800/60 relative">
      <div className="max-w-7xl mx-auto relative">

        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div>
            <span className="text-cyan-400 font-semibold text-xs uppercase tracking-widest flex items-center gap-1.5 mb-1">
              <Layers className="w-3.5 h-3.5" /> Portfolio Work
            </span>
            <TypingHeading
              text="Featured Projects"
              highlightText="Projects"
              className="text-3xl sm:text-4xl font-extrabold text-white mt-1 tracking-tight"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="text-slate-400 text-sm max-w-md leading-relaxed">
              Full-stack web platforms engineered with role-based access control, Stripe payment gateways, and real-time APIs.
            </p>
            <Link to="/projects" className="shrink-0">
              <Button
                variant="secondary"
                size="sm"
                className="rounded-xl bg-slate-900/90 border-slate-800 hover:border-cyan-500/50 text-slate-200 hover:text-white px-4 py-2.5 shadow-md backdrop-blur-md group"
              >
                <span>See More Projects</span>
                <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
          </div>
        </div>

        {/* ── Toolbar: Filter tabs + Sort buttons ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
        >
          {/* Filter tabs */}
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

          {/* Sort + count */}
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

        {/* ── Projects Grid ── */}
        {displayedProjects.length > 0 ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${validPage}-${activeFilter}-${sortKey}-${sortDir}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10"
            >
              {displayedProjects.map((project, index) => (
                <motion.div
                  key={project.id || project.title || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <ElectricBorder color="#06b6d4" speed={1} chaos={0.12} borderRadius={24} className="h-full">
                    <Card hoverEffect={true} className="flex flex-col justify-between h-full bg-white dark:bg-slate-900/70 p-0 overflow-hidden border-slate-200 dark:border-slate-800">
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

                      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                        <div>
                          {!project.thumbnailUrl && (
                            <div className="flex items-center justify-between gap-4 mb-3">
                              <Badge variant="cyan" className="font-semibold">Full-Stack Platform</Badge>
                              {project.isFeatured && (
                                <Badge variant="indigo" className="gap-1 border-amber-500/40 text-amber-300 bg-amber-500/10">
                                  <Sparkles className="w-3 h-3 text-amber-400" /> Featured
                                </Badge>
                              )}
                            </div>
                          )}

                          <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors tracking-tight">
                            {project.title}
                          </h3>
                          <p className="text-xs font-semibold text-indigo-400 mt-1 mb-3">{project.tagline}</p>
                          <p className="text-sm text-slate-300 line-clamp-3 leading-relaxed mb-6">
                            {project.description}
                          </p>

                          {/* Tech Stack */}
                          <div className="flex flex-wrap gap-2 mb-6">
                            {project.techStack?.map((tech) => (
                              <Badge key={tech} variant="outline" className="font-mono text-[11px] py-0.5 px-2 bg-slate-950/60 border-slate-800 text-slate-300">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                          <button
                            onClick={() => setSelectedProject(project)}
                            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 underline underline-offset-4 transition-colors"
                          >
                            View Details
                          </button>

                          <div className="flex items-center gap-3">
                            {project.clientGithubUrl && (
                              <a href={project.clientGithubUrl} target="_blank" rel="noreferrer"
                                className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors">
                                <Github className="w-4 h-4" /> Client
                              </a>
                            )}
                            {project.serverGithubUrl && (
                              <a href={project.serverGithubUrl} target="_blank" rel="noreferrer"
                                className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors">
                                <FolderGit2 className="w-4 h-4" /> Server
                              </a>
                            )}
                            {project.liveDemoUrl && (
                              <a href={project.liveDemoUrl} target="_blank" rel="noreferrer">
                                <Button variant="primary" size="sm" icon={ExternalLink}>Live Demo</Button>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </ElectricBorder>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 text-slate-400 text-sm bg-slate-900/40 rounded-3xl border border-slate-800 mb-10"
          >
            <Layers className="w-8 h-8 text-slate-700 mx-auto mb-3" />
            No projects match this filter.
          </motion.div>
        )}

        {/* ── Pagination ── */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-800/80">
            <span className="text-xs text-slate-400 font-medium">
              Showing <span className="text-white font-semibold">{(validPage - 1) * itemsPerPage + 1}</span> to{' '}
              <span className="text-white font-semibold">{Math.min(validPage * itemsPerPage, sorted.length)}</span>{' '}
              of <span className="text-cyan-400 font-semibold">{sorted.length}</span> projects
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={validPage === 1}
                className={`p-2 px-3 rounded-xl border text-xs font-semibold flex items-center gap-1 transition-all ${
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
                    className={`w-8 h-8 rounded-xl text-xs font-bold transition-all ${
                      validPage === pageNum
                        ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/20 border border-cyan-400/40'
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
                className={`p-2 px-3 rounded-xl border text-xs font-semibold flex items-center gap-1 transition-all ${
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

        {/* Mobile "View All" */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-xs font-bold shadow-lg shadow-cyan-500/20 w-full justify-center"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* ── Detail Modal ── */}
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

              <p className="text-sm text-slate-200 leading-relaxed">{selectedProject.description}</p>

              <div>
                <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-2">Tech Stack Architecture</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.techStack?.map((tech) => (
                    <Badge key={tech} variant="cyan" className="text-xs font-mono py-1 px-3">{tech}</Badge>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-end gap-3 pt-6 border-t border-slate-800">
                {selectedProject.clientGithubUrl && (
                  <a href={selectedProject.clientGithubUrl} target="_blank" rel="noreferrer">
                    <Button variant="outline" size="sm" icon={Github}>Client Repository</Button>
                  </a>
                )}
                {selectedProject.serverGithubUrl && (
                  <a href={selectedProject.serverGithubUrl} target="_blank" rel="noreferrer">
                    <Button variant="outline" size="sm" icon={FolderGit2}>Server Repository</Button>
                  </a>
                )}
                {selectedProject.liveDemoUrl && (
                  <a href={selectedProject.liveDemoUrl} target="_blank" rel="noreferrer">
                    <Button variant="glow" size="sm" icon={ExternalLink}>Launch Live Demo</Button>
                  </a>
                )}
              </div>
            </div>
          )}
        </Modal>
      </div>
    </section>
  );
};
