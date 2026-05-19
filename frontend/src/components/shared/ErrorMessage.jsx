import { AlertCircle, RefreshCw } from 'lucide-react'
 
export default function ErrorMessage({ title = 'Something went wrong', message = 'Please try again later.', onRetry }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        {/* Icon */}
        <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
          <AlertCircle className="w-8 h-8 text-red-500" />
        </div>
 
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
 
        {/* Message */}
        <p className="text-gray-500 mb-6">{message}</p>
 
        {/* Retry Button */}
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        )}
      </div>
    </div>
  )
}
 