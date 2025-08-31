import React from 'react'
import { History, Clock, Trash2, Sparkles } from 'lucide-react'
import type { Generation } from '../types'
import { getGenerationHistory, clearGenerationHistory } from '../services/localStorage'

type GenerationHistoryProps = {
  onSelectGeneration: (generation: Generation) => void
  refreshTrigger: number
}

export const GenerationHistory: React.FC<GenerationHistoryProps> = ({
  onSelectGeneration,
  refreshTrigger,
}) => {
  const [history, setHistory] = React.useState<Generation[]>([])

  React.useEffect(() => {
    setHistory(getGenerationHistory())
  }, [refreshTrigger])

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear all generation history?')) {
      clearGenerationHistory()
      setHistory([])
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (history.length === 0) {
    return (
      <div className="modelia-card p-8">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-modelia-100 to-modelia-200 rounded-2xl flex items-center justify-center">
            <History className="w-8 h-8 text-modelia-500" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No generations yet
            </h3>
            <p className="text-gray-500">Your recent AI generations will appear here</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900 flex items-center">
          <div className="w-6 h-6 bg-modelia-gradient rounded-lg flex items-center justify-center mr-3">
            <History className="w-4 h-4 text-white" />
          </div>
          Recent Generations
        </h3>
        <button
          onClick={handleClearHistory}
          className="text-sm text-red-500 hover:text-red-700 flex items-center transition-colors duration-200 focus:outline-none hover:underline font-medium"
          aria-label="Clear all history"
        >
          <Trash2 className="w-4 h-4 mr-1" />
          Clear All
        </button>
      </div>

      <div className="space-y-4">
        {history.map(generation => (
          <button
            key={generation.id}
            onClick={() => {
              onSelectGeneration(generation)
            }}
            className="w-full text-left bg-white/80 backdrop-blur-sm border border-modelia-200 rounded-2xl p-4 hover:border-modelia-300 hover:shadow-xl hover:bg-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-modelia-500 focus:ring-offset-2 group transform hover:-translate-y-1"
            aria-label={`Select generation: ${generation.prompt}`}
          >
            <div className="flex space-x-4">
              <div className="relative overflow-hidden rounded-xl border border-modelia-200 flex-shrink-0">
                <img
                  src={generation.imageUrl}
                  alt={`Generated: ${generation.prompt}`}
                  className="w-20 h-20 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-modelia-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="flex-1 min-w-0 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-modelia-gradient text-white shadow-sm">
                    <Sparkles className="w-3 h-3 mr-1" />
                    {generation.style}
                  </span>
                  <span className="text-xs text-gray-500 flex items-center font-medium">
                    <Clock className="w-3 h-3 mr-1" />
                    {formatDate(generation.createdAt)}
                  </span>
                </div>
                <p className="text-sm text-gray-800 line-clamp-2 leading-relaxed">
                  {generation.prompt}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
