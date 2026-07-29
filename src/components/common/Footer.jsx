import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BrainCircuit,
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowUp,
  ExternalLink,
  FileText,
  Sparkles,
  ShieldCheck,
  Code2,
  Terminal,
  ChevronRight,
} from 'lucide-react';
import TypingHeading from '../ui/TypingHeading';

export const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const targetId = href.replace('#', '');

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const elem = document.getElementById(targetId);
        if (elem) {
          const yOffset = -80;
          const y = elem.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 350);
    } else {
      const elem = document.getElementById(targetId);
      if (elem) {
        const yOffset = -80;
        const y = elem.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Education', href: '#education' },
    { label: 'Projects', href: '#projects' },
    { label: 'Thesis', href: '#thesis' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  const techStack = [
    'Python',
    'Node.js',
    'React.js',
    'PostgreSQL',
    'PyTorch',
    'Next.js',
    'Prisma ORM',
    'Docker',
  ];

  return (
    <footer className="relative bg-[#050811] text-slate-200 border-t border-slate-800/80 overflow-hidden font-sans">
      {/* Top glowing ambient gradient divider */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-500 to-indigo-500/80" />

      {/* Ambient background light spots */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        {/* TOP BANNER: Modern CTA Callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900/90 via-indigo-950/40 to-slate-900/90 border border-slate-800/90 shadow-[0_10px_30px_rgba(0,0,0,0.5)] mb-14 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />
          
          <div className="space-y-2 text-center md:text-left relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Open For Opportunities
            </span>
            <TypingHeading 
              as="h3"
              text="Ready to collaborate on your next big project?" 
              highlightText="next big project?"
              className="text-2xl sm:text-3xl font-black text-white tracking-tight" 
            />
            <p className="text-sm text-slate-400 max-w-xl">
              Specialized in AI-driven automation, machine learning pipelines, and scalable backend services.
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0 relative z-10">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/25 border border-cyan-400/40 hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>Get In Touch</span>
            </a>
            <a
              href="/CV_Shamim.pdf"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-600 font-semibold text-sm hover:scale-105 transition-all flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>Download CV</span>
            </a>
          </div>
        </motion.div>

        {/* 4-COLUMN MAIN FOOTER CONTENT - SLEEK VERTICAL DIVIDERS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-stretch divide-y md:divide-y-0 lg:divide-x divide-slate-800/80 pb-12 border-b border-slate-800/80 gap-y-8 lg:gap-y-0">
          {/* COLUMN 1: Brand & Bio */}
          <div className="flex flex-col justify-between flex-1 h-full lg:pr-6 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/25 shrink-0 hover:scale-105 transition-transform">
                  <BrainCircuit className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-extrabold text-lg text-white tracking-wide">Md. Samim</h4>
                  <p className="text-xs text-cyan-400 font-semibold">AI & Backend Engineer</p>
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                B.Sc. graduate in Computer Science & Engineering from DIU. Passionate about machine learning pipelines, REST APIs, and dynamic 3D web interfaces.
              </p>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Available for Full-Stack & AI Roles</span>
              </div>
            </div>
          </div>

          {/* COLUMN 2: Quick Links */}
          <div className="flex flex-col justify-between flex-1 h-full pt-6 md:pt-0 lg:px-6 space-y-6">
            <div>
              <h4 className="text-sm font-extrabold uppercase tracking-wider text-white flex items-center gap-2 pb-3 border-b border-slate-800/80 mb-3">
                <Code2 className="w-4 h-4 text-cyan-400" /> Quick Navigation
              </h4>
              <ul className="grid grid-cols-2 gap-2 text-xs font-medium">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="group/item flex items-center gap-1 text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer py-1"
                    >
                      <ChevronRight className="w-3 h-3 text-slate-600 group-hover/item:text-cyan-400 group-hover/item:translate-x-1 transition-all shrink-0" />
                      <span className="truncate">{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase">
              Smooth Page Scrolling Enabled
            </div>
          </div>

          {/* COLUMN 3: Technical Core */}
          <div className="flex flex-col justify-between flex-1 h-full pt-6 lg:pt-0 lg:px-6 space-y-6">
            <div>
              <h4 className="text-sm font-extrabold uppercase tracking-wider text-white flex items-center gap-2 pb-3 border-b border-slate-800/80 mb-3">
                <Terminal className="w-4 h-4 text-cyan-400" /> Tech Competencies
              </h4>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-[11px] font-semibold text-slate-300 hover:text-cyan-300 hover:scale-105 transition-all shadow-sm cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="text-[10px] text-cyan-400/80 font-bold tracking-wider uppercase">
              High-Performance Engineering
            </div>
          </div>

          {/* COLUMN 4: Contact & Social */}
          <div className="flex flex-col justify-between flex-1 h-full pt-6 lg:pt-0 lg:pl-6 space-y-6">
            <div>
              <h4 className="text-sm font-extrabold uppercase tracking-wider text-white flex items-center gap-2 pb-3 border-b border-slate-800/80 mb-3">
                <ShieldCheck className="w-4 h-4 text-cyan-400" /> Direct Contact
              </h4>

              <div className="space-y-2.5 text-xs text-slate-400">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 shrink-0">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <a href="mailto:tamjidulislamsamim@gmail.com" className="hover:text-cyan-300 transition-colors truncate">
                    tamjidulislamsamim@gmail.com
                  </a>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 shrink-0">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <a href="tel:+8801782938883" className="hover:text-cyan-300 transition-colors">
                    +880 1782-938883
                  </a>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 shrink-0">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <span>Dhaka, Bangladesh</span>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/samim"
                target="_blank"
                rel="noreferrer"
                title="GitHub Profile"
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-400/60 hover:scale-110 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all duration-300"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/md-samim5669/"
                target="_blank"
                rel="noreferrer"
                title="LinkedIn Profile"
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-400/60 hover:scale-110 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all duration-300"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:tamjidulislamsamim@gmail.com"
                title="Send Email"
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-400/60 hover:scale-110 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all duration-300"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Md. Samim. All rights reserved.</p>

          <div className="flex items-center gap-4 font-medium">
            <Link to="/admin/login" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
              <span>Admin Portal</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
            <span>•</span>
            <a href="/CV_Shamim.pdf" target="_blank" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
              <span>View CV PDF</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Scroll To Top Button */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 hover:border-cyan-400/50 text-slate-300 hover:text-white text-xs font-semibold shadow-md hover:scale-105 transition-all"
            title="Back to top"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-cyan-400 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};
