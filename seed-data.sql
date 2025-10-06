-- Comprehensive Thalassemia Quiz Seed Data
-- This script contains educational questions about Thalassemia awareness and prevention

-- Clear existing data (optional - uncomment if needed)
-- DELETE FROM quiz_attempts;
-- DELETE FROM quiz_questions;

-- Insert comprehensive Thalassemia questions
-- Blood Warriors Aligned Questions
INSERT INTO quiz_questions (question, options, correct_answer, question_type, difficulty, category) VALUES

-- BASIC KNOWLEDGE QUESTIONS (Easy)
('What is Thalassemia?', 
 ARRAY['A blood disorder affecting hemoglobin production', 'A heart disease', 'A lung condition', 'A skin disease'], 
 ARRAY[0], 
 'mcq', 'easy', 'basics'),

('Thalassemia is inherited from parents.', 
 ARRAY['True', 'False'], 
 ARRAY[0], 
 'true_false', 'easy', 'basics'),

('Which component of blood is primarily affected in Thalassemia?', 
 ARRAY['Red blood cells', 'White blood cells', 'Platelets', 'Plasma'], 
 ARRAY[0], 
 'mcq', 'easy', 'basics'),

('Thalassemia affects the production of:', 
 ARRAY['Hemoglobin', 'Insulin', 'Thyroid hormone', 'Growth hormone'], 
 ARRAY[0], 
 'mcq', 'easy', 'basics'),

('What are common symptoms of Thalassemia?', 
 ARRAY['Fatigue and weakness', 'Pale skin', 'Shortness of breath', 'All of the above'], 
 ARRAY[3], 
 'mcq', 'easy', 'symptoms'),

('Thalassemia is more common in which regions?', 
 ARRAY['Mediterranean', 'Southeast Asia', 'Middle East', 'All of the above'], 
 ARRAY[3], 
 'mcq', 'easy', 'epidemiology'),

-- TYPES AND CLASSIFICATION (Medium)
('What are the main types of Thalassemia?', 
 ARRAY['Alpha and Beta', 'Type 1 and Type 2', 'Mild and Severe', 'Primary and Secondary'], 
 ARRAY[0], 
 'mcq', 'medium', 'types'),

('Beta Thalassemia affects which part of hemoglobin?', 
 ARRAY['Alpha chains', 'Beta chains', 'Gamma chains', 'Delta chains'], 
 ARRAY[1], 
 'mcq', 'medium', 'types'),

('Which type of Thalassemia is more severe?', 
 ARRAY['Alpha Thalassemia', 'Beta Thalassemia', 'Both are equally severe', 'Depends on the individual'], 
 ARRAY[1], 
 'mcq', 'medium', 'types'),

('Thalassemia Major is also known as:', 
 ARRAY['Cooley''s Anemia', 'Sickle Cell Disease', 'Iron Deficiency Anemia', 'Aplastic Anemia'], 
 ARRAY[0], 
 'mcq', 'medium', 'types'),

('Thalassemia Minor refers to:', 
 ARRAY['Carriers who have no symptoms', 'Severe cases requiring treatment', 'Children with the condition', 'Elderly patients'], 
 ARRAY[0], 
 'mcq', 'medium', 'types'),

-- PREVENTION AND SCREENING (Medium)
('Thalassemia can be prevented through:', 
 ARRAY['Genetic counseling', 'Blood tests before marriage', 'Prenatal testing', 'All of the above'], 
 ARRAY[3], 
 'mcq', 'medium', 'prevention'),

('Pre-marital screening for Thalassemia is important because:', 
 ARRAY['It helps identify carriers', 'It prevents the birth of affected children', 'It allows informed family planning', 'All of the above'], 
 ARRAY[3], 
 'mcq', 'medium', 'prevention'),

('Which test can identify Thalassemia carriers?', 
 ARRAY['Complete Blood Count (CBC)', 'Hemoglobin electrophoresis', 'Genetic testing', 'All of the above'], 
 ARRAY[3], 
 'mcq', 'medium', 'diagnosis'),

('Prenatal diagnosis of Thalassemia can be done through:', 
 ARRAY['Amniocentesis', 'Chorionic villus sampling', 'Both A and B', 'Neither A nor B'], 
 ARRAY[2], 
 'mcq', 'medium', 'prevention'),

-- RISK FACTORS AND EPIDEMIOLOGY (Medium)
('Which populations are at higher risk for Thalassemia?', 
 ARRAY['Mediterranean populations', 'Asian populations', 'African populations', 'All of the above'], 
 ARRAY[3], 
 'mcq', 'medium', 'risk_factors'),

