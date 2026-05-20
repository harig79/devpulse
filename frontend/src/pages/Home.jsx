import { BarChart2, Trophy, LayoutDashboard } from "lucide-react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Hero from "../components/home/Hero";
import SearchForm from "../components/home/SearchForm";

const FEATURES = [
  {
    icon: <BarChart2 size={28} className="text-blue-500" />,
    title: "GitHub Analytics",
    description: "Visualize your commit history, top repositories, language breakdown, and contribution streaks — all pulled live from GitHub.",
    bg: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    icon: <Trophy size={28} className="text-yellow-500" />,
    title: "LeetCode Progress",
    description: "Track easy, medium, and hard problems solved, your acceptance rate, and how your grind stacks up over time.",
    bg: "bg-yellow-50 dark:bg-yellow-900/20",
  },
  {
    icon: <LayoutDashboard size={28} className="text-indigo-500" />,
    title: "One Dashboard",
    description: "Stop switching tabs. See your full developer story — open source work and algorithmic skills — in a single, beautiful view.",
    bg: "bg-indigo-50 dark:bg-indigo-900/20",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col scroll-smooth bg-white dark:bg-gray-950 transition-colors duration-200">
      <Header />

      <main className="flex-1">
        <Hero />
        <SearchForm />

        {/* Features */}
        <section id="features" className="bg-gray-50 dark:bg-gray-900 py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-3">
                Everything in One Place
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-lg max-w-xl mx-auto">
                DevPulse pulls data from GitHub and LeetCode so you never have to switch tabs again.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {FEATURES.map(({ icon, title, description, bg }) => (
                <div
                  key={title}
                  className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-7 flex flex-col gap-4 hover:shadow-md transition-all duration-200"
                >
                  <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center`}>
                    {icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
