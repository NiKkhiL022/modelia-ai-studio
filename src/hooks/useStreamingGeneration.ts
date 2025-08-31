import { useState, useRef, useCallback } from 'react'
import type { GenerationRequest } from '../types'
import { streamGenerateImage } from '../services/streamingMockApi'

type UseStreamingGeneration = {
  progress: number
  imageUrl: string | null
  error: string | null
  isStreaming: boolean
  start: (req: GenerationRequest) => Promise<void>
  abort: () => void
}

export const useStreamingGeneration = (): UseStreamingGeneration => {
  const [progress, setProgress] = useState(0)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isStreaming, setIsStreaming] = useState(false)
  const controllerRef = useRef<AbortController | null>(null)

  const abort = useCallback(() => {
    controllerRef.current?.abort()
    controllerRef.current = null
    setIsStreaming(false)
  }, [])

  const start = useCallback(async (req: GenerationRequest) => {
    setProgress(0)
    setImageUrl(null)
    setError(null)
    setIsStreaming(true)
    controllerRef.current = new AbortController()
    const { signal } = controllerRef.current
    try {
      for await (const chunk of streamGenerateImage(req, signal)) {
        if (chunk.type === 'progress') {
          setProgress(chunk.progress ?? 0)
        } else if (chunk.type === 'final') {
          setProgress(100)
          setImageUrl(chunk.imageUrl ?? null)
        } else if (chunk.type === 'error') {
          setError(chunk.error ?? 'Streaming error')
          break
        }
      }
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setIsStreaming(false)
      controllerRef.current = null
    }
  }, [])

  return { progress, imageUrl, error, isStreaming, start, abort }
}
