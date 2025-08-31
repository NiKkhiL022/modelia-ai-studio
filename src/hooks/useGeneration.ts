import { useState, useRef, useCallback } from 'react'
import type { GenerationRequest, GenerationResponse, GenerationError } from '../types'
import { generateImage, AbortError } from '../services/mockApi'
import { saveGeneration } from '../services/localStorage'

const MAX_RETRIES = 3
const INITIAL_RETRY_DELAY = 1000 // 1 second

interface UseGenerationReturn {
  isGenerating: boolean
  error: string | null
  retryCount: number
  generate: (request: GenerationRequest) => Promise<GenerationResponse | null>
  abort: () => void
}

export const useGeneration = (): UseGenerationReturn => {
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)
  const abortControllerRef = useRef<AbortController | null>(null)

  const abort = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      abortControllerRef.current = null
      setIsGenerating(false)
      setError(null)
      setRetryCount(0)
    }
  }, [])

  const generate = useCallback(
    async (request: GenerationRequest): Promise<GenerationResponse | null> => {
      setIsGenerating(true)
      setError(null)
      setRetryCount(0)

      // Create new abort controller
      abortControllerRef.current = new AbortController()
      const { signal } = abortControllerRef.current

      const attemptGeneration = async (
        attempt: number,
      ): Promise<GenerationResponse | null> => {
        try {
          setRetryCount(attempt)
          const response = await generateImage(request, signal)

          // Save successful generation to history
          saveGeneration(response)

          setIsGenerating(false)
          setError(null)
          setRetryCount(0)
          abortControllerRef.current = null

          return response
        } catch (err) {
          if (err instanceof AbortError) {
            // Request was aborted
            setIsGenerating(false)
            setError(null)
            setRetryCount(0)
            return null
          }

          const errorMessage =
            (err as GenerationError).message || 'Unknown error occurred'

          if (attempt < MAX_RETRIES) {
            // Exponential backoff: 1s, 2s, 4s
            const delay = INITIAL_RETRY_DELAY * Math.pow(2, attempt - 1)

            await new Promise(resolve => setTimeout(resolve, delay))

            // Check if aborted during delay
            if (signal.aborted) {
              setIsGenerating(false)
              setError(null)
              setRetryCount(0)
              return null
            }

            return attemptGeneration(attempt + 1)
          } else {
            // Max retries reached
            setIsGenerating(false)
            setError(errorMessage)
            setRetryCount(0)
            abortControllerRef.current = null
            return null
          }
        }
      }

      return attemptGeneration(1)
    },
    [],
  )

  return {
    isGenerating,
    error,
    retryCount,
    generate,
    abort,
  }
}
