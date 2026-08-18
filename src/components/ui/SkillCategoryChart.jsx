import React, { useMemo, useRef, useState, useEffect, useCallback } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Award, Cpu, ShieldCheck, Zap } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────
   Custom hook: useCountUp
   Animates a number from 0 → target whenever the element enters
   the viewport. Resets and replays every time the target changes.
───────────────────────────────────────────────────────────────── */
function useCountUp(target, { duration = 1200, delay = 0 } = {}) {
  const [value, setValue] = useState(0);
  const rafRef = useRef(null);
  const startRef = useRef(null);
  const nodeRef = useRef(null);

  const animate = useCallback(
    (timestamp) => {
      if (startRef.current === null) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      // Ease-out cubic
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    },
    [target, duration],
  );

  const start = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    startRef.current = null;
    setValue(0);
    const id = setTimeout(() => {
      rafRef.current = requestAnimationFrame(animate);
    }, delay);
    return () => clearTimeout(id);
  }, [animate, delay]);

  useEffect(() => {
    const el = nodeRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          start();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [start]);

  // Also re-run when target changes (category switch)
  useEffect(() => {
    start();
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, start]);

  return { value, nodeRef };
}

const SKILL_COLORS = [
  { bar: '#06b6d4', glow: 'rgba(6,182,212,0.35)' },
  { bar: '#6366f1', glow: 'rgba(99,102,241,0.35)' },
  { bar: '#10b981', glow: 'rgba(16,185,129,0.35)' },
  { bar: '#f59e0b', glow: 'rgba(245,158,11,0.35)' },
  { bar: '#8b5cf6', glow: 'rgba(139,92,246,0.35)' },
  { bar: '#ec4899', glow: 'rgba(236,72,153,0.35)' },
  { bar: '#3b82f6', glow: 'rgba(59,130,246,0.35)' },
  { bar: '#14b8a6', glow: 'rgba(20,184,166,0.35)' },
];

