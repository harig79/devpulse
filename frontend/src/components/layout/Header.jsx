import { Link } from "react-router-dom";
import { GitBranch, Code2, Sun, Moon } from 'lucide-react';
import useTheme from '../../hooks/useTheme';

export default function Header() {
  const { isDark, toggle } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-gray-900 shadow-sm border-b border-gray-100 dark:border-gray-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <img src="/DevPulseLogo.png" alt="DevPulse" className="w-8 h-8 object-contain" />
          <span className="hidden sm:inline">DevPulse</span>
        </Link>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <GitBranch size={20} />
            <span className="hidden sm:inline text-sm font-medium">GitHub</span>
          </a>

          <a
            href="https://leetcode.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
            aria-label="LeetCode"
          >
            <Code2 size={20} />
            <span className="hidden sm:inline text-sm font-medium">LeetCode</span>
          </a>

          <button
            onClick={toggle}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-all duration-200"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
}
