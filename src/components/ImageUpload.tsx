import React, { useCallback, useState } from 'react'
import { Upload, X, Image as ImageIcon, Camera } from 'lucide-react'
import type { UploadedImage } from '../types'
import {
  validateImageFile,
  downscaleImage,
  createImagePreview,
} from '../utils/imageUtils'

interface ImageUploadProps {
  onImageUpload: (image: UploadedImage | null) => void
  uploadedImage: UploadedImage | null
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageUpload,
  uploadedImage,
}) => {
  const [isProcessing, setIsProcessing] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  const processFile = useCallback(
    async (file: File) => {
      const error = validateImageFile(file)
      if (error) {
        alert(error)
        return
      }

      setIsProcessing(true)

      try {
        const preview = createImagePreview(file)
        const dataUrl = await downscaleImage(file)

        const uploadedImage: UploadedImage = {
          file,
          preview,
          dataUrl,
        }

        onImageUpload(uploadedImage)
      } catch (error) {
        console.error('Failed to process image:', error)
        alert('Failed to process image. Please try again.')
      } finally {
        setIsProcessing(false)
      }
    },
    [onImageUpload],
  )

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setDragActive(false)

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        processFile(e.dataTransfer.files[0])
      }
    },
    [processFile],
  )

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        processFile(e.target.files[0])
      }
    },
    [processFile],
  )

  const handleRemove = useCallback(() => {
    if (uploadedImage?.preview) {
      URL.revokeObjectURL(uploadedImage.preview)
    }
    onImageUpload(null)
  }, [onImageUpload, uploadedImage])

  if (uploadedImage) {
    return (
      <div className="relative group">
        <div className="relative overflow-hidden rounded-2xl border-2 border-modelia-200 bg-gradient-to-br from-modelia-50 to-white shadow-lg">
          <img
            src={uploadedImage.preview}
            alt="Uploaded preview"
            className="w-full h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <button
            onClick={handleRemove}
            className="absolute top-4 right-4 p-2 bg-white/90 text-gray-700 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 focus:outline-none focus:ring-2 focus:ring-modelia-500 focus:ring-offset-2 shadow-lg"
            aria-label="Remove image"
          >
            <X size={18} />
          </button>
        </div>
        <div className="mt-4 p-3 bg-white/60 rounded-xl border border-modelia-100">
          <p className="text-sm font-medium text-gray-700">{uploadedImage.file.name}</p>
          <p className="text-xs text-gray-500">
            {(uploadedImage.file.size / 1024 / 1024).toFixed(2)} MB
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div
        className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
          dragActive
            ? 'border-modelia-400 bg-modelia-50 scale-105'
            : 'border-modelia-200 hover:border-modelia-300 hover:bg-modelia-25'
        } ${isProcessing ? 'pointer-events-none opacity-50' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {isProcessing ? (
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="animate-spin w-12 h-12 border-3 border-modelia-200 border-t-modelia-500 rounded-full"></div>
              <Camera className="absolute inset-0 m-auto w-6 h-6 text-modelia-500" />
            </div>
            <div className="space-y-1">
              <p className="text-lg font-medium text-gray-700">Processing image...</p>
              <p className="text-sm text-gray-500">Optimizing for AI generation</p>
            </div>
          </div>
        ) : (
          <>
            <div className="relative mb-6">
              <div className="w-16 h-16 mx-auto bg-modelia-gradient rounded-2xl flex items-center justify-center shadow-lg animate-float">
                <ImageIcon className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Upload your fashion image
                </h3>
                <p className="text-gray-600">
                  Drop your image here or{' '}
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer text-modelia-600 hover:text-modelia-700 font-medium underline decoration-2 underline-offset-2"
                  >
                    browse files
                  </label>
                </p>
              </div>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                className="sr-only"
                onChange={handleInputChange}
                disabled={isProcessing}
                aria-describedby="file-upload-description"
              />
              <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
                <span className="flex items-center">
                  <Upload className="w-4 h-4 mr-1" />
                  PNG or JPG
                </span>
                <span>Max 10MB</span>
                <span>Auto-optimized</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
