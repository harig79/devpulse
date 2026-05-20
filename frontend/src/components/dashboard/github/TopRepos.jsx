import { Star, GitFork, ExternalLink, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import Card from '../../shared/card';

const LANGUAGE_COLORS = {
  JavaScript: '#f7df1e', TypeScript: '#3178c6', Python: '#3776ab',
  Java: '#b07219', 'C++': '#f34b7d', C: '#555555', 'C#': '#239120',
  Go: '#00add8', Rust: '#dea584', Ruby: '#701516', PHP: '#4f5d95',
  Swift: '#ffac45', Kotlin: '#a97bff', HTML: '#e34c26', CSS: '#563d7c',
  Shell: '#89e051', Vue: '#41b883', Dart: '#00b4ab', Scala: '#c22d40',
  Haskell: '#5e5086',
};

function Stat({ icon: Icon, value }) {
  return (
    <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
      <Icon size={13} className="shrink-0" />
      {value}
    </span>
  );
}

function RepoCard({ repo }) {
  const { name, description, url, stars, forks, language, updatedAt } = repo;
  const langColor = language ? (LANGUAGE_COLORS[language] ?? '#6b7280') : null;
  const updatedLabel = updatedAt ? formatDistanceToNow(new Date(updatedAt), { addSuffix: true }) : null;

  return (
    <div className="flex flex-col gap-3 p-5 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-750 hover:border-blue-100 dark:hover:border-blue-800 hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between gap-2">
        <a
          href={url} target="_blank" rel="noopener noreferrer"
          className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline leading-snug truncate"
        >
          {name}
        </a>
        <a
          href={url} target="_blank" rel="noopener noreferrer"
          className="shrink-0 text-gray-300 dark:text-gray-600 hover:text-blue-500 dark:hover:text-blue-400 transition-colors mt-0.5"
          aria-label={`Open ${name} on GitHub`}
        >
          <ExternalLink size={14} />
        </a>
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2 flex-1">
        {description || <span className="italic">No description</span>}
      </p>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-1 border-t border-gray-100 dark:border-gray-700">
        {langColor && (
          <span className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-300">
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: langColor }} />
            {language}
          </span>
        )}
        <Stat icon={Star}    value={stars} />
        <Stat icon={GitFork} value={forks} />
        {updatedLabel && <Stat icon={Clock} value={updatedLabel} />}
      </div>
    </div>
  );
}

export default function TopRepos({ repos }) {
  if (!repos?.length) return null;
  return (
    <Card title="Top Repositories">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {repos.map((repo) => (
          <RepoCard key={repo.name} repo={repo} />
        ))}
      </div>
    </Card>
  );
}
