-- Updated Thalassemia Quiz Seed Data with Explanations
-- This script contains educational questions with detailed explanations

-- Clear existing data (optional - uncomment if needed)
-- DELETE FROM quiz_attempts;
-- DELETE FROM quiz_questions;

-- Insert comprehensive Thalassemia questions with explanations
INSERT INTO quiz_questions (question, options, correct_answer, question_type, difficulty, category, correct_answer_explanation, option_explanations) VALUES

-- BASIC KNOWLEDGE QUESTIONS (Easy)
('What is Thalassemia?', 
 ARRAY['A blood disorder affecting hemoglobin production', 'A heart disease', 'A lung condition', 'A skin disease'], 
 ARRAY[0], 
 'mcq', 'easy', 'basics',
 'Thalassemia is a genetic blood disorder that affects the body''s ability to produce hemoglobin, the protein in red blood cells that carries oxygen. It''s inherited from parents and affects hemoglobin production.',
 ARRAY['Correct! Thalassemia is a genetic blood disorder that affects hemoglobin production in red blood cells.', 'Incorrect. Thalassemia is not a heart disease - it affects blood cells, not the heart.', 'Incorrect. Thalassemia is not a lung condition - it affects blood cells, not the lungs.', 'Incorrect. Thalassemia is not a skin disease - it affects blood cells, not the skin.']),

('Thalassemia is inherited from parents.', 
 ARRAY['True', 'False'], 
 ARRAY[0], 
 'true_false', 'easy', 'basics',
 'Thalassemia is a genetic condition that is inherited from parents. It''s caused by mutations in genes that control hemoglobin production.',
 ARRAY['Correct! Thalassemia is inherited from parents through genetic mutations.', 'Incorrect. Thalassemia is indeed inherited from parents - it''s a genetic condition.']),

('Which component of blood is primarily affected in Thalassemia?', 
 ARRAY['Red blood cells', 'White blood cells', 'Platelets', 'Plasma'], 
 ARRAY[0], 
 'mcq', 'easy', 'basics',
 'Red blood cells are primarily affected because Thalassemia disrupts hemoglobin production, which is the main component of red blood cells.',
 ARRAY['Correct! Red blood cells are affected because Thalassemia disrupts hemoglobin production.', 'Incorrect. White blood cells fight infections and are not primarily affected by Thalassemia.', 'Incorrect. Platelets help with blood clotting and are not primarily affected by Thalassemia.', 'Incorrect. Plasma is the liquid part of blood and is not primarily affected by Thalassemia.']),

('Thalassemia affects the production of:', 
 ARRAY['Hemoglobin', 'Insulin', 'Thyroid hormone', 'Growth hormone'], 
 ARRAY[0], 
 'mcq', 'easy', 'basics',
 'Thalassemia specifically affects hemoglobin production, which is the protein in red blood cells that carries oxygen throughout the body.',
 ARRAY['Correct! Thalassemia affects hemoglobin production, the protein that carries oxygen in red blood cells.', 'Incorrect. Insulin is produced by the pancreas and is not affected by Thalassemia.', 'Incorrect. Thyroid hormone is produced by the thyroid gland and is not affected by Thalassemia.', 'Incorrect. Growth hormone is produced by the pituitary gland and is not affected by Thalassemia.']),

('What are common symptoms of Thalassemia?', 
 ARRAY['Fatigue and weakness', 'Pale skin', 'Shortness of breath', 'All of the above'], 
 ARRAY[3], 
 'mcq', 'easy', 'symptoms',
 'All of these are common symptoms of Thalassemia because the condition reduces the number of healthy red blood cells, leading to anemia and its associated symptoms.',
 ARRAY['This is one symptom, but not the complete answer. Thalassemia causes multiple symptoms.', 'This is one symptom, but not the complete answer. Thalassemia causes multiple symptoms.', 'This is one symptom, but not the complete answer. Thalassemia causes multiple symptoms.', 'Correct! All of these are common symptoms of Thalassemia due to reduced healthy red blood cells.']),

('Thalassemia is more common in which regions?', 
 ARRAY['Mediterranean', 'Southeast Asia', 'Middle East', 'All of the above'], 
 ARRAY[3], 
 'mcq', 'easy', 'epidemiology',
 'Thalassemia is more common in regions where malaria was historically prevalent, including Mediterranean countries, Southeast Asia, and the Middle East, as the trait provided some protection against malaria.',
 ARRAY['This is one region, but not the complete answer. Thalassemia is common in multiple regions.', 'This is one region, but not the complete answer. Thalassemia is common in multiple regions.', 'This is one region, but not the complete answer. Thalassemia is common in multiple regions.', 'Correct! Thalassemia is more common in Mediterranean, Southeast Asia, and Middle East regions.']),

