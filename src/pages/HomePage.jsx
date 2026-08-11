import React from 'react';
import { Footer } from '../components/common/Footer';
import { Navbar } from '../components/common/Navbar';
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

// Minimal inline skeleton for sections still loading
const SectionSkeleton = () => (
  <div className="w-full py-20 flex justify-center items-center">
    <div className="flex gap-2">
      <span className="w-2 h-2 rounded-full bg-cyan-500/40 animate-bounce" style={{ animationDelay: '0ms' }} />
      <span className="w-2 h-2 rounded-full bg-cyan-500/40 animate-bounce" style={{ animationDelay: '150ms' }} />
      <span className="w-2 h-2 rounded-full bg-cyan-500/40 animate-bounce" style={{ animationDelay: '300ms' }} />
    </div>
  </div>
);

export const HomePage = () => {
  const { data: profile, isLoading: profileLoading } = useProfileQuery();
  const { data: skills = [], isLoading: skillsLoading } = useSkillsQuery();
  const { data: projects = [], isLoading: projectsLoading } = useProjectsQuery();
  const { data: thesis, isLoading: thesisLoading } = useThesisQuery();
  const { data: courses = [], isLoading: coursesLoading } = useCoursesQuery();
  const { data: experiences = [], isLoading: expLoading } = useExperiencesQuery();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-300">
      <Navbar />
      <main className="flex-1 overflow-x-hidden">
        {/* Hero renders immediately — profile is fastest & most important */}
        <HeroSection profile={profile} isLoading={profileLoading} />

        <AnimatedContent distance={100} duration={1} ease="power3.out" initialOpacity={0}>
          {skillsLoading ? <SectionSkeleton /> : <SkillsSection skills={skills} />}
        </AnimatedContent>

        <AnimatedContent distance={100} duration={1} ease="power3.out" initialOpacity={0}>
          {profileLoading ? <SectionSkeleton /> : <EducationSection profile={profile} />}
        </AnimatedContent>

        <AnimatedContent distance={100} duration={1} ease="power3.out" initialOpacity={0}>
          {projectsLoading ? <SectionSkeleton /> : <ProjectsSection projects={projects} />}
        </AnimatedContent>

        <AnimatedContent distance={100} duration={1} ease="power3.out" initialOpacity={0}>
          {thesisLoading ? <SectionSkeleton /> : <ThesisSection thesis={thesis} />}
        </AnimatedContent>

        <AnimatedContent distance={100} duration={1} ease="power3.out" initialOpacity={0}>
          {(expLoading || coursesLoading) ? <SectionSkeleton /> : <TimelineSection experiences={experiences} courses={courses} />}
        </AnimatedContent>

        <AnimatedContent distance={100} duration={1} ease="power3.out" initialOpacity={0}>
          {profileLoading ? <SectionSkeleton /> : <ContactSection profile={profile} />}
        </AnimatedContent>
      </main>
      <Footer profile={profile} />
    </div>
  );
};
