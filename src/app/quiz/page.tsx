"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Trophy } from "lucide-react";
import { supabase, QuizQuestion, QuizAnswer } from "@/lib/supabase";
import { QuizSession } from "@/lib/quiz";
import { QuizCard } from "@/components/quiz/QuizCard";
import { Timer } from "@/components/quiz/Timer";
import { Progress } from "@/components/ui/Progress";
import { Button } from "@/components/ui/Button";
import { AppHeader } from "@/components/navigation/AppHeader";

export default function QuizPage() {
  const router = useRouter();
  const [session, setSession] = useState<QuizSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeQuiz = async () => {
      try {
        // Get user data from sessionStorage
        const userName = sessionStorage.getItem("userName");
        const userLanguage = sessionStorage.getItem("userLanguage");

        if (!userName || !userLanguage) {
          router.push("/");
          return;
        }

        // Fetch random questions from API route
        const response = await fetch("/api/quiz?limit=3");

        if (!response.ok) {
          throw new Error("Failed to load questions");
        }

        const { questions } = await response.json();

        if (!questions || questions.length === 0) {
          throw new Error("No questions available");
        }

        // Create quiz session
        const quizSession: QuizSession = {
          questions: questions as QuizQuestion[],
          currentQuestionIndex: 0,
          answers: [],
          startTime: new Date(),
          language: userLanguage,
          userName,
        };

        setSession(quizSession);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    initializeQuiz();
  }, [router]);

  // Add beforeunload event listener to prevent accidental navigation
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (session && session.answers.length > 0) {
        e.preventDefault();
        e.returnValue =
          "Are you sure you want to leave? Your quiz progress will be lost.";
        return e.returnValue;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [session]);

  const handleAnswer = (answer: QuizAnswer) => {
    if (!session) return;

    const newAnswers = [...session.answers, answer];
    const nextQuestionIndex = session.currentQuestionIndex + 1;

    if (nextQuestionIndex >= session.questions.length) {
      // Quiz completed, navigate to result page
      const totalTime = Math.floor(
        (new Date().getTime() - session.startTime.getTime()) / 1000
      );
      const correctAnswers = newAnswers.filter((a) => a.is_correct).length;

      // Store result data for the result page
      sessionStorage.setItem(
        "quizResult",
        JSON.stringify({
          totalQuestions: session.questions.length,
          correctAnswers,
          timeTaken: totalTime,
          answers: newAnswers,
          userName: session.userName,
          language: session.language,
          questions: session.questions, // Include questions for explanations
        })
      );

      router.push("/result");
    } else {
      // Move to next question
      setSession({
        ...session,
        currentQuestionIndex: nextQuestionIndex,
        answers: newAnswers,
      });
    }
  };

  const handleBackToHome = () => {
    if (session && session.answers.length > 0) {
      const confirmed = window.confirm(
        "Are you sure you want to leave the quiz? Your progress will be lost."
      );
      if (!confirmed) return;
    }
    router.push("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-[#f14164]/10 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading quiz questions...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-[#f14164]/10 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p className="font-semibold">Error</p>
            <p>{error}</p>
          </div>
          <Button onClick={handleBackToHome} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </motion.div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const currentQuestion = session.questions[session.currentQuestionIndex];
  const progress =
    ((session.currentQuestionIndex + 1) / session.questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-[#f14164]/10">
      <AppHeader />
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              onClick={handleBackToHome}
              variant="ghost"
              size="sm"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>

            <div className="flex items-center gap-4">
              <Timer startTime={session.startTime} className="hidden sm:flex" />
              <Button
                onClick={() => router.push("/leaderboard")}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Trophy className="h-4 w-4" />
                Leaderboard
              </Button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                Progress
              </span>
              <span className="text-sm text-gray-500">
                {session.currentQuestionIndex + 1} of {session.questions.length}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </div>

      {/* Quiz Content */}
      <div className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <QuizCard
            key={currentQuestion.id}
            question={currentQuestion}
            questionNumber={session.currentQuestionIndex + 1}
            totalQuestions={session.questions.length}
            onAnswer={handleAnswer}
            timeStarted={session.startTime}
          />
        </AnimatePresence>
      </div>

      {/* Mobile Timer */}
      <div className="fixed bottom-4 right-4 sm:hidden">
        <div className="bg-white rounded-full shadow-lg p-3">
          <Timer startTime={session.startTime} />
        </div>
      </div>
    </div>
  );
}
