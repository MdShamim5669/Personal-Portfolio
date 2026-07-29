import { motion } from 'framer-motion';
import { Award, Brain, CheckCircle2, FileCode, Github, Sparkles, TrendingUp, BarChart2, ExternalLink, Server } from 'lucide-react';
import React from 'react';
import { BarChart as ReBarChart, Bar as ReBar, ResponsiveContainer as ReContainer, Tooltip as ReTooltip, XAxis as ReXAxis, YAxis as ReYAxis, Cell } from 'recharts';
import TypingHeading from '../ui/TypingHeading';

export const ThesisSection = ({ thesis }) => {
  const defaultThesis = {
    title: 'Social Media Influence on Youth Opinion Change in Bangladesh',
    summary:
      'Designed an end-to-end machine learning research framework for opinion change dynamics using SMOTE oversampling and feature engineering. Achieved 84.4% accuracy with an optimized Random Forest model on 317 survey responses.',
    accuracy: 84.4,
    modelName: 'Optimized Random Forest',
    datasetSize: 317,
    techStack: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib', 'Flask'],
    githubUrl: 'https://github.com/samim/thesis-social-media-influence',
    serverUrl: 'https://github.com/samim/thesis-api-backend',
    liveUrl: 'https://thesis-youth-opinion-bd.vercel.app',
  };

  const data = thesis || defaultThesis;

  const modelComparison = [
    { model: 'Random Forest', accuracy: 84.4 },
    { model: 'XGBoost', accuracy: 81.2 },
    { model: 'LightGBM', accuracy: 79.5 },
    { model: 'SVM', accuracy: 76.8 },
    { model: 'Logistic Reg.', accuracy: 73.4 },
  ];

  const barGradients = [
    { id: 'grad-rf', start: '#06b6d4', end: '#3b82f6' },      // Cyan -> Blue
    { id: 'grad-xgb', start: '#a855f7', end: '#ec4899' },     // Purple -> Pink
    { id: 'grad-lgb', start: '#10b981', end: '#06b6d4' },     // Emerald -> Cyan
    { id: 'grad-svm', start: '#f59e0b', end: '#ef4444' },     // Amber -> Red
    { id: 'grad-lr', start: '#6366f1', end: '#8b5cf6' },      // Indigo -> Purple
  ];

  return (
    <section id="thesis" className="w-full py-20 px-4 lg:px-8 bg-[#090D16] text-white border-t border-slate-800/60 relative">
      <div className="max-w-7xl mx-auto relative">
        {/* Background Glow */}
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-400/30 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2">
          <Brain className="w-3.5 h-3.5 text-cyan-400" /> Research & Bachelor Thesis
        </span>
        <TypingHeading 
          text="Machine Learning Pipeline" 
          highlightText="Pipeline"
          className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight" 
        />
        <p className="text-slate-400 text-sm mt-3 leading-relaxed">
          Applied predictive analytics and class-balancing techniques to model human opinion dynamics.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch divide-y lg:divide-y-0 lg:divide-x divide-slate-800/80 gap-y-8 lg:gap-y-0 pb-6 relative z-10">
        {/* LEFT COLUMN: Thesis Details & Methodology Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="lg:col-span-7 flex flex-col justify-between h-full lg:pr-8 space-y-6 group"
        >
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-cyan-400" /> DIU CSE Thesis Project
              </span>
              <span className="px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-[11px] font-mono font-bold">
                Publication Grade
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight group-hover:text-cyan-300 transition-colors">
              {data.title}
            </h3>

            <p className="text-slate-300 text-sm leading-relaxed">
              {data.summary}
            </p>

            {/* Methodology Highlights */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-300 hover:border-emerald-500/40 transition-colors">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  Engineered synthetic oversampling using <strong className="text-emerald-400">SMOTE</strong> to handle multi-class survey dataset imbalance.
                </span>
              </div>
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-300 hover:border-cyan-500/40 transition-colors">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>
                  Processed <strong className="text-cyan-400">317 survey samples</strong> capturing youth opinion metrics across Bangladesh.
                </span>
              </div>
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-300 hover:border-indigo-500/40 transition-colors">
                <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span>
                  Hyperparameter optimization produced an optimal peak accuracy score of <strong className="text-indigo-400">84.4%</strong>.
                </span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {data.techStack?.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-cyan-300 text-xs font-mono font-semibold hover:border-cyan-500/50 transition-colors"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {data.liveUrl && (
                <a
                  href={data.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-cyan-500/20 border border-cyan-400/40 hover:scale-105 transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Live Demo</span>
                </a>
              )}

              {data.githubUrl && (
                <a
                  href={data.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-cyan-400/60 text-slate-200 text-xs font-bold shadow-md hover:scale-105 transition-all"
                >
                  <Github className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Client Repo</span>
                </a>
              )}

              {(data.serverUrl || data.backendUrl) && (
                <a
                  href={data.serverUrl || data.backendUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-indigo-400/60 text-slate-200 text-xs font-bold shadow-md hover:scale-105 transition-all"
                >
                  <Server className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Server Link</span>
                </a>
              )}
            </div>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: Model Metrics & Benchmark Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="lg:col-span-5 flex flex-col justify-between h-full pt-8 lg:pt-0 lg:pl-8 space-y-6"
        >
          {/* Top Model Accuracy Metric Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/60 border border-slate-800/90 text-center relative overflow-hidden shadow-inner group/metric hover:border-cyan-500/50 transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
            <span className="text-[11px] uppercase font-extrabold text-cyan-400 tracking-wider flex items-center justify-center gap-1.5">
              <TrendingUp className="w-4 h-4" /> Peak Model Accuracy
            </span>
            <div className="text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-amber-300 mt-2 tracking-tight">
              {data.accuracy}%
            </div>
            <p className="text-xs text-slate-300 font-bold mt-2 flex items-center justify-center gap-1">
              <Award className="w-3.5 h-3.5 text-amber-400" /> {data.modelName}
            </p>
          </div>

          {/* Benchmark Chart Card */}
          <div className="flex-1 flex flex-col justify-between p-5 rounded-3xl bg-slate-950/80 border border-slate-800/90 shadow-inner">
            <h4 className="text-xs font-extrabold text-slate-200 uppercase tracking-wider mb-3 flex items-center gap-1.5 pb-3 border-b border-slate-800/80">
              <BarChart2 className="w-4 h-4 text-cyan-400" /> Classifier Benchmarks (%)
            </h4>

            <div className="h-[200px] w-full pt-2">
              <ReContainer width="100%" height="100%">
                <ReBarChart data={modelComparison} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    {barGradients.map((col) => (
                      <linearGradient key={col.id} id={col.id} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={col.start} />
                        <stop offset="100%" stopColor={col.end} />
                      </linearGradient>
                    ))}
                  </defs>
                  <ReXAxis dataKey="model" stroke="#94a3b8" fontSize={10} fontWeight={600} />
                  <ReYAxis domain={[0, 100]} stroke="#64748b" fontSize={10} />
                  <ReTooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderColor: '#334155',
                      borderRadius: '14px',
                      color: '#fff',
                      boxShadow: '0 10px 25px -5px rgba(0,0,0,0.5)',
                    }}
                  />
                  <ReBar dataKey="accuracy" radius={[8, 8, 0, 0]}>
                    {modelComparison.map((entry, index) => {
                      const gradId = barGradients[index % barGradients.length].id;
                      return <Cell key={`cell-${index}`} fill={`url(#${gradId})`} />;
                    })}
                  </ReBar>
                </ReBarChart>
              </ReContainer>
            </div>
          </div>
        </motion.div>
      </div>
      </div>
    </section>
  );
};
