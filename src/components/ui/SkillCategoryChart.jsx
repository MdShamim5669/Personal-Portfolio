import React from 'react';
import ReactApexChart from 'react-apexcharts';

export const SkillCategoryChart = ({ categoryTitle, skillsData = [] }) => {
  const categories = skillsData.map((s) => s.name);
  const dataValues = skillsData.map((s) => s.proficiency);

  const chartOptions = {
    chart: {
      type: 'bar',
      height: 280,
      toolbar: { show: false },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 600,
        animateGradually: { enabled: true, delay: 100 },
        dynamicAnimation: { enabled: true, speed: 450 },
      },
      background: 'transparent',
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '55%',
        borderRadius: 8,
        borderRadiusApplication: 'end',
        distributed: true, // Unique color per bar
        dataLabels: {
          position: 'top',
        },
      },
    },
    colors: [
      '#06b6d4', // Cyan 500
      '#6366f1', // Indigo 500
      '#10b981', // Emerald 500
      '#f59e0b', // Amber 500
      '#ec4899', // Pink 500
      '#8b5cf6', // Purple 500
      '#3b82f6', // Blue 500
    ],
    dataLabels: {
      enabled: true,
      textAnchor: 'start',
      style: {
        colors: ['#ffffff'],
        fontSize: '11px',
        fontWeight: 'bold',
        fontFamily: 'inherit',
      },
      formatter: (val) => `${val}%`,
      offsetX: 10,
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 2,
        color: '#000',
        opacity: 0.5,
      },
    },
    grid: {
      borderColor: 'rgba(51, 65, 85, 0.4)',
      strokeDashArray: 4,
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: false } },
      padding: { top: -10, bottom: 0, left: 10, right: 30 },
    },
    xaxis: {
      categories: categories,
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
          fontSize: '12px',
          fontWeight: '700',
          fontFamily: 'inherit',
        },
      },
    },
    tooltip: {
      theme: 'dark',
      custom: (opts) => {
        const skillName = categories[opts.dataPointIndex] || '';
        const score = dataValues[opts.dataPointIndex] || 0;
        return `
          <div style="background-color:#020617; border:1px solid #38bdf8; padding:8px 14px; font-size:12px; color:#f8fafc; border-radius:12px; box-shadow: 0 10px 25px rgba(6,182,212,0.3);">
            <div style="font-weight:700; color:#38bdf8; font-size:13px; margin-bottom:2px;">${skillName}</div>
            <div style="color:#94a3b8;">Category: <span style="color:#e2e8f0; font-weight:600;">${categoryTitle}</span></div>
            <div style="color:#94a3b8; margin-top:2px;">Proficiency: <span style="color:#10b981; font-weight:700;">${score}% Mastery</span></div>
          </div>
        `;
      },
    },
    legend: { show: false },
  };

  const series = [
    {
      name: 'Proficiency Score',
      data: dataValues,
    },
  ];

  return (
    <div className="w-full bg-slate-950/90 border border-amber-400/40 rounded-3xl p-5 sm:p-6 shadow-[0_0_35px_rgba(245,158,11,0.15)] backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
          <h4 className="text-sm font-extrabold text-white tracking-wide">
            {categoryTitle} Mastery Breakdown
          </h4>
        </div>
        <span className="text-xs font-mono font-bold text-cyan-400 px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
          {skillsData.length} Skills Active
        </span>
      </div>

      <div className="w-full min-h-[280px]">
        <ReactApexChart
          options={chartOptions}
          series={series}
          type="bar"
          height={280}
        />
      </div>
    </div>
  );
};

export default SkillCategoryChart;
