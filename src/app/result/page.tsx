"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { supabase, QuizAttempt, QuizAnswer } from "@/lib/supabase";
import { QuizService, QuizResult } from "@/lib/quiz";
import { ResultScreen } from "@/components/result/ResultScreen";

interface QuizResultData {
  totalQuestions: number;
  correctAnswers: number;
  timeTaken: number;
  answers: QuizAnswer[];
  userName: string;
  language: string;
  questions: any[]; // Add questions data for explanations
}

export default function ResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<QuizResult | null>(null);
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<any[]>([]);
  const [showUserInfoForm, setShowUserInfoForm] = useState(false);
  const [userMobile, setUserMobile] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const processResult = async () => {
      try {
        // Get result data from sessionStorage
        const resultDataStr = sessionStorage.getItem("quizResult");
        if (!resultDataStr) {
          router.push("/");
          return;
        }

        const resultData: QuizResultData = JSON.parse(resultDataStr);
        setUserName(resultData.userName);
        setQuestions(resultData.questions || []);
        setAnswers(resultData.answers || []);

        // Calculate quiz result
        const quizResult = QuizService.generateQuizResult(
          resultData.totalQuestions,
          resultData.correctAnswers,
          resultData.timeTaken
        );

        setResult(quizResult);

        // Show user info form instead of immediately saving
        setShowUserInfoForm(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    processResult();
  }, [router]);

  const saveQuizAttempt = async (
    resultData: QuizResultData,
    quizResult: QuizResult,
    mobile: string = "",
    email: string = ""
  ) => {
    try {
      const attempt: Omit<QuizAttempt, "id" | "created_at"> = {
        user_name: resultData.userName,
        user_mobile: mobile,
        user_email: email,
        language: resultData.language,
        questions_answered: resultData.totalQuestions,
        correct_answers: resultData.correctAnswers,
        time_taken_seconds: resultData.timeTaken,
        meta_score: quizResult.metaScore,
        answers: resultData.answers,
      };

      const response = await fetch("/api/quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(attempt),
      });

      if (!response.ok) {
        console.error("Failed to save quiz attempt");
      }
    } catch (err) {
      console.error("Error saving quiz attempt:", err);
    }
  };

  const handleRetakeQuiz = () => {
    router.push("/");
  };

  const handleViewLeaderboard = () => {
    router.push("/leaderboard");
  };

  const handleLearnMore = () => {
    // Open external link to learn more about Thalassemia
    window.open(
      "https://www.who.int/news-room/fact-sheets/detail/thalassaemia",
      "_blank"
    );
  };

  const handleUserInfoSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Get result data from sessionStorage
      const resultDataStr = sessionStorage.getItem("quizResult");
      if (resultDataStr && result) {
        const resultData: QuizResultData = JSON.parse(resultDataStr);
        await saveQuizAttempt(resultData, result, userMobile, userEmail);
        setShowUserInfoForm(false);
        // Clear session data after successful save
        sessionStorage.removeItem("quizResult");
      }
    } catch (err) {
      console.error("Error saving user info:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Calculating your results...</p>
        </motion.div>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p className="font-semibold">Error</p>
            <p>{error || "Unable to load results"}</p>
          </div>
          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <ResultScreen
      result={result}
      userName={userName}
      onRetakeQuiz={handleRetakeQuiz}
      onViewLeaderboard={handleViewLeaderboard}
      onLearnMore={handleLearnMore}
      questions={questions}
      answers={answers}
      showUserInfoForm={showUserInfoForm}
      userMobile={userMobile}
      userEmail={userEmail}
      onMobileChange={setUserMobile}
      onEmailChange={setUserEmail}
      onUserInfoSubmit={handleUserInfoSubmit}
      isSubmitting={isSubmitting}
    />
  );
}