('The risk of having a child with Thalassemia Major is highest when:', 
 ARRAY['Both parents are carriers', 'One parent is a carrier', 'Neither parent is a carrier', 'One parent has the disease'], 
 ARRAY[0], 
 'mcq', 'medium', 'genetics'),

('Thalassemia is more common in areas with:', 
 ARRAY['High malaria prevalence historically', 'Low iron intake', 'High altitude', 'Cold climate'], 
 ARRAY[0], 
 'mcq', 'medium', 'epidemiology'),

-- TREATMENT AND MANAGEMENT (Hard)
('What is the treatment for severe Thalassemia?', 
 ARRAY['Regular blood transfusions', 'Iron chelation therapy', 'Bone marrow transplant', 'All of the above'], 
 ARRAY[3], 
 'mcq', 'hard', 'treatment'),

('Iron chelation therapy is needed in Thalassemia patients because:', 
 ARRAY['Blood transfusions cause iron overload', 'The body absorbs too much iron', 'Iron supplements are given', 'All of the above'], 
 ARRAY[3], 
 'mcq', 'hard', 'treatment'),

('Bone marrow transplant can cure Thalassemia.', 
 ARRAY['True', 'False'], 
 ARRAY[0], 
 'true_false', 'hard', 'treatment'),

('Which complications can occur in untreated Thalassemia?', 
 ARRAY['Heart problems', 'Liver damage', 'Bone deformities', 'All of the above'], 
 ARRAY[3], 
 'mcq', 'hard', 'complications'),

('Regular blood transfusions in Thalassemia patients can lead to:', 
 ARRAY['Iron overload', 'Alloimmunization', 'Infections', 'All of the above'], 
 ARRAY[3], 
 'mcq', 'hard', 'complications'),

-- CARRIERS AND GENETICS (Hard)
('Thalassemia carriers (trait) typically:', 
 ARRAY['Have no symptoms', 'Need regular treatment', 'Cannot have children', 'Always develop the disease'], 
 ARRAY[0], 
 'mcq', 'hard', 'carriers'),

('If both parents are Thalassemia carriers, the chance of having a child with Thalassemia Major is:', 
 ARRAY['25%', '50%', '75%', '100%'], 
 ARRAY[0], 
 'mcq', 'hard', 'genetics'),

('Thalassemia carriers can lead normal lives.', 
 ARRAY['True', 'False'], 
 ARRAY[0], 
 'true_false', 'hard', 'carriers'),

-- DIAGNOSIS AND TESTING (Hard)
('Which tests can diagnose Thalassemia?', 
 ARRAY['Complete Blood Count (CBC)', 'Hemoglobin electrophoresis', 'Genetic testing', 'All of the above'], 
 ARRAY[3], 
 'mcq', 'hard', 'diagnosis'),

('In Thalassemia, red blood cells are typically:', 
 ARRAY['Small and pale', 'Large and dark', 'Normal size and color', 'Irregularly shaped'], 
 ARRAY[0], 
 'mcq', 'hard', 'diagnosis'),

('Hemoglobin electrophoresis helps identify:', 
 ARRAY['The type of Thalassemia', 'The severity of the condition', 'Both A and B', 'Neither A nor B'], 
 ARRAY[2], 
 'mcq', 'hard', 'diagnosis'),

-- MULTI-SELECT QUESTIONS
('What are the complications of untreated Thalassemia?', 
 ARRAY['Heart problems', 'Liver damage', 'Bone deformities', 'Growth delays', 'All of the above'], 
 ARRAY[0,1,2,3], 
 'multi_select', 'hard', 'complications'),

('Prevention strategies for Thalassemia include:', 
 ARRAY['Genetic counseling', 'Pre-marital screening', 'Prenatal diagnosis', 'Public awareness', 'All of the above'], 
 ARRAY[0,1,2,3], 
 'multi_select', 'medium', 'prevention'),

('Symptoms of Thalassemia Major include:', 
 ARRAY['Severe anemia', 'Growth retardation', 'Bone deformities', 'Jaundice', 'All of the above'], 
 ARRAY[0,1,2,3], 
 'multi_select', 'medium', 'symptoms'),

('Treatment options for Thalassemia include:', 
 ARRAY['Blood transfusions', 'Iron chelation', 'Bone marrow transplant', 'Gene therapy', 'All of the above'], 
 ARRAY[0,1,2,3], 
 'multi_select', 'hard', 'treatment'),

('Risk factors for Thalassemia include:', 
 ARRAY['Family history', 'Ethnic background', 'Geographic location', 'Age', 'All of the above'], 
 ARRAY[0,1,2], 
 'multi_select', 'medium', 'risk_factors'),

-- AWARENESS AND EDUCATION
('Thalassemia awareness is important because:', 
 ARRAY['It helps in early diagnosis', 'It promotes prevention', 'It reduces stigma', 'All of the above'], 
 ARRAY[3], 
 'mcq', 'easy', 'awareness'),

