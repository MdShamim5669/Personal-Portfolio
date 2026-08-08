import React, { useMemo } from 'react';
import ReactApexChart from 'react-apexcharts';

export const SkillCategoryChart = ({ categoryTitle, skillsData = [] }) => {
  const chartData = useMemo(() => {
    return skillsData.map((s) => ({
      x: s.name,
      y: s.proficiency || 85,
    }));
  }, [skillsData]);

  const chartHeight = Math.max(260, skillsData.length * 52);

  const chartOptions = useMemo(() => {
    return {
      chart: {
        id: `chart-${categoryTitle.replace(/\s+/g, '-').toLowerCase()}`,
        type: 'bar',
        height: chartHeight,
        toolbar: { show: false },
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 350,
        },
        background: 'transparent',
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: '60%',
          borderRadius: 8,
          borderRadiusApplication: 'end',
          distributed: true,
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
        '#14b8a6', // Teal 500
      ],
      dataLabels: {
        enabled: true,
        textAnchor: 'start',
        style: {
          colors: ['#ffffff'],
          fontSize: '11px',
          fontWeight: 'bold',
        },
        formatter: (val) => `${val}%`,
        offsetX: 10,
      },
      grid: {
        borderColor: 'rgba(51, 65, 85, 0.4)',
        strokeDashArray: 4,
        xaxis: { lines: { show: true } },
        yaxis: { lines: { show: false } },
        padding: { top: -10, bottom: 0, left: 10, right: 35 },
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
            fontSize: '12px',
            fontWeight: '700',
            fontFamily: 'inherit',
          },
        },
      },
      tooltip: {
        theme: 'dark',
        y: {
          formatter: (val) => `${val}% Mastery`,
        },
      },
      legend: { show: false },
    };
  }, [categoryTitle, chartHeight]);

  const series = useMemo(() => [
    {
      name: 'Proficiency Score',
      data: chartData,
    },
  ], [chartData]);

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

      <div className="w-full" style={{ minHeight: chartHeight }}>
        <ReactApexChart
          key={categoryTitle}
          options={chartOptions}
          series={series}
          type="bar"
          height={chartHeight}
        />
      </div>
    </div>
  );
};

export default SkillCategoryChart;
