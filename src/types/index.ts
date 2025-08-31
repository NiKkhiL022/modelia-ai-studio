export interface Generation {
  id: string
  imageUrl: string
  prompt: string
  style: string
  createdAt: string
}

export interface GenerationRequest {
  imageDataUrl: string
  prompt: string
  style: string
}

export interface GenerationResponse {
  id: string
  imageUrl: string
  prompt: string
  style: string
  createdAt: string
}

export interface GenerationError {
  message: string
}

export type StyleOption =
  | 'Editorial'
  | 'Streetwear'
  | 'Vintage'
  | 'Minimalist'
  | 'Cinematic'

export interface UploadedImage {
  file: File
  preview: string
  dataUrl: string
}