('World Thalassemia Day is celebrated on:', 
 ARRAY['May 8th', 'June 8th', 'July 8th', 'August 8th'], 
 ARRAY[0], 
 'mcq', 'easy', 'awareness'),

('Thalassemia support groups help patients by:', 
 ARRAY['Providing emotional support', 'Sharing information', 'Advocating for better care', 'All of the above'], 
 ARRAY[3], 
 'mcq', 'easy', 'support'),

-- BLOOD WARRIORS SPECIFIC QUESTIONS
('What percentage of India''s population are Thalassemia carriers?', 
 ARRAY['2%', '4%', '6%', '8%'], 
 ARRAY[1], 
 'mcq', 'easy', 'statistics'),

('How many new Thalassemia patients are born in India every year?', 
 ARRAY['5,000', '10,000', '15,000', '20,000'], 
 ARRAY[1], 
 'mcq', 'easy', 'statistics'),

('What is the cost of HPLC testing for Thalassemia carrier screening?', 
 ARRAY['Rs. 500', 'Rs. 800', 'Rs. 1,200', 'Rs. 1,500'], 
 ARRAY[1], 
 'mcq', 'easy', 'testing'),

('Blood Warriors Foundation aims to make India Thalassemia-free by:', 
 ARRAY['2030', '2035', '2040', '2045'], 
 ARRAY[1], 
 'mcq', 'easy', 'vision'),

('What is the main purpose of Blood Bridge in Thalassemia care?', 
 ARRAY['Connecting donors with patients', 'Providing medical treatment', 'Conducting research', 'Training doctors'], 
 ARRAY[0], 
 'mcq', 'medium', 'blood_donation'),

('How often should regular blood donors donate for Thalassemia patients?', 
 ARRAY['Every month', 'Every 2 months', 'Every 3-4 months', 'Every 6 months'], 
 ARRAY[2], 
 'mcq', 'medium', 'blood_donation'),

('What is the average number of blood transfusions a Thalassemia patient needs in their lifetime?', 
 ARRAY['100-200', '300-400', '500-700', '800-1000'], 
 ARRAY[2], 
 'mcq', 'hard', 'statistics'),

('Blood Warriors Foundation was established in:', 
 ARRAY['2018', '2019', '2020', '2021'], 
 ARRAY[2], 
 'mcq', 'medium', 'organization'),

('What is the name of Blood Warriors'' AI chatbot for Thalassemia support?', 
 ARRAY['Veeru', 'Arya', 'Kiran', 'Surya'], 
 ARRAY[0], 
 'mcq', 'easy', 'technology'),

-- LIFESTYLE AND MANAGEMENT
('People with Thalassemia should avoid:', 
 ARRAY['Iron supplements', 'Folic acid', 'Vitamin C', 'Protein'], 
 ARRAY[0], 
 'mcq', 'medium', 'lifestyle'),

('Regular exercise is beneficial for Thalassemia patients.', 
 ARRAY['True', 'False'], 
 ARRAY[0], 
 'true_false', 'medium', 'lifestyle'),

('Dietary recommendations for Thalassemia include:', 
 ARRAY['Avoiding iron-rich foods', 'Taking folic acid supplements', 'Maintaining adequate nutrition', 'All of the above'], 
 ARRAY[3], 
 'mcq', 'medium', 'lifestyle'),

-- RESEARCH AND FUTURE
('Gene therapy is a potential future treatment for Thalassemia.', 
 ARRAY['True', 'False'], 
 ARRAY[0], 
 'true_false', 'hard', 'research'),

('Stem cell therapy research is ongoing for Thalassemia treatment.', 
 ARRAY['True', 'False'], 
 ARRAY[0], 
 'true_false', 'hard', 'research'),

('Early detection of Thalassemia can improve outcomes.', 
 ARRAY['True', 'False'], 
 ARRAY[0], 
 'true_false', 'easy', 'early_detection'),

-- QUALITY OF LIFE
('With proper treatment, people with Thalassemia can lead normal lives.', 
 ARRAY['True', 'False'], 
 ARRAY[0], 
 'true_false', 'medium', 'quality_of_life'),

('Psychological support is important for Thalassemia patients.', 
 ARRAY['True', 'False'], 
 ARRAY[0], 
 'true_false', 'medium', 'support'),

('Regular medical follow-up is essential for Thalassemia patients.', 
 ARRAY['True', 'False'], 
 ARRAY[0], 
 'true_false', 'medium', 'follow_up');

-- Update the updated_at timestamp for all questions
UPDATE quiz_questions SET updated_at = NOW() WHERE updated_at IS NULL;
