"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Circle, Square, CheckSquare } from "lucide-react";
import { QuizQuestion, QuizAnswer } from "@/lib/supabase";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

interface QuizCardProps {
  question: QuizQuestion;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (answer: QuizAnswer) => void;
  timeStarted: Date;
}

export function QuizCard({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  timeStarted,
}: QuizCardProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<number | number[]>([]);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleAnswerSelect = (optionIndex: number) => {
    if (isAnswered) return;

    if (question.question_type === "multi_select") {
      const currentAnswers = Array.isArray(selectedAnswers)
        ? selectedAnswers
        : [];
      const newAnswers = currentAnswers.includes(optionIndex)
        ? currentAnswers.filter((i) => i !== optionIndex)
        : [...currentAnswers, optionIndex];
      setSelectedAnswers(newAnswers);
    } else {
      setSelectedAnswers(optionIndex);
    }
  };

  const handleSubmitAnswer = () => {
    if (
      selectedAnswers === null ||
      (Array.isArray(selectedAnswers) && selectedAnswers.length === 0)
    ) {
      return;
    }

    const timeTaken = Math.floor(
      (new Date().getTime() - timeStarted.getTime()) / 1000
    );
    // Since correct_answer is always an array in the database
    const isCorrect = Array.isArray(selectedAnswers)
      ? question.correct_answer.length === selectedAnswers.length &&
        question.correct_answer.every((ans) => selectedAnswers.includes(ans))
      : question.correct_answer.length === 1 && 
        question.correct_answer[0] === selectedAnswers;

    const answer: QuizAnswer = {
      question_id: question.id,
      selected_answer: selectedAnswers,
      is_correct: isCorrect,
      time_taken_seconds: timeTaken,
    };

    setIsAnswered(true);
    onAnswer(answer);
  };

  const canSubmit =
    question.question_type === "multi_select"
      ? Array.isArray(selectedAnswers) && selectedAnswers.length > 0
      : selectedAnswers !== null;

  const getAnswerIcon = (optionIndex: number) => {
    if (question.question_type === "multi_select") {
      const isSelected =
        Array.isArray(selectedAnswers) && selectedAnswers.includes(optionIndex);
      return isSelected ? (
        <CheckSquare className="h-5 w-5 text-red-600" />
      ) : (
        <Square className="h-5 w-5 text-gray-400" />
      );
    } else {
      const isSelected = selectedAnswers === optionIndex;
      return isSelected ? (
        <CheckCircle className="h-5 w-5 text-red-600" />
      ) : (
        <Circle className="h-5 w-5 text-gray-400" />
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-gray-500">
              Question {questionNumber} of {totalQuestions}
            </span>
            <span className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded-full">
              {question.difficulty.toUpperCase()}
            </span>
          </div>
          <CardTitle className="text-xl leading-relaxed">
            {question.question}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <motion.button
                key={index}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                    Array.isArray(selectedAnswers)
                      ? selectedAnswers.includes(index)
                        ? "border-red-500 bg-red-50"
                        : "border-gray-200 hover:border-gray-300"
                      : selectedAnswers === index
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                onClick={() => handleAnswerSelect(index)}
                disabled={isAnswered}
                whileHover={{ scale: isAnswered ? 1 : 1.02 }}
                whileTap={{ scale: isAnswered ? 1 : 0.98 }}
              >
                <div className="flex items-center gap-3">
                  {getAnswerIcon(index)}
                  <span className="flex-1">{option}</span>
                </div>
              </motion.button>
            ))}
          </div>

          <div className="pt-4">
            <Button
              onClick={handleSubmitAnswer}
              disabled={!canSubmit || isAnswered}
              className="w-full"
              size="lg"
            >
              {isAnswered ? "Answer Submitted" : "Submit Answer"}
            </Button>
          </div>

          {question.question_type === "multi_select" && (
            <p className="text-sm text-gray-500 text-center">
              Select all correct answers
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
