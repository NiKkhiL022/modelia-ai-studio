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
        <section className="relative pt-16 pb-8">
          <div className="container mx-auto px-4 relative z-10 text-center">
            <div className="mb-12">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-gray-900">
                Create stunning AI-generated{' '}
                <span className="modelia-gradient-text">images</span> with ease
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Upload your photo, add a creative prompt, select a style, and instantly
                generate unique AI-enhanced images.
              </p>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <div className="flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm border border-green-200 rounded-full text-green-700 font-medium text-sm shadow-lg">
                <CheckCircle className="w-4 h-4 mr-2" />
                Upload & preview images with easy client-side resizing
              </div>
              <div className="flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm border border-blue-200 rounded-full text-blue-700 font-medium text-sm shadow-lg">
                <CheckCircle className="w-4 h-4 mr-2" />
                Generate images with prompt and style selection via mocked AI API
              </div>
              <div className="flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm border border-purple-200 rounded-full text-purple-700 font-medium text-sm shadow-lg">
                <CheckCircle className="w-4 h-4 mr-2" />
                Manage generation history and retry on errors with abort support
              </div>
            </div>
          </div>
        </section>

        {/* Main App Interface */}
        <section className="relative py-16">
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
