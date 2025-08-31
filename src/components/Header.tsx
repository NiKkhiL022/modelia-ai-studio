import React, { useState, useEffect } from 'react'
import { Sparkles, Menu, X } from 'lucide-react'
import { Link } from 'react-router-dom'

export const Header: React.FC = () => {
  const [open, setOpen] = useState(false)

  // Close mobile menu automatically if viewport becomes desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  return (
    <header className="relative z-20 bg-white/90 backdrop-blur-md border-b border-gray-100 sticky top-0">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-modelia-500 rounded-lg px-1"
          >
            <div className="w-8 h-8 bg-modelia-gradient rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold modelia-gradient-text">modelia</span>
              <p className="text-xs text-gray-500 -mt-1">AI Studio</p>
            </div>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/readme"
              className="text-gray-600 hover:text-modelia-600 font-medium focus:outline-none focus:ring-2 focus:ring-modelia-500 rounded-md px-2 py-1"
            >
              README
            </Link>
            <Link
              to="/architecture"
              className="text-gray-600 hover:text-modelia-600 font-medium focus:outline-none focus:ring-2 focus:ring-modelia-500 rounded-md px-2 py-1"
            >
              Project Architecture
            </Link>
            <Link
              to="/about"
              className="text-gray-600 hover:text-modelia-600 font-medium focus:outline-none focus:ring-2 focus:ring-modelia-500 rounded-md px-2 py-1"
            >
              About Project
            </Link>
            <a
              href="https://www.gattadinikhil.in/"
              target="_blank"
              rel="noopener"
              className="text-gray-600 hover:text-modelia-600 font-medium focus:outline-none focus:ring-2 focus:ring-modelia-500 rounded-md px-2 py-1"
            >
              About Me
            </a>
          </nav>
          <button
            onClick={() => {
              setOpen(o => !o)
            }}
            className="md:hidden p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-modelia-500 text-gray-600"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="fixed inset-0 z-40" role="dialog" aria-modal="true">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => {
              setOpen(false)
            }}
          />
          <div className="absolute top-0 left-0 right-0 bg-white rounded-b-3xl shadow-xl origin-top animate-[fadeDown_0.25s_ease] p-6 space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">Menu</span>
              <button
                onClick={() => {
                  setOpen(false)
                }}
                aria-label="Close menu"
                className="p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-modelia-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-col space-y-4">
              <Link
                to="/readme"
                onClick={() => {
                  setOpen(false)
                }}
                className="text-gray-700 font-medium hover:text-modelia-600"
              >
                README
              </Link>
              <Link
                to="/architecture"
                onClick={() => {
                  setOpen(false)
                }}
                className="text-gray-700 font-medium hover:text-modelia-600"
              >
                Architecture
              </Link>
              <Link
                to="/about"
                onClick={() => {
                  setOpen(false)
                }}
                className="text-gray-700 font-medium hover:text-modelia-600"
              >
                About Project
              </Link>
              <a
                href="https://www.gattadinikhil.in/"
                target="_blank"
                rel="noopener"
                className="text-gray-700 font-medium hover:text-modelia-600"
                onClick={() => {
                  setOpen(false)
                }}
              >
                About Me
              </a>
              <Link
                to="/"
                onClick={() => {
                  setOpen(false)
                }}
                className="text-gray-700 font-medium hover:text-modelia-600"
              >
                Home
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
