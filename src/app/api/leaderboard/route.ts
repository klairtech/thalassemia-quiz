import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase-server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '50')
    const currentUserMobile = searchParams.get('currentUserMobile')
    const currentUserEmail = searchParams.get('currentUserEmail')
    const currentUserName = searchParams.get('currentUserName')

    // Check if required environment variables are available
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      throw new Error('NEXT_PUBLIC_SUPABASE_URL environment variable is not set')
    }
    
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error('SUPABASE_SERVICE_ROLE_KEY environment variable is not set')
    }


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

    // Find current user position if provided
    let currentUserEntry: { user_mobile: string; user_email?: string; user_name: string; best_score: number; best_time: number; last_attempt: string } | null = null
    let currentUserRank: number | null = null
    
    if (currentUserName) {
      const allEntries = leaderboardData || []
      
      
      // Find current user in the leaderboard
      const userIndex = allEntries.findIndex(entry => {
        // Priority 1: Match by mobile AND email (if both provided)
        if (currentUserMobile && currentUserEmail) {
          return entry.user_mobile === currentUserMobile && 
                 entry.user_email === currentUserEmail && 
                 entry.user_name === currentUserName;
        }
        
        // Priority 2: Match by mobile only (if mobile provided)
        if (currentUserMobile) {
          return entry.user_mobile === currentUserMobile && 
                 entry.user_name === currentUserName;
        }
        
        // Priority 3: Match by email only (if email provided)
        if (currentUserEmail) {
          return entry.user_email === currentUserEmail && 
                 entry.user_name === currentUserName;
        }
        
        // Priority 4: Fallback to name only
        return entry.user_name === currentUserName;
      })
      
      if (userIndex !== -1) {
        currentUserEntry = allEntries[userIndex]
        currentUserRank = userIndex + 1
      } else {
        // User not in top entries, get their best score separately
        
        let query = supabaseServer
          .from('quiz_attempts')
          .select('user_mobile, user_email, user_name, meta_score, time_taken_seconds, created_at')
          .eq('user_name', currentUserName)
          .order('meta_score', { ascending: false })
          .limit(1);
          
        // Apply filters based on priority
        if (currentUserMobile && currentUserEmail) {
          // Priority 1: Both mobile and email
          query = query.eq('user_mobile', currentUserMobile).eq('user_email', currentUserEmail);
        } else if (currentUserMobile) {
          // Priority 2: Mobile only
          query = query.eq('user_mobile', currentUserMobile);
        } else if (currentUserEmail) {
          // Priority 3: Email only
          query = query.eq('user_email', currentUserEmail);
        }
        // Priority 4: Name only (no additional filters needed)
        
        const { data: userData, error: userError } = await query;
        
        if (!userError && userData && userData.length > 0) {
          const userAttempt = userData[0]
          currentUserEntry = {
            user_mobile: userAttempt.user_mobile,
            user_email: userAttempt.user_email,
            user_name: userAttempt.user_name,
            best_score: userAttempt.meta_score,
            best_time: userAttempt.time_taken_seconds,
            last_attempt: userAttempt.created_at
          }
          
          // Calculate rank by counting users with better scores
          const betterScores = allEntries.filter(entry => entry.best_score > currentUserEntry!.best_score).length
          currentUserRank = betterScores + 1
        }
      }
    }

    // Return top 5 entries and current user info
    const topEntries = (leaderboardData || []).slice(0, 3)
    let showCurrentUserSection = true
    
    // If current user is in top 3, don't show separate current user section
    if (currentUserEntry && currentUserRank && currentUserRank <= 3) {
      showCurrentUserSection = false
    }
    
    return NextResponse.json({ 
      topEntries,
      currentUser: showCurrentUserSection ? currentUserEntry : null,
      currentUserRank: showCurrentUserSection ? currentUserRank : null,
      totalEntries: leaderboardData?.length || 0,
      isCurrentUserInTop5: currentUserRank && currentUserRank <= 3
    })
  } catch (error) {
    console.error('Leaderboard API error:', error)
    
    // Provide more specific error information for debugging
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    const errorDetails = {
      message: errorMessage,
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? {
        name: error.name,
        stack: error.stack
      } : null
    }
    
    console.error('Detailed error info:', errorDetails)
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch leaderboard',
        details: process.env.NODE_ENV === 'development' ? errorDetails : undefined
      },
      { status: 500 }
    )
  }
}
