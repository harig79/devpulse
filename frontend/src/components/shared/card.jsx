export default function Card({ title, children, className = '' }) {
  return (
    <div className={`bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-all duration-200 ${className}`}>
      {title && (
        <div className="px-6 pt-6 pb-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        </div>
      )}
      <div className="p-6 pt-2">{children}</div>
    </div>
  );
}
