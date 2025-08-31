import React from 'react'
import { ArrowLeft } from 'lucide-react'

const AboutPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto py-14 px-5">
      <header className="mb-10">
        <div className="mb-6 flex items-center gap-3">
          <button
            onClick={() => {
              if (window.history.length > 1) window.history.back()
            }}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 hover:text-modelia-600 hover:border-modelia-300 focus:outline-none focus:ring-2 focus:ring-modelia-500 shadow-sm transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight modelia-gradient-text mb-6">
          About This Project
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
          Context and intent behind the Modelia AI Studio mock implementation.
        </p>
      </header>
      <div className="space-y-6 text-gray-700 leading-relaxed text-[15px]">
        <p>
          This interface demonstrates an AI fashion model generation workflow with
          client-side image optimization, prompt + style conditioning, resilient mock
          generation (retries + abort), history persistence, and accessible UI patterns.
        </p>
        <p>
          Tech stack: <strong>React 19</strong>, <strong>TypeScript (strict)</strong>,{' '}
          <strong>TailwindCSS</strong>, <strong>Vite</strong>, ESLint (type-aware) plus
          incremental UX enhancements (skeletons, responsive layout, focus states).
        </p>
        <p>
          Goals: rapid iteration, clear architecture, accessible defaults, and a
          production-friendly foundation to swap in a real inference backend later.
        </p>
        <p className="text-sm text-gray-500">
          Future enhancements could include real backend integration, streaming progress,
          model selection, dark mode, and collaborative editing capabilities.
        </p>
      </div>
    </div>
  )
}

export default AboutPage
