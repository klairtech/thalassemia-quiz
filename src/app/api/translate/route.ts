import { NextRequest, NextResponse } from 'next/server'
import { getTranslationService } from '@/lib/translate'

export async function POST(request: NextRequest) {
  try {
    const { text, targetLanguage } = await request.json()

    if (!text || !targetLanguage) {
      return NextResponse.json(
        { error: 'Text and target language are required' },
        { status: 400 }
      )
    }

    const translationService = getTranslationService()
    const result = await translationService.translateText(text, targetLanguage)

    return NextResponse.json(result)
  } catch (error) {
    console.error('Translation error:', error)
    return NextResponse.json(
      { error: 'Translation failed' },
      { status: 500 }
    )
  }
}
