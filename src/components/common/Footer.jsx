import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BrainCircuit,
  Mail,
  Phone,
  ArrowUp,
  ExternalLink,
  FileText,
  Sparkles,
  ShieldCheck,
  Code2,
  Terminal,
  ChevronRight,
  Heart
} from 'lucide-react';
import TypingHeading from '../ui/TypingHeading';
import { HexagonBackground } from '../animate-ui/components/backgrounds/hexagon';
import {
  FacebookIcon,
  GoogleIcon,
  IMessageIcon,
  AzureLocationIcon,
  LinkedinIcon,
  GithubIcon
} from '../ui/CustomIcons';
import { useProfileQuery } from '../../hooks/usePortfolioQueries';

export const Footer = ({ profile: profileProp }) => {
  const { data: profileQuery } = useProfileQuery();
  const profile = profileProp || profileQuery;

  const navigate = useNavigate();
  const location = useLocation();

  const emailVal = profile?.email || 'tamjidulislamsamim@gmail.com';
  const phoneVal = profile?.phone || '+880 1743597989';
  const locationVal = profile?.location || 'Dhaka, Bangladesh';
  const githubUrl = profile?.githubUrl || 'https://github.com/MdShamim5669/';
  const linkedinUrl = profile?.linkedinUrl || 'https://www.linkedin.com/in/md-samim5669/';
  const resumeUrl = profile?.resumeUrl || '/CV_Shamim.pdf';
  const cleanPhone = (phoneVal || '').replace(/\s+/g, '');

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
    <footer className="relative bg-[#040711] text-slate-200 border-t border-slate-800/80 overflow-hidden font-sans pt-20 sm:pt-24 pb-12">
      {/* Hexagon Interactive Grid Background */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <HexagonBackground hexagonSize={65} hexagonMargin={2} className="bg-transparent dark:bg-transparent" />
      </div>

      {/* Top glowing ambient gradient line positioned at absolute top */}
      <div className="absolute top-0 left-0 right-0 h-[2px] w-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 shadow-[0_0_20px_rgba(6,182,212,0.9)]" />

      {/* Ambient background light spots */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* TOP BANNER: Modern CTA Callout with Electric Glow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="p-8 sm:p-10 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-2xl mt-4 sm:mt-6 mb-16 flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden group transition-all duration-500"
        >
          {/* Subtle Background Glow behind Banner */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-cyan-500/20 via-indigo-500/10 to-transparent rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700 pointer-events-none" />

          <div className="space-y-3 text-center lg:text-left relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>Available For Opportunities</span>
            </div>
            
            <TypingHeading 
              as="h3"
              text="Ready to collaborate on your next big project?" 
              highlightText="next big project?"
              className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight" 
            />
            
            <p className="text-sm text-slate-400 leading-relaxed">
              Specialized in AI-driven automation, machine learning pipelines, distributed backend services, and high-performance web applications.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-4 shrink-0 relative z-10">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-extrabold text-sm shadow-[0_0_25px_rgba(6,182,212,0.4)] border border-cyan-400/50 hover:scale-105 transition-all duration-300 flex items-center gap-2.5 cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>Get In Touch</span>
            </a>
            <a
              href={resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 rounded-2xl bg-slate-950/80 hover:bg-slate-800/80 text-slate-200 border border-slate-700 hover:border-slate-500 font-bold text-sm hover:scale-105 transition-all duration-300 flex items-center gap-2 shadow-lg"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>Download CV</span>
            </a>
          </div>
        </motion.div>

        {/* 4-COLUMN MAIN FOOTER CONTENT */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
          {/* COLUMN 1: Brand & Bio */}
          <div className="space-y-5">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 flex items-center justify-center shadow-[0_0_20px_rgba(79,70,229,0.5)] shrink-0 hover:rotate-6 transition-transform">
                <BrainCircuit className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-black text-xl text-white tracking-wide">{profile?.fullName || 'Md. Samim'}</h4>
                <p className="text-xs font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-300">
                  {profile?.title || 'AI & Backend Engineer'}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              {profile?.bio || 'Computer Science & Engineering graduate from DIU. Passionate about machine learning pipelines, scalable microservices, and interactive web applications.'}
            </p>

            <div className="pt-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Open for Full-Stack & AI Roles</span>
              </div>
            </div>
          </div>

          {/* COLUMN 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-white flex items-center gap-2 pb-2.5 border-b border-slate-800">
              <Code2 className="w-4 h-4 text-cyan-400" /> Quick Navigation
            </h4>
            <ul className="grid grid-cols-2 gap-2 text-xs font-medium">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="group/item flex items-center gap-1.5 text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer py-1.5 px-2 rounded-lg hover:bg-slate-900/60"
                  >
                    <ChevronRight className="w-3 h-3 text-slate-600 group-hover/item:text-cyan-400 group-hover/item:translate-x-1 transition-all shrink-0" />
                    <span className="truncate">{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: Technical Core */}
          <div className="space-y-4">
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-white flex items-center gap-2 pb-2.5 border-b border-slate-800">
              <Terminal className="w-4 h-4 text-cyan-400" /> Core Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-400/50 text-[11px] font-semibold text-slate-300 hover:text-cyan-300 hover:scale-105 transition-all shadow-sm cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* COLUMN 4: Direct Contact & Socials */}
          <div className="space-y-4">
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-white flex items-center gap-2 pb-2.5 border-b border-slate-800">
              <ShieldCheck className="w-4 h-4 text-cyan-400" /> Connect Direct
            </h4>

            <div className="space-y-3.5 text-xs text-slate-400">
              <div className="flex items-center gap-3 group">
                <div className="w-9 h-9 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-center shrink-0 shadow-inner group-hover:border-red-500/50 group-hover:scale-105 transition-all">
                  <GoogleIcon className="w-4 h-4" />
                </div>
                <a href={`mailto:${emailVal}`} className="hover:text-cyan-300 transition-colors truncate">
                  {emailVal}
                </a>
              </div>

              <div className="flex items-center gap-3 group">
                <div className="w-9 h-9 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-center shrink-0 shadow-inner group-hover:border-emerald-500/50 group-hover:scale-105 transition-all">
                  <IMessageIcon className="w-4.5 h-4.5" fill="#34DA50" />
                </div>
                <a href={`tel:${cleanPhone}`} className="hover:text-emerald-300 transition-colors flex items-center gap-1.5">
                  <span>{phoneVal}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20">iMessage</span>
                </a>
              </div>

              <div className="flex items-center gap-3 group">
                <div className="w-9 h-9 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-center shrink-0 shadow-inner group-hover:border-cyan-400/50 group-hover:scale-105 transition-all">
                  <AzureLocationIcon className="w-4.5 h-4.5" />
                </div>
                <span className="group-hover:text-cyan-300 transition-colors">{locationVal}</span>
              </div>
            </div>

            {/* Social Media Buttons */}
            <div className="pt-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Social Profiles
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  title="GitHub Profile"
                  className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:scale-110 transition-all duration-300"
                >
                  <GithubIcon className="w-4 h-4 text-white" />
                </a>

                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  title="LinkedIn Profile"
                  className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 hover:border-blue-500 hover:shadow-[0_0_15px_rgba(10,102,194,0.5)] hover:scale-110 transition-all duration-300"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>

                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  title="Facebook Profile"
                  className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 hover:border-blue-600 hover:shadow-[0_0_15px_rgba(8,102,255,0.5)] hover:scale-110 transition-all duration-300"
                >
                  <FacebookIcon className="w-4 h-4" />
                </a>

                <a
                  href={`mailto:${emailVal}`}
                  title="Google / Gmail"
                  className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 hover:border-red-400 hover:shadow-[0_0_15px_rgba(234,67,53,0.4)] hover:scale-110 transition-all duration-300"
                >
                  <GoogleIcon className="w-4 h-4" />
                </a>

                <a
                  href={`sms:${cleanPhone}`}
                  title="iMessage / SMS"
                  className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 hover:border-emerald-400 hover:shadow-[0_0_15px_rgba(52,218,80,0.4)] hover:scale-110 transition-all duration-300"
                >
                  <IMessageIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p className="flex items-center gap-1.5">
            © {new Date().getFullYear()} Md. Samim. Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline animate-pulse" /> & React.
          </p>

          <div className="flex items-center gap-4 font-semibold">
            <a href="/CV_Shamim.pdf" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
              <span>View CV PDF</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Floating Back To Top Button */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 hover:border-cyan-400 text-slate-300 hover:text-white text-xs font-extrabold shadow-lg hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:scale-105 transition-all duration-300 cursor-pointer"
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

export default Footer;
