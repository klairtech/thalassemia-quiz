"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Star, Crown, Sparkles } from "lucide-react";

interface Top3CelebrationProps {
  isVisible: boolean;
  rank: number;
  userName: string;
  score: number;
}

export function Top3Celebration({
  isVisible,
  rank,
  userName,
  score,
}: Top3CelebrationProps) {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-16 w-16 text-yellow-500" />;
      case 2:
        return <Trophy className="h-16 w-16 text-gray-400" />;
      case 3:
        return <Trophy className="h-16 w-16 text-amber-600" />;
      default:
        return <Trophy className="h-16 w-16 text-blue-500" />;
    }
  };

  const getRankTitle = (rank: number) => {
    switch (rank) {
      case 1:
        return "CHAMPION!";
      case 2:
        return "RUNNER-UP!";
      case 3:
        return "THIRD PLACE!";
      default:
        return "TOP SCORE!";
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "from-yellow-400 via-yellow-500 to-yellow-600";
      case 2:
        return "from-gray-300 via-gray-400 to-gray-500";
      case 3:
        return "from-amber-400 via-amber-500 to-amber-600";
      default:
        return "from-blue-400 via-blue-500 to-blue-600";
    }
  };

  const getRankBgColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "from-yellow-50 via-yellow-100 to-yellow-200";
      case 2:
        return "from-gray-50 via-gray-100 to-gray-200";
      case 3:
        return "from-amber-50 via-amber-100 to-amber-200";
      default:
        return "from-blue-50 via-blue-100 to-blue-200";
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          {/* Confetti Effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: -10,
                  rotate: 0,
                  opacity: 1,
                }}
                animate={{
                  y: window.innerHeight + 10,
                  rotate: 360,
                  opacity: 0,
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  delay: Math.random() * 2,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  backgroundColor: [
                    "#fbbf24",
                    "#f59e0b",
                    "#d97706",
                    "#92400e",
                    "#f97316",
                    "#ea580c",
                  ][Math.floor(Math.random() * 6)],
                }}
              />
            ))}
          </div>

          {/* Celebration Modal */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className={`relative bg-gradient-to-br ${getRankBgColor(
              rank
            )} p-8 rounded-3xl shadow-2xl border-4 border-white/20 max-w-md mx-4 text-center`}
          >
            {/* Sparkle Effects */}
            <div className="absolute -top-2 -right-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="h-8 w-8 text-yellow-400" />
              </motion.div>
            </div>
            <div className="absolute -top-2 -left-2">
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Star className="h-6 w-6 text-yellow-400" />
              </motion.div>
            </div>
            <div className="absolute -bottom-2 -right-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="h-6 w-6 text-yellow-400" />
              </motion.div>
            </div>

            {/* Main Content */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              className="mb-6"
            >
              {getRankIcon(rank)}
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className={`text-4xl font-bold bg-gradient-to-r ${getRankColor(
                rank
              )} bg-clip-text text-transparent mb-2`}
            >
              {getRankTitle(rank)}
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="text-xl font-semibold text-gray-800 mb-2"
            >
              Congratulations, {userName}!
            </motion.p>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="text-lg text-gray-700 mb-4"
            >
              You achieved #{rank} position with {Math.round(score)} points!
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.3 }}
              className="flex justify-center gap-2"
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.5 + i * 0.1 }}
                >
                  <Star className="h-6 w-6 text-yellow-400 fill-current" />
                </motion.div>
              ))}
            </motion.div>

            {/* Auto-close after 4 seconds */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 4, ease: "linear" }}
              className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-green-400 to-blue-500 rounded-b-3xl"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
