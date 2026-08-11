import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Award, Bot, Cpu, Download, Github, Linkedin, Sparkles, ChevronLeft, ChevronRight, Pause, Play, Flower2, Mountain, Landmark, Trees, Sun, Wind } from 'lucide-react';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import Card from '../ui/Card';
import TypingHeading from '../ui/TypingHeading';

// Use URL references instead of static imports — prevents Vite from
// bundling/preloading all 6 heavy MP4s on initial page load.
// Only the currently active video will be fetched by the browser.
const cherryBlossomVid = new URL('../../../Docs/Banner_Bg/large-cherry-blossom-tree.960x540.mp4', import.meta.url).href;
const mountFujiVid     = new URL('../../../Docs/Banner_Bg/mount-fuji.960x540.mp4', import.meta.url).href;
const omiVillageVid    = new URL('../../../Docs/Banner_Bg/omi-village-ghost-of-tsushima.960x540.mp4', import.meta.url).href;
const forestHouseVid   = new URL('../../../Docs/Banner_Bg/small-house-in-forest.960x540.mp4', import.meta.url).href;
const flowerFieldVid   = new URL('../../../Docs/Banner_Bg/spring-flower-field.960x540.mp4', import.meta.url).href;
const springMeadowVid  = new URL('../../../Docs/Banner_Bg/spring-meadow.960x540.mp4', import.meta.url).href;

// 🌸 Animated Falling Sakura Petal Rain Effect for Cherry Blossom Background
const SakuraPetalRain = () => {
  const petals = Array.from({ length: 35 });
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {petals.map((_, i) => {
        const size = 12 + (i % 5) * 4;
        const left = (i * 2.85) % 100;
        const duration = 7 + (i % 6) * 1.8;
        const delay = (i * 0.35) % 7;
        const rotateStart = (i * 45) % 360;

        return (
          <motion.div
            key={i}
            initial={{
              y: -40,
              x: `${left}vw`,
              rotate: rotateStart,
              opacity: 0
            }}
            animate={{
              y: ['0vh', '105vh'],
              x: [`${left}vw`, `${left + (i % 2 === 0 ? 8 : -8)}vw`, `${left + (i % 2 === 0 ? -6 : 6)}vw`, `${left + (i % 2 === 0 ? 10 : -10)}vw`],
              rotate: [rotateStart, rotateStart + 360],
              opacity: [0, 0.9, 0.9, 0]
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              delay: delay,
              ease: 'linear'
            }}
            className="absolute top-0"
          >
            <svg
              width={size}
              height={size}
              viewBox="0 0 30 30"
              fill="none"
              className="filter drop-shadow-[0_2px_8px_rgba(244,63,94,0.7)]"
            >
              <path
                d="M15 2C15 2 7 8 7 16C7 21 11 25 15 27C19 25 23 21 23 16C23 8 15 2C15 2Z"
                fill={i % 3 === 0 ? "#F43F5E" : i % 3 === 1 ? "#EC4899" : "#FB7185"}
                opacity={0.9}
              />
            </svg>
          </motion.div>
        );
      })}
    </div>
  );
};

// ☀️🌧️ Animated Sun Rain & Glowing Ray Overlay for Flower Field Background
const SunRainOverlay = () => {
  const drops = Array.from({ length: 45 });
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {/* Radiant Sunbeam Light Flares */}
      <div className="absolute -top-20 -right-20 w-[650px] h-[650px] bg-gradient-to-br from-amber-300/30 via-yellow-400/15 to-transparent rounded-full blur-[80px] animate-pulse" />
      <div className="absolute top-0 right-1/4 w-[450px] h-[750px] bg-gradient-to-b from-amber-200/25 via-yellow-300/10 to-transparent rotate-[-25deg] blur-2xl pointer-events-none" />

      {/* Slanted Falling Raindrops */}
      {drops.map((_, i) => {
        const left = (i * 2.2) % 100;
        const duration = 0.8 + (i % 6) * 0.22;
        const delay = (i * 0.12) % 2;
        const height = 22 + (i % 4) * 14;

        return (
          <motion.div
            key={i}
            initial={{
              y: -50,
              x: `${left}vw`,
              opacity: 0
            }}
            animate={{
              y: ['0vh', '110vh'],
              x: [`${left}vw`, `${left - 6}vw`],
              opacity: [0, 0.75, 0.75, 0]
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              delay: delay,
              ease: 'linear'
            }}
            style={{ height: `${height}px` }}
            className="absolute top-0 w-[1.5px] bg-gradient-to-b from-sky-200/90 via-cyan-300/70 to-transparent rounded-full shadow-[0_0_8px_rgba(56,189,248,0.8)]"
          />
        );
      })}
    </div>
  );
};

