'use client'

import { useState, useCallback } from 'react'

interface TranslationCache {
  [key: string]: string
}

interface UseTranslationReturn {
  t: (text: string) => string
  isLoading: boolean
  error: string | null
}

export function useTranslation(language: string = 'en'): UseTranslationReturn {
  const [cache, setCache] = useState<TranslationCache>({})
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const translateText = useCallback(async (text: string): Promise<string> => {
    // Return original text if it's English or if translation is disabled
    if (language === 'en' || !text.trim()) {
      return text
    }

    // Check cache first
    const cacheKey = `${language}:${text}`
    if (cache[cacheKey]) {
      return cache[cacheKey]
    }

    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          targetLanguage: language,
        }),
      })

      if (!response.ok) {
        throw new Error('Translation failed')
      }

      const result = await response.json()
      const translatedText = result.translatedText || text

      // Update cache
      setCache(prev => ({
        ...prev,
        [cacheKey]: translatedText
      }))

      return translatedText
    } catch (err) {
      console.error('Translation error:', err)
      setError(err instanceof Error ? err.message : 'Translation failed')
      return text // Fallback to original text
    } finally {
      setIsLoading(false)
    }
  }, [language, cache])

  const t = useCallback((text: string): string => {
    // Return cached translation if available
    const cacheKey = `${language}:${text}`
    if (cache[cacheKey]) {
      return cache[cacheKey]
    }

    // For English or empty text, return as is
    if (language === 'en' || !text.trim()) {
      return text
    }

    // Trigger translation (async)
    translateText(text)
    
    // Return original text while translation is in progress
    return text
  }, [language, cache, translateText])

  return {
    t,
    isLoading,
    error
  }
}
