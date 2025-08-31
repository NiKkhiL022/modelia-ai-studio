import type { GenerationRequest } from '../types'

export type StreamChunk = {
  type: 'progress' | 'intermediate' | 'final' | 'error'
  progress?: number
  imageUrl?: string
  error?: string
}

// Simulate progressive generation by emitting 5 progress chunks + final
export async function* streamGenerateImage(
  _req: GenerationRequest,
  signal?: AbortSignal,
): AsyncGenerator<StreamChunk> {
  const steps = 5
  for (let i = 1; i <= steps; i++) {
    if (signal?.aborted) return
    await new Promise(r => setTimeout(r, 400))
    // 10% random early error (except last step)
    if (Math.random() < 0.05 && i < steps) {
      yield { type: 'error', error: 'Transient streaming error occurred' }
      return
    }
    yield { type: 'progress', progress: (i / steps) * 100 }
  }
  if (signal?.aborted) return
  // Reuse a random placeholder from existing mock styles (simplify)
  const seed = String(Date.now())
  yield {
    type: 'final',
    progress: 100,
    imageUrl: `https://picsum.photos/seed/${seed}/800/1200`,
  }
}
