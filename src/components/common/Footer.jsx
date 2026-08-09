import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BrainCircuit, Mail, ArrowUp, ExternalLink, FileText,
  Sparkles, ShieldCheck, Code2, Terminal, ChevronRight, Heart,
} from 'lucide-react';
import TypingHeading from '../ui/TypingHeading';
import { HexagonBackground } from '../animate-ui/components/backgrounds/hexagon';
import {
  FacebookIcon, GoogleIcon, IMessageIcon,
  AzureLocationIcon, LinkedinIcon, GithubIcon,
} from '../ui/CustomIcons';
import { useProfileQuery } from '../../hooks/usePortfolioQueries';

/* -- helpers --------------------------------------------- */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

const ColLabel = ({ icon: Icon, children }) => (
  <div className="flex items-center gap-2 mb-5">
    <span className="w-5 h-5 rounded-md bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center shrink-0">
      <Icon className="w-3 h-3 text-cyan-400" />
    </span>
    <span className="text-[10.5px] font-black uppercase tracking-[.18em] text-slate-500">
      {children}
    </span>
  </div>
);

/* -- component ------------------------------------------- */
export const Footer = ({ profile: profileProp }) => {
  const { data: profileQuery } = useProfileQuery();
  const profile = profileProp || profileQuery;

  const navigate  = useNavigate();
  const location  = useLocation();

  const emailVal    = profile?.email       || 'tamjidulislamsamim@gmail.com';
  const phoneVal    = profile?.phone       || '+880 1743597989';
  const locationVal = profile?.location    || 'Dhaka, Bangladesh';
  const githubUrl   = profile?.githubUrl   || 'https://github.com/MdShamim5669/';
  const linkedinUrl = profile?.linkedinUrl || 'https://www.linkedin.com/in/md-samim5669/';
  const resumeUrl   = profile?.resumeUrl   || '/CV_Shamim.pdf';
  const cleanPhone  = (phoneVal || '').replace(/\s+/g, '');

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const go = () => {
      const el = document.getElementById(id);
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' });
    };
    if (location.pathname !== '/') { navigate('/'); setTimeout(go, 350); }
    else go();
  };

  const navLinks = [
    { label: 'About',      href: '#about' },
    { label: 'Skills',     href: '#skills' },
    { label: 'Education',  href: '#education' },
    { label: 'Projects',   href: '#projects' },
    { label: 'Thesis',     href: '#thesis' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact',    href: '#contact' },
  ];

  const techStack = ['Python', 'Node.js', 'React.js', 'PostgreSQL', 'PyTorch', 'Next.js', 'Prisma ORM', 'Docker'];

  const socials = [
    { href: githubUrl,             icon: <GithubIcon   className="w-4 h-4 text-white" />, label: 'GitHub',   color: 'hover:border-cyan-400 hover:shadow-[0_0_16px_rgba(6,182,212,0.5)]' },
    { href: linkedinUrl,           icon: <LinkedinIcon className="w-4 h-4" />,             label: 'LinkedIn', color: 'hover:border-blue-400 hover:shadow-[0_0_16px_rgba(10,102,194,0.6)]' },
    { href: 'https://facebook.com',icon: <FacebookIcon className="w-4 h-4" />,             label: 'Facebook', color: 'hover:border-blue-500 hover:shadow-[0_0_16px_rgba(8,102,255,0.5)]' },
    { href: `mailto:${emailVal}`,  icon: <GoogleIcon   className="w-4 h-4" />,             label: 'Gmail',    color: 'hover:border-red-400 hover:shadow-[0_0_16px_rgba(234,67,53,0.5)]' },
    { href: `sms:${cleanPhone}`,   icon: <IMessageIcon className="w-4 h-4" />,             label: 'iMessage', color: 'hover:border-emerald-400 hover:shadow-[0_0_16px_rgba(52,218,80,0.4)]' },
  ];

  return (
    <footer className="relative bg-[#020509] text-slate-300 overflow-hidden font-sans">

      {/* -- decorative top line -- */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/80 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-cyan-500/5 to-transparent pointer-events-none" />

      {/* -- hexagon texture -- */}
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none select-none">
        <HexagonBackground hexagonSize={60} hexagonMargin={2} className="bg-transparent dark:bg-transparent" />
      </div>

      {/* -- ambient blobs -- */}
      <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-cyan-500/5 rounded-full blur-[200px] pointer-events-none -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-violet-600/5 rounded-full blur-[200px] pointer-events-none translate-x-1/2" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/4 rounded-full blur-[180px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-20 sm:pt-28 pb-0">

        {/* ----------------------------------------------
            CTA BANNER
        ---------------------------------------------- */}
        <motion.div
          {...fadeUp(0)}
          className="relative rounded-[2rem] overflow-hidden border border-white/[0.07] shadow-[0_40px_100px_rgba(0,0,0,0.7)] mb-20"
        >
          {/* layered glass bg */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-[#0a1220] to-[#0d1525]" />
          <div className="absolute inset-0 backdrop-blur-xl bg-white/[0.02]" />

          {/* glow accents */}
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-violet-600/10 rounded-full blur-[80px] pointer-events-none" />

          {/* inner top border glow */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

          <div className="relative z-10 p-8 sm:p-12 lg:p-14 flex flex-col lg:flex-row items-center justify-between gap-10">

            {/* left: text */}
            <div className="space-y-5 text-center lg:text-left max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-[11px] font-bold uppercase tracking-[.16em]"
              >
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                Available For Opportunities
              </motion.div>

              <TypingHeading
                as="h3"
                text="Ready to collaborate on your next big project?"
                highlightText="next big project?"
                className="text-[1.75rem] sm:text-[2.25rem] lg:text-[2.6rem] font-black text-white tracking-tight leading-[1.15]"
              />

              <p className="text-[13.5px] text-slate-400 leading-relaxed max-w-lg">
                Specialized in AI-driven automation, machine learning pipelines, distributed backend services,
                and high-performance web applications.
              </p>
            </div>

            {/* right: buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3.5 shrink-0">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="group relative w-full sm:w-auto px-8 py-4 rounded-2xl overflow-hidden font-extrabold text-sm text-white flex items-center justify-center gap-2.5 cursor-pointer transition-all duration-300 hover:scale-[1.04]"
                style={{ background: 'linear-gradient(135deg, #06b6d4, #6366f1, #8b5cf6)' }}
              >
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(135deg, #22d3ee, #818cf8, #a78bfa)' }} />
                <span className="absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] rounded-2xl" />
                <Mail className="w-4 h-4 relative z-10" />
                <span className="relative z-10">Get In Touch</span>
              </a>

              <a
                href={resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white/5 hover:bg-white/8 text-slate-200 border border-white/10 hover:border-white/20 font-bold text-sm hover:scale-[1.04] transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm"
              >
                <FileText className="w-4 h-4 text-cyan-400" />
                Download CV
              </a>
            </div>
          </div>
        </motion.div>

        {/* ----------------------------------------------
            DIVIDER
        ---------------------------------------------- */}
        <div className="h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent mb-14" />

        {/* ----------------------------------------------
            4-COLUMN GRID
        ---------------------------------------------- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-14">

          {/* -- COL 1: Brand -- */}
          <motion.div {...fadeUp(0.05)} className="space-y-5">
            {/* logo + name */}
            <div className="flex items-center gap-3.5">
              <div className="relative w-11 h-11 rounded-xl shrink-0"
                style={{ background: 'linear-gradient(135deg, #06b6d4, #6366f1, #8b5cf6)' }}>
                <BrainCircuit className="absolute inset-0 m-auto w-5.5 h-5.5 text-white" />
                <div className="absolute inset-0 rounded-xl ring-1 ring-white/15" />
                <div className="absolute inset-0 rounded-xl shadow-[0_0_20px_rgba(99,102,241,0.5)]" />
              </div>
              <div>
                <h4 className="font-black text-[1.05rem] text-white tracking-wide leading-tight">
                  {profile?.fullName || 'Md. Samim'}
                </h4>
                <p className="text-[11px] font-semibold bg-gradient-to-r from-cyan-400 to-indigo-300 bg-clip-text text-transparent">
                  {profile?.title || 'AI & Backend Engineer'}
                </p>
              </div>
            </div>

            {/* bio */}
            <p className="text-[12.5px] text-slate-500 leading-relaxed">
              CSE graduate from DIU. Passionate about ML pipelines, scalable microservices, and interactive web applications.
            </p>

            {/* availability badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-emerald-500/8 border border-emerald-500/20 text-emerald-400 text-[11px] font-semibold">
              <span className="relative flex w-2 h-2 shrink-0">
                <span className="animate-ping absolute inset-0 rounded-full bg-emerald-400 opacity-60" />
                <span className="relative rounded-full w-2 h-2 bg-emerald-400" />
              </span>
              Open for Full-Stack &amp; AI Roles
            </div>
          </motion.div>

          {/* -- COL 2: Navigation -- */}
          <motion.div {...fadeUp(0.1)}>
            <ColLabel icon={Code2}>Quick Navigation</ColLabel>
            <ul className="grid grid-cols-2 gap-x-2 gap-y-0.5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="group/nav flex items-center gap-1.5 text-[12.5px] text-slate-500 hover:text-cyan-300
                               py-[7px] px-2.5 rounded-lg transition-all duration-200 cursor-pointer
                               border-l-2 border-transparent hover:border-cyan-500/60 hover:bg-cyan-500/5 hover:pl-3"
                  >
                    <ChevronRight className="w-3 h-3 shrink-0 text-slate-700 group-hover/nav:text-cyan-400 transition-colors" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* -- COL 3: Tech Stack -- */}
          <motion.div {...fadeUp(0.15)}>
            <ColLabel icon={Terminal}>Core Tech Stack</ColLabel>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.05, duration: 0.25 }}
                  className="px-3 py-1.5 rounded-xl text-[11.5px] font-semibold cursor-default
                             bg-white/[0.03] border border-white/[0.07] text-slate-400
                             hover:text-cyan-300 hover:border-cyan-400/50
                             hover:bg-cyan-500/5 hover:shadow-[0_0_14px_rgba(6,182,212,0.15)]
                             hover:scale-105 transition-all duration-200"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* -- COL 4: Contact + Socials -- */}
          <motion.div {...fadeUp(0.2)} className="space-y-6">
            <div>
              <ColLabel icon={ShieldCheck}>Connect Direct</ColLabel>
              <div className="space-y-1">

                {/* email */}
                <a href={`mailto:${emailVal}`}
                  className="group flex items-center gap-3 p-2.5 rounded-xl
                             hover:bg-white/[0.04] border border-transparent hover:border-white/[0.07]
                             transition-all duration-200">
                  <span className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.07]
                                   flex items-center justify-center shrink-0
                                   group-hover:border-red-400/30 transition-colors">
                    <GoogleIcon className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-[11.5px] text-slate-500 group-hover:text-cyan-300 transition-colors truncate">
                    {emailVal}
                  </span>
                </a>

                {/* phone */}
                <a href={`tel:${cleanPhone}`}
                  className="group flex items-center gap-3 p-2.5 rounded-xl
                             hover:bg-white/[0.04] border border-transparent hover:border-white/[0.07]
                             transition-all duration-200">
                  <span className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.07]
                                   flex items-center justify-center shrink-0
                                   group-hover:border-emerald-400/30 transition-colors">
                    <IMessageIcon className="w-3.5 h-3.5" fill="#34DA50" />
                  </span>
                  <div className="flex items-center gap-2 flex-wrap min-w-0">
                    <span className="text-[11.5px] text-slate-500 group-hover:text-emerald-300 transition-colors">
                      {phoneVal}
                    </span>
                    <span className="text-[9.5px] px-1.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20 shrink-0">
                      iMessage
                    </span>
                  </div>
                </a>

                {/* location */}
                <div className="flex items-center gap-3 p-2.5 rounded-xl">
                  <span className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.07]
                                   flex items-center justify-center shrink-0">
                    <AzureLocationIcon className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-[11.5px] text-slate-500">{locationVal}</span>
                </div>
              </div>
            </div>

            {/* social icons */}
            <div>
              <p className="text-[10px] font-black uppercase tracking-[.18em] text-slate-600 mb-3">
                Social Profiles
              </p>
              <div className="flex gap-2 flex-wrap">
                {socials.map(({ href, icon, label, color }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    title={label}
                    className={`w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.07]
                                flex items-center justify-center text-slate-400 hover:text-white
                                hover:scale-110 transition-all duration-300 ${color}`}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* ----------------------------------------------
            BOTTOM BAR
        ---------------------------------------------- */}
        <div className="relative">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6">

            <p className="text-[11.5px] text-slate-600 flex items-center gap-1.5">
              © {new Date().getFullYear()} Md. Samim. Built with{' '}
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
              &amp; React.
            </p>

            <a
              href="/CV_Shamim.pdf"
              target="_blank"
              rel="noreferrer"
              className="text-[11.5px] text-slate-600 hover:text-cyan-400 transition-colors flex items-center gap-1.5 font-semibold"
            >
              View CV PDF
              <ExternalLink className="w-3 h-3" />
            </a>

            <button
              onClick={scrollToTop}
              title="Back to top"
              className="group flex items-center gap-2 px-4 py-2 rounded-full
                         bg-white/[0.04] border border-white/[0.07]
                         hover:border-cyan-500/50 hover:bg-cyan-500/8
                         text-slate-500 hover:text-white text-[11.5px] font-bold
                         hover:shadow-[0_0_20px_rgba(6,182,212,0.25)] hover:scale-105
                         transition-all duration-300 cursor-pointer"
            >
              Back to Top
              <ArrowUp className="w-3.5 h-3.5 text-cyan-400 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
