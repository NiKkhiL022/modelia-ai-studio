import type { Generation } from '../types'

const STORAGE_KEY = 'ai-studio-generations'
const MAX_HISTORY_ITEMS = 5

export const saveGeneration = (generation: Generation): void => {
  try {
    const history = getGenerationHistory()
    const updatedHistory = [
      generation,
      ...history.filter(g => g.id !== generation.id),
    ].slice(0, MAX_HISTORY_ITEMS)

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory))
  } catch (error) {
    console.error('Failed to save generation to localStorage:', error)
  }
}

export const getGenerationHistory = (): Generation[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Failed to load generation history from localStorage:', error)
    return []
  }
}

export const clearGenerationHistory = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error('Failed to clear generation history:', error)
  }
}
