export default function LoadingSpinner({ message = 'Loading...' }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      {/* Spinner */}
      <div className="relative">
        {/* Outer ring */}
        <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600" />
 
        {/* Inner pulse dot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-blue-600 rounded-full animate-pulse" />
      </div>
 
      {/* Message */}
      {message && (
        <p className="mt-4 text-gray-500 text-sm font-medium animate-pulse">
          {message}
        </p>
      )}
    </div>
  )
}
 