import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase-server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '3')
    const difficulty = searchParams.get('difficulty')

    // First get all question IDs, then randomly select from them
    const { data: allQuestions, error: allError } = await supabaseServer
      .from('quiz_questions')
      .select('id')
    
    if (allError) {
      throw new Error(`Failed to fetch question IDs: ${allError.message}`)
    }
    
    if (!allQuestions || allQuestions.length === 0) {
      return NextResponse.json({ questions: [] })
    }
    
    // Shuffle and select random IDs
    const shuffled = allQuestions.sort(() => 0.5 - Math.random())
    const selectedIds = shuffled.slice(0, limit).map(q => q.id)
    
    let query = supabaseServer
      .from('quiz_questions')
      .select('*')
      .in('id', selectedIds)

    if (difficulty) {
      query = query.eq('difficulty', difficulty)
    }

    const { data, error } = await query

    if (error) {
      console.error('Supabase error:', error)
      throw new Error(`Failed to fetch questions: ${error.message}`)
    }

    return NextResponse.json({ questions: data })
  } catch (error) {
    console.error('Quiz API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch quiz questions' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const quizAttempt = await request.json()

    // Validate required fields
    if (!quizAttempt.user_name) {
      return NextResponse.json(
        { error: 'User name is required' },
        { status: 400 }
      )
    }

    if (!quizAttempt.language) {
      return NextResponse.json(
        { error: 'Language is required' },
        { status: 400 }
      )
    }

    if (typeof quizAttempt.questions_answered !== 'number') {
      return NextResponse.json(
        { error: 'Questions answered count is required' },
        { status: 400 }
      )
    }

    if (typeof quizAttempt.correct_answers !== 'number') {
      return NextResponse.json(
        { error: 'Correct answers count is required' },
        { status: 400 }
      )
    }

    if (typeof quizAttempt.time_taken_seconds !== 'number') {
      return NextResponse.json(
        { error: 'Time taken is required' },
        { status: 400 }
      )
    }

    if (typeof quizAttempt.meta_score !== 'number') {
      return NextResponse.json(
        { error: 'Meta score is required' },
        { status: 400 }
      )
    }

    if (!quizAttempt.answers || !Array.isArray(quizAttempt.answers)) {
      return NextResponse.json(
        { error: 'Answers array is required' },
        { status: 400 }
      )
    }

    const { data, error } = await supabaseServer
      .from('quiz_attempts')
      .insert([quizAttempt])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: `Database error: ${error.message}` },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Quiz save error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to save quiz attempt' },
      { status: 500 }
    )
  }
}
