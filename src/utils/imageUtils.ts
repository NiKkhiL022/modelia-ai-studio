export const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
export const MAX_DIMENSION = 1920

export const validateImageFile = (file: File): string | null => {
  if (!file.type.startsWith('image/')) {
    return 'Please select a valid image file (PNG or JPG)'
  }

  if (file.size > MAX_FILE_SIZE) {
    return 'File size must be less than 10MB'
  }

  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png']
  if (!allowedTypes.includes(file.type)) {
    return 'Only PNG and JPG files are supported'
  }

  return null
}

export const downscaleImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    if (!ctx) {
      reject(new Error('Failed to get canvas context'))
      return
    }

    img.onload = () => {
      const { width, height } = img

      // Calculate new dimensions while maintaining aspect ratio
      let newWidth = width
      let newHeight = height

      if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
        const ratio = Math.min(MAX_DIMENSION / width, MAX_DIMENSION / height)
        newWidth = Math.floor(width * ratio)
        newHeight = Math.floor(height * ratio)
      }

      canvas.width = newWidth
      canvas.height = newHeight

      // Draw and compress the image
      ctx.drawImage(img, 0, 0, newWidth, newHeight)

      // Convert to data URL with quality compression
      const dataUrl = canvas.toDataURL('image/jpeg', 0.85)
      resolve(dataUrl)
    }

    img.onerror = () => reject(new Error('Failed to load image'))
    img.src = URL.createObjectURL(file)
  })
}

export const createImagePreview = (file: File): string => {
  return URL.createObjectURL(file)
}
