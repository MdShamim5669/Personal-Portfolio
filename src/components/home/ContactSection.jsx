import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, Sparkles, Clock, CheckCircle2, MessageSquare } from 'lucide-react';
import TypingHeading from '../ui/TypingHeading';
import { toast } from 'sonner';
import { useSendMessageMutation, useProfileQuery } from '../../hooks/usePortfolioQueries';
import {
  FacebookIcon,
  GoogleIcon,
  IMessageIcon,
  AzureLocationIcon,
  LinkedinIcon
} from '../ui/CustomIcons';

export const ContactSection = ({ profile: profileProp }) => {
  const { data: profileQuery } = useProfileQuery();
  const profile = profileProp || profileQuery;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const sendMessageMutation = useSendMessageMutation();

  const emailVal = profile?.email || 'tamjidulislamsamim@gmail.com';
  const phoneVal = profile?.phone || '+880 1782-938883';
  const locationVal = profile?.location || 'Dhaka, Bangladesh';
  const linkedinUrl = profile?.linkedinUrl || 'https://www.linkedin.com/in/md-samim5669/';
  const cleanPhone = (phoneVal || '').replace(/\s+/g, '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields.');
      return;
    }

    toast.promise(
      sendMessageMutation.mutateAsync(formData),
      {
        loading: 'Sending message...',
        success: () => {
          setFormData({ name: '', email: '', subject: '', message: '' });
          return 'Thank you! Your message has been sent successfully.';
        },
        error: (err) => err.response?.data?.message || 'Failed to send message. Please try again.',
      }
    );
  };

  return (
    <section id="contact" className="w-full py-20 px-4 lg:px-8 bg-[#0D1220] border-t border-slate-800/60 relative">
      <div className="max-w-7xl mx-auto relative">
        {/* Ambient background glow spots */}
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* SECTION HEADING: Get In Touch */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5" /> Let's Connect
        </span>
        <TypingHeading 
          text="Get In Touch" 
          className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-indigo-300 tracking-tight" 
        />
        <p className="text-slate-400 text-sm mt-3 leading-relaxed">
          Have a full-stack engineering role, AI research collaboration, or custom software project in mind? Send me a message and I'll respond promptly!
        </p>
      </div>

      {/* 2-COLUMN MAIN LAYOUT WITH SLEEK VERTICAL DIVIDER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch divide-y lg:divide-y-0 lg:divide-x divide-slate-800/80 gap-y-10 lg:gap-y-0 pb-6 relative z-10">
        {/* LEFT COLUMN: Direct Contact Details & Links */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full lg:pr-8 space-y-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-cyan-400" /> Direct Channels
              </span>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Reach Out Directly
              </h3>
            </div>

            {/* Contact Info Cards */}
            <div className="space-y-3.5">
              <motion.a
                whileHover={{ scale: 1.02, x: 4 }}
                href={`mailto:${emailVal}`}
                className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800/90 hover:border-red-500/50 shadow-lg transition-all group/item cursor-pointer backdrop-blur-xl"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-center shrink-0 group-hover/item:scale-110 group-hover/item:border-red-500/50 transition-all shadow-inner">
                  <GoogleIcon className="w-6 h-6" />
                </div>
                <div className="overflow-hidden">
                  <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider block">Gmail / Direct Email</span>
                  <span className="text-sm font-bold text-white group-hover/item:text-cyan-300 transition-colors truncate block">
                    {emailVal}
                  </span>
                </div>
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.02, x: 4 }}
                href={`tel:${cleanPhone}`}
                className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800/90 hover:border-emerald-500/50 shadow-lg transition-all group/item cursor-pointer backdrop-blur-xl"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-center shrink-0 group-hover/item:scale-110 group-hover/item:border-emerald-500/50 transition-all shadow-inner">
                  <IMessageIcon className="w-6 h-6" fill="#34DA50" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider block">Phone / iMessage</span>
                  <span className="text-sm font-bold text-white group-hover/item:text-emerald-300 transition-colors block">
                    {phoneVal}
                  </span>
                </div>
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.02, x: 4 }}
                href={linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800/90 hover:border-blue-500/50 shadow-lg transition-all group/item cursor-pointer backdrop-blur-xl"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-center shrink-0 group-hover/item:scale-110 group-hover/item:border-blue-500/50 transition-all shadow-inner">
                  <LinkedinIcon className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider block">LinkedIn Profile</span>
                  <span className="text-sm font-bold text-white group-hover/item:text-blue-300 transition-colors block">
                    {linkedinUrl.replace(/^https?:\/\/(www\.)?/, '')}
                  </span>
                </div>
              </motion.a>

              <motion.div
                whileHover={{ scale: 1.02, x: 4 }}
                className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800/90 hover:border-cyan-500/50 shadow-lg transition-all group/item cursor-default backdrop-blur-xl"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-center shrink-0 group-hover/item:scale-110 group-hover/item:border-cyan-500/50 transition-all shadow-inner">
                  <AzureLocationIcon className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider block">Location</span>
                  <span className="text-sm font-bold text-white group-hover/item:text-cyan-300 transition-colors block">
                    {locationVal}
                  </span>
                </div>
              </motion.div>
            </div>
          </div>


        </div>

        {/* RIGHT COLUMN: Interactive Message Form Card */}
        <div className="lg:col-span-7 flex flex-col justify-between h-full pt-8 lg:pt-0 lg:pl-8 space-y-6">
          <div>
            <div className="mb-6 border-b border-slate-800/80 pb-4">
              <h3 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                <Send className="w-5 h-5 text-cyan-400" /> Send Me A Message
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Fill in the form below and I'll get back to you as soon as possible.
              </p>
            </div>

            <form id="contact-form" onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-1.5">
                    Your Name <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Md. Samim"
                    className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all shadow-inner"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-1.5">
                    Email Address <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all shadow-inner"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-1.5">
                  Subject
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Inquiry / Research Collaboration / Hiring"
                  className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all shadow-inner"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-1.5">
                  Message <span className="text-cyan-400">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Write your message here..."
                  className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all resize-none shadow-inner"
                />
              </div>
            </form>
          </div>

          <div className="pt-4">
            <motion.button
              type="submit"
              form="contact-form"
              disabled={sendMessageMutation.isPending}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative overflow-hidden w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:via-indigo-500 hover:to-purple-500 text-white font-black text-sm shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.7)] border border-cyan-400/40 transition-all duration-300 cursor-pointer disabled:opacity-50"
            >
              {/* Light sweep shimmer effect */}
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 pointer-events-none" />

              {sendMessageMutation.isPending ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span className="relative z-10">Send Message</span>
                  <Send className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </>
              )}
            </motion.button>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};
