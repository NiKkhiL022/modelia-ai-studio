import React from 'react'

const sections: { title: string; points: string[] }[] = [
  {
    title: 'Overview',
    points: [
      'Vite + React + TypeScript + TailwindCSS',
      'Feature: Upload, prompt, style selection, mock generation with retries & abort',
      'State isolated via custom hook useGeneration',
    ],
  },
  {
    title: 'Key Folders',
    points: [
      'components/: Presentational + small state wrappers',
      'hooks/: Reusable logic (useGeneration)',
      'services/: API simulation + localStorage persistence',
      'utils/: Image processing helpers',
      'routes/: App-level pages (Home, README, Architecture)',
    ],
  },
  {
    title: 'Generation Flow',
    points: [
      'ImageUpload validates + downscales image -> parent stores UploadedImage',
      'User sets prompt + style; LiveSummary previews current inputs',
      'GenerateButton triggers useGeneration.generate() with request payload',
      'mockApi simulates latency + 20% failure; retries with exponential backoff (1s,2s,4s)',
      'On success saves to localStorage & refreshes GenerationHistory list',
      'Abort uses AbortController to cancel in-flight timeout',
    ],
  },
  {
    title: 'Performance Notes',
    points: [
      'Canvas downscaling reduces payload size before mock send',
      'Minimal prop drilling; heavy UI contained',
      'Potential future: web worker for image processing, code-splitting routes',
    ],
  },
]

const ArchitecturePage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 modelia-gradient-text">
        Project Architecture
      </h1>
      <div className="space-y-10">
        {sections.map(section => (
          <div key={section.title} className="modelia-card p-6">
            <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              {section.points.map(p => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ArchitecturePage
