"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { QuizAttempt, QuizAnswer, QuizQuestion } from "@/lib/supabase";
import { QuizService, QuizResult } from "@/lib/quiz";
import { ResultScreen } from "@/components/result/ResultScreen";
import { Top3Celebration } from "@/components/celebration/Top3Celebration";

interface QuizResultData {
  totalQuestions: number;
  correctAnswers: number;
  timeTaken: number;
  answers: QuizAnswer[];
  userName: string;
  language: string;
  questions: QuizQuestion[]; // Add questions data for explanations
}

export default function ResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<QuizResult | null>(null);
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [showUserInfoForm, setShowUserInfoForm] = useState(false);
  const [userMobile, setUserMobile] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [autoSubmitTimer, setAutoSubmitTimer] = useState(30);
  const [isAutoSubmitting, setIsAutoSubmitting] = useState(false);
  const [isTop3Score, setIsTop3Score] = useState(false);
  const [userRank, setUserRank] = useState<number | null>(null);

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

        // Auto-save the result immediately with basic info
        await autoSaveResult(resultData, quizResult);

        // Check if this is a top 3 score
        await checkTop3Score(quizResult.metaScore);

        // Show user info form for additional details
        setShowUserInfoForm(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    processResult();
  }, [router]);

  const handleUserInfoSubmit = useCallback(async () => {
    setIsSubmitting(true);
    setSaveError(null);
    setSaveSuccess(false);
    setAutoSubmitTimer(0); // Stop the timer

    try {
      // Get result data from sessionStorage
      const resultDataStr = sessionStorage.getItem("quizResult");
      if (resultDataStr && result) {
        const resultData: QuizResultData = JSON.parse(resultDataStr);
        await saveQuizAttempt(resultData, result, userMobile, userEmail);
        setShowUserInfoForm(false);
        // Clear session data after successful save
        sessionStorage.removeItem("quizResult");
        // Navigate to leaderboard after successful save
        router.push("/leaderboard");
      }
    } catch (err) {
      console.error("Error saving user info:", err);
      // Error is already handled in saveQuizAttempt
    } finally {
      setIsSubmitting(false);
      setIsAutoSubmitting(false);
    }
  }, [result, userMobile, userEmail, router]);

  // Auto-submit timer effect
  useEffect(() => {
    if (!showUserInfoForm || isSubmitting || saveSuccess) return;

    const timer = setInterval(() => {
      setAutoSubmitTimer((prev) => {
        if (prev <= 1) {
          // Auto-submit when timer reaches 0
          setIsAutoSubmitting(true);
          handleUserInfoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [showUserInfoForm, isSubmitting, saveSuccess, handleUserInfoSubmit]);

  // Auto-hide celebration after 4 seconds
  useEffect(() => {
    if (isTop3Score) {
      const timer = setTimeout(() => {
        setIsTop3Score(false);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [isTop3Score]);

  const checkTop3Score = async (userScore: number) => {
    try {
      // Fetch current leaderboard to check if user's score is in top 3
      const response = await fetch("/api/leaderboard?limit=10");
      if (response.ok) {
        const { topEntries } = await response.json();

        // Check if user's score would be in top 3
        const top3Scores = topEntries
          .slice(0, 3)
          .map((entry: { best_score: number }) => entry.best_score);
        const isInTop3 =
          top3Scores.length < 3 || userScore >= Math.min(...top3Scores);

        if (isInTop3) {
          // Calculate user's rank
          const betterScores = topEntries.filter(
            (entry: { best_score: number }) => entry.best_score > userScore
          ).length;
          const rank = betterScores + 1;

          setIsTop3Score(true);
          setUserRank(rank);
        }
      }
    } catch (err) {
      console.error("Error checking top 3 score:", err);
      // Don't throw error, just don't show celebration
    }
  };

  const autoSaveResult = async (
    resultData: QuizResultData,
    quizResult: QuizResult
  ) => {
    try {
      // Generate a temporary mobile number for auto-save
      const tempMobile = `temp_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`;

      const attempt: Omit<QuizAttempt, "id" | "created_at"> = {
        user_name: resultData.userName,
        user_mobile: tempMobile,
        user_email: "",
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

      if (response.ok) {
        const result = await response.json();
        // Store the attempt ID for potential updates
        sessionStorage.setItem("currentAttemptId", result.data?.[0]?.id || "");
        sessionStorage.setItem("tempMobile", tempMobile);
      }
    } catch (err) {
      console.error("Error auto-saving result:", err);
      // Don't throw error for auto-save failures
    }
  };

  const saveQuizAttempt = async (
    resultData: QuizResultData,
    quizResult: QuizResult,
    mobile: string = "",
    email: string = ""
  ) => {
    try {
      setSaveError(null);

      const currentAttemptId = sessionStorage.getItem("currentAttemptId");
      const tempMobile = sessionStorage.getItem("tempMobile");

      if (currentAttemptId && tempMobile) {
        // Update existing entry
        const updateData = {
          user_mobile: mobile || tempMobile,
          user_email: email,
        };

        const response = await fetch(`/api/quiz/${currentAttemptId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.error ||
              `HTTP ${response.status}: Failed to update quiz attempt`
          );
        }

        const result = await response.json();

        // Store user info in sessionStorage for leaderboard
        if (mobile) sessionStorage.setItem("userMobile", mobile);
        if (email) sessionStorage.setItem("userEmail", email);

        setSaveSuccess(true);
        return result;
      } else {
        // Fallback: create new entry if no existing entry found
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
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.error ||
              `HTTP ${response.status}: Failed to save quiz attempt`
          );
        }

        const result = await response.json();

        // Store user info in sessionStorage for leaderboard
        if (mobile) sessionStorage.setItem("userMobile", mobile);
        if (email) sessionStorage.setItem("userEmail", email);

        setSaveSuccess(true);
        return result;
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to save quiz attempt";
      setSaveError(errorMessage);
      console.error("Error saving quiz attempt:", err);
      throw err;
    }
  };

  const handleRetakeQuiz = () => {
    router.push("/");
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
    <>
      <ResultScreen
        result={result}
        userName={userName}
        onRetakeQuiz={handleRetakeQuiz}
        questions={questions}
        answers={answers}
        showUserInfoForm={showUserInfoForm}
        userMobile={userMobile}
        userEmail={userEmail}
        onMobileChange={setUserMobile}
        onEmailChange={setUserEmail}
        onUserInfoSubmit={handleUserInfoSubmit}
        isSubmitting={isSubmitting}
        saveError={saveError}
        saveSuccess={saveSuccess}
        autoSubmitTimer={autoSubmitTimer}
        isAutoSubmitting={isAutoSubmitting}
      />

      {/* Top 3 Celebration */}
      {result && (
        <Top3Celebration
          isVisible={isTop3Score}
          rank={userRank || 0}
          userName={userName}
          score={result.metaScore}
        />
      )}
    </>
  );
}
