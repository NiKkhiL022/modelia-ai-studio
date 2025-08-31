import type { GenerationRequest, GenerationResponse, GenerationError } from '../types'

const GENERATION_DELAY = 1500 // 1.5 seconds
const ERROR_RATE = 0.2 // 20% error rate

// Mock image URLs for different styles
const MOCK_IMAGES = {
  Editorial: [
    'https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/2625122/pexels-photo-2625122.jpeg?auto=compress&cs=tinysrgb&w=800',
  ],
  Streetwear: [
    'https://images.pexels.com/photos/1721558/pexels-photo-1721558.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1758144/pexels-photo-1758144.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800',
  ],
  Vintage: [
    'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/792381/pexels-photo-792381.jpeg?auto=compress&cs=tinysrgb&w=800',
  ],
  Minimalist: [
    'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=800',
  ],
  Cinematic: [
    'https://images.pexels.com/photos/1144176/pexels-photo-1144176.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1525041/pexels-photo-1525041.jpeg?auto=compress&cs=tinysrgb&w=800',
  ],
}

export class AbortError extends Error {
  constructor() {
    super('Generation aborted')
    this.name = 'AbortError'
  }
}

export const generateImage = async (
  request: GenerationRequest,
  signal?: AbortSignal,
): Promise<GenerationResponse> => {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      if (signal?.aborted) {
        reject(new AbortError())
        return
      }

      // Simulate 20% error rate
      if (Math.random() < ERROR_RATE) {
        const error: GenerationError = { message: 'Model overloaded' }
        reject(error)
        return
      }

      // Get random image for the selected style
      const styleImages =
        MOCK_IMAGES[request.style as keyof typeof MOCK_IMAGES] || MOCK_IMAGES.Editorial
      const randomImage = styleImages[Math.floor(Math.random() * styleImages.length)]

      const response: GenerationResponse = {
        id: `gen_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        imageUrl: randomImage,
        prompt: request.prompt,
        style: request.style,
        createdAt: new Date().toISOString(),
      }

      resolve(response)
    }, GENERATION_DELAY)

    // Handle abort signal
    if (signal) {
      signal.addEventListener('abort', () => {
        clearTimeout(timeoutId)
        reject(new AbortError())
      })
    }
  })
}