-- TYPES AND CLASSIFICATION (Medium)
('What are the main types of Thalassemia?', 
 ARRAY['Alpha and Beta', 'Type 1 and Type 2', 'Mild and Severe', 'Primary and Secondary'], 
 ARRAY[0], 
 'mcq', 'medium', 'types',
 'The main types of Thalassemia are Alpha and Beta, named after the protein chains (alpha and beta globin) that are affected in hemoglobin.',
 ARRAY['Correct! Alpha and Beta are the main types, named after the affected protein chains in hemoglobin.', 'Incorrect. These are not the main types of Thalassemia.', 'Incorrect. These describe severity levels, not the main types.', 'Incorrect. These are not the main types of Thalassemia.']),

('Beta Thalassemia affects which part of hemoglobin?', 
 ARRAY['Alpha chains', 'Beta chains', 'Gamma chains', 'Delta chains'], 
 ARRAY[1], 
 'mcq', 'medium', 'types',
 'Beta Thalassemia specifically affects the beta globin chains of hemoglobin, leading to reduced or absent beta chain production.',
 ARRAY['Incorrect. Alpha chains are affected in Alpha Thalassemia, not Beta Thalassemia.', 'Correct! Beta Thalassemia affects the beta globin chains of hemoglobin.', 'Incorrect. Gamma chains are not the primary target in Beta Thalassemia.', 'Incorrect. Delta chains are not the primary target in Beta Thalassemia.']),

('Which type of Thalassemia is generally more severe?', 
 ARRAY['Alpha Thalassemia', 'Beta Thalassemia', 'Both are equally severe', 'Depends on the individual'], 
 ARRAY[1], 
 'mcq', 'medium', 'types',
 'Beta Thalassemia is generally more severe because beta globin is more critical for adult hemoglobin function, and its absence causes more significant health problems.',
 ARRAY['Incorrect. Alpha Thalassemia is generally less severe than Beta Thalassemia.', 'Correct! Beta Thalassemia is generally more severe because beta globin is more critical for adult hemoglobin.', 'Incorrect. The severity differs between the two types.', 'While individual variation exists, Beta Thalassemia is generally more severe.']),

-- PREVENTION AND SCREENING (Medium)
('The best way to prevent Thalassemia is through:', 
 ARRAY['Vaccination', 'Genetic counseling and testing', 'Healthy diet', 'Regular exercise'], 
 ARRAY[1], 
 'mcq', 'medium', 'prevention',
 'Since Thalassemia is genetic, prevention involves genetic counseling and carrier testing to help families make informed decisions about having children.',
 ARRAY['Incorrect. Vaccination cannot prevent genetic conditions like Thalassemia.', 'Correct! Genetic counseling and testing help prevent Thalassemia by identifying carriers before conception.', 'Incorrect. While healthy diet is important, it cannot prevent genetic conditions.', 'Incorrect. While exercise is beneficial, it cannot prevent genetic conditions.']),

('When should genetic testing for Thalassemia be considered?', 
 ARRAY['Before marriage', 'During pregnancy', 'After birth', 'All of the above'], 
 ARRAY[3], 
 'mcq', 'medium', 'prevention',
 'Genetic testing can be valuable at multiple stages: before marriage to understand carrier status, during pregnancy for prenatal diagnosis, and after birth for confirmation and treatment planning.',
 ARRAY['This is one option, but not the complete answer. Testing can be valuable at multiple stages.', 'This is one option, but not the complete answer. Testing can be valuable at multiple stages.', 'This is one option, but not the complete answer. Testing can be valuable at multiple stages.', 'Correct! Genetic testing can be valuable before marriage, during pregnancy, and after birth.']),

-- TREATMENT AND MANAGEMENT (Medium)
('Which treatment can potentially cure Thalassemia?', 
 ARRAY['Blood transfusions', 'Iron chelation therapy', 'Bone marrow transplant', 'Folic acid supplements'], 
 ARRAY[2], 
 'mcq', 'medium', 'treatment',
 'Bone marrow transplantation offers the best chance for a cure by replacing the defective blood-forming cells with healthy ones, but it requires a suitable donor and carries risks.',
 ARRAY['Incorrect. Blood transfusions treat symptoms but do not cure Thalassemia.', 'Incorrect. Iron chelation therapy manages complications but does not cure Thalassemia.', 'Correct! Bone marrow transplant can potentially cure Thalassemia by replacing defective cells.', 'Incorrect. Folic acid supplements support red blood cell production but do not cure Thalassemia.']),

('Iron chelation therapy is used in Thalassemia to:', 
 ARRAY['Increase iron levels', 'Remove excess iron', 'Improve hemoglobin production', 'Prevent infections'], 
 ARRAY[1], 
 'mcq', 'medium', 'treatment',
 'Iron chelation therapy removes excess iron that accumulates from frequent blood transfusions, preventing iron overload complications.',
 ARRAY['Incorrect. Iron chelation therapy removes iron, it doesn''t increase iron levels.', 'Correct! Iron chelation therapy removes excess iron that accumulates from blood transfusions.', 'Incorrect. Iron chelation therapy doesn''t directly improve hemoglobin production.', 'Incorrect. Iron chelation therapy doesn''t prevent infections - it manages iron overload.']),

