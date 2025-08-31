import React from 'react'

const AboutPage: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-6 modelia-gradient-text">
        About This Project
      </h1>
      <p className="text-gray-700 leading-relaxed mb-4">
        This interface demonstrates an AI fashion model generation workflow with
        client-side image optimization, prompt + style conditioning, resilient mock
        generation (retries + abort), history persistence, and accessible UI patterns.
      </p>
      <p className="text-gray-700 leading-relaxed mb-4">
        Tech stack: React 19, TypeScript (strict), TailwindCSS, Vite, ESLint (strict
        type-aware), plus incremental UX enhancements (skeletons, responsive layout).
      </p>
      <p className="text-gray-700 leading-relaxed">
        Future enhancements could include a real backend, streaming progress, model
        selection, and collaborative editing.
      </p>
    </div>
  )
}

export default AboutPage
