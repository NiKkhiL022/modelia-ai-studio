import React from 'react'
import { Download, ExternalLink, Sparkles, Calendar } from 'lucide-react'
import type { Generation } from '../types'

interface GeneratedResultProps {
  result: Generation
}

export const GeneratedResult: React.FC<GeneratedResultProps> = ({ result }) => {
  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = result.imageUrl
    link.download = `modelia-generation-${result.id}.jpg`
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleOpenInNewTab = () => {
    window.open(result.imageUrl, '_blank')
  }

  return (
    <div className="modelia-card overflow-hidden group">
      <div className="relative">
        <img
          src={result.imageUrl}
          alt={`Generated: ${result.prompt}`}
          className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Floating Action Buttons */}
        <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <button
            onClick={handleDownload}
            className="p-3 bg-white/90 text-gray-700 rounded-xl shadow-lg hover:bg-white hover:scale-110 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-modelia-500 focus:ring-offset-2 backdrop-blur-sm"
            aria-label="Download image"
          >
            <Download className="w-5 h-5" />
          </button>
          <button
            onClick={handleOpenInNewTab}
            className="p-3 bg-white/90 text-gray-700 rounded-xl shadow-lg hover:bg-white hover:scale-110 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-modelia-500 focus:ring-offset-2 backdrop-blur-sm"
            aria-label="Open in new tab"
          >
            <ExternalLink className="w-5 h-5" />
          </button>
        </div>

        {/* Success Badge */}
        <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <div className="inline-flex items-center px-3 py-2 bg-green-500 text-white rounded-xl font-medium text-sm shadow-lg">
            <Sparkles className="w-4 h-4 mr-2" />
            Generated
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-modelia-gradient text-white font-semibold text-sm shadow-lg">
            {result.style}
          </div>
          <div className="flex items-center text-sm text-gray-500 font-medium">
            <Calendar className="w-4 h-4 mr-2" />
            {new Date(result.createdAt).toLocaleString()}
          </div>
        </div>

        <div className="p-4 bg-modelia-subtle rounded-xl border border-modelia-200">
          <p className="text-gray-800 leading-relaxed">{result.prompt}</p>
        </div>
      </div>
    </div>
  )
}
