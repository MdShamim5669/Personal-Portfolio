import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, Sparkles, Layers, ExternalLink, FolderGit2, Github, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { useProjectsQuery } from '../hooks/usePortfolioQueries';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

export const ProjectsPage = () => {
  const { data: projects = [] } = useProjectsQuery();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const allProjects = projects;

  const filteredProjects = allProjects.filter((proj) => {
    const q = searchQuery.toLowerCase();
    const titleMatch = proj.title?.toLowerCase().includes(q);
    const taglineMatch = proj.tagline?.toLowerCase().includes(q);
    const descMatch = proj.description?.toLowerCase().includes(q);
    const techMatch = proj.techStack?.some((t) => t.toLowerCase().includes(q));
    return titleMatch || taglineMatch || descMatch || techMatch;
  });

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / itemsPerPage));
  const validPage = Math.min(currentPage, totalPages);
  const displayedProjects = filteredProjects.slice((validPage - 1) * itemsPerPage, validPage * itemsPerPage);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-300">
      <Navbar />

      <main className="flex-1 py-16 px-4 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-400/50 text-xs font-semibold transition-all hover:-translate-x-1 shadow-lg"
          >
            <ArrowLeft className="w-4 h-4 text-cyan-400" /> Back to Portfolio Home
          </Link>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 pb-8 border-b border-slate-800/80">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-3">
              <Layers className="w-3.5 h-3.5" /> All Projects & Systems
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Featured Works & Architecture
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
              placeholder="Search by title, technology, or description..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all shadow-inner"
            />
          </div>
        </div>

        {/* Projects Grid */}
        {displayedProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
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
                  <div className="relative h-52 sm:h-60 w-full overflow-hidden bg-slate-950">
                    <img
                      src={project.thumbnailUrl}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
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
          </div>
        ) : (
          <div className="text-center py-24 text-slate-400 text-sm bg-slate-900/40 rounded-3xl border border-slate-800">
            No projects found matching "{searchQuery}".
          </div>
        )}

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-800/80">
            <span className="text-xs text-slate-400 font-medium">
              Showing <span className="text-white font-semibold">{(validPage - 1) * itemsPerPage + 1}</span> to{' '}
              <span className="text-white font-semibold">
                {Math.min(validPage * itemsPerPage, filteredProjects.length)}
              </span>{' '}
              of <span className="text-cyan-400 font-semibold">{filteredProjects.length}</span> projects
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
                <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 max-h-64 sm:max-h-72">
                  <img
                    src={selectedProject.thumbnailUrl}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
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
