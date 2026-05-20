import { BarChart, Bar, XAxis, YAxis, Cell, LabelList, ResponsiveContainer, Tooltip } from 'recharts';
import Card from '../../shared/card';

const DIFFICULTIES = [
  { key: 'easy',   label: 'Easy',   fill: '#22c55e', bg: '#dcfce7', text: '#15803d', darkBg: 'rgba(34,197,94,0.15)',  darkText: '#4ade80' },
  { key: 'medium', label: 'Medium', fill: '#eab308', bg: '#fef9c3', text: '#a16207', darkBg: 'rgba(234,179,8,0.15)',  darkText: '#facc15' },
  { key: 'hard',   label: 'Hard',   fill: '#ef4444', bg: '#fee2e2', text: '#b91c1c', darkBg: 'rgba(239,68,68,0.15)', darkText: '#f87171' },
];

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const { difficulty, count, fill } = payload[0].payload;
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-lg rounded-xl px-3 py-2 text-sm">
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: fill }} />
        <span className="font-semibold text-gray-800 dark:text-gray-100">{difficulty}</span>
      </div>
      <p className="text-gray-500 dark:text-gray-400 mt-0.5 pl-[18px]">{count} solved</p>
    </div>
  );
}

export default function DifficultyChart({ solved, acceptanceRate }) {
  if (!solved) return null;

  const isDark = document.documentElement.classList.contains('dark');

  const chartData = DIFFICULTIES.map(({ key, label, fill, bg, text, darkBg, darkText }) => ({
    difficulty: label,
    count: solved[key] ?? 0,
    fill,
    bg:   isDark ? darkBg   : bg,
    text: isDark ? darkText : text,
  }));

  const maxCount = Math.max(...chartData.map((d) => d.count), 1);
  const tickColor = isDark ? '#9ca3af' : '#6b7280';
  const labelColor = isDark ? '#e5e7eb' : '#374151';

  return (
    <Card title="Problems Solved by Difficulty">
      <div className="flex items-baseline gap-2 mb-4">
        <span className="text-4xl font-extrabold text-gray-900 dark:text-white">{solved.total ?? 0}</span>
        <span className="text-sm text-gray-400 dark:text-gray-500 font-medium">problems solved</span>
      </div>

      <ResponsiveContainer width="100%" height={120}>
        <BarChart data={chartData} layout="vertical" margin={{ top: 0, right: 48, bottom: 0, left: 0 }} barCategoryGap="30%">
          <XAxis type="number" domain={[0, maxCount]} hide />
          <YAxis
            type="category" dataKey="difficulty"
            axisLine={false} tickLine={false}
            tick={{ fontSize: 12, fill: tickColor, fontWeight: 600 }}
            width={56}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
          <Bar dataKey="count" radius={[0, 4, 4, 0]}>
            {chartData.map(({ difficulty, fill }) => <Cell key={difficulty} fill={fill} />)}
            <LabelList dataKey="count" position="right" style={{ fontSize: 13, fontWeight: 700, fill: labelColor }} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="flex gap-3 mt-5">
        {chartData.map(({ difficulty, count, bg, text }) => (
          <div key={difficulty} className="flex-1 rounded-xl px-3 py-2.5 text-center" style={{ backgroundColor: bg }}>
            <p className="text-lg font-bold" style={{ color: text }}>{count}</p>
            <p className="text-xs font-medium mt-0.5" style={{ color: text, opacity: 0.8 }}>{difficulty}</p>
          </div>
        ))}
      </div>

      {acceptanceRate != null && (
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400">Acceptance Rate</span>
          <span className="text-sm font-bold text-gray-800 dark:text-gray-100">{acceptanceRate}%</span>
        </div>
      )}
    </Card>
  );
}
