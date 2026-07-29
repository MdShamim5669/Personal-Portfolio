import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, Image as ImageIcon, Sparkles, ZoomIn, MapPin, Award } from 'lucide-react';
import TypingHeading from '../ui/TypingHeading';
import Modal from '../ui/Modal';
import Badge from '../ui/Badge';
import Card from '../ui/Card';
import ChromaGrid from '../ui/ChromaGrid';
import ElectricBorder from '../ui/ElectricBorder';

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
      '#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'
    ];
    const color = colors[index % colors.length];
    return {
      image: photo.imageUrl,
      title: photo.title,
      subtitle: photo.category,
      borderColor: color,
      gradient: `linear-gradient(145deg, ${color}60, rgba(15, 23, 42, 0.9))`,
      onClick: () => setSelectedPhoto(photo)
    };
  });

  return (
    <section id="education" className="w-full py-20 px-4 lg:px-8 bg-[#090D16] text-white border-t border-slate-800/60 relative">
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="text-cyan-600 dark:text-cyan-400 font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-1.5 mb-1">
          <GraduationCap className="w-4 h-4" /> Academic Background
        </span>
        <TypingHeading 
          text="Education & Campus Life" 
          highlightText="Campus Life"
          className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1 tracking-tight" 
        />
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-3 leading-relaxed">
          Higher education milestones, academic achievements, coursework background, and memorable university moments.
        </p>
      </div>

      {/* Primary Institution Card */}
      <div className="mb-16">
        <Card hoverEffect={true} className="p-6 sm:p-8 bg-white dark:bg-slate-900/80 border-indigo-500/30 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Institution Details (Left Column) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="indigo" className="gap-1.5 py-1 px-3 text-xs font-semibold">
                  <GraduationCap className="w-3.5 h-3.5" /> B.Sc. Degree Program
                </Badge>
                <Badge variant="emerald" className="gap-1.5 py-1 px-3 text-xs font-semibold">
                  <Calendar className="w-3.5 h-3.5" /> 2022 – 2026
                </Badge>
                <Badge variant="cyan" className="gap-1.5 py-1 px-3 text-xs font-semibold font-mono border-cyan-400/40 bg-cyan-500/20 text-cyan-700 dark:text-cyan-300">
                  <Award className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-300" /> CGPA: {profile?.cgpa || '3.55'} / 4.00
                </Badge>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {profile?.university || 'Daffodil International University (DIU)'}
                </h3>
                <p className="text-base sm:text-lg font-semibold text-cyan-600 dark:text-cyan-400 mt-1">
                  {profile?.degree || 'Bachelor of Science in Computer Science & Engineering'}
                </p>
                <div className="flex items-center gap-4 mt-1.5">
                  <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" /> {profile?.location || 'Dhaka, Bangladesh'}
                  </span>
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" /> Cumulative GPA: {profile?.cgpa || '3.55'}
                  </span>
                </div>
              </div>

              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed pt-2">
                Specialized in Backend Engineering, Distributed Systems, Artificial Intelligence, and Machine Learning algorithms. Maintained consistent academic excellence while leading student software engineering initiatives.
              </p>

              {/* Coursework Pills */}
              <div className="pt-2">
                <span className="text-xs uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider block mb-2">
                  Key Coursework & Specializations
                </span>
                <div className="flex flex-wrap gap-2">
                  {['Data Structures', 'Algorithms', 'Database Management Systems', 'Software Engineering', 'AI & Machine Learning', 'Operating Systems', 'Web Engineering'].map((course) => (
                    <Badge key={course} variant="outline" className="text-xs font-mono py-1 px-2.5 bg-slate-100 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-300">
                      {course}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* 16:9 Aspect Ratio Featured Photo Card (Clean image without overlays) */}
            <div className="lg:col-span-5">
              <motion.div
                whileHover={{ scale: 1.03, y: -4 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedPhoto({ title: profile?.university || 'DIU Campus', category: 'Campus Life', imageUrl: featuredPhotoUrl, description: `Academic & Campus Life at Daffodil International University.` })}
                className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/90 shadow-xl group cursor-pointer"
              >
                <img
                  src={featuredPhotoUrl}
                  alt="DIU Campus Life"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </motion.div>
            </div>
          </div>
        </Card>
      </div>

      {/* Subsection: Memorable Campus Pictures */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold text-xs uppercase tracking-widest flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5" /> Subsection Gallery
            </span>
            <TypingHeading 
              as="h3"
              text="Memorable Campus Moments" 
              highlightText="Campus Moments"
              className="text-2xl font-bold text-slate-900 dark:text-white mt-1" 
            />
          </div>
          <Badge variant="cyan" className="hidden sm:inline-flex gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> University Life
          </Badge>
        </div>

        <div className="w-full relative" style={{ minHeight: '400px' }}>
          <ChromaGrid 
            items={chromaItems}
            radius={300}
            damping={0.45}
            fadeOut={0.6}
            ease="power3.out"
          />
        </div>
      </div>

      {/* Photo Lightbox Modal */}
      <Modal
        isOpen={!!selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
        title={selectedPhoto?.title}
        subtitle={selectedPhoto?.category}
        maxWidth="max-w-4xl"
      >
        {selectedPhoto && (
          <div className="space-y-4">
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center">
              <img
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.title}
                className="w-full h-full object-cover"
              />
            </div>
            {selectedPhoto.description && (
              <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed pt-2">
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
