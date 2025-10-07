"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, RefreshCw, Trophy } from "lucide-react";
import { LeaderboardEntry } from "@/lib/supabase";
import { LeaderboardTable } from "@/components/leaderboard/LeaderboardTable";
import { Button } from "@/components/ui/Button";
import { AppHeader } from "@/components/navigation/AppHeader";

export default function LeaderboardPage() {
  const router = useRouter();
  const [topEntries, setTopEntries] = useState<LeaderboardEntry[]>([]);
  const [currentUser, setCurrentUser] = useState<LeaderboardEntry | null>(null);
  const [currentUserRank, setCurrentUserRank] = useState<number | null>(null);
  const [totalEntries, setTotalEntries] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Get current user info from sessionStorage
      const userName = sessionStorage.getItem("userName");
      const userMobile = sessionStorage.getItem("userMobile");
      const userEmail = sessionStorage.getItem("userEmail");

      // If no user identification found, show message
      if (!userName && !userMobile && !userEmail) {
        setError(
          "Please take a quiz first to see your position on the leaderboard."
        );
        setIsLoading(false);
        return;
      }

      // Build query parameters
      const params = new URLSearchParams();
      if (userName) params.append("currentUserName", userName);
      if (userMobile) params.append("currentUserMobile", userMobile);
      if (userEmail) params.append("currentUserEmail", userEmail);

      // Fetch leaderboard data from API route
      const response = await fetch(`/api/leaderboard?${params.toString()}`);

      if (!response.ok) {
        throw new Error("Failed to load leaderboard");
      }

      const { topEntries, currentUser, currentUserRank, totalEntries } =
        await response.json();
      setTopEntries(topEntries || []);
      setCurrentUser(currentUser);
      setCurrentUserRank(currentUserRank);
      setTotalEntries(totalEntries || 0);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToHome = () => {
    router.push("/");
  };

  const handleRefresh = () => {
    loadLeaderboard();
  };

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
              Back to Home
            </Button>

            <Button
              onClick={handleRefresh}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              disabled={isLoading}
            >
              <RefreshCw
                className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-6"
          >
            <div className="flex items-center justify-center gap-3 mb-2">
              <Trophy className="h-8 w-8 text-yellow-500" />
              <h1 className="text-3xl font-bold text-gray-800">Leaderboard</h1>
            </div>
            <p className="text-gray-600">
              Top performers in the Thalassemia Awareness Quiz
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {error ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md mx-auto"
          >
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              <p className="font-semibold">Error</p>
              <p>{error}</p>
            </div>
            <Button onClick={handleRefresh} variant="outline">
              Try Again
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <LeaderboardTable
              topEntries={topEntries}
              currentUser={currentUser}
              currentUserRank={currentUserRank}
              totalEntries={totalEntries}
              isLoading={isLoading}
            />
          </motion.div>
        )}

        {/* Call to Action */}
        {!isLoading && !error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center mt-12"
          >
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg p-6 max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Ready to take the quiz?
              </h3>
              <p className="text-gray-600 mb-4">
                Test your knowledge about Thalassemia and see if you can make it
                to the top!
              </p>
              <Button
                onClick={() => router.push("/")}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
              >
                Start Quiz
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
