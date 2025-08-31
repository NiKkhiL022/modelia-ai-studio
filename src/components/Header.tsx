import React from 'react'
import { Sparkles, User, Menu } from 'lucide-react'

export const Header: React.FC = () => {
  return (
    <header className="relative z-10 bg-white/90 backdrop-blur-md border-b border-gray-100 sticky top-0">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-modelia-gradient rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold modelia-gradient-text">modelia</h1>
              <p className="text-xs text-gray-500 -mt-1">AI Studio</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              className="text-gray-600 hover:text-modelia-600 transition-colors duration-200 font-medium"
            >
              AI for Fashion
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-modelia-600 transition-colors duration-200 font-medium"
            >
              AI Tools
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-modelia-600 transition-colors duration-200 font-medium"
            >
              Industry
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-modelia-600 transition-colors duration-200 font-medium"
            >
              Community
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}
