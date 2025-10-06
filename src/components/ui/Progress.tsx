"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
  showPercentage?: boolean;
  animated?: boolean;
}

export function Progress({
  value,
  max = 100,
  className,
  showPercentage = false,
  animated = true,
}: ProgressProps) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className={cn("w-full", className)}>
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-secondary">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
          initial={{ width: 0 }}
          animate={{ width: animated ? `${percentage}%` : `${percentage}%` }}
          transition={{ duration: animated ? 0.5 : 0 }}
        />
      </div>
      {showPercentage && (
        <div className="mt-1 text-center text-sm text-muted-foreground">
          {Math.round(percentage)}%
        </div>
      )}
    </div>
  );
}
