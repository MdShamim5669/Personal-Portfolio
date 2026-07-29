import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import {
  Award,
  BookOpen,
  Brain,
  Briefcase,
  Code,
  Edit2,
  FolderPlus,
  Inbox,
  Layers,
  LogOut,
  Plus,
  Save,
  Trash2,
  UploadCloud,
  UserCheck,
  X,
  AlertTriangle,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { portfolioService } from '../../services/portfolioService';
import { useAdminMutations, useProjectsQuery, useSkillsQuery, useExperiencesQuery, useCoursesQuery, useMessagesQuery, useProfileQuery, useThesisQuery } from '../../hooks/usePortfolioQueries';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import Card from '../ui/Card';


export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('PROJECTS');

  // Loaded Data States
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [courses, setCourses] = useState([]);
  const [messages, setMessages] = useState([]);
  const [profile, setProfile] = useState({
    fullName: '',
    title: '',
    bio: '',
    email: '',
    phone: '',
    location: '',
    cgpa: 3.55,
    university: '',
    degree: '',
    githubUrl: '',
    linkedinUrl: '',
    resumeUrl: '',
  });
  const [thesis, setThesis] = useState({
    title: '',
    summary: '',
    accuracy: 84.4,
    modelName: '',
    datasetSize: 317,
    techStack: '',
    githubUrl: '',
  });

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState('');

  // Editing Project Modal State
  const [editingProject, setEditingProject] = useState(null);

  // Form States
  const [newProject, setNewProject] = useState({
    title: '',
    tagline: '',
    description: '',
    techStack: '',
    liveDemoUrl: '',
    clientGithubUrl: '',
    serverGithubUrl: '',
    thumbnailUrl: '',
  });

  const [newSkill, setNewSkill] = useState({
    name: '',
    category: 'LANGUAGES',
    proficiency: 85,
    iconName: 'code',
  });

  const [newExperience, setNewExperience] = useState({
    role: '',
    company: '',
    startDate: '',
    endDate: '',
    description: '',
    highlights: '',
  });

  const [newCourse, setNewCourse] = useState({
    title: '',
    subtitle: '',
    platform: 'Udemy',
    creatorRole: 'AI Content Developer at ALGORIZIN',
    courseUrl: '',
  });

  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const loadData = async () => {
    try {
      setLoading(true);
      const [projRes, skillRes, expRes, courseRes, msgRes, profRes, thesisRes] = await Promise.allSettled([
        portfolioService.getProjects(),
        portfolioService.getSkills(),
        portfolioService.getExperiences(),
        portfolioService.getCourses(),
        portfolioService.getMessages(),
        portfolioService.getProfile(),
        portfolioService.getThesis(),
      ]);

      if (projRes.status === 'fulfilled') setProjects(projRes.value.data.data || []);
      if (skillRes.status === 'fulfilled') setSkills(skillRes.value.data.data || []);
      if (expRes.status === 'fulfilled') setExperiences(expRes.value.data.data || []);
      if (courseRes.status === 'fulfilled') setCourses(courseRes.value.data.data || []);
      if (msgRes.status === 'fulfilled') setMessages(msgRes.value.data.data || []);

      if (profRes.status === 'fulfilled' && profRes.value.data.data) {
        setProfile(profRes.value.data.data);
      }
      if (thesisRes.status === 'fulfilled' && thesisRes.value.data.data) {
        const t = thesisRes.value.data.data;
        setThesis({
          ...t,
          techStack: Array.isArray(t.techStack) ? t.techStack.join(', ') : t.techStack || '',
        });
      }
    } catch (err) {
      console.error('Failed loading admin data:', err);
      toast.error('Error fetching admin data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // --- Handlers ---
  const handleFileUpload = async (e, callback) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploading(true);
      const toastId = toast.loading('Uploading photo to Cloudinary...');
      const res = await portfolioService.uploadFile(formData);
      const url = res.data?.data?.url || res.data?.url || res.data?.data?.secure_url || res.data?.secure_url;
      if (url) {
        callback(url);
        toast.success('Photo uploaded successfully!', { id: toastId });
      } else {
        toast.error('Failed to parse uploaded photo URL', { id: toastId });
      }
    } catch (err) {
      console.error('File upload error:', err);
      toast.error(err.response?.data?.message || 'Error uploading photo to Cloudinary');
    } finally {
      setUploading(false);
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...newProject,
        techStack: newProject.techStack.split(',').map((s) => s.trim()).filter(Boolean),
      };
      await portfolioService.createProject(payload);
      toast.success('Project added successfully!');
      setNewProject({
        title: '',
        tagline: '',
        description: '',
        techStack: '',
        liveDemoUrl: '',
        clientGithubUrl: '',
        serverGithubUrl: '',
        thumbnailUrl: '',
      });
      loadData();
    } catch (err) {
      toast.error('Failed to create project');
    }
  };

  const handleUpdateProject = async (e) => {
    e.preventDefault();
    if (!editingProject) return;
    try {
      const payload = {
        ...editingProject,
        techStack: typeof editingProject.techStack === 'string'
          ? editingProject.techStack.split(',').map((s) => s.trim()).filter(Boolean)
          : editingProject.techStack,
      };
      await portfolioService.updateProject(editingProject.id, payload);
      toast.success('Project updated successfully!');
      setEditingProject(null);
      loadData();
    } catch (err) {
      toast.error('Failed to update project');
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Delete this project? Cloudinary media will also be deleted.')) return;
    try {
      await portfolioService.deleteProject(id);
      toast.success('Project and associated Cloudinary media deleted!');
      loadData();
    } catch (err) {
      toast.error('Failed to delete project');
    }
  };

  const handleCreateSkill = async (e) => {
    e.preventDefault();
    try {
      await portfolioService.createSkill({
        ...newSkill,
        proficiency: parseInt(newSkill.proficiency, 10),
      });
      toast.success('Skill added successfully!');
      setNewSkill({ name: '', category: 'LANGUAGES', proficiency: 85, iconName: 'code' });
      loadData();
    } catch (err) {
      toast.error('Failed to add skill');
    }
  };

  const handleDeleteSkill = async (id) => {
    if (!window.confirm('Delete this skill?')) return;
    try {
      await portfolioService.deleteSkill(id);
      toast.success('Skill deleted');
      loadData();
    } catch (err) {
      toast.error('Failed to delete skill');
    }
  };

  const handleCreateExperience = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...newExperience,
        highlights: newExperience.highlights
          ? newExperience.highlights.split('\n').map((h) => h.trim()).filter(Boolean)
          : [],
      };
      await portfolioService.createExperience(payload);
      toast.success('Experience added successfully!');
      setNewExperience({ role: '', company: '', startDate: '', endDate: '', description: '', highlights: '' });
      loadData();
    } catch (err) {
      toast.error('Failed to add experience');
    }
  };

  const handleDeleteExperience = async (id) => {
    if (!window.confirm('Delete this experience entry?')) return;
    try {
      await portfolioService.deleteExperience(id);
      toast.success('Experience entry deleted');
      loadData();
    } catch (err) {
      toast.error('Failed to delete experience');
    }
  };

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    try {
      await portfolioService.createCourse(newCourse);
      toast.success('Course / Certification added successfully!');
      setNewCourse({
        title: '',
        subtitle: '',
        platform: 'Udemy',
        creatorRole: 'AI Content Developer at ALGORIZIN',
        courseUrl: '',
      });
      loadData();
    } catch (err) {
      toast.error('Failed to add course');
    }
  };

  const handleDeleteCourse = async (id) => {
    if (!window.confirm('Delete this course entry?')) return;
    try {
      await portfolioService.deleteCourse(id);
      toast.success('Course entry deleted');
      loadData();
    } catch (err) {
      toast.error('Failed to delete course');
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const { id, createdAt, updatedAt, ...profilePayload } = profile;
      await portfolioService.updateProfile({
        ...profilePayload,
        cgpa: parseFloat(profilePayload.cgpa) || 3.55,
      });
      toast.success('Profile information updated live!');
      loadData();
    } catch (err) {
      const errMsg = err.response?.data?.message || err.response?.data?.error || err.message || '';
      if (errMsg.includes('profilePicUrl') || errMsg.includes('Unknown argument')) {
        try {
          const { profilePicUrl, ...legacyPayload } = profilePayload;
          await portfolioService.updateProfile({
            ...legacyPayload,
            cgpa: parseFloat(legacyPayload.cgpa) || 3.55,
          });
          toast.success('Profile details saved! (Push server updates to Render for Profile Pic support)');
          loadData();
          return;
        } catch (fallbackErr) {
          console.error('Fallback update error:', fallbackErr);
        }
      }
      console.error('Profile update error:', err);
      toast.error(err.response?.data?.message || 'Failed to update profile');
    }
  };

  const handleUpdateThesis = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...thesis,
        accuracy: parseFloat(thesis.accuracy),
        datasetSize: parseInt(thesis.datasetSize, 10),
        techStack: typeof thesis.techStack === 'string'
          ? thesis.techStack.split(',').map((s) => s.trim()).filter(Boolean)
          : thesis.techStack,
      };
      await portfolioService.updateThesis(payload);
      toast.success('Thesis data updated live!');
      loadData();
    } catch (err) {
      toast.error('Failed to update thesis');
    }
  };

  const handleDeleteMessage = async (id) => {
    try {
      await portfolioService.deleteMessage(id);
      toast.success('Message deleted');
      loadData();
    } catch (err) {
      toast.error('Failed to delete message');
    }
  };



  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Admin Header */}
      <header className="glass-panel border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Admin Management Portal</h1>
          <p className="text-xs text-indigo-400">Signed in as: {user?.email}</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="px-3.5 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
          >
            View Live Site
          </button>
          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="flex items-center gap-1 px-3.5 py-1.5 rounded-lg bg-red-600/20 border border-red-500/30 text-red-400 hover:bg-red-600 hover:text-white text-xs font-semibold transition-all"
          >
            <LogOut className="w-3.5 h-3.5" /> Logout
          </button>
        </div>
      </header>

      {/* Main Control Layout */}
      <div className="max-w-7xl mx-auto w-full p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-3 flex flex-col gap-2">
          <button
            onClick={() => setActiveTab('PROJECTS')}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'PROJECTS'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'glass-card text-slate-400 hover:text-white'
            }`}
          >
            <FolderPlus className="w-4 h-4" /> Projects ({projects.length})
          </button>
          <button
            onClick={() => setActiveTab('SKILLS')}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'SKILLS'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'glass-card text-slate-400 hover:text-white'
            }`}
          >
            <Code className="w-4 h-4" /> Skills ({skills.length})
          </button>
          <button
            onClick={() => setActiveTab('EXPERIENCE')}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'EXPERIENCE'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'glass-card text-slate-400 hover:text-white'
            }`}
          >
            <Briefcase className="w-4 h-4" /> Work Experience ({experiences.length})
          </button>
          <button
            onClick={() => setActiveTab('COURSES')}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'COURSES'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'glass-card text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" /> Udemy Courses ({courses.length})
          </button>
          <button
            onClick={() => setActiveTab('THESIS')}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'THESIS'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'glass-card text-slate-400 hover:text-white'
            }`}
          >
            <Brain className="w-4 h-4" /> Research Thesis
          </button>
          <button
            onClick={() => setActiveTab('PROFILE')}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'PROFILE'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'glass-card text-slate-400 hover:text-white'
            }`}
          >
            <UserCheck className="w-4 h-4" /> Profile Info
          </button>
          <button
            onClick={() => setActiveTab('INBOX')}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'INBOX'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'glass-card text-slate-400 hover:text-white'
            }`}
          >
            <Inbox className="w-4 h-4" /> Contact Inbox ({messages.length})
          </button>
          <button
            onClick={() => setActiveTab('CLOUDINARY')}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'CLOUDINARY'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'glass-card text-slate-400 hover:text-white'
            }`}
          >
            <UploadCloud className="w-4 h-4" /> Cloudinary CDN
          </button>
        </div>

        {/* Tab Content */}
        <div className="lg:col-span-9 glass-panel p-6 rounded-2xl border border-slate-800 relative">
          {/* EDIT PROJECT MODAL */}
          {editingProject && (
            <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Edit2 className="w-4 h-4 text-indigo-400" /> Edit Project: {editingProject.title}
                  </h3>
                  <button
                    onClick={() => setEditingProject(null)}
                    className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleUpdateProject} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Project Title</label>
                    <input
                      type="text"
                      required
                      value={editingProject.title}
                      onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Tagline</label>
                    <input
                      type="text"
                      required
                      value={editingProject.tagline}
                      onChange={(e) => setEditingProject({ ...editingProject, tagline: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Description</label>
                    <textarea
                      rows={3}
                      required
                      value={editingProject.description}
                      onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Tech Stack (comma separated)</label>
                    <input
                      type="text"
                      value={Array.isArray(editingProject.techStack) ? editingProject.techStack.join(', ') : editingProject.techStack}
                      onChange={(e) => setEditingProject({ ...editingProject, techStack: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div className="sm:col-span-2 bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 space-y-2">
                    <label className="text-xs font-semibold text-slate-300 block">Project Cover Photo / Thumbnail (Cloudinary CDN URL)</label>
                    <div className="flex flex-col sm:flex-row items-center gap-3">
                      {editingProject.thumbnailUrl ? (
                        <div className="w-24 h-16 rounded-lg overflow-hidden border border-slate-700 shrink-0 bg-slate-900">
                          <img src={editingProject.thumbnailUrl} alt="Thumbnail Preview" className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="w-24 h-16 rounded-lg border border-slate-800 flex items-center justify-center shrink-0 bg-slate-900 text-slate-500 text-[10px]">
                          No Photo
                        </div>
                      )}
                      <div className="flex-1 w-full flex gap-2 items-center">
                        <input
                          type="url"
                          placeholder="https://res.cloudinary.com/..."
                          value={editingProject.thumbnailUrl || ''}
                          onChange={(e) => setEditingProject({ ...editingProject, thumbnailUrl: e.target.value })}
                          className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                        />
                        <label className="px-3 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-semibold cursor-pointer shrink-0 flex items-center gap-1.5 shadow-md">
                          <UploadCloud className="w-4 h-4" />
                          {uploading ? 'Uploading...' : 'Upload Photo'}
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleFileUpload(e, (url) => setEditingProject({ ...editingProject, thumbnailUrl: url }))}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Live Demo URL</label>
                    <input
                      type="url"
                      value={editingProject.liveDemoUrl || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, liveDemoUrl: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Client GitHub URL</label>
                    <input
                      type="url"
                      value={editingProject.clientGithubUrl || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, clientGithubUrl: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div className="sm:col-span-2 flex justify-end gap-3 mt-4">
                    <button
                      type="button"
                      onClick={() => setEditingProject(null)}
                      className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5"
                    >
                      <Save className="w-4 h-4" /> Save Project Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* 1. PROJECTS TAB */}
          {activeTab === 'PROJECTS' && (
            <div>
              <h2 className="text-xl font-bold text-white mb-6">Add New Project</h2>
              <form onSubmit={handleCreateProject} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Project Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. SaFus Restaurant"
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Tagline</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. FullStack Restaurant Platform"
                    value={newProject.tagline}
                    onChange={(e) => setNewProject({ ...newProject, tagline: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Description</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Detailed project description..."
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Tech Stack (comma separated)</label>
                  <input
                    type="text"
                    placeholder="React.js, Express.js, MongoDB, TypeScript"
                    value={newProject.techStack}
                    onChange={(e) => setNewProject({ ...newProject, techStack: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div className="sm:col-span-2 bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 space-y-2">
                  <label className="text-xs font-semibold text-slate-300 block">Project Cover Photo / Thumbnail (Cloudinary CDN URL)</label>
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    {newProject.thumbnailUrl ? (
                      <div className="w-24 h-16 rounded-lg overflow-hidden border border-slate-700 shrink-0 bg-slate-900">
                        <img src={newProject.thumbnailUrl} alt="Thumbnail Preview" className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-24 h-16 rounded-lg border border-slate-800 flex items-center justify-center shrink-0 bg-slate-900 text-slate-500 text-[10px]">
                        No Photo
                      </div>
                    )}
                    <div className="flex-1 w-full flex gap-2 items-center">
                      <input
                        type="url"
                        placeholder="https://res.cloudinary.com/..."
                        value={newProject.thumbnailUrl}
                        onChange={(e) => setNewProject({ ...newProject, thumbnailUrl: e.target.value })}
                        className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                      />
                      <label className="px-3 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-semibold cursor-pointer shrink-0 flex items-center gap-1.5 shadow-md">
                        <UploadCloud className="w-4 h-4" />
                        {uploading ? 'Uploading...' : 'Upload Photo'}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, (url) => setNewProject({ ...newProject, thumbnailUrl: url }))}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Live Demo URL</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={newProject.liveDemoUrl}
                    onChange={(e) => setNewProject({ ...newProject, liveDemoUrl: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Client GitHub URL</label>
                  <input
                    type="url"
                    placeholder="https://github.com/..."
                    value={newProject.clientGithubUrl}
                    onChange={(e) => setNewProject({ ...newProject, clientGithubUrl: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <button
                  type="submit"
                  className="sm:col-span-2 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Add Project
                </button>
              </form>

              <h2 className="text-lg font-bold text-white mb-4">Existing Projects ({projects.length})</h2>
              <div className="flex flex-col gap-3">
                {projects.map((p) => (
                  <div key={p.id} className="glass-card p-4 rounded-xl flex items-center justify-between border border-slate-800">
                    <div>
                      <h3 className="font-bold text-white text-sm">{p.title}</h3>
                      <p className="text-xs text-slate-400">{p.tagline}</p>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {p.techStack?.map((t, idx) => (
                          <span key={idx} className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingProject(p)}
                        className="p-2 rounded-lg text-indigo-400 hover:bg-indigo-600/20"
                        title="Edit Project"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProject(p.id)}
                        className="p-2 rounded-lg text-red-400 hover:bg-red-600/20"
                        title="Delete Project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. SKILLS TAB */}
          {activeTab === 'SKILLS' && (
            <div>
              <h2 className="text-xl font-bold text-white mb-6">Add New Skill</h2>
              <form onSubmit={handleCreateSkill} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Skill Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Next.js, PyTorch, GraphQL"
                    value={newSkill.name}
                    onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Category</label>
                  <select
                    value={newSkill.category}
                    onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value="LANGUAGES">LANGUAGES</option>
                    <option value="FRONTEND">FRONTEND</option>
                    <option value="BACKEND">BACKEND</option>
                    <option value="DATABASES">DATABASES</option>
                    <option value="ML_AI">ML_AI</option>
                    <option value="TOOLS">TOOLS</option>
                    <option value="AI_TOOLS">AI_TOOLS</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Proficiency % ({newSkill.proficiency}%)</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={newSkill.proficiency}
                    onChange={(e) => setNewSkill({ ...newSkill, proficiency: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <button
                  type="submit"
                  className="sm:col-span-3 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Add Skill
                </button>
              </form>

              <h2 className="text-lg font-bold text-white mb-4">Existing Skills ({skills.length})</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {skills.map((s) => (
                  <div key={s.id} className="glass-card p-3 rounded-xl flex items-center justify-between border border-slate-800">
                    <div>
                      <h4 className="font-bold text-white text-xs">{s.name}</h4>
                      <p className="text-[10px] text-indigo-400 font-medium">{s.category} ({s.proficiency}%)</p>
                    </div>
                    <button
                      onClick={() => handleDeleteSkill(s.id)}
                      className="p-1.5 rounded-lg text-red-400 hover:bg-red-600/20"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. EXPERIENCE TAB */}
          {activeTab === 'EXPERIENCE' && (
            <div>
              <h2 className="text-xl font-bold text-white mb-6">Add Work Experience / Internship</h2>
              <form onSubmit={handleCreateExperience} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Role / Position</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. AI Content Development Intern"
                    value={newExperience.role}
                    onChange={(e) => setNewExperience({ ...newExperience, role: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Company / Organization</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ALGORIZIN"
                    value={newExperience.company}
                    onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Start Date</label>
                  <input
                    type="text"
                    placeholder="Feb 2026"
                    value={newExperience.startDate}
                    onChange={(e) => setNewExperience({ ...newExperience, startDate: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">End Date</label>
                  <input
                    type="text"
                    placeholder="June 2026 / Present"
                    value={newExperience.endDate}
                    onChange={(e) => setNewExperience({ ...newExperience, endDate: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Highlights (One per line)</label>
                  <textarea
                    rows={3}
                    placeholder="Designed AI-powered learning content using Claude&#10;Published courses on Udemy"
                    value={newExperience.highlights}
                    onChange={(e) => setNewExperience({ ...newExperience, highlights: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <button
                  type="submit"
                  className="sm:col-span-2 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Add Experience
                </button>
              </form>

              <h2 className="text-lg font-bold text-white mb-4">Existing Experience ({experiences.length})</h2>
              <div className="flex flex-col gap-3">
                {experiences.map((exp) => (
                  <div key={exp.id} className="glass-card p-4 rounded-xl flex items-center justify-between border border-slate-800">
                    <div>
                      <h4 className="font-bold text-white text-sm">{exp.role} @ {exp.company}</h4>
                      <p className="text-xs text-indigo-400">{exp.startDate} - {exp.endDate}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteExperience(exp.id)}
                      className="p-2 rounded-lg text-red-400 hover:bg-red-600/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. COURSES TAB */}
          {activeTab === 'COURSES' && (
            <div>
              <h2 className="text-xl font-bold text-white mb-6">Add Udemy Course / Certification</h2>
              <form onSubmit={handleCreateCourse} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Course Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Python for AI Masterclass in 5 Days"
                    value={newCourse.title}
                    onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Subtitle / Description</label>
                  <input
                    type="text"
                    placeholder="Master Python, NumPy, PyTorch & LLM APIs"
                    value={newCourse.subtitle}
                    onChange={(e) => setNewCourse({ ...newCourse, subtitle: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Platform</label>
                  <input
                    type="text"
                    value={newCourse.platform}
                    onChange={(e) => setNewCourse({ ...newCourse, platform: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Course URL</label>
                  <input
                    type="url"
                    placeholder="https://udemy.com/course/..."
                    value={newCourse.courseUrl}
                    onChange={(e) => setNewCourse({ ...newCourse, courseUrl: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <button
                  type="submit"
                  className="sm:col-span-2 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Add Course
                </button>
              </form>

              <h2 className="text-lg font-bold text-white mb-4">Published Courses ({courses.length})</h2>
              <div className="flex flex-col gap-3">
                {courses.map((c) => (
                  <div key={c.id} className="glass-card p-4 rounded-xl flex items-center justify-between border border-slate-800">
                    <div>
                      <h4 className="font-bold text-white text-sm">{c.title}</h4>
                      <p className="text-xs text-slate-400">{c.subtitle}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteCourse(c.id)}
                      className="p-2 rounded-lg text-red-400 hover:bg-red-600/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. THESIS TAB */}
          {activeTab === 'THESIS' && (
            <div>
              <h2 className="text-xl font-bold text-white mb-6">Update Research Thesis</h2>
              <form onSubmit={handleUpdateThesis} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Thesis Title</label>
                  <input
                    type="text"
                    required
                    value={thesis.title}
                    onChange={(e) => setThesis({ ...thesis, title: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Summary</label>
                  <textarea
                    rows={3}
                    required
                    value={thesis.summary}
                    onChange={(e) => setThesis({ ...thesis, summary: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Accuracy %</label>
                  <input
                    type="number"
                    step="0.1"
                    value={thesis.accuracy}
                    onChange={(e) => setThesis({ ...thesis, accuracy: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Top Model Name</label>
                  <input
                    type="text"
                    value={thesis.modelName}
                    onChange={(e) => setThesis({ ...thesis, modelName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Dataset Size</label>
                  <input
                    type="number"
                    value={thesis.datasetSize}
                    onChange={(e) => setThesis({ ...thesis, datasetSize: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">GitHub Repo URL</label>
                  <input
                    type="url"
                    value={thesis.githubUrl || ''}
                    onChange={(e) => setThesis({ ...thesis, githubUrl: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Tech Stack (comma separated)</label>
                  <input
                    type="text"
                    value={thesis.techStack}
                    onChange={(e) => setThesis({ ...thesis, techStack: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <button
                  type="submit"
                  className="sm:col-span-2 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5"
                >
                  <Save className="w-4 h-4" /> Save Thesis Changes
                </button>
              </form>
            </div>
          )}

          {/* 6. PROFILE TAB */}
          {activeTab === 'PROFILE' && (
            <div>
              <h2 className="text-xl font-bold text-white mb-6">Update Profile Information</h2>
              <form onSubmit={handleUpdateProfile} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Profile Picture Upload Section */}
                <div className="sm:col-span-2 bg-slate-950/80 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center gap-4 mb-2">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 p-0.5 shadow-lg shrink-0 overflow-hidden">
                    {profile.profilePicUrl ? (
                      <img src={profile.profilePicUrl} alt="Profile Avatar Preview" className="w-full h-full object-cover rounded-[14px]" />
                    ) : (
                      <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-slate-500 text-xs font-semibold">
                        No Photo
                      </div>
                    )}
                  </div>
                  <div className="flex-1 w-full space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300 block">Profile Picture Photo (Cloudinary CDN URL)</label>
                    <div className="flex gap-2 items-center">
                      <input
                        type="url"
                        placeholder="https://res.cloudinary.com/..."
                        value={profile.profilePicUrl || ''}
                        onChange={(e) => setProfile({ ...profile, profilePicUrl: e.target.value })}
                        className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                      />
                      <label className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-semibold cursor-pointer shrink-0 flex items-center gap-1.5 shadow-md">
                        <UploadCloud className="w-4 h-4" />
                        {uploading ? 'Uploading...' : 'Upload Photo'}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, (url) => setProfile({ ...profile, profilePicUrl: url }))}
                        />
                      </label>
                    </div>
                    <span className="text-[11px] text-slate-400 block">Upload your professional headshot/avatar photo directly or paste an image URL.</span>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={profile.fullName}
                    onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Professional Title</label>
                  <input
                    type="text"
                    required
                    value={profile.title}
                    onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Bio / Summary</label>
                  <textarea
                    rows={3}
                    required
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Email</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Phone</label>
                  <input
                    type="text"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">CGPA</label>
                  <input
                    type="number"
                    step="0.01"
                    value={profile.cgpa}
                    onChange={(e) => setProfile({ ...profile, cgpa: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                {/* Resume / CV PDF File Upload Section */}
                <div className="sm:col-span-2 bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <label className="text-xs font-semibold text-slate-300 block">Resume / CV Document (PDF Format)</label>
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <div className="flex-1 w-full flex gap-2 items-center">
                      <input
                        type="text"
                        placeholder="/CV_Shamim.pdf or Cloudinary PDF URL"
                        value={profile.resumeUrl || ''}
                        onChange={(e) => setProfile({ ...profile, resumeUrl: e.target.value })}
                        className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                      />
                      <label className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-semibold cursor-pointer shrink-0 flex items-center gap-1.5 shadow-md">
                        <UploadCloud className="w-4 h-4" />
                        {uploading ? 'Uploading CV...' : 'Upload CV (PDF)'}
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, (url) => setProfile({ ...profile, resumeUrl: url }))}
                        />
                      </label>
                    </div>
                  </div>
                  <span className="text-[11px] text-slate-400 block">Upload your resume PDF file directly to Cloudinary or paste a direct PDF document link.</span>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">University / Institution Name</label>
                  <input
                    type="text"
                    value={profile.university || ''}
                    onChange={(e) => setProfile({ ...profile, university: e.target.value })}
                    placeholder="e.g. Daffodil International University (DIU)"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Degree / Program Title</label>
                  <input
                    type="text"
                    value={profile.degree || ''}
                    onChange={(e) => setProfile({ ...profile, degree: e.target.value })}
                    placeholder="e.g. Bachelor of Science in Computer Science & Engineering"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                {/* Education 16:9 Featured Photo Upload Section */}
                <div className="sm:col-span-2 bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-2 my-2">
                  <label className="text-xs font-semibold text-slate-300 block">Education Section Featured Photo (16:9 Aspect Ratio)</label>
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    {profile.educationPicUrl ? (
                      <div className="w-32 aspect-video rounded-xl overflow-hidden border border-slate-700 shrink-0 bg-slate-900 shadow-md">
                        <img src={profile.educationPicUrl} alt="Education Cover Preview" className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-32 aspect-video rounded-xl border border-slate-800 flex items-center justify-center shrink-0 bg-slate-900 text-slate-500 text-[10px]">
                        No 16:9 Photo
                      </div>
                    )}
                    <div className="flex-1 w-full space-y-1">
                      <div className="flex gap-2 items-center">
                        <input
                          type="url"
                          placeholder="https://res.cloudinary.com/..."
                          value={profile.educationPicUrl || ''}
                          onChange={(e) => setProfile({ ...profile, educationPicUrl: e.target.value })}
                          className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                        />
                        <label className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-semibold cursor-pointer shrink-0 flex items-center gap-1.5 shadow-md">
                          <UploadCloud className="w-4 h-4" />
                          {uploading ? 'Uploading...' : 'Upload 16:9 Photo'}
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleFileUpload(e, (url) => setProfile({ ...profile, educationPicUrl: url }))}
                          />
                        </label>
                      </div>
                      <span className="text-[11px] text-slate-400 block">Upload a high-resolution 16:9 campus or graduation photo displayed in the Education section.</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">GitHub Profile URL</label>
                  <input
                    type="url"
                    value={profile.githubUrl || ''}
                    onChange={(e) => setProfile({ ...profile, githubUrl: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">LinkedIn Profile URL</label>
                  <input
                    type="url"
                    value={profile.linkedinUrl || ''}
                    onChange={(e) => setProfile({ ...profile, linkedinUrl: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <button
                  type="submit"
                  className="sm:col-span-2 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5"
                >
                  <Save className="w-4 h-4" /> Save Profile Details
                </button>
              </form>
            </div>
          )}

          {/* 7. INBOX TAB */}
          {activeTab === 'INBOX' && (
            <div>
              <h2 className="text-xl font-bold text-white mb-6">Contact Form Submissions</h2>
              {messages.length === 0 ? (
                <p className="text-xs text-slate-400">No contact messages received yet.</p>
              ) : (
                <div className="flex flex-col gap-4">
                  {messages.map((m) => (
                    <div key={m.id} className="glass-card p-4 rounded-xl border border-slate-800">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-white text-sm">{m.name} ({m.email})</span>
                        <button
                          onClick={() => handleDeleteMessage(m.id)}
                          className="text-red-400 hover:text-red-300 text-xs"
                        >
                          Delete
                        </button>
                      </div>
                      <p className="text-xs text-indigo-400 font-semibold mb-1">Subject: {m.subject || 'No Subject'}</p>
                      <p className="text-xs text-slate-300">{m.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 8. CLOUDINARY TAB */}
          {activeTab === 'CLOUDINARY' && (
            <div>
              <h2 className="text-xl font-bold text-white mb-4">Upload Media via Cloudinary</h2>
              <div className="border-2 border-dashed border-slate-800 rounded-2xl p-8 text-center bg-slate-950">
                <UploadCloud className="w-10 h-10 text-indigo-400 mx-auto mb-2" />
                <p className="text-xs text-slate-300 mb-4">Select an image, video, or PDF document to upload to Cloudinary CDN</p>
                <input
                  type="file"
                  onChange={(e) => handleFileUpload(e)}
                  className="text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-500"
                />
                {uploading && <p className="text-xs text-cyan-400 mt-3">Uploading to Cloudinary...</p>}
                {uploadedUrl && (
                  <div className="mt-4 p-3 bg-slate-900 rounded-xl text-xs break-all text-emerald-400">
                    <strong>Uploaded CDN URL:</strong> <a href={uploadedUrl} target="_blank" rel="noreferrer" className="underline">{uploadedUrl}</a>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
