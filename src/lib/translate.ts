// Google Translate API integration
export interface TranslationResult {
  translatedText: string
  detectedSourceLanguage?: string
}

export class TranslationService {
  private apiKey: string

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  async translateText(text: string, targetLanguage: string): Promise<TranslationResult> {
    try {
      const response = await fetch(
        `https://translation.googleapis.com/language/translate/v2?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            q: text,
            target: targetLanguage,
            format: 'text',
          }),
        }
      )

      if (!response.ok) {
        throw new Error(`Translation failed: ${response.statusText}`)
      }

      const data = await response.json()
      const translation = data.data.translations[0]

      return {
        translatedText: translation.translatedText,
        detectedSourceLanguage: translation.detectedSourceLanguage,
      }
    } catch (error) {
      console.error('Translation error:', error)
      // Fallback to original text if translation fails
      return { translatedText: text }
    }
  }

  async translateObject<T extends Record<string, unknown>>(
    obj: T,
    targetLanguage: string
  ): Promise<T> {
    const translatedObj = { ...obj } as Record<string, unknown>

    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'string') {
        const translation = await this.translateText(value, targetLanguage)
        translatedObj[key] = translation.translatedText
      } else if (Array.isArray(value)) {
        translatedObj[key] = await Promise.all(
          value.map(async (item) => {
            if (typeof item === 'string') {
              const translation = await this.translateText(item, targetLanguage)
              return translation.translatedText
            }
            return item
          })
        )
      }
    }

    return translatedObj as T
  }
}

// Language options for Indian languages
export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
  { code: 'bn', name: 'Bengali', flag: '🇮🇳' },
  { code: 'te', name: 'Telugu', flag: '🇮🇳' },
  { code: 'mr', name: 'Marathi', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', flag: '🇮🇳' },
  { code: 'gu', name: 'Gujarati', flag: '🇮🇳' },
  { code: 'kn', name: 'Kannada', flag: '🇮🇳' },
  { code: 'ml', name: 'Malayalam', flag: '🇮🇳' },
  { code: 'pa', name: 'Punjabi', flag: '🇮🇳' },
  { code: 'or', name: 'Odia', flag: '🇮🇳' },
  { code: 'as', name: 'Assamese', flag: '🇮🇳' },
]

export const getTranslationService = () => {
  const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY || 'placeholder-key'
  return new TranslationService(apiKey)
}
