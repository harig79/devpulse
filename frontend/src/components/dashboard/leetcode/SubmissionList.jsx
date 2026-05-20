import { Code2, ExternalLink, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import Card from '../../shared/card';

export default function SubmissionList({ submissions }) {
  if (!submissions?.length) return null;

  const recent = submissions.slice(0, 10);

  return (
    <Card title="Recent Submissions">
      <ul className="flex flex-col divide-y divide-gray-50 dark:divide-gray-800">
        {recent.map(({ id, title, url, submittedAt }) => {
          const timeAgo = submittedAt
            ? formatDistanceToNow(new Date(submittedAt), { addSuffix: true })
            : null;

          return (
            <li key={id}>
              <a
                href={url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 py-3 px-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
              >
                <span className="shrink-0 w-8 h-8 rounded-lg bg-green-50 dark:bg-green-900/30 flex items-center justify-center group-hover:bg-green-100 dark:group-hover:bg-green-900/50 transition-colors">
                  <Code2 size={15} className="text-green-600 dark:text-green-400" />
                </span>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors">
                    {title}
                  </p>
                  {timeAgo && (
                    <p className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                      <Clock size={11} className="shrink-0" />
                      Solved {timeAgo}
                    </p>
                  )}
                </div>

                <ExternalLink size={13} className="shrink-0 text-gray-300 dark:text-gray-600 group-hover:text-green-500 dark:group-hover:text-green-400 transition-colors" />
              </a>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
