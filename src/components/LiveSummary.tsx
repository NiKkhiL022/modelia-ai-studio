import React from 'react'
import { Eye, FileText, Palette, Sparkles } from 'lucide-react'
import type { UploadedImage, StyleOption } from '../types'

interface LiveSummaryProps {
  uploadedImage: UploadedImage | null
  prompt: string
  style: StyleOption
}

export const LiveSummary: React.FC<LiveSummaryProps> = ({
  uploadedImage,
  prompt,
  style,
}) => {
  const hasContent = uploadedImage || prompt.trim() || style

  if (!hasContent) {
    return (
      <div className="modelia-card p-8">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-modelia-100 to-modelia-200 rounded-2xl flex items-center justify-center">
            <Eye className="w-8 h-8 text-modelia-500" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Generation Preview
            </h3>
            <p className="text-gray-500">
              Upload an image and add a prompt to see your generation preview
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="modelia-card overflow-hidden">
      <div className="bg-modelia-gradient p-4">
        <h3 className="text-lg font-semibold text-white flex items-center">
          <Sparkles className="w-5 h-5 mr-2" />
          Generation Preview
        </h3>
      </div>

      <div className="p-6 space-y-6">
        {uploadedImage && (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider flex items-center">
              <div className="w-2 h-2 bg-modelia-500 rounded-full mr-2" />
              Source Image
            </h4>
            <div className="relative overflow-hidden rounded-xl border border-modelia-200">
              <img
                src={uploadedImage.preview}
                alt="Source"
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-modelia-900/20 to-transparent" />
            </div>
          </div>
        )}

        {prompt.trim() && (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
              Prompt
            </h4>
            <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
              <p className="text-sm text-gray-800 leading-relaxed">{prompt.trim()}</p>
            </div>
          </div>
        )}

        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider flex items-center">
            <div className="w-2 h-2 bg-purple-500 rounded-full mr-2" />
            Style
          </h4>
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-modelia-gradient text-white font-medium shadow-lg">
            <Palette className="w-4 h-4 mr-2" />
            {style}
          </div>
        </div>
      </div>
    </div>
  )
}