export const HeroSection = ({ profile, isLoading = false }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isAutoplay, setIsAutoplay] = useState(true);

  const bannerOptions = [
    { id: 'CHERRY_BLOSSOM', label: 'Cherry Blossom', sub: 'Sakura Tree Bloom', icon: Flower2, video: cherryBlossomVid, color: 'from-pink-500 to-rose-600', textColor: 'text-pink-300' },
    { id: 'MOUNT_FUJI', label: 'Mount Fuji', sub: 'Alpine Sunset Peak', icon: Mountain, video: mountFujiVid, color: 'from-amber-500 to-red-600', textColor: 'text-amber-300' },
    { id: 'OMI_VILLAGE', label: 'Omi Village', sub: 'Feudal Atmosphere', icon: Landmark, video: omiVillageVid, color: 'from-cyan-500 to-blue-600', textColor: 'text-cyan-300' },
    { id: 'FOREST_HOUSE', label: 'Forest House', sub: 'Woodland Sanctuary', icon: Trees, video: forestHouseVid, color: 'from-emerald-500 to-teal-600', textColor: 'text-emerald-300' },
    { id: 'FLOWER_FIELD', label: 'Flower Field', sub: 'Vibrant Spring Bloom', icon: Sun, video: flowerFieldVid, color: 'from-yellow-400 to-amber-500', textColor: 'text-yellow-300' },
    { id: 'SPRING_MEADOW', label: 'Spring Meadow', sub: 'Green Valley Breeze', icon: Wind, video: springMeadowVid, color: 'from-lime-400 to-emerald-500', textColor: 'text-lime-300' },
  ];

  const activeOption = bannerOptions[currentSlide];

  // Auto-play Slider Interval (Switches Banner Video every 15 seconds)
  useEffect(() => {
    if (!isAutoplay) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % bannerOptions.length);
    }, 15000);

    return () => clearInterval(interval);
  }, [isAutoplay, bannerOptions.length]);

  const handleNext = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % bannerOptions.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + bannerOptions.length) % bannerOptions.length);
  };

  const handleSelectTab = (idx) => {
    if (idx === currentSlide) return;
    setDirection(idx > currentSlide ? 1 : -1);
    setCurrentSlide(idx);
  };

  return (
    <section id="about" className="relative min-h-[90vh] flex flex-col justify-between py-16 px-4 lg:px-8 overflow-hidden bg-slate-950">
      {/* Animated Video Background Banner with Smooth Cross-Fade */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={activeOption.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
        >
          <video
            src={activeOption.video}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-40 filter brightness-90 contrast-110"
          />
          
          {/* Overlay Particle Effects */}
          {activeOption.id === 'CHERRY_BLOSSOM' && <SakuraPetalRain />}
          {activeOption.id === 'FLOWER_FIELD' && <SunRainOverlay />}

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/40" />
        </motion.div>
      </AnimatePresence>

      {/* Background glowing lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 my-auto">
        {/* Left Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="lg:col-span-7 flex flex-col items-start gap-6"
        >
          {/* Badge */}
          <Badge variant="indigo" className="px-4 py-1.5 text-xs font-semibold gap-2 border-indigo-500/40">
            <Sparkles className="w-4 h-4 text-indigo-400 animate-spin-slow" />
            AI & Backend Engineering Specialist
          </Badge>

          <TypingHeading
            as="h1"
            text={`Hi, I'm ${profile?.fullName || 'Md. Samim'}`}
            highlightText={profile?.fullName || 'Md. Samim'}
            loop={true}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]"
          />

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed text-justify">
            {profile?.bio ||
              'Aspiring AI and Backend Engineer focused on building scalable full-stack applications using Next.js, Node.js, and Express, with a strong emphasis on AI integration, prompt engineering, and workflow automation.'}
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center gap-3 mt-2">
            <a href="#contact">
              <Button variant="glow" size="md" className="group shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)]">
                <span>Get In Touch</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>
            </a>

            <a
              href={profile?.resumeUrl || '/CV_Shamim.pdf'}
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="secondary" size="md" className="group border-slate-700/80 hover:border-slate-500 shadow-md">
                <Download className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-all duration-300 group-hover:translate-y-0.5" />
                <span>Download CV</span>
              </Button>
            </a>

            <div className="flex items-center gap-2 ml-1">
              <motion.a
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
                href={profile?.githubUrl || 'https://github.com/samim'}
                target="_blank"
                rel="noreferrer"
                className="group relative p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 backdrop-blur-md transition-all shadow-md hover:shadow-[0_0_15px_rgba(6,182,212,0.35)] overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Github className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:rotate-12" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
                href={profile?.linkedinUrl || 'https://www.linkedin.com/in/md-samim5669/'}
                target="_blank"
                rel="noreferrer"
                className="group relative p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-400 hover:text-indigo-400 hover:border-indigo-500/50 backdrop-blur-md transition-all shadow-md hover:shadow-[0_0_15px_rgba(99,102,241,0.35)] overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Linkedin className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:-rotate-12" />
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Right Interactive Card / Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="lg:col-span-5 flex justify-center"
        >
          <div className="relative w-full max-w-md">
            <Card hoverEffect={true} className="border-indigo-500/30 bg-slate-950/70 p-7">
              {profile?.profilePicUrl ? (
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 p-0.5 mb-6 shadow-xl shadow-cyan-500/20 overflow-hidden relative group">
                  <img
                    src={profile.profilePicUrl}
                    alt={profile?.fullName || 'Md. Samim Profile'}
                    className="w-full h-full object-cover rounded-[22px] group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 p-0.5 mb-6 shadow-lg shadow-indigo-500/20">
                  <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                    <Cpu className="w-10 h-10 text-cyan-400 animate-pulse" />
                  </div>
                </div>
              )}

              <h3 className="text-xl font-bold text-white tracking-tight">Full-Stack & Machine Learning</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed text-justify">
                Expertise spanning Node.js REST APIs, PostgreSQL Prisma schema modeling, and AI Prompt Engineering.
              </p>

              <div className="mt-6 pt-6 border-t border-slate-800/80 flex flex-col gap-3.5 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-2">
                    <Bot className="w-4 h-4 text-cyan-400" /> AI Tools Workflow
                  </span>
                  <span className="text-indigo-400 font-semibold">Claude, HeyGen, Gamma</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-emerald-400" /> Internship
                  </span>
                  <span className="text-emerald-400 font-semibold">ALGORIZIN Intern</span>
                </div>
              </div>
            </Card>
          </div>
        </motion.div>
      </div>

      {/* Interactive Animated Video Banner Auto-Play Slider Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="max-w-5xl mx-auto w-full relative z-20 mt-10 pt-6 border-t border-slate-800/80"
      >
        <div className="relative bg-slate-950/40 p-3 sm:p-4 rounded-2xl border border-slate-800/90 backdrop-blur-xl shadow-2xl space-y-3 overflow-hidden">
          {/* Animated Autoplay Progress Bar */}
          {isAutoplay && (
            <motion.div
              key={currentSlide}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 15, ease: 'linear' }}
              className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-pink-400 via-amber-400 to-cyan-400"
            />
          )}

          <div className="flex flex-col lg:flex-row items-center justify-between gap-3">
            {/* Active Slide Info */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsAutoplay(!isAutoplay)}
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 transition-colors"
                title={isAutoplay ? 'Pause Video Slider' : 'Play Video Slider'}
              >
                {isAutoplay ? <Pause className="w-3.5 h-3.5 text-amber-400 animate-pulse" /> : <Play className="w-3.5 h-3.5" />}
              </button>

              <div>
                <span className="text-[10px] font-mono uppercase text-slate-500 tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400" /> Animated Video Banner (0{currentSlide + 1} / 06)
                </span>
                <div className="overflow-hidden h-5 flex items-center">
                  <AnimatePresence mode="popLayout" custom={direction} initial={false}>
                    <motion.h4
                      key={activeOption.id}
                      custom={direction}
                      initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: direction > 0 ? -50 : 50 }}
                      transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                      className={`text-xs font-bold ${activeOption.textColor} flex items-center gap-1.5 whitespace-nowrap`}
                    >
                      {activeOption.label} — <span className="text-slate-400 font-normal">{activeOption.sub}</span>
                    </motion.h4>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Slide Option Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-1.5">
              {bannerOptions.map((opt, idx) => {
                const Icon = opt.icon;
                const isActive = currentSlide === idx;
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectTab(idx)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                      isActive
                        ? `bg-gradient-to-r ${opt.color} text-white shadow-lg border border-white/20`
                        : 'bg-slate-900/90 text-slate-400 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{opt.label}</span>
                  </button>
                );
              })}

              {/* Prev / Next Arrows */}
              <div className="flex items-center gap-1 ml-2 border-l border-slate-800 pl-2">
                <button
                  onClick={handlePrev}
                  className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
                  title="Previous Video Banner"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
                  title="Next Video Banner"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
