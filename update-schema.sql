-- Update quiz_questions table to include explanations
-- Add explanation fields for better quiz results

ALTER TABLE quiz_questions 
ADD COLUMN IF NOT EXISTS correct_answer_explanation TEXT,
ADD COLUMN IF NOT EXISTS option_explanations TEXT[];

-- Update the table to include explanations for existing questions
-- This will be populated with the updated seed data

-- Add comments for clarity
COMMENT ON COLUMN quiz_questions.correct_answer_explanation IS 'Explanation for why the correct answer is right';
COMMENT ON COLUMN quiz_questions.option_explanations IS 'Array of explanations for each option (correct and incorrect)';
