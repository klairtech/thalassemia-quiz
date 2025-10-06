import { createClient } from '@supabase/supabase-js'

// Client-side Supabase client - safe for browser use with RLS policies
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database Types
export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correct_answer: number | number[]
  question_type: 'mcq' | 'true_false' | 'multi_select'
  difficulty: 'easy' | 'medium' | 'hard'
  category: string
  correct_answer_explanation?: string
  option_explanations?: string[]
  created_at: string
  updated_at: string
}

export interface QuizAttempt {
  id: string
  user_name: string
  user_mobile: string
  user_email?: string
  language: string
  questions_answered: number
  correct_answers: number
  time_taken_seconds: number
  meta_score: number
  answers: QuizAnswer[]
  created_at: string
}

export interface QuizAnswer {
  question_id: string
  selected_answer: number | number[]
  is_correct: boolean
  time_taken_seconds: number
}

export interface LeaderboardEntry {
  user_name: string
  user_mobile: string
  user_email?: string
  best_score: number
  best_time: number
  total_attempts: number
  last_attempt: string
}
