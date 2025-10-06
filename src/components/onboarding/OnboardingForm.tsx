"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Globe, ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { SUPPORTED_LANGUAGES } from "@/lib/translate";
import { useRouter } from "next/navigation";

interface OnboardingFormProps {
  onSubmit: (data: { name: string; language: string }) => void;
}

export function OnboardingForm({ onSubmit }: OnboardingFormProps) {
  const [name, setName] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    // Simulate a small delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 500));
    onSubmit({ name: name.trim(), language: selectedLanguage });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto mb-4 w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center"
            >
              <span className="text-2xl">🩸</span>
            </motion.div>
            <CardTitle className="text-2xl font-bold text-gray-800">
              Thalassemia Awareness Quiz
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Test your knowledge and help build a Thalassemia-free India by
              2035
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  <User className="inline h-4 w-4 mr-1" />
                  Your Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </motion.div>

              {/* Language Selection */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Globe className="inline h-4 w-4 mr-1" />
                  Preferred Language
                </label>
                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <motion.button
                      key={lang.code}
                      type="button"
                      onClick={() => setSelectedLanguage(lang.code)}
                      className={`p-3 rounded-lg border-2 text-left transition-all ${
                        selectedLanguage === lang.code
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-200 hover:border-gray-300 text-gray-700"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{lang.flag}</span>
                        <span className="text-sm font-medium">{lang.name}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Button
                  type="submit"
                  disabled={!name.trim() || isSubmitting}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
                  size="lg"
                  loading={isSubmitting}
                >
                  {isSubmitting ? "Starting Quiz..." : "Start Quiz"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </form>

            {/* Learn About Thalassemia Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/learn")}
                className="w-full border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300"
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Learn About Thalassemia
              </Button>
            </motion.div>

            {/* Quiz Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200"
            >
              <h3 className="font-semibold text-red-800 mb-2">
                Quiz Information:
              </h3>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• Maximum 3 questions per session</li>
                <li>
                  • Multiple choice, True/False, and Multi-select questions
                </li>
                <li>• Score based on accuracy and speed</li>
                <li>• Learn about Thalassemia prevention and blood donation</li>
              </ul>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
