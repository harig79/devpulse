import { GitBranch, Star, Code2, Flame } from 'lucide-react';

const STATS = [
  {
    key: 'totalRepos',
    label: 'Repositories',
    icon: GitBranch,
    gradient: 'from-blue-500 to-blue-600',
    iconBg: 'bg-blue-400/20',
  },
  {
    key: 'totalStars',
    label: 'Stars Earned',
    icon: Star,
    gradient: 'from-yellow-400 to-amber-500',
    iconBg: 'bg-yellow-300/20',
  },
  {
    key: 'leetcodeSolved',
    label: 'LeetCode Solved',
    icon: Code2,
    gradient: 'from-green-500 to-emerald-600',
    iconBg: 'bg-green-400/20',
  },
  {
    key: 'currentStreak',
    label: 'Day Streak',
    icon: Flame,
    gradient: 'from-orange-400 to-orange-600',
    iconBg: 'bg-orange-300/20',
  },
];

function StatCard({ label, value, icon: Icon, gradient, iconBg }) {
  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl bg-gradient-to-br ${gradient}
        p-6 text-white shadow-md
        hover:scale-105 hover:shadow-lg
        transition-transform duration-200 ease-out cursor-default
      `}
    >
      {/* Background icon watermark */}
      <div className="absolute -right-3 -bottom-3 opacity-10">
        <Icon size={88} strokeWidth={1.5} />
      </div>

      {/* Icon badge */}
      <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${iconBg} mb-4`}>
        <Icon size={20} strokeWidth={2} />
      </div>

      {/* Value */}
      <p className="text-4xl font-extrabold leading-none tracking-tight">
        {value ?? '—'}
      </p>

      {/* Label */}
      <p className="mt-2 text-sm font-medium opacity-85">{label}</p>
    </div>
  );
}

export default function StatsOverview({ data }) {
  if (!data) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {STATS.map(({ key, label, icon, gradient, iconBg }) => (
        <StatCard
          key={key}
          label={label}
          value={data[key]}
          icon={icon}
          gradient={gradient}
          iconBg={iconBg}
        />
      ))}
    </div>
  );
}
