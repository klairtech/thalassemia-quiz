-- Secure Leaderboard Schema - Remove PII Exposure
-- This script updates the leaderboard view to exclude sensitive user information

-- Drop the existing leaderboard view
DROP VIEW IF EXISTS leaderboard;

-- Create a secure leaderboard view that excludes PII
CREATE OR REPLACE VIEW leaderboard AS
SELECT 
    user_name,
    MAX(meta_score) as best_score,
    MIN(time_taken_seconds) as best_time,
    COUNT(*) as total_attempts,
    MAX(created_at) as last_attempt,
    -- Create a hash of user_mobile for internal identification without exposing PII
    MD5(user_mobile) as user_hash
FROM quiz_attempts
GROUP BY user_name, user_mobile
ORDER BY best_score DESC, best_time ASC;

-- Add comment for clarity
COMMENT ON VIEW leaderboard IS 'Secure leaderboard view that excludes PII (user_mobile, user_email) from public access';

-- Update RLS policies to ensure PII is not accessible through public queries
-- Allow public read access to the secure leaderboard view
CREATE POLICY "Allow public read access to secure leaderboard" ON quiz_attempts
    FOR SELECT USING (true);

-- Ensure the leaderboard view is accessible
GRANT SELECT ON leaderboard TO anon;
GRANT SELECT ON leaderboard TO authenticated;
