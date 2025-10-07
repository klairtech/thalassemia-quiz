"use client";

import { motion } from "framer-motion";
import { Trophy, Medal, Award, Clock, Target } from "lucide-react";
import { LeaderboardEntry } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { formatTime } from "@/lib/utils";

interface LeaderboardTableProps {
  topEntries: LeaderboardEntry[];
  currentUser?: LeaderboardEntry | null;
  currentUserRank?: number | null;
  totalEntries?: number;
  isLoading?: boolean;
}

export function LeaderboardTable({
  topEntries,
  currentUser,
  currentUserRank,
  totalEntries = 0,
  isLoading,
}: LeaderboardTableProps) {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-gray-600">#{rank}</span>;
    }
  };

  const getRankColor = (rank: number, isCurrentUser: boolean = false) => {
    if (isCurrentUser) {
      return "bg-gradient-to-r from-blue-100 to-indigo-100 border-blue-400 ring-2 ring-blue-200";
    }

    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-100 to-yellow-200 border-yellow-300";
      case 2:
        return "bg-gradient-to-r from-gray-100 to-gray-200 border-gray-300";
      case 3:
        return "bg-gradient-to-r from-amber-100 to-amber-200 border-amber-300";
      default:
        return "bg-white border-gray-200";
    }
  };

  const isCurrentUserEntry = (entry: LeaderboardEntry) => {
    if (!currentUser) return false;
    return (
      entry.user_mobile === currentUser.user_mobile &&
      entry.user_name === currentUser.user_name
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-16 bg-gray-200 rounded-lg"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Top 3 Podium */}
      {topEntries.length >= 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-3 gap-4 mb-8"
        >
          {/* 2nd Place */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center"
          >
            <div className="bg-gradient-to-b from-gray-100 to-gray-200 rounded-lg p-4 border-2 border-gray-300">
              <Medal className="h-8 w-8 text-gray-500 mx-auto mb-2" />
              <div className="text-sm font-semibold text-gray-700">
                {topEntries[1]?.user_name || "Anonymous"}
              </div>
              <div className="text-lg font-bold text-gray-600">
                {Math.round(topEntries[1]?.best_score || 0)} pts
              </div>
            </div>
          </motion.div>

          {/* 1st Place */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <div className="bg-gradient-to-b from-yellow-100 to-yellow-200 rounded-lg p-4 border-2 border-yellow-300 transform scale-110">
              <Trophy className="h-10 w-10 text-yellow-500 mx-auto mb-2" />
              <div className="text-sm font-semibold text-yellow-800">
                {topEntries[0]?.user_name || "Anonymous"}
              </div>
              <div className="text-xl font-bold text-yellow-700">
                {Math.round(topEntries[0]?.best_score || 0)} pts
              </div>
            </div>
          </motion.div>

          {/* 3rd Place */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <div className="bg-gradient-to-b from-amber-100 to-amber-200 rounded-lg p-4 border-2 border-amber-300">
              <Award className="h-8 w-8 text-amber-600 mx-auto mb-2" />
              <div className="text-sm font-semibold text-amber-800">
                {topEntries[2]?.user_name || "Anonymous"}
              </div>
              <div className="text-lg font-bold text-amber-700">
                {Math.round(topEntries[2]?.best_score || 0)} pts
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Top 5 Leaderboard Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Top 5 Warriors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {topEntries.map((entry, index) => {
              const rank = index + 1;
              const isCurrentUser = isCurrentUserEntry(entry);

              return (
                <motion.div
                  key={`${entry.user_mobile}-${entry.user_name}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all ${getRankColor(
                    rank,
                    isCurrentUser
                  )}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-8">
                      {getRankIcon(rank)}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800 flex items-center gap-2">
                        {entry.user_name}
                        {isCurrentUser && (
                          <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full font-medium">
                            You
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-sm">
                    <div className="text-center">
                      <div className="font-bold text-lg text-gray-800">
                        {Math.round(entry.best_score)}
                      </div>
                      <div className="text-gray-500">points</div>
                    </div>

                    <div className="text-center">
                      <div className="font-semibold text-gray-700 flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {formatTime(entry.best_time)}
                      </div>
                      <div className="text-gray-500">best time</div>
                    </div>

                    <div className="text-center">
                      <div className="font-semibold text-gray-700 flex items-center gap-1">
                        <Target className="h-4 w-4" />
                        {entry.total_attempts || 1}
                      </div>
                      <div className="text-gray-500">attempts</div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {topEntries.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Trophy className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No scores yet. Be the first to take the quiz!</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Current User Section */}
      {currentUser && currentUserRank && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <Trophy className="h-5 w-5 text-blue-500" />
                Your Position
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 rounded-lg border-2 border-blue-300 bg-white">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-8">
                    <span className="text-lg font-bold text-blue-600">
                      #{currentUserRank}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">
                      {currentUser.user_name}
                    </div>
                    <div className="text-sm text-gray-500">
                      Out of {totalEntries} warriors
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-sm">
                  <div className="text-center">
                    <div className="font-bold text-lg text-gray-800">
                      {Math.round(currentUser.best_score)}
                    </div>
                    <div className="text-gray-500">points</div>
                  </div>

                  <div className="text-center">
                    <div className="font-semibold text-gray-700 flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {formatTime(currentUser.best_time)}
                    </div>
                    <div className="text-gray-500">best time</div>
                  </div>

                  <div className="text-center">
                    <div className="font-semibold text-gray-700 flex items-center gap-1">
                      <Target className="h-4 w-4" />
                      {currentUser.total_attempts || 1}
                    </div>
                    <div className="text-gray-500">attempts</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
