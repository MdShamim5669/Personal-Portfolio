import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ExternalLink, FolderGit2, Github, Sparkles, Layers, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import Card from '../ui/Card';
import ElectricBorder from '../ui/ElectricBorder';
import TypingHeading from '../ui/TypingHeading';

const DEFAULT_PROJECTS = [
  {
    id: 'def-1',
    title: 'SaFus Restaurant Management System',
    tagline: 'Full-Stack MERN Food Ordering Platform',
    description: 'A comprehensive multi-role restaurant web application supporting online food ordering, real-time cart tracking, Stripe payment gateway, and an interactive Admin/Manager Dashboard for order fulfillment.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'Stripe'],
    liveDemoUrl: 'https://safus-restaurant.web.app',
    clientGithubUrl: 'https://github.com/MdShamim5669',
    isFeatured: true,
  },
  {
    id: 'def-2',
    title: 'ParCelGo Courier & Logistics Network',
    tagline: 'Real-Time Parcel Booking & Dispatch System',
    description: 'Enterprise logistics web system built with role-based authorization for Senders, Delivery Personnel, and Admins. Features real-time parcel status tracking, automated dispatch routing, and payment history analytics.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Tailwind CSS'],
    liveDemoUrl: 'https://parcelgo-express.web.app',
    clientGithubUrl: 'https://github.com/MdShamim5669',
    isFeatured: true,
  },
  {
    id: 'def-3',
    title: 'AI Mental Health & Stress Detection System',
    tagline: 'Machine Learning Survey & Classification Pipeline',
    description: 'An AI-powered web platform trained on student mental health survey data using SMOTE feature engineering and Random Forest classifier, achieving 84.4% predictive accuracy for early stress intervention.',
    techStack: ['Python', 'PyTorch', 'Scikit-Learn', 'FastAPI', 'React', 'Tailwind CSS'],
    liveDemoUrl: 'https://github.com/MdShamim5669',
    clientGithubUrl: 'https://github.com/MdShamim5669',
    isFeatured: true,
  },
  {
    id: 'def-4',
    title: 'Multi-Vendor E-Commerce Platform',
    tagline: 'Scalable Microservices Marketplace Architecture',
    description: 'High-throughput e-commerce platform with product filtering, inventory synchronization, secure JWT authentication, and automated email order receipts.',
    techStack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma ORM', 'Redis', 'Docker'],
    liveDemoUrl: 'https://github.com/MdShamim5669',
    clientGithubUrl: 'https://github.com/MdShamim5669',
    isFeatured: true,
  },
  {
    id: 'def-5',
    title: 'Real-Time Collaborative Workspace',
    tagline: 'WebSocket Document & Task Synchronization Engine',
    description: 'A real-time team collaboration tool featuring live document editing, kanban task boards, and automated activity notifications via WebSockets.',
    techStack: ['React', 'Socket.IO', 'Express.js', 'Node.js', 'Tailwind CSS'],
    liveDemoUrl: 'https://github.com/MdShamim5669',
    clientGithubUrl: 'https://github.com/MdShamim5669',
    isFeatured: true,
  },
  {
    id: 'def-6',
    title: 'Cloud Media CDN & Asset Optimizer',
    tagline: 'Dynamic Image Compression & Storage Service',
    description: 'High-performance microservice for image CDN storage, WebP auto-compression, and secure signed url generation.',
    techStack: ['Node.js', 'Express', 'Cloudinary', 'Docker', 'Redis'],
    liveDemoUrl: 'https://github.com/MdShamim5669',
    clientGithubUrl: 'https://github.com/MdShamim5669',
    isFeatured: true,
  },
];

