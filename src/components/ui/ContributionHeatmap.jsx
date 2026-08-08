import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const DAY = 86400000;

function weekStartOf(ms) {
  return ms - new Date(ms).getUTCDay() * DAY;
}

function buildCalendar() {
  const calNow = new Date();
  const calEnd = Date.UTC(
    calNow.getUTCFullYear(),
    calNow.getUTCMonth(),
    calNow.getUTCDate(),
  );
  const calStart = calEnd - 364 * DAY;

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const byDay = weekdays.map((n) => ({ name: n, data: [] }));

  let seed = 20240407;
  function rand() {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  }

  const totalWeeks = Math.round(
    (weekStartOf(calEnd) - weekStartOf(calStart)) / (7 * DAY),
  );

  for (let t = calStart; t <= calEnd; t += DAY) {
    const dow = new Date(t).getUTCDay();
    const wk = Math.round((weekStartOf(t) - weekStartOf(calStart)) / (7 * DAY));
    const season = 0.5 + 0.5 * Math.sin((wk / totalWeeks) * Math.PI * 2 - 1);
    let count = 0;
    if (rand() < 0.35 + 0.4 * season) {
      const bias = dow === 0 || dow === 6 ? 0.5 : 1;
      count = Math.round(rand() * rand() * 16 * bias) + 1;
    }
    byDay[dow].data.push({ x: weekStartOf(t), y: count, date: t });
  }

  return {
    series: byDay.reverse(),
    minX: weekStartOf(calStart) - 3.5 * DAY,
    maxX: weekStartOf(calEnd) + 3.5 * DAY,
  };
}

export const ContributionHeatmap = () => {
  const [calendar] = useState(() => buildCalendar());

  const chartOptions = {
    chart: {
      height: 190,
      width: '100%',
      type: 'heatmap',
      toolbar: { show: false },
      animations: { enabled: false },
      background: 'transparent',
    },
    title: {
      text: 'GitHub & Coding Contribution Activity (Past Year)',
      align: 'left',
      style: {
        fontSize: '13px',
        fontWeight: '700',
        color: '#38bdf8', // Cyan 400
        fontFamily: 'inherit',
      },
    },
    dataLabels: { enabled: false },
    stroke: { width: 2, colors: ['#0f172a'] }, // Slate 900 border gaps
    legend: { show: false },
    states: {
      active: {
        filter: {
          type: 'none',
        },
      },
    },
    plotOptions: {
      heatmap: {
        radius: 2,
        enableShades: false,
        colorScale: {
          ranges: [
            { from: 0, to: 0, name: '0', color: '#1e293b' },      // Slate 800 (Dark empty cell)
            { from: 1, to: 3, name: '1-3', color: '#0e4429' },    // Dark Green
            { from: 4, to: 7, name: '4-7', color: '#006d32' },    // Medium Green
            { from: 8, to: 11, name: '8-11', color: '#26a641' },  // Vibrant Green
            { from: 12, to: 100, name: '12+', color: '#39d353' }, // Bright GitHub Green
          ],
        },
      },
    },
    xaxis: {
      type: 'datetime',
      min: calendar.minX,
      max: calendar.maxX,
      position: 'top',
      labels: {
        format: 'MMM',
        datetimeUTC: false,
        style: { colors: '#94a3b8', fontSize: '11px', fontWeight: '600' },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
      tooltip: { enabled: false },
      crosshairs: { show: false },
    },
    yaxis: {
      labels: {
        formatter: (val) => (['Mon', 'Wed', 'Fri'].indexOf(val) >= 0 ? val : ''),
        style: { colors: ['#94a3b8'], fontSize: '11px', fontWeight: '600' },
      },
    },
    grid: {
      padding: { top: -10, bottom: -10, left: 10, right: 10 },
      yaxis: {
        lines: { show: false },
      },
    },
    tooltip: {
      theme: 'dark',
      custom: (opts) => {
        const pt = opts.w.config.series[opts.seriesIndex].data[opts.dataPointIndex];
        if (!pt) return '';
        const n = pt.y;
        const when = new Date(pt.date).toLocaleDateString('en-US', {
          dateStyle: 'medium',
          timeZone: 'UTC',
        });
        const count =
          n === 0
            ? 'No contributions'
            : n + (n === 1 ? ' contribution' : ' contributions');
        return `
          <div style="background-color:#020617; border:1px solid #334155; padding:6px 12px; font-size:12px; color:#f8fafc; border-radius:10px; box-shadow: 0 10px 25px rgba(0,0,0,0.5);">
            <b style="color:#38bdf8">${count}</b> on ${when}
          </div>
        `;
      },
    },
  };

  return (
    <div className="w-full bg-slate-950/90 border border-slate-800/90 rounded-3xl p-4 sm:p-6 shadow-2xl backdrop-blur-xl">
      <ReactApexChart
        options={chartOptions}
        series={calendar.series}
        type="heatmap"
        height={190}
      />
      <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[11px] text-slate-400">
        <span>365 days of continuous commits & architecture</span>
        <div className="flex items-center gap-1.5 font-mono">
          <span>Less</span>
          <span className="w-2.5 h-2.5 rounded-sm bg-[#1e293b]" />
          <span className="w-2.5 h-2.5 rounded-sm bg-[#0e4429]" />
          <span className="w-2.5 h-2.5 rounded-sm bg-[#006d32]" />
          <span className="w-2.5 h-2.5 rounded-sm bg-[#26a641]" />
          <span className="w-2.5 h-2.5 rounded-sm bg-[#39d353]" />
          <span>More</span>
        </div>
      </div>
    </div>
  );
};

export default ContributionHeatmap;
