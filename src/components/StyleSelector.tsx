import React from 'react'
import { Palette, ChevronDown } from 'lucide-react'
import type { StyleOption } from '../types'

interface StyleSelectorProps {
  value: StyleOption
  onChange: (style: StyleOption) => void
  disabled?: boolean
}

const STYLE_OPTIONS: {
  value: StyleOption
  label: string
  description: string
  gradient: string
}[] = [
  {
    value: 'Editorial',
    label: 'Editorial',
    description: 'Clean, professional magazine aesthetic',
    gradient: 'from-blue-400 to-blue-600',
  },
  {
    value: 'Streetwear',
    label: 'Streetwear',
    description: 'Urban, contemporary fashion vibes',
    gradient: 'from-orange-400 to-red-500',
  },
  {
    value: 'Vintage',
    label: 'Vintage',
    description: 'Classic, timeless retro style',
    gradient: 'from-amber-400 to-orange-500',
  },
  {
    value: 'Minimalist',
    label: 'Minimalist',
    description: 'Simple, clean, modern design',
    gradient: 'from-gray-400 to-gray-600',
  },
  {
    value: 'Cinematic',
    label: 'Cinematic',
    description: 'Dramatic, movie-like quality',
    gradient: 'from-purple-500 to-pink-500',
  },
]

export const StyleSelector: React.FC<StyleSelectorProps> = ({
  value,
  onChange,
  disabled = false,
}) => {
  const selectedStyle = STYLE_OPTIONS.find(option => option.value === value)

  return (
    <div className="space-y-3">
      <label
        htmlFor="style-selector"
        className="block text-lg font-semibold text-gray-900"
      >
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-modelia-gradient rounded-lg flex items-center justify-center">
            <Palette className="w-4 h-4 text-white" />
          </div>
          <span>Style</span>
        </div>
      </label>

      <div className="relative">
        <select
          id="style-selector"
          value={value}
          onChange={e => onChange(e.target.value as StyleOption)}
          disabled={disabled}
          className={`modelia-select pr-12 text-base font-medium ${
            disabled
              ? 'bg-gray-50 cursor-not-allowed text-gray-400'
              : 'hover:border-modelia-300 focus:shadow-lg'
          }`}
          aria-describedby="style-help"
        >
          {STYLE_OPTIONS.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </div>
      </div>

      {selectedStyle && (
        <div className="flex items-center space-x-3 p-4 bg-white/60 rounded-xl border border-modelia-100">
          <div
            className={`w-4 h-4 rounded-full bg-gradient-to-r ${selectedStyle.gradient}`}
          />
          <p className="text-sm text-gray-600 font-medium">{selectedStyle.description}</p>
        </div>
      )}
    </div>
  )
}
