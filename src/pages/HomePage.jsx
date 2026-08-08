import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Footer } from '../components/common/Footer';
import { Navbar } from '../components/common/Navbar';
import { Loader } from '../components/common/Loader';
import AnimatedContent from '../components/ui/AnimatedContent';
import { ContactSection } from '../components/home/ContactSection';
import { HeroSection } from '../components/home/HeroSection';
import { ProjectsSection } from '../components/home/ProjectsSection';
import { SkillsSection } from '../components/home/SkillsSection';
import { ThesisSection } from '../components/home/ThesisSection';
import { TimelineSection } from '../components/home/TimelineSection';
import { EducationSection } from '../components/home/EducationSection';
import {
  useProfileQuery,
  useSkillsQuery,
  useProjectsQuery,
  useThesisQuery,
  useCoursesQuery,
  useExperiencesQuery,
} from '../hooks/usePortfolioQueries';

export const HomePage = () => {
  const location = useLocation();
  const { data: profile, isLoading: profileLoading } = useProfileQuery();
  const { data: skills = [], isLoading: skillsLoading } = useSkillsQuery();
  const { data: projects = [], isLoading: projectsLoading } = useProjectsQuery();
  const { data: thesis, isLoading: thesisLoading } = useThesisQuery();
  const { data: courses = [], isLoading: coursesLoading } = useCoursesQuery();
  const { data: experiences = [], isLoading: expLoading } = useExperiencesQuery();

  const isLoading = profileLoading || skillsLoading || projectsLoading || thesisLoading || coursesLoading || expLoading;

  useEffect(() => {
    if (!isLoading && location.state?.scrollTo) {
      const targetId = location.state.scrollTo;
      const timer = setTimeout(() => {
        const elem = document.getElementById(targetId);
        if (elem) {
          const yOffset = -80;
          const y = elem.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isLoading, location.state]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-300">
      <Navbar />
      <main className="flex-1 overflow-x-hidden">
        <HeroSection profile={profile} />
        
        <AnimatedContent distance={100} duration={1} ease="power3.out" initialOpacity={0}>
          <SkillsSection skills={skills} />
        </AnimatedContent>

        <AnimatedContent distance={100} duration={1} ease="power3.out" initialOpacity={0}>
          <EducationSection profile={profile} />
        </AnimatedContent>

        <AnimatedContent distance={100} duration={1} ease="power3.out" initialOpacity={0}>
          <ProjectsSection projects={projects} />
        </AnimatedContent>

        <AnimatedContent distance={100} duration={1} ease="power3.out" initialOpacity={0}>
          <ThesisSection thesis={thesis} />
        </AnimatedContent>

        <AnimatedContent distance={100} duration={1} ease="power3.out" initialOpacity={0}>
          <TimelineSection experiences={experiences} courses={courses} />
        </AnimatedContent>

        <AnimatedContent distance={100} duration={1} ease="power3.out" initialOpacity={0}>
          <ContactSection />
        </AnimatedContent>
      </main>
      <Footer />
    </div>
  );
};
