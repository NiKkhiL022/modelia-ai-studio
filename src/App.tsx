import { useState } from 'react'
import { ArrowRight, CheckCircle } from 'lucide-react'
import type { UploadedImage, StyleOption, Generation } from './types'
import { Header } from './components/Header'
import { ImageUpload } from './components/ImageUpload'
import { PromptInput } from './components/PromptInput'
import { StyleSelector } from './components/StyleSelector'
import { LiveSummary } from './components/LiveSummary'
import { GenerateButton } from './components/GenerateButton'
import { GenerationHistory } from './components/GenerationHistory'
import { GeneratedResult } from './components/GeneratedResult'
import { ErrorDisplay } from './components/ErrorDisplay'
import { useGeneration } from './hooks/useGeneration'

function App() {
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null)
  const [prompt, setPrompt] = useState('')
  const [style, setStyle] = useState<StyleOption>('Editorial')
  const [latestResult, setLatestResult] = useState<Generation | null>(null)
  const [historyRefresh, setHistoryRefresh] = useState(0)
  const [preserveInputs, setPreserveInputs] = useState(false)

  const { isGenerating, error, retryCount, generate, abort } = useGeneration()

  const handleGenerate = async () => {
    if (!uploadedImage || !prompt.trim()) return
    const result = await generate({
      imageDataUrl: uploadedImage.dataUrl,
      prompt: prompt.trim(),
      style,
    })
    if (result) {
      setLatestResult(result)
      setHistoryRefresh(prev => prev + 1)
      if (!preserveInputs) {
        setUploadedImage(null)
        setPrompt('')
      }
    }
  }

  const handleSelectFromHistory = (generation: Generation) => {
    setLatestResult(generation)
    setPrompt(generation.prompt)
    setStyle(generation.style as StyleOption)
  }

  const handleRetry = () => {
    void handleGenerate()
  }

  const handleDismissError = () => {
    // Abort resets internal error state in hook
    abort()
  }

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      <Header />
      <main className="relative" role="main">
        {/* Live region for status updates (accessibility) */}
        <div aria-live="polite" className="sr-only">
          {isGenerating
            ? 'Generating image'
            : error
              ? `Error: ${error}`
              : latestResult
                ? 'Generation complete'
                : 'Idle'}
        </div>

        {/* Hero Section */}
        <section
          className="relative flex items-center min-h-[calc(100vh-80px)] md:min-h-[calc(100vh-90px)] pt-10 md:pt-20 pb-12"
          id="hero"
        >
          {/* Subtle gradient background overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-blue-50/40" />
          <div className="container mx-auto px-4 relative z-10 text-center flex flex-col items-center justify-center">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 text-gray-900">
                Create stunning AI-generated{' '}
                <span className="modelia-gradient-text">images</span> with ease
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Upload your photo, craft a creative prompt, choose a style, and generate
                unique AI-enhanced visuals in seconds.
              </p>
            </div>
            {/* Feature Pills */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-5xl">
              <div className="flex items-center px-4 py-3 bg-white/80 backdrop-blur-sm border border-green-200 rounded-2xl text-green-700 font-medium text-sm shadow-lg">
                <CheckCircle className="w-4 h-4 mr-2 shrink-0" />
                <span className="text-left">
                  Upload & preview images with client-side resizing
                </span>
              </div>
              <div className="flex items-center px-4 py-3 bg-white/80 backdrop-blur-sm border border-blue-200 rounded-2xl text-blue-700 font-medium text-sm shadow-lg">
                <CheckCircle className="w-4 h-4 mr-2 shrink-0" />
                <span className="text-left">
                  Prompt + style driven generation via mocked AI API
                </span>
              </div>
              <div className="flex items-center px-4 py-3 bg-white/80 backdrop-blur-sm border border-purple-200 rounded-2xl text-purple-700 font-medium text-sm shadow-lg sm:col-span-2 lg:col-span-1">
                <CheckCircle className="w-4 h-4 mr-2 shrink-0" />
                <span className="text-left">
                  History, retries & abort for resilient workflows
                </span>
              </div>
            </div>
            <div className="mt-12">
              <a
                href="#app-start"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-modelia-gradient text-white font-semibold shadow-lg shadow-modelia-500/20 transition hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-modelia-300"
              >
                Start Creating
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </section>

        {/* Main App Interface */}
        <section className="relative py-16" id="app-start">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Main Controls */}
              <div className="xl:col-span-2 space-y-8">
                {/* Upload Section */}
                <div className="modelia-card p-8">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-8 h-8 bg-modelia-gradient rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-lg">1</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Upload Your Fashion Image
                    </h2>
                  </div>
                  <ImageUpload
                    onImageUpload={setUploadedImage}
                    uploadedImage={uploadedImage}
                  />
                </div>

                {/* Configuration Section */}
                <div className="modelia-card p-8">
                  <div className="flex items-center space-x-3 mb-8">
                    <div className="w-8 h-8 bg-modelia-gradient rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-lg">2</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Configure Your Generation
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <PromptInput
                      value={prompt}
                      onChange={setPrompt}
                      disabled={isGenerating}
                    />
                    <StyleSelector
                      value={style}
                      onChange={setStyle}
                      disabled={isGenerating}
                    />
                  </div>
                </div>

                {/* Generate Section */}
                <div className="modelia-card p-8">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-8 h-8 bg-modelia-gradient rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-lg">3</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Generate AI Content
                    </h2>
                  </div>
                  {error && (
                    <div className="mb-6">
                      <ErrorDisplay
                        error={error}
                        onRetry={handleRetry}
                        onDismiss={handleDismissError}
                      />
                    </div>
                  )}
                  <GenerateButton
                    uploadedImage={uploadedImage}
                    prompt={prompt}
                    style={style}
                    isGenerating={isGenerating}
                    retryCount={retryCount}
                    onGenerate={() => {
                      void handleGenerate()
                    }}
                    onAbort={abort}
                  />
                  <div className="mt-6 flex items-center gap-2">
                    <input
                      id="preserve"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-modelia-500 focus:ring-modelia-500"
                      checked={preserveInputs}
                      onChange={e => {
                        setPreserveInputs(e.target.checked)
                      }}
                      disabled={isGenerating}
                    />
                    <label
                      htmlFor="preserve"
                      className="text-sm text-gray-600 select-none"
                    >
                      Keep image & prompt after generation
                    </label>
                  </div>
                </div>
                {/* Generated Result */}
                {latestResult && (
                  <div className="modelia-card p-8">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        Your AI Generation
                      </h2>
                    </div>
                    <GeneratedResult result={latestResult} />
                  </div>
                )}
              </div>
              {/* Sidebar */}
              <div className="space-y-8">
                {/* Live Preview */}
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <ArrowRight className="w-5 h-5 mr-2 text-modelia-500" />
                    Live Preview
                  </h2>
                  <LiveSummary
                    uploadedImage={uploadedImage}
                    prompt={prompt}
                    style={style}
                  />
                </div>
                {/* History */}
                <div>
                  <GenerationHistory
                    onSelectGeneration={handleSelectFromHistory}
                    refreshTrigger={historyRefresh}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Background Decorations */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-modelia-200 rounded-full opacity-20 animate-float"></div>
          <div
            className="absolute top-40 right-20 w-24 h-24 bg-blue-200 rounded-full opacity-20 animate-float"
            style={{ animationDelay: '2s' }}
          ></div>
          <div
            className="absolute bottom-40 left-20 w-20 h-20 bg-pink-200 rounded-full opacity-20 animate-float"
            style={{ animationDelay: '4s' }}
          ></div>
        </div>
      </main>
    </div>
  )
}

export default App
