import { useParams, Link } from 'react-router-dom';
import { GitBranch, Code2 } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ErrorMessage from '../components/shared/ErrorMessage';
import Skeleton from '../components/shared/Skeleton';
import ProfileSection from '../components/dashboard/ProfileSection';
import StatsOverview from '../components/dashboard/StatsOverview';
import ContributionHeatmap from '../components/dashboard/github/ContributionHeatmap';
import LanguageChart from '../components/dashboard/github/LanguageChart';
import TopRepos from '../components/dashboard/github/TopRepos';
import DifficultyChart from '../components/dashboard/leetcode/DifficultyChart';
import SubmissionList from '../components/dashboard/leetcode/SubmissionList';
import ActivityHeatmap from '../components/dashboard/leetcode/ActivityHeatmap';
import BadgesGrid from '../components/dashboard/leetcode/BadgesGrid';
import useDashboard from '../hooks/useDashboard';

const ERROR_TITLES = {
  not_found: 'User Not Found',
  network:   'Network Error',
  server:    'Server Error',
  unknown:   'Something Went Wrong',
};

function SectionDivider({ icon: Icon, label, color }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${color}`}>
        <Icon size={15} />
        {label}
      </div>
      <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
    </div>
  );
}

/* ── Skeleton blocks ──────────────────────────────────────── */

function CardSkeleton({ height = '160px' }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
      <Skeleton height="18px" width="40%" className="mb-5 rounded-md" />
      <Skeleton height={height} className="rounded-xl" />
    </div>
  );
}

function ProfileSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        {/* Avatar */}
        <Skeleton width="128px" height="128px" className="rounded-full shrink-0" />
        {/* Info lines */}
        <div className="flex flex-col gap-3 w-full">
          <Skeleton height="28px" width="50%" className="rounded-md" />
          <Skeleton height="14px" width="30%" className="rounded-md" />
          <Skeleton height="14px" width="80%" className="rounded-md" />
          <Skeleton height="14px" width="60%" className="rounded-md" />
          <div className="flex gap-2 mt-1">
            <Skeleton height="14px" width="100px" className="rounded-md" />
            <Skeleton height="14px" width="120px" className="rounded-md" />
          </div>
        </div>
      </div>
      {/* Stat boxes */}
      <div className="flex gap-3 mt-6">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} height="64px" className="flex-1 rounded-xl" />
        ))}
      </div>
    </div>
  );
}

function StatsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} height="120px" className="rounded-2xl" />
      ))}
    </div>
  );
}

function SubmissionListSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
      <Skeleton height="18px" width="45%" className="mb-5 rounded-md" />
      <div className="flex flex-col gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton width="32px" height="32px" className="rounded-lg shrink-0" />
            <div className="flex flex-col gap-1.5 flex-1">
              <Skeleton height="13px" width="70%" className="rounded-md" />
              <Skeleton height="11px" width="35%" className="rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TopReposSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
      <Skeleton height="18px" width="45%" className="mb-5 rounded-md" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} height="120px" className="rounded-xl" />
        ))}
      </div>
    </div>
  );
}

function DashboardSkeleton({ github, leetcode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
      <Header />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Page header */}
        <div className="mb-8">
          <Skeleton height="13px" width="120px" className="rounded-md mb-3" />
          <Skeleton height="36px" width="55%" className="rounded-md mb-2" />
          <Skeleton height="12px" width="180px" className="rounded-md" />
        </div>

        {/* Profile */}
        <div className="mb-6">
          <ProfileSkeleton />
        </div>

        {/* Stats */}
        <div className="mb-10">
          <StatsSkeleton />
        </div>

        {/* 2-column */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10">
          {/* GitHub column */}
          <div className="flex flex-col gap-6">
            <Skeleton height="32px" width="180px" className="rounded-full" />
            <CardSkeleton height="180px" />
            <CardSkeleton height="260px" />
            <TopReposSkeleton />
          </div>
          {/* LeetCode column */}
          <div className="flex flex-col gap-6">
            <Skeleton height="32px" width="180px" className="rounded-full" />
            <CardSkeleton height="200px" />
            <SubmissionListSkeleton />
            <CardSkeleton height="180px" />
            <CardSkeleton height="120px" />
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
}

/* ── Main page ────────────────────────────────────────────── */

export default function Dashboard() {
  const { github, leetcode } = useParams();
  const { data, loading, error, refetch } = useDashboard(github, leetcode);

  if (loading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return (
      <ErrorMessage
        title={ERROR_TITLES[error.type] ?? 'Error'}
        message={error.message}
        onRetry={refetch}
      />
    );
  }

  if (!data) return null;

  const { github: gh, leetcode: lc } = data;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* ── Page header ──────────────────────────────────────── */}
        <div className="mb-8">
          <p className="text-sm text-gray-400 dark:text-gray-500 mb-1">
            <Link to="/" className="hover:text-blue-500 transition-colors">Home</Link>
            {' / '}Dashboard
          </p>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Dashboard for{' '}
            <span className="text-blue-600">@{github}</span>
            {' + '}
            <span className="text-indigo-600">@{leetcode}</span>
          </h1>
          {data.fetchedAt && (
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              Fetched at {new Date(data.fetchedAt).toLocaleString()}
            </p>
          )}
        </div>

        {/* ── Full-width: Profile ───────────────────────────────── */}
        <div className="mb-6">
          <ProfileSection profile={gh.profile} />
        </div>

        {/* ── Full-width: Stats overview ────────────────────────── */}
        <div className="mb-10">
          <StatsOverview data={{
            totalRepos:     gh.repos.totalRepos,
            totalStars:     gh.repos.totalStars,
            leetcodeSolved: lc.profile.solved.total,
            currentStreak:  gh.contributions.currentStreak,
          }} />
        </div>

        {/* ── 2-column section ─────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10">

          {/* ── Left column: GitHub ──────────────────────── */}
          <div className="flex flex-col gap-6">
            <SectionDivider
              icon={GitBranch}
              label="GitHub Activity"
              color="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
            />
            <ContributionHeatmap contributions={gh.contributions} />
            <LanguageChart languages={gh.repos.languages} />
            <TopRepos repos={gh.repos.topRepos} />
          </div>

          {/* ── Right column: LeetCode ───────────────────── */}
          <div className="flex flex-col gap-6">
            <SectionDivider
              icon={Code2}
              label="LeetCode Progress"
              color="bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300"
            />
            <DifficultyChart
              solved={lc.profile.solved}
              acceptanceRate={lc.profile.acceptanceRate}
            />
            <SubmissionList submissions={lc.recentSubmissions} />
            <ActivityHeatmap activity={lc.activity} />
            <BadgesGrid badges={lc.profile.badges} />
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
