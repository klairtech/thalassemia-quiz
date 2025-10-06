-- Thalassemia Quiz App Database Schema

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Quiz Questions Table
CREATE TABLE quiz_questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question TEXT NOT NULL,
    options TEXT[] NOT NULL,
    correct_answer INTEGER[] NOT NULL, -- Array to support multi-select
    question_type VARCHAR(20) NOT NULL CHECK (question_type IN ('mcq', 'true_false', 'multi_select')),
    difficulty VARCHAR(10) NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
    category VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Quiz Attempts Table
CREATE TABLE quiz_attempts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_mobile VARCHAR(15) NOT NULL,
    user_email VARCHAR(255),
    language VARCHAR(10) NOT NULL,
    questions_answered INTEGER NOT NULL DEFAULT 0,
    correct_answers INTEGER NOT NULL DEFAULT 0,
    time_taken_seconds INTEGER NOT NULL,
    meta_score DECIMAL(5,2) NOT NULL,
    answers JSONB NOT NULL, -- Store detailed answers
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Leaderboard View (calculated from best scores)
CREATE OR REPLACE VIEW leaderboard AS
SELECT 
    user_mobile,
    user_email,
    user_name,
    MAX(meta_score) as best_score,
    MIN(time_taken_seconds) as best_time,
    COUNT(*) as total_attempts,
    MAX(created_at) as last_attempt
FROM quiz_attempts
GROUP BY user_mobile, user_email, user_name
ORDER BY best_score DESC, best_time ASC;

-- Enable RLS on leaderboard view
ALTER VIEW leaderboard SET (security_invoker = true);

-- Indexes for better performance
CREATE INDEX idx_quiz_questions_difficulty ON quiz_questions(difficulty);
CREATE INDEX idx_quiz_questions_category ON quiz_questions(category);
CREATE INDEX idx_quiz_attempts_user_mobile ON quiz_attempts(user_mobile);
CREATE INDEX idx_quiz_attempts_meta_score ON quiz_attempts(meta_score DESC);
CREATE INDEX idx_quiz_attempts_created_at ON quiz_attempts(created_at DESC);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_quiz_questions_updated_at 
    BEFORE UPDATE ON quiz_questions 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) policies
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;

-- Allow public read access to quiz questions
CREATE POLICY "Allow public read access to quiz questions" ON quiz_questions
    FOR SELECT USING (true);

-- Allow public insert access to quiz attempts
CREATE POLICY "Allow public insert access to quiz attempts" ON quiz_attempts
    FOR INSERT WITH CHECK (true);

-- Allow public read access to quiz attempts (for leaderboard)
CREATE POLICY "Allow public read access to quiz attempts" ON quiz_attempts
    FOR SELECT USING (true);

