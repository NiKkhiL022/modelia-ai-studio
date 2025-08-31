import React from 'react'
import { AlertCircle, RefreshCw, X } from 'lucide-react'

interface ErrorDisplayProps {
  error: string
  onRetry?: () => void
  onDismiss?: () => void
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  error,
  onRetry,
  onDismiss,
}) => {
  return (
    <div
      className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-2xl p-6 shadow-lg"
      role="alert"
    >
      <div className="flex items-start">
        <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0 mr-4">
          <AlertCircle className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-red-800 mb-1">Generation Failed</h3>
          <p className="text-red-700 mb-4 leading-relaxed">{error}</p>

          {(onRetry || onDismiss) && (
            <div className="flex space-x-3">
              {onRetry && (
                <button
                  onClick={onRetry}
                  className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-red-500 to-pink-500 rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </button>
              )}
              {onDismiss && (
                <button
                  onClick={onDismiss}
                  className="inline-flex items-center px-4 py-2 text-sm font-semibold text-red-700 bg-white border-2 border-red-300 rounded-xl hover:bg-red-50 hover:border-red-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 shadow-sm hover:shadow-md"
                >
                  <X className="w-4 h-4 mr-2" />
                  Dismiss
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
