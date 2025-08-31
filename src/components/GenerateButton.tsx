import React from 'react'
import { Wand2, StopCircle, RotateCcw, Sparkles } from 'lucide-react'
import type { UploadedImage, StyleOption } from '../types'

interface GenerateButtonProps {
  uploadedImage: UploadedImage | null
  prompt: string
  style: StyleOption
  isGenerating: boolean
  retryCount: number
  onGenerate: () => void
  onAbort: () => void
  disabled?: boolean
}

export const GenerateButton: React.FC<GenerateButtonProps> = ({
  uploadedImage,
  prompt,
  style,
  isGenerating,
  retryCount,
  onGenerate,
  onAbort,
  disabled = false,
}) => {
  const canGenerate = uploadedImage && prompt.trim().length > 0 && !disabled

  if (isGenerating) {
    return (
      <div className="space-y-6">
        <button
          onClick={onAbort}
          className="w-full flex items-center justify-center px-8 py-4 border-2 border-red-300 text-red-700 rounded-2xl font-semibold transition-all duration-300 hover:bg-red-50 hover:border-red-400 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transform hover:-translate-y-1"
          aria-label="Abort generation"
        >
          <StopCircle className="w-6 h-6 mr-3" />
          Abort Generation
        </button>

        <div className="flex flex-col items-center space-y-4 p-6 bg-modelia-subtle rounded-2xl border border-modelia-200">
          <div className="relative">
            <div className="animate-spin w-12 h-12 border-3 border-modelia-200 border-t-modelia-500 rounded-full"></div>
            <Sparkles className="absolute inset-0 m-auto w-6 h-6 text-modelia-500 animate-pulse" />
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-800">
              Creating your AI generation
            </p>
            <p className="text-sm text-gray-600 mt-1">
              {retryCount > 1 ? (
                <span className="inline-flex items-center">
                  <RotateCcw className="w-4 h-4 mr-1" />
                  Retry attempt {retryCount}/3
                </span>
              ) : (
                'This may take a few moments...'
              )}
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <button
        onClick={onGenerate}
        disabled={!canGenerate}
        className={`w-full flex items-center justify-center px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          canGenerate
            ? 'modelia-button shadow-2xl hover:shadow-modelia-500/25 focus:ring-modelia-500'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
        aria-label="Generate AI image"
        aria-describedby="generate-help"
      >
        <Wand2 className="w-6 h-6 mr-3" />
        Generate with AI
      </button>

      {!canGenerate && (
        <div className="text-center p-4 bg-gray-50 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-500">
            {!uploadedImage
              ? 'Upload an image to get started'
              : 'Add a prompt to generate'}
          </p>
        </div>
      )}
    </div>
  )
}
