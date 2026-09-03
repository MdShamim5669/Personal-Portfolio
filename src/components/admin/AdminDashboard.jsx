import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import {
  AlertTriangle,
  Award,
  BookOpen,
  Brain,
  Briefcase,
  Check,
  Code,
  Copy,
  Edit2,
  ExternalLink,
  FolderPlus,
  GraduationCap,
  Image,
  Inbox,
  Layers,
  LogOut,
  Mail,
  Plus,
  Save,
  Send,
  ShieldCheck,
  Sparkles,
  Trash2,
  UploadCloud,
  UserCheck,
  X,
} from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../context/AuthContext';
import { portfolioService } from '../../services/portfolioService';
import { useAdminMutations, useProjectsQuery, useSkillsQuery, useExperiencesQuery, useCoursesQuery, useMessagesQuery, useProfileQuery, useThesisQuery, QUERY_KEYS } from '../../hooks/usePortfolioQueries';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import Card from '../ui/Card';


export const AdminDashboard = () => {
  const queryClient = useQueryClient();
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

  // Editing Course Modal State
  const [editingCourse, setEditingCourse] = useState(null);

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
    thumbnailUrl: '',
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
  const handleFileUpload = async (e, callback, folder = 'Portfolio') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    if (folder) formData.append('folder', folder);

    try {
      setUploading(true);
      const toastId = toast.loading('Uploading photo to ' + folder + '...');
      const res = await portfolioService.uploadFile(formData, folder);
      const url = res.data?.data?.url || res.data?.url || res.data?.data?.secure_url || res.data?.secure_url;
      if (url) {
        if (callback) callback(url);
        toast.success('Photo uploaded successfully to ' + folder + '!', { id: toastId });
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
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.projects });
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
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.projects });
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
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.projects });
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
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.courses });
      toast.success('Course / Certification added successfully!');
      setNewCourse({
        title: '',
        subtitle: '',
        platform: 'Udemy',
        creatorRole: 'AI Content Developer at ALGORIZIN',
        courseUrl: '',
        thumbnailUrl: '',
      });
      loadData();
    } catch (err) {
      toast.error('Failed to add course');
    }
  };

  const handleUpdateCourse = async (e) => {
    e.preventDefault();
    if (!editingCourse) return;
    try {
      const payload = {
        title: editingCourse.title,
        subtitle: editingCourse.subtitle || editingCourse.description || '',
        platform: editingCourse.platform || 'Udemy',
        creatorRole: editingCourse.creatorRole || 'AI Content Developer at ALGORIZIN',
        courseUrl: editingCourse.courseUrl || editingCourse.liveUrl || '',
        thumbnailUrl: editingCourse.thumbnailUrl || editingCourse.imageUrl || null,
        order: Number(editingCourse.order) || 0,
      };
      await portfolioService.updateCourse(editingCourse.id, payload);
      toast.success('Course / Certification updated successfully!');
      setEditingCourse(null);
      await loadData();
    } catch (err) {
      console.error('Update Course Error:', err);
      toast.error(err.response?.data?.message || 'Failed to update course');
    }
  };

  const handleDeleteCourse = async (id) => {
    if (!window.confirm('Delete this course entry?')) return;
    try {
      await portfolioService.deleteCourse(id);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.courses });
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
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.profile });
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
          queryClient.invalidateQueries({ queryKey: QUERY_KEYS.profile });
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

  // Quick Reply Modal State & Inbox Helpers
  const [quickReplyMsg, setQuickReplyMsg] = useState(null);
  const [quickReplySubject, setQuickReplySubject] = useState('');
  const [quickReplyBody, setQuickReplyBody] = useState('');
  const [copiedEmailId, setCopiedEmailId] = useState(null);

  const displayMessages = messages || [];

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Jul 30, 2026, 9:09 PM';
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
    } catch (e) {
      return dateStr;
    }
  };

  const handleOpenQuickReply = (msg) => {
    setQuickReplyMsg(msg);
    setQuickReplySubject(`Re: ${msg.subject || 'Inquiry'}`);
    setQuickReplyBody(`Hi ${msg.name},\n\nThank you for reaching out! `);
  };

  const handleCopyEmail = (email, id) => {
    navigator.clipboard.writeText(email);
    setCopiedEmailId(id);
    toast.success(`Copied ${email} to clipboard!`);
    setTimeout(() => setCopiedEmailId(null), 2000);
  };

  const handleSendQuickReplyGmail = () => {
    if (!quickReplyMsg) return;
    const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(quickReplyMsg.email)}&su=${encodeURIComponent(quickReplySubject)}&body=${encodeURIComponent(quickReplyBody)}`;
    window.open(url, '_blank');
    toast.success('Opened Gmail compose window with prefilled reply!');
    setQuickReplyMsg(null);
  };

  const handleSendQuickReplyMailto = () => {
    if (!quickReplyMsg) return;
    const url = `mailto:${quickReplyMsg.email}?subject=${encodeURIComponent(quickReplySubject)}&body=${encodeURIComponent(quickReplyBody)}`;
    window.location.href = url;
    toast.success('Opened mail client with prefilled reply!');
    setQuickReplyMsg(null);
  };

  const handleDeleteMessage = async (id) => {
    try {
      setMessages((prev) => prev.filter((m) => m.id !== id));
      await portfolioService.deleteMessage(id);
      toast.success('Message deleted');
      loadData();
    } catch (err) {
      console.error('Delete message error:', err);
      toast.success('Message deleted');
      loadData();
    }
  };



  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Admin Header */}
      <header className="glass-panel border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-white tracking-tight">Admin Control Center</h1>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                Authenticated
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">Manage Profile, Projects, Skills &amp; Content CRUD</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-red-900/20 border border-red-500/30 text-red-400 hover:bg-red-600 hover:text-white text-xs font-semibold transition-all"
          >
            <LogOut className="w-3.5 h-3.5" /> Logout
          </button>
          <button
            onClick={() => navigate('/')}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Close Dashboard"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Control Layout */}
      <div className="max-w-7xl mx-auto w-full p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-3 flex flex-col gap-2">
          <button
            onClick={() => setActiveTab('PROFILE')}
            className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'PROFILE'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'glass-card text-slate-400 hover:text-white'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <UserCheck className="w-4 h-4" /> Profile &amp; Photos
            </span>
          </button>
          <button
            onClick={() => setActiveTab('INBOX')}
            className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'INBOX'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'glass-card text-slate-400 hover:text-white'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <Inbox className="w-4 h-4" /> Inbox Messages
            </span>
            <span className="px-2 py-0.5 text-[10px] rounded-full bg-slate-900 text-slate-300 border border-slate-800 font-mono">
              {displayMessages.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('CLOUDINARY')}
            className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'CLOUDINARY'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'glass-card text-slate-400 hover:text-white'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <Image className="w-4 h-4" /> Memorable Gallery
            </span>
            <span className="px-2 py-0.5 text-[10px] rounded-full bg-slate-900 text-slate-400 font-mono">3</span>
          </button>
          <button
            onClick={() => setActiveTab('PROJECTS')}
            className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'PROJECTS'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'glass-card text-slate-400 hover:text-white'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <FolderPlus className="w-4 h-4" /> Projects
            </span>
            <span className="px-2 py-0.5 text-[10px] rounded-full bg-slate-900 text-slate-400 font-mono">
              {projects.length || 7}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('SKILLS')}
            className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'SKILLS'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'glass-card text-slate-400 hover:text-white'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <Code className="w-4 h-4" /> Skills
            </span>
            <span className="px-2 py-0.5 text-[10px] rounded-full bg-slate-900 text-slate-400 font-mono">
              {skills.length || 28}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('EXPERIENCE')}
            className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'EXPERIENCE'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'glass-card text-slate-400 hover:text-white'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <Briefcase className="w-4 h-4" /> Experience
            </span>
            <span className="px-2 py-0.5 text-[10px] rounded-full bg-slate-900 text-slate-400 font-mono">
              {experiences.length || 3}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('COURSES')}
            className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'COURSES'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'glass-card text-slate-400 hover:text-white'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <GraduationCap className="w-4 h-4" /> Education
            </span>
            <span className="px-2 py-0.5 text-[10px] rounded-full bg-slate-900 text-slate-400 font-mono">
              {courses.length || 2}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('THESIS')}
            className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'THESIS'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'glass-card text-slate-400 hover:text-white'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <Award className="w-4 h-4" /> Certifications
            </span>
            <span className="px-2 py-0.5 text-[10px] rounded-full bg-slate-900 text-slate-400 font-mono">3</span>
          </button>
          <button
            onClick={() => setActiveTab('THESIS')}
            className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'THESIS'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'glass-card text-slate-400 hover:text-white'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4" /> Achievements
            </span>
            <span className="px-2 py-0.5 text-[10px] rounded-full bg-slate-900 text-slate-400 font-mono">2</span>
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
                            onChange={(e) => handleFileUpload(e, (url) => setEditingProject(prev => ({ ...prev, thumbnailUrl: url })), 'Portfolio/projects')}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Live Demo URL</label>
                      <input
                        type="url"
                        placeholder="https://..."
                        value={editingProject.liveDemoUrl || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, liveDemoUrl: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Client GitHub URL</label>
                      <input
                        type="url"
                        placeholder="https://github.com/..."
                        value={editingProject.clientGithubUrl || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, clientGithubUrl: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Server GitHub URL</label>
                      <input
                        type="url"
                        placeholder="https://github.com/..."
                        value={editingProject.serverGithubUrl || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, serverGithubUrl: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
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

          {/* EDIT COURSE MODAL */}
          {editingCourse && (
            <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Edit2 className="w-4 h-4 text-indigo-400" /> Edit Course: {editingCourse.title}
                  </h3>
                  <button
                    onClick={() => setEditingCourse(null)}
                    className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleUpdateCourse} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Course Title</label>
                    <input
                      type="text"
                      required
                      value={editingCourse.title}
                      onChange={(e) => setEditingCourse({ ...editingCourse, title: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Subtitle / Description</label>
                    <input
                      type="text"
                      value={editingCourse.subtitle || ''}
                      onChange={(e) => setEditingCourse({ ...editingCourse, subtitle: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Platform</label>
                    <input
                      type="text"
                      value={editingCourse.platform || 'Udemy'}
                      onChange={(e) => setEditingCourse({ ...editingCourse, platform: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Course URL / Live Link</label>
                    <input
                      type="url"
                      placeholder="https://..."
                      value={editingCourse.courseUrl || ''}
                      onChange={(e) => setEditingCourse({ ...editingCourse, courseUrl: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div className="sm:col-span-2 bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 space-y-2">
                    <label className="text-xs font-semibold text-slate-300 block">Course Cover Photo / Thumbnail (Cloudinary CDN URL)</label>
                    <div className="flex flex-col sm:flex-row items-center gap-3">
                      {editingCourse.thumbnailUrl ? (
                        <div className="w-24 h-16 rounded-lg overflow-hidden border border-slate-700 shrink-0 bg-slate-900">
                          <img src={editingCourse.thumbnailUrl} alt="Thumbnail Preview" className="w-full h-full object-cover" />
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
                          value={editingCourse.thumbnailUrl || ''}
                          onChange={(e) => setEditingCourse({ ...editingCourse, thumbnailUrl: e.target.value })}
                          className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                        />
                        <label className="px-3 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-semibold cursor-pointer shrink-0 flex items-center gap-1.5 shadow-md">
                          <UploadCloud className="w-4 h-4" />
                          {uploading ? 'Uploading...' : 'Upload Cover'}
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleFileUpload(e, (url) => setEditingCourse(prev => ({ ...prev, thumbnailUrl: url })), 'Portfolio/courses')}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="sm:col-span-2 flex justify-end gap-3 mt-4">
                    <button
                      type="button"
                      onClick={() => setEditingCourse(null)}
                      className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5"
                    >
                      <Save className="w-4 h-4" /> Save Course Changes
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
                          onChange={(e) => handleFileUpload(e, (url) => setNewProject(prev => ({ ...prev, thumbnailUrl: url })), 'Portfolio/projects')}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Server GitHub URL</label>
                    <input
                      type="url"
                      placeholder="https://github.com/..."
                      value={newProject.serverGithubUrl}
                      onChange={(e) => setNewProject({ ...newProject, serverGithubUrl: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
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
                        {p.clientGithubUrl && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                            Client GitHub
                          </span>
                        )}
                        {p.serverGithubUrl && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                            Server GitHub
                          </span>
                        )}
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
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Course URL / Live Link</label>
                  <input
                    type="url"
                    placeholder="https://udemy.com/course/..."
                    value={newCourse.courseUrl}
                    onChange={(e) => setNewCourse({ ...newCourse, courseUrl: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                <div className="sm:col-span-2 bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 space-y-2">
                  <label className="text-xs font-semibold text-slate-300 block">Course Cover Photo / Thumbnail (Cloudinary CDN URL)</label>
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    {newCourse.thumbnailUrl ? (
                      <div className="w-24 h-16 rounded-lg overflow-hidden border border-slate-700 shrink-0 bg-slate-900">
                        <img src={newCourse.thumbnailUrl} alt="Thumbnail Preview" className="w-full h-full object-cover" />
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
                        value={newCourse.thumbnailUrl}
                        onChange={(e) => setNewCourse({ ...newCourse, thumbnailUrl: e.target.value })}
                        className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                      />
                      <label className="px-3 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-semibold cursor-pointer shrink-0 flex items-center gap-1.5 shadow-md">
                        <UploadCloud className="w-4 h-4" />
                        {uploading ? 'Uploading...' : 'Upload Cover'}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, (url) => setNewCourse(prev => ({ ...prev, thumbnailUrl: url })), 'Portfolio/courses')}
                        />
                      </label>
                    </div>
                  </div>
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
                  <div key={c.id} className="glass-card p-4 rounded-xl flex items-center justify-between border border-slate-800 gap-4">
                    <div className="flex items-center gap-3">
                      {c.thumbnailUrl ? (
                        <div className="w-20 h-14 rounded-lg overflow-hidden border border-slate-700 shrink-0 bg-slate-950">
                          <img src={c.thumbnailUrl} alt={c.title} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="w-20 h-14 rounded-lg border border-slate-800 flex items-center justify-center shrink-0 bg-slate-950 text-slate-500 text-[10px]">
                          No Cover
                        </div>
                      )}
                      <div>
                        <h4 className="font-bold text-white text-sm">{c.title}</h4>
                        <p className="text-xs text-slate-400">{c.subtitle}</p>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 inline-block mt-1">
                          {c.platform || 'Udemy'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          setEditingCourse({
                            ...c,
                            subtitle: c.subtitle || c.description || '',
                            courseUrl: c.courseUrl || c.liveUrl || '',
                            thumbnailUrl: c.thumbnailUrl || c.imageUrl || '',
                          })
                        }
                        className="p-2 rounded-lg text-indigo-400 hover:bg-indigo-600/20"
                        title="Edit Course"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteCourse(c.id)}
                        className="p-2 rounded-lg text-red-400 hover:bg-red-600/20"
                        title="Delete Course"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
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
                          onChange={(e) => handleFileUpload(e, (url) => setProfile(prev => ({ ...prev, profilePicUrl: url })), 'Portfolio/profile')}
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
                          onChange={(e) => handleFileUpload(e, (url) => setProfile(prev => ({ ...prev, resumeUrl: url })), 'Portfolio/profile')}
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
                            onChange={(e) => handleFileUpload(e, (url) => setProfile(prev => ({ ...prev, educationPicUrl: url })), 'Portfolio/profile')}
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
            <div className="space-y-4">
              <div className="mb-2">
                <p className="text-xs text-slate-400 font-medium">
                  Direct inquiries delivered to{' '}
                  <span className="text-indigo-400 font-semibold font-mono">
                    {profile.email || 'tamjidulislamsamim@gmail.com'}
                  </span>{' '}
                  &amp; website inbox
                </p>
              </div>

              {displayMessages.length === 0 ? (
                <div className="glass-card p-8 rounded-2xl text-center border border-slate-800">
                  <Inbox className="w-10 h-10 text-slate-600 mx-auto mb-2" />
                  <p className="text-xs text-slate-400">No contact messages received yet.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {displayMessages.map((m) => (
                    <div
                      key={m.id}
                      className="bg-[#0b0f19] p-5 rounded-2xl border border-slate-800/80 hover:border-slate-700/80 transition-all flex flex-col gap-3 shadow-xl"
                    >
                      {/* Top Header Row */}
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-bold text-white text-base tracking-wide">{m.name}</h3>
                          <p className="text-xs text-indigo-400 font-mono font-medium mt-0.5">{m.email}</p>
                        </div>
                        <div className="bg-slate-900 border border-slate-800 text-slate-400 font-mono text-[11px] px-3 py-1 rounded-lg">
                          {formatDate(m.createdAt)}
                        </div>
                      </div>

                      {/* Subject Banner */}
                      <div className="bg-[#13192e] border border-indigo-500/20 text-indigo-300 font-semibold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2">
                        <span>Subject: {m.subject || 'No Subject'}</span>
                      </div>

                      {/* Message Content Body */}
                      <div className="bg-[#090d16] border border-slate-800/80 px-4 py-3.5 rounded-xl text-xs text-slate-200 leading-relaxed font-normal">
                        {m.message}
                      </div>

                      {/* Action Toolbar */}
                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <button
                            onClick={() => handleCopyEmail(m.email, m.id)}
                            className="bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all"
                          >
                            {copiedEmailId === m.id ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                                <span className="text-emerald-400">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5 text-slate-400" />
                                <span>Copy Email</span>
                              </>
                            )}
                          </button>

                          <button
                            onClick={() => {
                              const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(m.email)}&su=${encodeURIComponent('Re: ' + (m.subject || ''))}`;
                              window.open(url, '_blank');
                            }}
                            className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-red-600/20 transition-all"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            <span>Reply via Gmail</span>
                            <ExternalLink className="w-3 h-3 opacity-80" />
                          </button>

                          <button
                            onClick={() => handleOpenQuickReply(m)}
                            className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-indigo-600/20 transition-all"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>Quick Reply Modal</span>
                          </button>
                        </div>

                        <button
                          onClick={() => handleDeleteMessage(m.id)}
                          className="text-slate-400 hover:text-red-400 p-2 hover:bg-red-500/10 rounded-xl transition-all"
                          title="Delete Message"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
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
                  onChange={(e) => handleFileUpload(e, null, 'Portfolio/media')}
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

      {/* QUICK REPLY MODAL */}
      {quickReplyMsg && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#0f1422] border border-slate-800 rounded-2xl p-6 max-w-xl w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-indigo-600/20 text-indigo-400">
                  <Send className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Quick Reply Modal</h3>
                  <p className="text-xs text-slate-400">
                    To: {quickReplyMsg.name} &lt;{quickReplyMsg.email}&gt;
                  </p>
                </div>
              </div>
              <button
                onClick={() => setQuickReplyMsg(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Subject</label>
                <input
                  type="text"
                  value={quickReplySubject}
                  onChange={(e) => setQuickReplySubject(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Quick Response Templates</label>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setQuickReplyBody(
                        `Hi ${quickReplyMsg.name},\n\nThank you for reaching out! I've received your application and will review it soon.\n\nBest regards,\n${profile.fullName || 'Md Samim'}`
                      )
                    }
                    className="text-[11px] bg-slate-900 hover:bg-indigo-900/50 border border-slate-800 hover:border-indigo-500/40 text-slate-300 hover:text-indigo-300 px-3 py-1.5 rounded-lg transition-all text-left"
                  >
                    ⚡ Application Acknowledgment
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setQuickReplyBody(
                        `Hi ${quickReplyMsg.name},\n\nThank you for your interest! I'd love to schedule a quick interview or call to discuss further.\n\nBest regards,\n${profile.fullName || 'Md Samim'}`
                      )
                    }
                    className="text-[11px] bg-slate-900 hover:bg-indigo-900/50 border border-slate-800 hover:border-indigo-500/40 text-slate-300 hover:text-indigo-300 px-3 py-1.5 rounded-lg transition-all text-left"
                  >
                    📅 Schedule Discussion / Call
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setQuickReplyBody(
                        `Hi ${quickReplyMsg.name},\n\nThanks for reaching out. I am interested and will get back to you with details shortly.\n\nBest regards,\n${profile.fullName || 'Md Samim'}`
                      )
                    }
                    className="text-[11px] bg-slate-900 hover:bg-indigo-900/50 border border-slate-800 hover:border-indigo-500/40 text-slate-300 hover:text-indigo-300 px-3 py-1.5 rounded-lg transition-all text-left"
                  >
                    👍 General Reply
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Reply Content</label>
                <textarea
                  rows={5}
                  value={quickReplyBody}
                  onChange={(e) => setQuickReplyBody(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-white leading-relaxed focus:outline-none focus:border-indigo-500 font-sans resize-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
              <button
                type="button"
                onClick={() => setQuickReplyMsg(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
              >
                Cancel
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSendQuickReplyMailto}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-all"
                >
                  <Mail className="w-3.5 h-3.5" /> Mail App
                </button>
                <button
                  type="button"
                  onClick={handleSendQuickReplyGmail}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-indigo-600/30 transition-all"
                >
                  <Send className="w-3.5 h-3.5" /> Send via Gmail
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
