import { GitBranch, Code2, Zap, BarChart2, Trophy, Users, Server, Globe, Database, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const TECH_LAYERS = [
  {
    layer: 'Frontend',
    icon: Globe,
    color: 'text-blue-600 dark:text-blue-400',
    headerBg: 'bg-blue-50 dark:bg-blue-900/20',
    items: [
      { label: 'React 19',                  desc: 'UI library with hooks' },
      { label: 'Vite',                      desc: 'Lightning-fast build tool' },
      { label: 'Tailwind CSS',              desc: 'Utility-first styling' },
      { label: 'React Router v7',           desc: 'Client-side routing' },
      { label: 'Recharts',                  desc: 'Bar & pie charts' },
      { label: 'react-calendar-heatmap',    desc: 'GitHub/LeetCode heatmaps' },
      { label: 'date-fns',                  desc: 'Date formatting' },
      { label: 'Axios',                     desc: 'HTTP client' },
      { label: 'lucide-react',              desc: 'Icon library' },
    ],
  },
  {
    layer: 'Backend',
    icon: Server,
    color: 'text-green-600 dark:text-green-400',
    headerBg: 'bg-green-50 dark:bg-green-900/20',
    items: [
      { label: 'Node.js',       desc: 'JavaScript runtime' },
      { label: 'Express',       desc: 'REST API framework' },
      { label: 'Axios',         desc: 'Server-side HTTP calls' },
      { label: 'dotenv',        desc: 'Environment config' },
      { label: 'CORS',          desc: 'Cross-origin support' },
      { label: 'In-memory cache', desc: 'Response caching layer' },
    ],
  },
  {
    layer: 'APIs & Data',
    icon: Database,
    color: 'text-purple-600 dark:text-purple-400',
    headerBg: 'bg-purple-50 dark:bg-purple-900/20',
    items: [
      { label: 'GitHub REST API',      desc: 'Profile, repos, languages' },
      { label: 'GitHub GraphQL API',   desc: 'Contribution calendar' },
      { label: 'LeetCode GraphQL API', desc: 'Stats, submissions, badges' },
    ],
  },
];

const FEATURES = [
  { icon: GitBranch, title: 'GitHub Analytics',     desc: 'Contribution heatmap, top repos, language breakdown, and streak tracking — live from GitHub.' },
  { icon: Trophy,    title: 'LeetCode Progress',    desc: 'Problems solved by difficulty, acceptance rate, recent submissions, and activity calendar.' },
  { icon: Users,     title: 'Developer Profiles',   desc: 'Unified view of your GitHub profile and LeetCode stats in a single, shareable dashboard.' },
  { icon: BarChart2, title: 'Beautiful Charts',     desc: 'Interactive pie charts, bar charts, and heatmaps built with Recharts and react-calendar-heatmap.' },
];

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950 transition-colors duration-200">
      <Header />

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Hero */}
        <div className="text-center mb-16">
          <img
            src="/DevPulseLogo.png"
            alt="DevPulse Logo"
            className="w-24 h-24 object-contain mx-auto mb-6"
          />
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
            About DevPulse
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            DevPulse is an open developer analytics dashboard that combines your
            GitHub activity and LeetCode progress into one clean, beautiful view.
          </p>
        </div>

        {/* Features */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">What it does</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="flex gap-4 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900"
              >
                <div className="shrink-0 w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                  <Icon size={18} className="text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">{title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tech stack by layer */}
        <section className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <Layers size={20} className="text-gray-500 dark:text-gray-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Tech Stack</h2>
          </div>

          <div className="flex flex-col gap-5">
            {TECH_LAYERS.map(({ layer, icon: Icon, color, headerBg, items }) => (
              <div key={layer} className="rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                {/* Layer header */}
                <div className={`flex items-center gap-2 px-5 py-3 ${headerBg}`}>
                  <Icon size={16} className={color} />
                  <span className={`text-sm font-bold ${color}`}>{layer}</span>
                </div>

                {/* Items grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-100 dark:bg-gray-800">
                  {items.map(({ label, desc }) => (
                    <div key={label} className="bg-white dark:bg-gray-900 px-5 py-3.5">
                      <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">{label}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Developer */}
        <section className="mb-16 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Developer</h2>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
              HK
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Hari Krishna</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                Full-stack developer. Built DevPulse to make it easy to track coding progress
                across GitHub and LeetCode in one unified dashboard.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 active:scale-95 transition-all shadow-md"
          >
            <BarChart2 size={16} />
            Try DevPulse
          </Link>
        </div>

      </main>

      <Footer />
    </div>
  );
}
