import { Award } from 'lucide-react';
import Card from '../../shared/card';

function BadgeCard({ name, icon }) {
  return (
    <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:scale-105 hover:shadow-md hover:border-yellow-200 dark:hover:border-yellow-700 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-all duration-200 cursor-default">
      <img
        src={icon}
        alt={name}
        className="w-14 h-14 object-contain drop-shadow-sm"
        onError={(e) => { e.currentTarget.style.display = 'none'; }}
      />
      <p className="text-xs font-medium text-gray-600 dark:text-gray-300 text-center leading-snug line-clamp-2">
        {name}
      </p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-10 gap-3 text-gray-400 dark:text-gray-500">
      <Award size={36} strokeWidth={1.5} />
      <p className="text-sm font-medium">No badges yet</p>
      <p className="text-xs text-center max-w-xs">Keep solving problems to earn your first badge!</p>
    </div>
  );
}

export default function BadgesGrid({ badges }) {
  const hasBadges = badges?.length > 0;
  return (
    <Card title="Earned Badges">
      {hasBadges ? (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
          {badges.map(({ name, icon }) => (
            <BadgeCard key={name} name={name} icon={icon} />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </Card>
  );
}
