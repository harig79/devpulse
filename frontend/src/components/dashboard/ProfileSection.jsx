import { MapPin, Calendar, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';

function StatBox({ label, value }) {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-xl px-4 py-3 flex-1 min-w-0">
      <span className="text-xl font-bold text-gray-900 dark:text-white">{value ?? '—'}</span>
      <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{label}</span>
    </div>
  );
}

export default function ProfileSection({ profile }) {
  if (!profile) return null;

  const { username, name, bio, avatarUrl, profileUrl, location, createdAt, followers, following, publicRepos } = profile;

  const joinedDate = createdAt ? format(new Date(createdAt), 'MMMM yyyy') : null;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        {/* Avatar */}
        <a href={profileUrl} target="_blank" rel="noopener noreferrer" className="shrink-0">
          <img
            src={avatarUrl}
            alt={`${username}'s avatar`}
            width={128}
            height={128}
            className="w-32 h-32 rounded-full object-cover ring-4 ring-blue-50 dark:ring-blue-900/40 hover:ring-blue-200 dark:hover:ring-blue-700 transition-all"
          />
        </a>

        {/* Info */}
        <div className="flex flex-col items-center sm:items-start gap-2 min-w-0 text-center sm:text-left">
          <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white leading-tight">
              {name || username}
            </h1>
            {profileUrl && (
              <a
                href={profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                aria-label="Open GitHub profile"
              >
                <ExternalLink size={16} />
              </a>
            )}
          </div>

          <p className="text-sm text-gray-400 dark:text-gray-500 font-medium">@{username}</p>

          {bio && (
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed max-w-md">{bio}</p>
          )}

          <div className="flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-1 mt-1">
            {location && (
              <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                <MapPin size={13} className="shrink-0" />
                {location}
              </span>
            )}
            {joinedDate && (
              <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                <Calendar size={13} className="shrink-0" />
                Joined {joinedDate}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <StatBox label="Repos"     value={publicRepos} />
        <StatBox label="Followers" value={followers} />
        <StatBox label="Following" value={following} />
      </div>
    </div>
  );
}
