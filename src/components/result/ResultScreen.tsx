"use client";

import { motion } from "framer-motion";
import { Trophy, Clock, Target, Star, Share2, BookOpen } from "lucide-react";
import { QuizResult } from "@/lib/quiz";
import { QuizQuestion, QuizAnswer } from "@/lib/supabase";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

interface ResultScreenProps {
  result: QuizResult;
  userName: string;
  onRetakeQuiz: () => void;
  onViewLeaderboard: () => void;
  onLearnMore: () => void;
  questions?: QuizQuestion[];
  answers?: QuizAnswer[];
  showUserInfoForm?: boolean;
  userMobile?: string;
  userEmail?: string;
  onMobileChange?: (mobile: string) => void;
  onEmailChange?: (email: string) => void;
  onUserInfoSubmit?: () => void;
  isSubmitting?: boolean;
  saveError?: string | null;
  saveSuccess?: boolean;
  autoSubmitTimer?: number;
  isAutoSubmitting?: boolean;
}

export function ResultScreen({
  result,
  userName,
  onRetakeQuiz,
  onViewLeaderboard,
  onLearnMore,
  questions = [],
  answers = [],
  showUserInfoForm = false,
  userMobile = "",
  userEmail = "",
  onMobileChange,
  onEmailChange,
  onUserInfoSubmit,
  isSubmitting = false,
  saveError = null,
  saveSuccess = false,
  autoSubmitTimer = 0,
  isAutoSubmitting = false,
}: ResultScreenProps) {
  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "A+":
      case "A":
        return "text-green-600 bg-green-100";
      case "B+":
      case "B":
        return "text-blue-600 bg-blue-100";
      case "C+":
      case "C":
        return "text-yellow-600 bg-yellow-100";
      case "D":
        return "text-orange-600 bg-orange-100";
      case "F":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getGradeIcon = (grade: string) => {
    if (grade === "A+" || grade === "A") {
      return <Trophy className="h-8 w-8 text-yellow-500" />;
    }
    return <Star className="h-8 w-8 text-blue-500" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Congratulations, {userName}! 🎉
          </h1>
          <p className="text-lg text-gray-600">
            You&apos;ve completed the Thalassemia Awareness Quiz
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Main Result Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  {getGradeIcon(result.grade)}
                </div>
                <CardTitle className="text-2xl">
                  <span
                    className={`px-4 py-2 rounded-full text-2xl font-bold ${getGradeColor(
                      result.grade
                    )}`}
                  >
                    Grade: {result.grade}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {Math.round(result.metaScore)} pts
                </div>
                <p className="text-gray-600 mb-4">{result.message}</p>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Accuracy:</span>
                    <span className="font-semibold">
                      {Math.round(result.accuracy)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time Bonus:</span>
                    <span className="font-semibold">
                      +{Math.round(result.timeBonus)} pts
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Stats Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Quiz Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Target className="h-5 w-5 text-green-500" />
                  <div className="flex-1">
                    <div className="text-sm text-gray-600">Correct Answers</div>
                    <div className="text-lg font-semibold">
                      {result.correctAnswers} / {result.totalQuestions}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-blue-500" />
                  <div className="flex-1">
                    <div className="text-sm text-gray-600">Time Taken</div>
                    <div className="text-lg font-semibold">
                      {Math.floor(result.timeTaken / 60)}:
                      {(result.timeTaken % 60).toString().padStart(2, "0")}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Star className="h-5 w-5 text-purple-500" />
                  <div className="flex-1">
                    <div className="text-sm text-gray-600">Meta Score</div>
                    <div className="text-lg font-semibold">
                      {Math.round(result.metaScore)} / 130
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* User Info Collection Form */}
        {showUserInfoForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-8"
          >
            <div className="relative">
              {/* Enhanced background glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#f14164]/10 via-blue-100/10 to-[#f14164]/10 rounded-3xl blur-xl"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-blue-50/20 rounded-3xl blur-lg"></div>

              <Card className="relative bg-white/95 backdrop-blur-md border border-white/30 rounded-3xl shadow-2xl overflow-hidden">
                {/* Decorative top accent */}
                <div className="h-1 bg-gradient-to-r from-[#f14164] via-blue-500 to-[#f14164]"></div>

                <CardHeader className="text-center pb-6 pt-8">
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                    className="relative mx-auto mb-6"
                  >
                    {/* Enhanced icon with glow effect */}
                    <div className="relative w-16 h-16 mx-auto">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#f14164] to-blue-500 rounded-2xl blur-lg opacity-30 scale-110"></div>
                      <div className="relative w-full h-full bg-gradient-to-br from-[#f14164] to-blue-500 rounded-2xl flex items-center justify-center shadow-xl">
                        <Star className="h-8 w-8 text-white" />
                      </div>
                      {/* Floating accent elements */}
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-blue-400 to-[#f14164] rounded-full shadow-lg"></div>
                      <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-gradient-to-r from-[#f14164] to-blue-400 rounded-full shadow-md"></div>
                    </div>
                  </motion.div>

                  <CardTitle className="text-3xl font-bold text-gray-800 mb-3">
                    Help Us Track Your Progress
                  </CardTitle>
                  <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
                    Join our community of Thalassemia awareness warriors! Share
                    your contact information to help us track quiz participation
                    and send you updates about Thalassemia awareness.
                  </p>
                  <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#f14164]/10 to-blue-100/10 rounded-full border border-[#f14164]/20">
                    <div className="w-2 h-2 bg-[#f14164] rounded-full animate-pulse"></div>
                    <span className="text-sm text-[#f14164] font-medium">
                      All fields are optional
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  {/* Error Message */}
                  {saveError && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center">
                          <span className="text-white text-sm font-bold">
                            !
                          </span>
                        </div>
                        <div>
                          <p className="text-red-700 font-semibold">
                            Failed to save quiz attempt
                          </p>
                          <p className="text-red-600 text-sm mt-1">
                            {saveError}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Success Message */}
                  {saveSuccess && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mb-6 p-4 bg-green-50 border-2 border-green-200 rounded-xl"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                          <span className="text-white text-sm font-bold">
                            ✓
                          </span>
                        </div>
                        <div>
                          <p className="text-green-700 font-semibold">
                            Quiz attempt saved successfully!
                          </p>
                          <p className="text-green-600 text-sm mt-1">
                            Your score has been recorded on the leaderboard.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Mobile Number Field */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      className="space-y-3"
                    >
                      <label
                        htmlFor="mobile"
                        className="block text-sm font-semibold text-gray-700 flex items-center gap-2"
                      >
                        <div className="w-6 h-6 bg-gradient-to-r from-[#f14164] to-blue-500 rounded-md flex items-center justify-center">
                          <span className="text-white text-xs font-bold">
                            📱
                          </span>
                        </div>
                        Mobile Number
                        <span className="text-xs text-gray-500 font-normal">
                          (Optional)
                        </span>
                      </label>
                      <div className="relative">
                        <input
                          id="mobile"
                          type="tel"
                          value={userMobile}
                          onChange={(e) => onMobileChange?.(e.target.value)}
                          placeholder="Enter your mobile number"
                          className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#f14164]/20 focus:border-[#f14164] transition-all duration-300 bg-white/80 backdrop-blur-sm text-base placeholder-gray-400"
                        />
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#f14164]/5 to-blue-100/5 pointer-events-none"></div>
                      </div>
                    </motion.div>

                    {/* Email Field */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                      className="space-y-3"
                    >
                      <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-gray-700 flex items-center gap-2"
                      >
                        <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-[#f14164] rounded-md flex items-center justify-center">
                          <span className="text-white text-xs font-bold">
                            ✉️
                          </span>
                        </div>
                        Email Address
                        <span className="text-xs text-gray-500 font-normal">
                          (Optional)
                        </span>
                      </label>
                      <div className="relative">
                        <input
                          id="email"
                          type="email"
                          value={userEmail}
                          onChange={(e) => onEmailChange?.(e.target.value)}
                          placeholder="Enter your email address"
                          className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#f14164]/20 focus:border-[#f14164] transition-all duration-300 bg-white/80 backdrop-blur-sm text-base placeholder-gray-400"
                        />
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-100/5 to-[#f14164]/5 pointer-events-none"></div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Enhanced instruction text with timer */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="mt-6 p-4 bg-gradient-to-r from-[#f14164]/5 via-blue-100/5 to-[#f14164]/5 rounded-xl border border-[#f14164]/10"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-[#f14164] to-blue-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm">💡</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-700 font-medium">
                          Ready to save your progress?
                        </p>
                        <p className="text-gray-600 text-sm mt-1">
                          Click &quot;Save & Continue&quot; below to record your
                          quiz results and continue exploring our platform.
                        </p>
                      </div>
                      {autoSubmitTimer > 0 && (
                        <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-[#f14164]/10 to-blue-100/10 rounded-lg border border-[#f14164]/20">
                          <div className="w-2 h-2 bg-[#f14164] rounded-full animate-pulse"></div>
                          <span className="text-sm text-[#f14164] font-semibold">
                            Auto-submit in {autoSubmitTimer}s
                          </span>
                        </div>
                      )}
                      {isAutoSubmitting && (
                        <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-100/10 to-[#f14164]/10 rounded-lg border border-blue-200/20">
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                          <span className="text-sm text-blue-600 font-semibold">
                            Auto-submitting...
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          {showUserInfoForm && (
            <Button
              onClick={onUserInfoSubmit}
              disabled={isSubmitting}
              size="lg"
              className="flex items-center gap-2 bg-gradient-to-r from-[#f14164] to-[#d6335a] hover:from-[#d6335a] hover:to-[#c22d4f] text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isSubmitting ? "Saving..." : "Save & Continue"}
            </Button>
          )}

          <Button
            onClick={onRetakeQuiz}
            variant="outline"
            size="lg"
            className="flex items-center gap-2"
          >
            <Target className="h-4 w-4" />
            Retake Quiz
          </Button>

          <Button
            onClick={onViewLeaderboard}
            variant="outline"
            size="lg"
            className="flex items-center gap-2"
          >
            <Trophy className="h-4 w-4" />
            View Leaderboard
          </Button>

          <Button
            onClick={onLearnMore}
            size="lg"
            className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
          >
            <BookOpen className="h-4 w-4" />
            Learn More About Thalassemia
          </Button>
        </motion.div>

        {/* Detailed Explanations Section */}
        {questions.length > 0 && answers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8"
          >
            <Card className="bg-white/90 backdrop-blur-sm border border-white/20 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <BookOpen className="h-6 w-6 text-[#f14164]" />
                  Quiz Review & Explanations
                </CardTitle>
                <p className="text-gray-600">
                  Review your answers and learn why each answer is correct or
                  incorrect
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {questions.map((question, index) => {
                  const answer = answers[index];
                  const isCorrect = answer?.is_correct;

                  return (
                    <div
                      key={question.id}
                      className={`p-6 rounded-xl border-2 ${
                        isCorrect
                          ? "border-green-200 bg-green-50"
                          : "border-red-200 bg-red-50"
                      }`}
                    >
                      <div className="flex items-start gap-3 mb-4">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                            isCorrect ? "bg-green-500" : "bg-red-500"
                          }`}
                        >
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold text-gray-800">
                              {question.question}
                            </h4>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-bold ${
                                isCorrect
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              {isCorrect ? "✓ Correct" : "✗ Incorrect"}
                            </span>
                          </div>

                          {/* Your Answer Summary */}
                          {!isCorrect && (
                            <div className="mb-4 p-3 bg-red-100 border border-red-200 rounded-lg">
                              <h5 className="font-semibold text-red-800 mb-1">
                                Your Answer:
                              </h5>
                              <p className="text-red-700">
                                {Array.isArray(answer?.selected_answer)
                                  ? answer.selected_answer
                                      .map(
                                        (opt: number) =>
                                          String.fromCharCode(65 + opt) +
                                          ". " +
                                          question.options[opt]
                                      )
                                      .join(", ")
                                  : answer?.selected_answer !== undefined
                                  ? String.fromCharCode(
                                      65 + answer.selected_answer
                                    ) +
                                    ". " +
                                    question.options[answer.selected_answer]
                                  : "No answer selected"}
                              </p>
                            </div>
                          )}

                          {/* Correct Answer Summary */}
                          <div className="mb-4 p-3 bg-green-100 border border-green-200 rounded-lg">
                            <h5 className="font-semibold text-green-800 mb-1">
                              Correct Answer:
                            </h5>
                            <p className="text-green-700">
                              {(Array.isArray(question.correct_answer)
                                ? question.correct_answer
                                : [question.correct_answer]
                              )
                                .map(
                                  (opt: number) =>
                                    String.fromCharCode(65 + opt) +
                                    ". " +
                                    question.options[opt]
                                )
                                .join(", ")}
                            </p>
                          </div>

                          {/* Options with Explanations */}
                          <div className="space-y-2">
                            <h5 className="font-semibold text-gray-700 mb-2">
                              All Options Explained:
                            </h5>
                            {question.options.map(
                              (option: string, optionIndex: number) => {
                                const isSelected = Array.isArray(
                                  answer?.selected_answer
                                )
                                  ? answer.selected_answer.includes(optionIndex)
                                  : answer?.selected_answer === optionIndex;
                                const isCorrectOption = Array.isArray(
                                  question.correct_answer
                                )
                                  ? question.correct_answer.includes(
                                      optionIndex
                                    )
                                  : question.correct_answer === optionIndex;

                                return (
                                  <div
                                    key={optionIndex}
                                    className={`p-3 rounded-lg border ${
                                      isCorrectOption
                                        ? "border-green-300 bg-green-100"
                                        : isSelected && !isCorrectOption
                                        ? "border-red-300 bg-red-100"
                                        : "border-gray-200 bg-gray-50"
                                    }`}
                                  >
                                    <div className="flex items-center gap-2 mb-2">
                                      <span className="font-medium text-gray-700">
                                        {String.fromCharCode(65 + optionIndex)}.{" "}
                                        {option}
                                      </span>
                                      {isCorrectOption && (
                                        <span className="text-green-600 font-bold text-sm bg-green-200 px-2 py-1 rounded">
                                          ✓ Correct Answer
                                        </span>
                                      )}
                                      {isSelected && !isCorrectOption && (
                                        <span className="text-red-600 font-bold text-sm bg-red-200 px-2 py-1 rounded">
                                          ✗ Your Answer
                                        </span>
                                      )}
                                    </div>
                                    {question.option_explanations &&
                                      question.option_explanations[
                                        optionIndex
                                      ] && (
                                        <p className="text-sm text-gray-600 italic">
                                          {
                                            question.option_explanations[
                                              optionIndex
                                            ]
                                          }
                                        </p>
                                      )}
                                  </div>
                                );
                              }
                            )}
                          </div>

                          {/* Overall Explanation */}
                          {question.correct_answer_explanation && (
                            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                              <h5 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                                <BookOpen className="h-4 w-4" />
                                Why This Answer is Correct:
                              </h5>
                              <p className="text-blue-700">
                                {question.correct_answer_explanation}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Share Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-600 mb-4">
            Share your achievement and help spread Thalassemia awareness!
          </p>
          <Button
            variant="outline"
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: "Thalassemia Awareness Quiz",
                  text: `I scored ${Math.round(
                    result.metaScore
                  )} points on the Thalassemia Awareness Quiz! Grade: ${
                    result.grade
                  }`,
                  url: window.location.origin,
                });
              } else {
                // Fallback to copying to clipboard
                navigator.clipboard.writeText(
                  `I scored ${Math.round(
                    result.metaScore
                  )} points on the Thalassemia Awareness Quiz! Grade: ${
                    result.grade
                  }`
                );
              }
            }}
            className="flex items-center gap-2"
          >
            <Share2 className="h-4 w-4" />
            Share Result
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
