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

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <button className="hidden md:flex items-center px-4 py-2 text-modelia-600 border border-modelia-200 rounded-lg hover:bg-modelia-50 transition-all duration-200 font-medium">
              <User className="w-4 h-4 mr-2" />
              Login
            </button>
            <button className="modelia-button text-sm">Get free access</button>
            <button className="md:hidden p-2 text-gray-600 hover:text-modelia-600 transition-colors duration-200">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
