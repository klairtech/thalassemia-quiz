import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase-server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '50')

    // First try to query the leaderboard view
    const { data, error } = await supabaseServer
      .from('leaderboard')
      .select('*')
      .order('best_score', { ascending: false })
      .limit(limit)

    let leaderboardData = data

    // If the view doesn't exist or has issues, fall back to direct query
    if (error && (error.message.includes('relation "leaderboard" does not exist') || error.message.includes('relation "public.leaderboard" does not exist'))) {
      console.log('Leaderboard view not found, falling back to direct query')
      
      const { data: fallbackData, error: fallbackError } = await supabaseServer
        .from('quiz_attempts')
        .select(`
          user_mobile,
          user_email,
          user_name,
          meta_score,
          time_taken_seconds,
          created_at
        `)
        .order('meta_score', { ascending: false })
        .limit(limit * 2) // Get more records to account for grouping

      if (fallbackError) {
        console.error('Fallback query error:', fallbackError)
        throw new Error(`Database error: ${fallbackError.message}`)
      }

      // Group by user and get best scores
      const userMap = new Map()
      fallbackData?.forEach(attempt => {
        const key = `${attempt.user_mobile}-${attempt.user_email}-${attempt.user_name}`
        if (!userMap.has(key) || userMap.get(key).meta_score < attempt.meta_score) {
          userMap.set(key, {
            user_mobile: attempt.user_mobile,
            user_email: attempt.user_email,
            user_name: attempt.user_name,
            best_score: attempt.meta_score,
            best_time: attempt.time_taken_seconds,
            last_attempt: attempt.created_at
          })
        }
      })

      leaderboardData = Array.from(userMap.values())
        .sort((a, b) => b.best_score - a.best_score)
        .slice(0, limit)
    } else if (error) {
      console.error('Leaderboard view error:', error)
      throw new Error(`Database error: ${error.message}`)
    }

    return NextResponse.json({ entries: leaderboardData || [] })
  } catch (error) {
    console.error('Leaderboard API error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch leaderboard' },
      { status: 500 }
    )
  }
}