export const ProjectsSection = ({ projects = [] }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  // Merge API projects with default projects to ensure 6 projects total (3 pages of 2 items each)
  const combinedProjects = [...projects];
  DEFAULT_PROJECTS.forEach((def) => {
    if (!combinedProjects.some((p) => p.title?.toLowerCase() === def.title?.toLowerCase())) {
      combinedProjects.push(def);
    }
  });

  const allProjects = combinedProjects;
  const totalPages = Math.max(1, Math.ceil(allProjects.length / itemsPerPage));

  // Handle page boundaries if projects change
  const validPage = Math.min(currentPage, totalPages);
  const displayedProjects = allProjects.slice((validPage - 1) * itemsPerPage, validPage * itemsPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <section id="projects" className="w-full py-20 px-4 lg:px-8 bg-[#080B14] border-t border-slate-800/60 relative">
      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-cyan-600 dark:text-cyan-400 font-semibold text-xs uppercase tracking-widest flex items-center gap-1.5 mb-1">
              <Layers className="w-3.5 h-3.5" /> Portfolio Work
            </span>
            <TypingHeading 
              text="Featured Projects" 
              highlightText="Projects"
              className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1 tracking-tight" 
            />
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="text-slate-600 dark:text-slate-400 text-sm max-w-md leading-relaxed">
              Full-stack web platforms engineered with role-based access control, Stripe payment gateways, and real-time APIs.
            </p>
            {/* See More Button */}
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

        {/* Projects Grid (2 per page) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={validPage}
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
                    {/* Optional Project Thumbnail Header */}
                    {project.thumbnailUrl && (
                      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-950 group">
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

                    <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                      <div>
                        {!project.thumbnailUrl && (
                          <div className="flex items-center justify-between gap-4 mb-3">
                            <Badge variant="cyan" className="font-semibold">
                              Full-Stack Platform
                            </Badge>
                            {project.isFeatured && (
                              <Badge variant="indigo" className="gap-1 border-amber-500/40 text-amber-300 bg-amber-500/10">
                                <Sparkles className="w-3 h-3 text-amber-400" /> Featured
                              </Badge>
                            )}
                          </div>
                        )}

                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors tracking-tight">
                          {project.title}
                        </h3>
                        <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mt-1 mb-3">{project.tagline}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed mb-6">
                          {project.description}
                        </p>

                        {/* Tech Stack Pills */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.techStack?.map((tech) => (
                            <Badge key={tech} variant="outline" className="font-mono text-[11px] py-0.5 px-2 bg-slate-100 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Action Links */}
                      <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between">
                        <button
                          onClick={() => setSelectedProject(project)}
                          className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300 underline underline-offset-4 transition-colors"
                        >
                          View Details
                        </button>

                        <div className="flex items-center gap-3">
                          {project.clientGithubUrl && (
                            <a
                              href={project.clientGithubUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                            >
                              <Github className="w-4 h-4" /> Client
                            </a>
                          )}
                          {project.serverGithubUrl && (
                            <a
                              href={project.serverGithubUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                            >
                              <FolderGit2 className="w-4 h-4" /> Server
                            </a>
                          )}
                          {project.liveDemoUrl && (
                            <a
                              href={project.liveDemoUrl}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <Button variant="primary" size="sm" icon={ExternalLink}>
                                Live Demo
                              </Button>
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

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-800/80">
            <span className="text-xs text-slate-400 font-medium">
              Showing <span className="text-white font-semibold">{(validPage - 1) * itemsPerPage + 1}</span> to{' '}
              <span className="text-white font-semibold">
                {Math.min(validPage * itemsPerPage, allProjects.length)}
              </span>{' '}
              of <span className="text-cyan-400 font-semibold">{allProjects.length}</span> projects
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevPage}
                disabled={validPage === 1}
                className={`p-2 px-3 rounded-xl border text-xs font-semibold flex items-center gap-1 transition-all ${
                  validPage === 1
                    ? 'bg-slate-900/50 border-slate-800/60 text-slate-600 cursor-not-allowed'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-cyan-500/50 hover:text-white hover:bg-slate-800'
                }`}
                aria-label="Previous Page"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              {/* Page Number Indicator Buttons */}
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
                onClick={handleNextPage}
                disabled={validPage === totalPages}
                className={`p-2 px-3 rounded-xl border text-xs font-semibold flex items-center gap-1 transition-all ${
                  validPage === totalPages
                    ? 'bg-slate-900/50 border-slate-800/60 text-slate-600 cursor-not-allowed'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-cyan-500/50 hover:text-white hover:bg-slate-800'
                }`}
                aria-label="Next Page"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Bottom See All Projects Callout */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-xs font-bold shadow-lg shadow-cyan-500/20 w-full justify-center"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Project Detail Modal */}
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

              <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                {selectedProject.description}
              </p>

              <div>
                <h4 className="text-xs uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider mb-2">
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

              <div className="flex flex-wrap items-center justify-end gap-3 pt-6 border-t border-slate-200 dark:border-slate-800">
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
      </div>
    </section>
  );
};
