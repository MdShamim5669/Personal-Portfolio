import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, FolderGit2, Github, Sparkles, Layers } from 'lucide-react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import Card from '../ui/Card';
import ElectricBorder from '../ui/ElectricBorder';
import TypingHeading from '../ui/TypingHeading';

export const ProjectsSection = ({ projects = [] }) => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="w-full py-20 px-4 lg:px-8 bg-[#080B14] border-t border-slate-800/60 relative">
      <div className="max-w-7xl mx-auto relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
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
        <p className="text-slate-600 dark:text-slate-400 text-sm max-w-md leading-relaxed">
          Full-stack web platforms engineered with role-based access control, Stripe payment gateways, and real-time APIs.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.id || project.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
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