-- AWARENESS AND SUPPORT (Easy)
('World Thalassemia Day is celebrated on:', 
 ARRAY['March 8th', 'April 8th', 'May 8th', 'June 8th'], 
 ARRAY[2], 
 'mcq', 'easy', 'awareness',
 'World Thalassemia Day is celebrated on May 8th to raise awareness about this condition and support those affected by it.',
 ARRAY['Incorrect. March 8th is International Women''s Day, not World Thalassemia Day.', 'Incorrect. April 8th is not World Thalassemia Day.', 'Correct! World Thalassemia Day is celebrated on May 8th.', 'Incorrect. June 8th is not World Thalassemia Day.']),

('Blood donation is important for Thalassemia patients because:', 
 ARRAY['It cures the condition', 'It provides healthy red blood cells', 'It reduces iron levels', 'It prevents infections'], 
 ARRAY[1], 
 'mcq', 'easy', 'awareness',
 'Blood donation provides healthy red blood cells for patients who need regular transfusions to manage their condition.',
 ARRAY['Incorrect. Blood donation doesn''t cure Thalassemia - it only provides temporary relief.', 'Correct! Blood donation provides healthy red blood cells for patients who need regular transfusions.', 'Incorrect. Blood donation actually increases iron levels, which is why chelation therapy is needed.', 'Incorrect. Blood donation doesn''t prevent infections - it provides red blood cells.']),

-- COMPLEX QUESTIONS (Hard)
('Thalassemia Major requires:', 
 ARRAY['No treatment', 'Occasional blood transfusions', 'Regular blood transfusions', 'Only medication'], 
 ARRAY[2], 
 'mcq', 'hard', 'treatment',
 'Thalassemia Major is the most severe form and requires regular blood transfusions throughout life to maintain adequate hemoglobin levels.',
 ARRAY['Incorrect. Thalassemia Major is severe and requires treatment.', 'Incorrect. Occasional transfusions are not sufficient for Thalassemia Major.', 'Correct! Thalassemia Major requires regular blood transfusions throughout life.', 'Incorrect. Medication alone is not sufficient for Thalassemia Major.']),

('The goal of making India Thalassemia-free by 2035 focuses on:', 
 ARRAY['Finding a cure', 'Prevention through awareness', 'Better treatment options', 'All of the above'], 
 ARRAY[3], 
 'mcq', 'hard', 'awareness',
 'The goal involves multiple approaches: prevention through awareness and screening, better treatment options, and ongoing research for potential cures.',
 ARRAY['This is one aspect, but not the complete answer. The goal involves multiple approaches.', 'This is one aspect, but not the complete answer. The goal involves multiple approaches.', 'This is one aspect, but not the complete answer. The goal involves multiple approaches.', 'Correct! The goal involves prevention, better treatment, and research for cures.']),

-- MULTI-SELECT QUESTIONS
('Which of the following are symptoms of Thalassemia? (Select all that apply)', 
 ARRAY['Fatigue', 'Pale skin', 'Enlarged spleen', 'All of the above'], 
 ARRAY[0, 1, 2], 
 'multi_select', 'medium', 'symptoms',
 'Fatigue, pale skin, and enlarged spleen are all symptoms of Thalassemia. The condition causes anemia and can lead to spleen enlargement due to increased red blood cell destruction.',
 ARRAY['Correct! Fatigue is a common symptom due to reduced oxygen-carrying capacity.', 'Correct! Pale skin is a symptom due to reduced red blood cells.', 'Correct! Enlarged spleen can occur due to increased red blood cell destruction.', 'While this includes correct answers, not all symptoms are listed in the other options.']),

('Prevention strategies for Thalassemia include: (Select all that apply)', 
 ARRAY['Genetic counseling', 'Carrier testing', 'Prenatal diagnosis', 'All of the above'], 
 ARRAY[0, 1, 2], 
 'multi_select', 'medium', 'prevention',
 'All three strategies are important for prevention: genetic counseling helps families understand risks, carrier testing identifies carriers, and prenatal diagnosis allows early detection.',
 ARRAY['Correct! Genetic counseling helps families understand the risks and make informed decisions.', 'Correct! Carrier testing identifies individuals who carry the Thalassemia trait.', 'Correct! Prenatal diagnosis allows early detection during pregnancy.', 'While this includes correct answers, the individual options are more specific.']);

-- Add more questions as needed...
-- This provides a comprehensive set of questions with detailed explanations
-- for both correct and incorrect answers to enhance learning.
