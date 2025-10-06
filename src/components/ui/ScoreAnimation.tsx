"use client";

import { motion } from "framer-motion";
import { Star, Trophy, Zap } from "lucide-react";

interface ScoreAnimationProps {
  score: number;
  isVisible: boolean;
  type?: "score" | "bonus" | "achievement";
}

export function ScoreAnimation({
  score,
  isVisible,
  type = "score",
}: ScoreAnimationProps) {
  const getIcon = () => {
    switch (type) {
      case "bonus":
        return <Zap className="h-6 w-6 text-yellow-500" />;
      case "achievement":
        return <Trophy className="h-6 w-6 text-yellow-500" />;
      default:
        return <Star className="h-6 w-6 text-blue-500" />;
    }
  };

  const getColor = () => {
    switch (type) {
      case "bonus":
        return "text-yellow-600";
      case "achievement":
        return "text-yellow-600";
      default:
        return "text-blue-600";
    }
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, y: 0 }}
      animate={{ opacity: 1, scale: 1, y: -20 }}
      exit={{ opacity: 0, scale: 0, y: -40 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full pointer-events-none z-10"
    >
      <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-lg border">
        {getIcon()}
        <span className={`font-bold text-lg ${getColor()}`}>
          +{Math.round(score)}
        </span>
      </div>
    </motion.div>
  );
}
