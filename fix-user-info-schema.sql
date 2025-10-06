-- Fix user info schema to make mobile and email optional
-- This script updates the quiz_attempts table to make user_mobile and user_email optional

-- Make user_mobile optional (remove NOT NULL constraint)
ALTER TABLE quiz_attempts 
ALTER COLUMN user_mobile DROP NOT NULL;

-- user_email is already optional, but let's make sure it's clear
-- No change needed for user_email as it's already nullable

-- Add comments for clarity
COMMENT ON COLUMN quiz_attempts.user_mobile IS 'User mobile number (optional)';
COMMENT ON COLUMN quiz_attempts.user_email IS 'User email address (optional)';
