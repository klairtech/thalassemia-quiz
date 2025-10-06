"use client";

import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Home, BookOpen, Trophy, ArrowLeft, RotateCcw } from "lucide-react";
import Image from "next/image";

interface AppHeaderProps {
  showBackButton?: boolean;
  title?: string;
  subtitle?: string;
}

export function AppHeader({
  showBackButton = false,
  title,
  subtitle,
}: AppHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();

  const isHomePage = pathname === "/";
  const isLearnPage = pathname === "/learn";
  const isQuizPage = pathname === "/quiz";
  const isWheelPage = pathname === "/wheel";
  const isLeaderboardPage = pathname === "/leaderboard";

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="w-full max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Left side - Back button or Logo */}
          <div className="flex items-center gap-4">
            {showBackButton ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.back()}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            ) : (
              <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => router.push("/")}
              >
                <Image
                  src="/blood-warriors-logo.png"
                  alt="Blood Warriors"
                  width={120}
                  height={32}
                  className="h-8 w-auto object-contain"
                />
              </div>
            )}

            {/* Page title */}
            {title && (
              <div>
                <h1 className="text-xl font-bold text-gray-900">{title}</h1>
                {subtitle && (
                  <p className="text-sm text-gray-600">{subtitle}</p>
                )}
              </div>
            )}
          </div>

          {/* Right side - Navigation */}
          <nav className="flex items-center gap-2">
            {!isHomePage && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/")}
                className="flex items-center gap-2"
              >
                <Home className="h-4 w-4" />
                Home
              </Button>
            )}

            {!isLearnPage && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/learn")}
                className="flex items-center gap-2"
              >
                <BookOpen className="h-4 w-4" />
                Learn
              </Button>
            )}

            {!isQuizPage && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/quiz")}
                className="flex items-center gap-2"
              >
                Quiz
              </Button>
            )}

            {!isWheelPage && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/wheel")}
                className="flex items-center gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Spin the Wheel
              </Button>
            )}

            {!isLeaderboardPage && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/leaderboard")}
                className="flex items-center gap-2"
              >
                <Trophy className="h-4 w-4" />
                Leaderboard
              </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
