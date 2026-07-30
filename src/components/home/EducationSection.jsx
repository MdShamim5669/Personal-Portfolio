import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, Image as ImageIcon, Sparkles, ZoomIn, MapPin, Award, BookOpen, Layers } from 'lucide-react';
import TypingHeading from '../ui/TypingHeading';
import Modal from '../ui/Modal';
import Badge from '../ui/Badge';
import Card from '../ui/Card';
import ChromaGrid from '../ui/ChromaGrid';

export const EducationSection = ({ profile, educationPhotos = [] }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Default campus/university memories if none provided from admin
  const defaultPhotos = [
    {
      id: 1,
      title: 'DIU Main Campus & Academic Building',
      category: 'Campus Life',
      imageUrl: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80',
      description: 'Studying and collaborating at Daffodil International University Smart Campus.',
    },
    {
      id: 2,
      title: 'CSE Project Fair & Research Seminar',
      category: 'Research & Events',
      imageUrl: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1200&q=80',
      description: 'Presenting machine learning research models and full-stack software applications.',
    },
    {
      id: 3,
      title: 'Academic Excellence & Graduation Milestone',
      category: 'Milestones',
      imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
      description: 'Celebrating 4 years of Computer Science & Engineering journey with honors.',
    },
  ];

  const photosList = educationPhotos.length > 0 ? educationPhotos : defaultPhotos;
  const featuredPhotoUrl = profile?.educationPicUrl || photosList[0]?.imageUrl;

  const chromaItems = photosList.map((photo, index) => {
    const colors = [
      '#06B6D4', '#6366F1', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899'
    ];
    const color = colors[index % colors.length];
    return {
      image: photo.imageUrl,
      title: photo.title,
      subtitle: photo.category,
      borderColor: color,
      gradient: `linear-gradient(145deg, ${color}70, rgba(15, 23, 42, 0.95))`,
      onClick: () => setSelectedPhoto(photo)
    };
  });

  return (
    <section id="education" className="w-full py-24 px-4 lg:px-8 bg-[#070A14] text-white border-t border-slate-800/80 relative overflow-hidden">
      {/* Vibrant Ambient Glow Background Spots */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <GraduationCap className="w-4 h-4 text-cyan-400" /> Academic Background
          </span>
          
          <TypingHeading 
            text="Education & Campus Life" 
            highlightText="Campus Life"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight" 
          />
          
          <p className="text-slate-400 text-sm leading-relaxed max-w-2xl mx-auto">
            Higher education milestones, academic honors, specialized coursework background, and memorable university moments.
          </p>
        </div>

        {/* PRIMARY INSTITUTION CARD */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-7 sm:p-10 rounded-3xl bg-slate-900/90 border border-slate-800/90 hover:border-cyan-500/40 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-2xl transition-all duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                {/* Left Details Column */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge variant="indigo" className="gap-1.5 py-1.5 px-3.5 text-xs font-bold shadow-sm">
                      <GraduationCap className="w-4 h-4" /> B.Sc. Degree Program
                    </Badge>
                    <Badge variant="emerald" className="gap-1.5 py-1.5 px-3.5 text-xs font-bold shadow-sm">
                      <Calendar className="w-4 h-4" /> 2022 – 2026
                    </Badge>
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                      {profile?.university || 'Daffodil International University (DIU)'}
                    </h3>
                    <p className="text-base sm:text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-300 mt-1">
                      {profile?.degree || 'Bachelor of Science in Computer Science & Engineering'}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 mt-2">
                      <span className="text-xs text-slate-400 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-indigo-400" /> {profile?.location || 'Dhaka, Bangladesh'}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    Specialized in Backend Engineering, Distributed Systems, Artificial Intelligence, and Machine Learning algorithms. Maintained consistent academic excellence while leading student software engineering initiatives.
                  </p>

                  {/* Specializations & Coursework Pills */}
                  <div className="pt-2">
                    <span className="text-xs uppercase font-extrabold text-cyan-400 tracking-wider flex items-center gap-1.5 mb-3">
                      <BookOpen className="w-3.5 h-3.5" /> Core Engineering Coursework
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {['Data Structures', 'Algorithms', 'Database Management Systems', 'Software Engineering', 'AI & Machine Learning', 'Operating Systems', 'Web Engineering'].map((course) => (
                        <span key={course} className="text-xs font-mono py-1.5 px-3 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-indigo-400 hover:text-indigo-300 text-slate-300 transition-all shadow-sm">
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Featured Photo Display */}
                <div className="lg:col-span-5">
                  <motion.div
                    whileHover={{ scale: 1.03, y: -4 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => setSelectedPhoto({ title: profile?.university || 'DIU Campus', category: 'Campus Life', imageUrl: featuredPhotoUrl, description: `Academic & Campus Life at Daffodil International University.` })}
                    className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 hover:border-cyan-400/60 shadow-2xl group cursor-pointer"
                  >
                    <img
                      src={featuredPhotoUrl}
                      alt="DIU Campus Life"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                        <ZoomIn className="w-4 h-4" /> Click to view campus image
                      </span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* SUBSECTION: MEMORABLE CAMPUS MOMENTS GALLERY */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-cyan-400 font-bold text-xs uppercase tracking-widest flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-cyan-400" /> Interactive Photo Gallery
              </span>
              <TypingHeading 
                as="h3"
                text="Memorable Campus Moments" 
                highlightText="Campus Moments"
                className="text-2xl sm:text-3xl font-extrabold text-white mt-1" 
              />
            </div>
            <Badge variant="cyan" className="hidden sm:inline-flex gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> University Life
            </Badge>
          </div>

          {/* Interactive ChromaGrid Display */}
          <div className="w-full relative" style={{ minHeight: '420px' }}>
            <ChromaGrid 
              items={chromaItems}
              radius={320}
              damping={0.45}
              fadeOut={0.6}
              ease="power3.out"
            />
          </div>
        </div>

        {/* PHOTO LIGHTBOX MODAL */}
        <Modal
          isOpen={!!selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
          title={selectedPhoto?.title}
          subtitle={selectedPhoto?.category}
          maxWidth="max-w-4xl"
        >
          {selectedPhoto && (
            <div className="space-y-4">
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center shadow-xl">
                <img
                  src={selectedPhoto.imageUrl}
                  alt={selectedPhoto.title}
                  className="w-full h-full object-cover"
                />
              </div>
              {selectedPhoto.description && (
                <p className="text-sm text-slate-300 leading-relaxed pt-2">
                  {selectedPhoto.description}
                </p>
              )}
            </div>
          )}
        </Modal>
      </div>
    </section>
  );
};

export default EducationSection;
