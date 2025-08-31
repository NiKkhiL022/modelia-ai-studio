import React from 'react'
import { MessageSquare, Sparkles } from 'lucide-react'

interface PromptInputProps {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

export const PromptInput: React.FC<PromptInputProps> = ({
  value,
  onChange,
  disabled = false,
}) => {
  return (
    <div className="space-y-3">
      <label htmlFor="prompt-input" className="block text-lg font-semibold text-gray-900">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-modelia-gradient rounded-lg flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span>Describe your vision</span>
        </div>
      </label>
      <div className="relative">
        <textarea
          id="prompt-input"
          value={value}
          onChange={e => onChange(e.target.value)}
          disabled={disabled}
          placeholder="Transform this outfit into a minimalist editorial style with clean lighting and modern aesthetics..."
          className={`modelia-input min-h-[120px] resize-none text-base leading-relaxed ${
            disabled
              ? 'bg-gray-50 cursor-not-allowed text-gray-400'
              : 'hover:border-modelia-300 focus:shadow-lg'
          }`}
          rows={4}
          maxLength={500}
          aria-describedby="prompt-help"
        />
        <div className="absolute bottom-3 right-3">
          <MessageSquare className="w-5 h-5 text-gray-300" />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <p id="prompt-help" className="text-sm text-gray-500 font-medium">
          Be specific about style, lighting, and mood for best results
        </p>
        <span
          className={`text-sm font-medium ${value.length > 450 ? 'text-red-500' : 'text-gray-400'}`}
        >
          {value.length}/500
        </span>
      </div>
    </div>
  )
}
