export default function Card({ title, children, className = '' }) {
  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow ${className}`}>
      {title && (
        <div className="px-6 pt-6 pb-2">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
      )}
      <div className="p-6 pt-2">{children}</div>
    </div>
  )
}
 