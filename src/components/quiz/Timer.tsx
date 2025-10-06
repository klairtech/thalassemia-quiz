"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { formatTime } from "@/lib/utils";

interface TimerProps {
  startTime: Date;
  onTimeUpdate?: (seconds: number) => void;
  className?: string;
}

export function Timer({ startTime, onTimeUpdate, className }: TimerProps) {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const elapsed = Math.floor((now.getTime() - startTime.getTime()) / 1000);
      setElapsedTime(elapsed);
      onTimeUpdate?.(elapsed);
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, onTimeUpdate]);

  return (
    <motion.div
      className={`flex items-center gap-2 ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Clock className="h-5 w-5 text-blue-600" />
      <span className="font-mono text-lg font-semibold text-gray-700">
        {formatTime(elapsedTime)}
      </span>
    </motion.div>
  );
}