/* ─────────────────────────────────────────────────────────────────
   SkillCategoryChart
───────────────────────────────────────────────────────────────── */
export const SkillCategoryChart = ({ categoryTitle, skillsData = [] }) => {
  // Avg proficiency
  const avgProficiency = useMemo(() => {
    if (!skillsData || skillsData.length === 0) return 92;
    const total = skillsData.reduce((acc, curr) => acc + (curr.proficiency || 85), 0);
    return Math.round(total / skillsData.length);
  }, [skillsData]);

  // Animated avg score
  const { value: avgDisplayed, nodeRef: avgRef } = useCountUp(avgProficiency, { duration: 1300 });

  // Format data for Horizontal Bar Chart
  const chartData = useMemo(
    () => skillsData.map((s) => ({ x: s.name, y: s.proficiency || 85 })),
    [skillsData],
  );

  const barChartHeight = Math.max(280, skillsData.length * 56);

  // Bar Chart Options
  const barChartOptions = useMemo(() => ({
    chart: {
      id: `bar-${categoryTitle.replace(/\s+/g, '-').toLowerCase()}`,
      type: 'bar',
      height: barChartHeight,
      toolbar: { show: false },
      animations: { enabled: true, easing: 'easeinout', speed: 500 },
      background: 'transparent',
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '62%',
        borderRadius: 10,
        borderRadiusApplication: 'end',
        distributed: true,
        dataLabels: { position: 'top' },
      },
    },
    colors: SKILL_COLORS.map((c) => c.bar),
    dataLabels: {
      enabled: true,
      textAnchor: 'start',
      style: {
        colors: ['#ffffff'],
        fontSize: '11px',
        fontWeight: '800',
        fontFamily: 'inherit',
      },
      formatter: (val) => `${val}%`,
      offsetX: 12,
    },
    grid: {
      borderColor: 'rgba(51,65,85,0.35)',
      strokeDashArray: 4,
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: false } },
      padding: { top: -10, bottom: 0, left: 10, right: 40 },
    },
    xaxis: {
      min: 0,
      max: 100,
      labels: {
        formatter: (val) => `${val}%`,
        style: { colors: '#94a3b8', fontSize: '11px', fontWeight: '600' },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        style: { colors: '#f8fafc', fontSize: '13px', fontWeight: '700', fontFamily: 'inherit' },
      },
    },
    tooltip: {
      theme: 'dark',
      y: { formatter: (val) => `${val}% Production Mastery` },
    },
    legend: { show: false },
  }), [categoryTitle, barChartHeight]);

  const barSeries = useMemo(
    () => [{ name: 'Mastery Level', data: chartData }],
    [chartData],
  );

  // Radar Chart Options
  const radarChartOptions = useMemo(() => ({
    chart: {
      id: 'overall-skill-radar',
      type: 'radar',
      height: 320,
      toolbar: { show: false },
      background: 'transparent',
    },
    colors: ['#06b6d4'],
    stroke: { width: 2.5, colors: ['#06b6d4'] },
    fill: { opacity: 0.35, colors: ['#06b6d4'] },
    markers: {
      size: 4,
      colors: ['#38bdf8'],
      strokeColors: '#0f172a',
      strokeWidth: 2,
      hover: { size: 7 },
    },
    xaxis: {
      categories: ['Languages', 'Backend', 'Frontend', 'Databases', 'Machine Learning', 'AI Tools', 'Dev Tools'],
      labels: {
        style: {
          colors: ['#38bdf8', '#818cf8', '#34d399', '#fbbf24', '#c084fc', '#f472b6', '#60a5fa'],
          fontSize: '11px',
          fontWeight: '700',
          fontFamily: 'inherit',
        },
      },
    },
    yaxis: { show: false, min: 0, max: 100 },
    plotOptions: {
      radar: {
        polygons: {
          strokeColors: 'rgba(51,65,85,0.4)',
          connectorColors: 'rgba(51,65,85,0.4)',
          fill: { colors: ['rgba(15,23,42,0.7)', 'rgba(30,41,59,0.5)'] },
        },
      },
    },
    tooltip: { theme: 'dark', y: { formatter: (val) => `${val}% Competency` } },
  }), []);

  const radarSeries = useMemo(
    () => [{ name: 'Engineering Competency', data: [92, 95, 94, 91, 93, 96, 97] }],
    [categoryTitle],
  );

  return (
    <div className="w-full bg-slate-950/95 border border-cyan-500/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(6,182,212,0.18)] backdrop-blur-2xl">

      {/* TOP DASHBOARD METRICS BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800/80 pb-5 mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-xs font-mono font-extrabold uppercase tracking-widest text-cyan-400 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-cyan-400" /> Interactive Skill Analytics
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {categoryTitle} Technical Proficiency
          </h3>
        </div>

        {/* Metric Badges */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Animated avg score */}
          <div
            ref={avgRef}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 shadow-sm"
          >
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold text-slate-300">
              Avg Score:{' '}
              <span className="text-cyan-400 font-extrabold tabular-nums">{avgDisplayed}%</span>
            </span>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500/15 to-indigo-500/15 border border-cyan-400/30 shadow-sm">
            <Award className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold text-amber-300">Senior Production Tier</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
            <ShieldCheck className="w-4 h-4" /> Verified Stack
          </div>
        </div>
      </div>

      {/* DUAL CHART GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Bar Chart */}
        <div className="lg:col-span-7 w-full">
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Specific Frameworks &amp; Languages
            </span>
            <span className="text-xs font-mono font-bold text-cyan-400">
              {skillsData.length} Technologies Listed
            </span>
          </div>

          <div className="w-full" style={{ minHeight: barChartHeight }}>
            <ReactApexChart
              key={categoryTitle}
              options={barChartOptions}
              series={barSeries}
              type="bar"
              height={barChartHeight}
            />
          </div>
        </div>

        {/* Right: Radar Chart */}
        <div className="lg:col-span-5 w-full flex flex-col gap-5">
          <div className="w-full bg-slate-900/60 border border-slate-800/90 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-inner">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-2 mb-2">
              <span className="text-xs font-bold text-slate-200 tracking-wide flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-cyan-400" /> Overall Domain Radar
              </span>
              <span className="text-[10px] font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-md border border-indigo-500/30">
                7 Domains
              </span>
            </div>

            <div className="w-full flex items-center justify-center py-1">
              <ReactApexChart
                options={radarChartOptions}
                series={radarSeries}
                type="radar"
                height={310}
              />
            </div>

            <p className="text-[11px] text-slate-400 text-center leading-relaxed border-t border-slate-800/80 pt-2">
              Multi-disciplinary expertise across Web Microservices, Artificial Intelligence, and Database Architectures.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillCategoryChart;
