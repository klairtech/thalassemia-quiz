import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase-server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '50')

    const { data, error } = await supabaseServer
      .from('leaderboard')
      .select('*')
      .order('best_score', { ascending: false })
      .limit(limit)

    if (error) {
      throw new Error('Failed to fetch leaderboard')
    }

    return NextResponse.json({ entries: data })
  } catch (error) {
    console.error('Leaderboard API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch leaderboard' },
      { status: 500 }
    )
  }
}
