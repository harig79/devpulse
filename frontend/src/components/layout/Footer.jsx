import { Link } from "react-router-dom";
import { GitBranch, Home, Info, Zap, Code2, Wind } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">

          {/* Column 1: Brand */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <span className="text-white text-xl font-bold flex items-center gap-2">
              <Zap size={20} className="text-blue-400" />
              DevPulse
            </span>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              Track your developer activity, LeetCode progress, and GitHub
              contributions — all in one place.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2 text-sm">
              <li>
                <Link
                  to="/"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="flex items-center justify-center md:justify-start gap-2 hover:text-white transition-colors"
                >
                  <Home size={15} />
                  Home
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center md:justify-start gap-2 hover:text-white transition-colors"
                >
                  <GitBranch size={15} />
                  GitHub
                </a>
              </li>
              <li>
                <Link
                  to="/about"
                  className="flex items-center justify-center md:justify-start gap-2 hover:text-white transition-colors"
                >
                  <Info size={15} />
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Tech Stack */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider">
              Built With
            </h3>
            <ul className="flex flex-col gap-2 text-sm text-gray-400">
              <li className="flex items-center justify-center md:justify-start gap-2">
                <Code2 size={15} className="text-blue-400" />
                React
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <Zap size={15} className="text-yellow-400" />
                Vite
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <Wind size={15} className="text-cyan-400" />
                Tailwind CSS
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-gray-800 text-center text-sm text-gray-500">
          © 2026 DevPulse. Built by Hari Krishna.
        </div>
      </div>
    </footer>
  );
}
