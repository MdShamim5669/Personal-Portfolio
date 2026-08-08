import React, { useState, useMemo, useCallback } from 'react';
import ReactApexChart from 'react-apexcharts';
import { GitCommit } from 'lucide-react';

const DAY = 86400000;

function generateCommitSeries(skills = []) {
  const series = [];
  const now = new Date().getTime();
  const start = now - 364 * DAY;

  let seed = 20260407;
  function rand() {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  }

  const skillFactor = skills.length > 0 ? skills.length : 10;

  for (let t = start; t <= now; t += DAY) {
    const dow = new Date(t).getUTCDay();
    const isWeekend = dow === 0 || dow === 6;
    let count = 0;

    if (rand() < (isWeekend ? 0.35 : 0.65)) {
      const base = Math.floor(rand() * 10) + 1;
      count = Math.round(base * (0.8 + rand() * 0.5));
    }
    series.push({ x: t, y: count });
  }

  return series;
}

export const SkillActivityChart = ({ skills = [], initialSeries }) => {
  const commitSeries = useMemo(() => {
    if (initialSeries && Array.isArray(initialSeries) && initialSeries.length > 0) {
      return initialSeries;
    }
    return generateCommitSeries(skills);
  }, [skills, initialSeries]);

  const initialTotal = useMemo(() => {
    return commitSeries.reduce((acc, curr) => acc + (curr.y || 0), 0);
  }, [commitSeries]);

  const [totalCommits, setTotalCommits] = useState(initialTotal);

  const now = useMemo(() => new Date().getTime(), []);
  const defaultMinX = useMemo(() => now - 180 * DAY, [now]);

  const handleUpdate = useCallback((chart) => {
    if (chart && chart.w && chart.w.globals) {
      const total = chart.getSeriesTotalXRange(
        chart.w.globals.minX,
        chart.w.globals.maxX
      );
      if (typeof total === 'number') {
        setTotalCommits((prev) => (prev !== total ? total : prev));
      }
    }
  }, []);

  const mainChartOptions = useMemo(() => {
    return {
      chart: {
        id: 'chartyear',
        type: 'area',
        height: 180,
        background: 'transparent',
        toolbar: {
          show: false,
          autoSelected: 'pan',
        },
        animations: {
          enabled: true,
          speed: 300,
        },
        events: {
          mounted: handleUpdate,
          updated: handleUpdate,
        },
      },
      colors: ['#06b6d4'],
      stroke: {
        width: 2,
        curve: 'monotoneCubic',
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.6,
          opacityTo: 0.05,
          stops: [0, 90, 100],
        },
      },
      markers: {
        size: 0,
        hover: {
          size: 5,
        },
      },
      grid: {
        borderColor: 'rgba(51, 65, 85, 0.4)',
        strokeDashArray: 4,
        yaxis: {
          lines: { show: true },
        },
        xaxis: {
          lines: { show: false },
        },
      },
      yaxis: {
        show: true,
        labels: {
          style: { colors: '#94a3b8', fontSize: '11px' },
        },
      },
      xaxis: {
        type: 'datetime',
        labels: {
          format: 'MMM yyyy',
          style: { colors: '#94a3b8', fontSize: '11px' },
        },
        axisBorder: { color: 'rgba(51, 65, 85, 0.6)' },
        axisTicks: { color: 'rgba(51, 65, 85, 0.6)' },
      },
      tooltip: {
        theme: 'dark',
        x: { format: 'dd MMM yyyy' },
      },
    };
  }, [handleUpdate]);

  const brushChartOptions = useMemo(() => {
    return {
      chart: {
        id: 'chartyears',
        height: 130,
        type: 'area',
        background: 'transparent',
        toolbar: {
          show: false,
          autoSelected: 'selection',
        },
        brush: {
          enabled: true,
          target: 'chartyear',
        },
        selection: {
          enabled: true,
          xaxis: {
            min: defaultMinX,
            max: now,
          },
        },
      },
      colors: ['#10b981'],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 1.5,
        curve: 'monotoneCubic',
      },
      fill: {
        type: 'gradient',
        gradient: {
          opacityFrom: 0.4,
          opacityTo: 0.05,
        },
      },
      grid: {
        borderColor: 'rgba(51, 65, 85, 0.3)',
        yaxis: { lines: { show: false } },
      },
      yaxis: {
        show: false,
      },
      xaxis: {
        type: 'datetime',
        labels: {
          format: 'MMM yyyy',
          style: { colors: '#64748b', fontSize: '10px' },
        },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
    };
  }, [defaultMinX, now]);

  const seriesData = useMemo(() => [
    {
      name: 'Commits & Activity',
      data: commitSeries,
    },
  ], [commitSeries]);

  return (
    <div className="w-full bg-slate-950/90 border border-cyan-500/30 rounded-3xl p-5 sm:p-7 shadow-[0_0_40px_rgba(6,182,212,0.15)] backdrop-blur-xl">
      {/* Top Main Activity Area Chart */}
      <div id="chart-months" className="w-full">
        <ReactApexChart
          options={mainChartOptions}
          series={seriesData}
          type="area"
          height={180}
        />
      </div>

      {/* User Meta Details Bar */}
      <div className="flex items-center justify-between my-4 p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800/90 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white font-bold text-base shadow-lg shadow-cyan-500/20">
            S
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-white tracking-tight">Md. Samim</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 font-semibold uppercase">
                Software Engineer
              </span>
            </div>
            <p className="text-xs text-slate-400">Dynamic Repository & Skill Commit Activity</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800">
          <GitCommit className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span className="cmeta text-xs sm:text-sm font-semibold text-slate-300">
            <span className="commits text-cyan-400 font-bold text-base">{totalCommits}</span> commits in selected range
          </span>
        </div>
      </div>

      {/* Bottom Timeline Range Selector (Brush Chart) */}
      <div id="chart-years" className="w-full">
        <ReactApexChart
          options={brushChartOptions}
          series={seriesData}
          type="area"
          height={130}
        />
      </div>
    </div>
  );
};

export default React.memo(SkillActivityChart);
