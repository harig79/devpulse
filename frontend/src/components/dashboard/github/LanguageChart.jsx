import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import Card from '../../shared/card';

const LANGUAGE_COLORS = {
  JavaScript: '#f7df1e', TypeScript: '#3178c6', Python: '#3776ab',
  Java: '#b07219', 'C++': '#f34b7d', C: '#555555', 'C#': '#239120',
  Go: '#00add8', Rust: '#dea584', Ruby: '#701516', PHP: '#4f5d95',
  Swift: '#ffac45', Kotlin: '#a97bff', HTML: '#e34c26', CSS: '#563d7c',
  Shell: '#89e051', Vue: '#41b883', Dart: '#00b4ab', Scala: '#c22d40',
  Haskell: '#5e5086',
};

const FALLBACK_COLORS = ['#6366f1', '#ec4899', '#14b8a6', '#f97316', '#84cc16'];

function getColor(name, index) {
  return LANGUAGE_COLORS[name] ?? FALLBACK_COLORS[index % FALLBACK_COLORS.length];
}

const RADIAN = Math.PI / 180;

function CustomLabel({ cx, cy, midAngle, innerRadius, outerRadius, percent }) {
  if (percent < 0.05) return null;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="#fff" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={700}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
}

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const { name, value, payload: item } = payload[0];
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-lg rounded-xl px-3 py-2 text-sm">
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.fill }} />
        <span className="font-semibold text-gray-800 dark:text-gray-100">{name}</span>
      </div>
      <p className="text-gray-500 dark:text-gray-400 mt-0.5 pl-[18px]">{value} repo{value !== 1 ? 's' : ''}</p>
    </div>
  );
}

export default function LanguageChart({ languages }) {
  if (!languages || Object.keys(languages).length === 0) return null;

  const chartData = Object.entries(languages)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([name, value], index) => ({ name, value, fill: getColor(name, index) }));

  const total = chartData.reduce((sum, { value }) => sum + value, 0);

  return (
    <Card title="Top Languages">
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={chartData} cx="50%" cy="50%"
            innerRadius={60} outerRadius={95}
            paddingAngle={3} dataKey="value"
            labelLine={false} label={CustomLabel}
          >
            {chartData.map(({ name, fill }) => (
              <Cell key={name} fill={fill} stroke="none" />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      <ul className="mt-2 flex flex-col gap-2">
        {chartData.map(({ name, value, fill }) => {
          const pct = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
          return (
            <li key={name} className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-sm shrink-0" style={{ backgroundColor: fill }} />
              <span className="flex-1 text-sm text-gray-700 dark:text-gray-200 font-medium truncate">{name}</span>
              <span className="text-xs text-gray-400 dark:text-gray-500 tabular-nums">{value} repo{value !== 1 ? 's' : ''}</span>
              <span className="text-xs font-semibold tabular-nums w-10 text-right" style={{ color: fill }}>{pct}%</span>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
