import { useEffect, useState } from "react";
import { BarChart2, ArrowRight } from "lucide-react";

export default function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section className="min-h-[600px] bg-gradient-to-br from-blue-50 via-indigo-50 to-indigo-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center px-4 py-20">
      <div
        className={`max-w-3xl w-full text-center flex flex-col items-center gap-6 transition-all duration-700 ease-out ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {/* Icon */}
        <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-white dark:bg-gray-800 shadow-md select-none">
          <img src="/DevPulseLogo.png" alt="DevPulse" className="w-14 h-14 object-contain" />
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight tracking-tight">
          Your Developer Story,{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            Visualized
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-gray-500 dark:text-gray-400 max-w-xl leading-relaxed">
          Combine your GitHub activity and LeetCode progress in one beautiful dashboard.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-2">
          <a
            href="#search"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 active:scale-95 transition-all shadow-md"
          >
            <BarChart2 size={18} />
            View Dashboard
          </a>
          <a
            href="#features"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-semibold text-sm hover:bg-gray-50 dark:hover:bg-gray-700 active:scale-95 transition-all shadow-sm border border-gray-200 dark:border-gray-700"
          >
            Learn More
            <ArrowRight size={16} />
          </a>
        </div>

        {/* Decorative stats row */}
        <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm text-gray-500 dark:text-gray-400">
          {[
            { label: "GitHub Commits", value: "∞" },
            { label: "LeetCode Problems", value: "3000+" },
            { label: "Languages Tracked", value: "20+" },
          ].map(({ label, value }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{value}</span>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
