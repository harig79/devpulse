import React, { useState } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { subWeeks, parseISO, format } from 'date-fns';
import { Flame, CalendarDays } from 'lucide-react';
import Card from '../../shared/card';

const COLOR_SCALE = [
  { min: 0, max: 0,        fill: '#ebedf0' },
  { min: 1, max: 2,        fill: '#ffd591' },
  { min: 3, max: 5,        fill: '#ffa940' },
  { min: 6, max: 8,        fill: '#fa8c16' },
  { min: 9, max: Infinity, fill: '#d46b08' },
];

const COLOR_SCALE_DARK = [
  { min: 0, max: 0,        fill: '#1a1200' },
  { min: 1, max: 2,        fill: '#6b3a00' },
  { min: 3, max: 5,        fill: '#a85200' },
  { min: 6, max: 8,        fill: '#d97706' },
  { min: 9, max: Infinity, fill: '#fbbf24' },
];

function getColor(count, isDark) {
  const scale = isDark ? COLOR_SCALE_DARK : COLOR_SCALE;
  if (!count || count <= 0) return scale[0].fill;
  return (scale.find(({ min, max }) => count >= min && count <= max) ?? scale[4]).fill;
}

const STATS = [
  { key: 'streak',          label: 'Current Streak', suffix: ' days', icon: Flame,        color: 'text-orange-500' },
  { key: 'totalActiveDays', label: 'Active Days',    suffix: '',       icon: CalendarDays, color: 'text-amber-500'  },
];

export default function ActivityHeatmap({ activity }) {
  const [tooltip, setTooltip] = useState(null);
  const isDark = document.documentElement.classList.contains('dark');

  if (!activity) return null;

  const { days = [], streak = 0, totalActiveDays = 0 } = activity;
  const endDate   = new Date();
  const startDate = subWeeks(endDate, 52);

  function handleMouseOver(e, value) {
    if (!value?.date) return;
    const dateLabel = format(parseISO(value.date), 'MMM d, yyyy');
    setTooltip({
      x: e.clientX,
      y: e.clientY,
      text: `${value.count ?? 0} submission${value.count !== 1 ? 's' : ''} on ${dateLabel}`,
    });
  }

  const statValues = { streak, totalActiveDays };

  return (
    <Card title="LeetCode Activity">
      <div className="overflow-x-auto pb-1">
        <div className="min-w-[600px]">
          <CalendarHeatmap
            startDate={startDate}
            endDate={endDate}
            values={days}
            classForValue={() => null}
            transformDayElement={(rect, value) =>
              React.cloneElement(rect, {
                style: { fill: getColor(value?.count, isDark) },
                rx: 2, ry: 2,
              })
            }
            onMouseOver={handleMouseOver}
            onMouseLeave={() => setTooltip(null)}
            showWeekdayLabels={false}
            gutterSize={3}
          />
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-1.5 mt-1 justify-end">
        <span className="text-xs text-gray-400 dark:text-gray-500">Less</span>
        {(isDark ? COLOR_SCALE_DARK : COLOR_SCALE).map(({ fill, min }) => (
          <span key={min} className="w-3 h-3 rounded-sm inline-block" style={{ backgroundColor: fill }} />
        ))}
        <span className="text-xs text-gray-400 dark:text-gray-500">More</span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        {STATS.map(({ key, label, suffix, icon: Icon, color }) => (
          <div key={key} className="flex flex-col items-center gap-1 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
            <Icon size={15} className={color} />
            <span className="text-base font-bold text-gray-900 dark:text-white">{statValues[key]}{suffix}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400 text-center">{label}</span>
          </div>
        ))}
      </div>

      {tooltip && (
        <div
          className="fixed z-50 px-2.5 py-1.5 text-xs text-white bg-gray-800 dark:bg-gray-700 rounded-lg shadow-lg pointer-events-none whitespace-nowrap"
          style={{ left: tooltip.x, top: tooltip.y - 40, transform: 'translateX(-50%)' }}
        >
          {tooltip.text}
        </div>
      )}
    </Card>
  );
}
