import React, { useMemo } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Award, Cpu, ShieldCheck, Zap } from 'lucide-react';

export const SkillCategoryChart = ({ categoryTitle, skillsData = [] }) => {
  // Compute average category proficiency
  const avgProficiency = useMemo(() => {
    if (!skillsData || skillsData.length === 0) return 92;
    const total = skillsData.reduce((acc, curr) => acc + (curr.proficiency || 85), 0);
    return Math.round(total / skillsData.length);
  }, [skillsData]);

  // Format data for Horizontal Bar Chart
  const chartData = useMemo(() => {
    return skillsData.map((s) => ({
      x: s.name,
      y: s.proficiency || 85,
    }));
  }, [skillsData]);

  const barChartHeight = Math.max(280, skillsData.length * 56);

  // Bar Chart Options (Left Column)
  const barChartOptions = useMemo(() => {
    return {
      chart: {
        id: `bar-${categoryTitle.replace(/\s+/g, '-').toLowerCase()}`,
        type: 'bar',
        height: barChartHeight,
        toolbar: { show: false },
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 400,
        },
        background: 'transparent',
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: '62%',
          borderRadius: 10,
          borderRadiusApplication: 'end',
          distributed: true,
          dataLabels: {
            position: 'top',
          },
        },
      },
      colors: [
        '#06b6d4', // Cyan
        '#6366f1', // Indigo
        '#10b981', // Emerald
        '#f59e0b', // Amber
        '#8b5cf6', // Purple
        '#ec4899', // Pink
        '#3b82f6', // Electric Blue
        '#14b8a6', // Teal
      ],
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
        borderColor: 'rgba(51, 65, 85, 0.35)',
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
          style: {
            colors: '#f8fafc',
            fontSize: '13px',
            fontWeight: '700',
            fontFamily: 'inherit',
          },
        },
      },
      tooltip: {
        theme: 'dark',
        y: {
          formatter: (val) => `${val}% Production Mastery`,
        },
      },
      legend: { show: false },
    };
  }, [categoryTitle, barChartHeight]);

  const barSeries = useMemo(() => [
    {
      name: 'Mastery Level',
      data: chartData,
    },
  ], [chartData]);

  // Overall Domain Radar Chart Options (Right Column)
  const radarChartOptions = useMemo(() => {
    return {
      chart: {
        id: 'overall-skill-radar',
        type: 'radar',
        height: 320,
        toolbar: { show: false },
        background: 'transparent',
      },
      colors: ['#06b6d4'],
      stroke: {
        width: 2.5,
        colors: ['#06b6d4'],
      },
      fill: {
        opacity: 0.35,
        colors: ['#06b6d4'],
      },
      markers: {
        size: 4,
        colors: ['#38bdf8'],
        strokeColors: '#0f172a',
        strokeWidth: 2,
        hover: { size: 7 },
      },
      xaxis: {
        categories: [
          'Languages',
          'Backend',
          'Frontend',
          'Databases',
          'Machine Learning',
          'AI Tools',
          'Dev Tools',
        ],
        labels: {
          style: {
            colors: [
              '#38bdf8',
              '#818cf8',
              '#34d399',
              '#fbbf24',
              '#c084fc',
              '#f472b6',
              '#60a5fa',
            ],
            fontSize: '11px',
            fontWeight: '700',
            fontFamily: 'inherit',
          },
        },
      },
      yaxis: {
        show: false,
        min: 0,
        max: 100,
      },
      plotOptions: {
        radar: {
          polygons: {
            strokeColors: 'rgba(51, 65, 85, 0.4)',
            connectorColors: 'rgba(51, 65, 85, 0.4)',
            fill: {
              colors: ['rgba(15, 23, 42, 0.7)', 'rgba(30, 41, 59, 0.5)'],
            },
          },
        },
      },
      tooltip: {
        theme: 'dark',
        y: {
          formatter: (val) => `${val}% Competency`,
        },
      },
    };
  }, []);

  const radarSeries = useMemo(() => [
    {
      name: 'Engineering Competency',
      data: [92, 95, 94, 91, 93, 96, 97],
    },
  ], []);

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
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold text-slate-300">
              Avg Score: <span className="text-cyan-400 font-extrabold">{avgProficiency}%</span>
            </span>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500/15 to-indigo-500/15 border border-cyan-400/30 shadow-sm">
            <Award className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold text-amber-300">
              Senior Production Tier
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
            <ShieldCheck className="w-4 h-4" /> Verified Stack
          </div>
        </div>
      </div>

      {/* DUAL CHART GRID (Bar Chart + Domain Radar Chart) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Category Bar Chart */}
        <div className="lg:col-span-7 w-full">
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Specific Frameworks & Languages
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

        {/* Right Column: Full Spectrum Radar Chart */}
        <div className="lg:col-span-5 w-full bg-slate-900/60 border border-slate-800/90 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-inner">
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
  );
};

export default SkillCategoryChart;
