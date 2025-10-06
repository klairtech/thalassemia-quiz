"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, BookOpen, Sword, Target, Trophy, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface WizardOnboardingProps {
  onSubmit: (data: { name: string; language: string }) => void;
}

export function WizardOnboarding({ onSubmit }: WizardOnboardingProps) {
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    onSubmit({ name: name.trim(), language: "en" });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 relative overflow-hidden">
      {/* Blood Warriors Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating warrior-themed shapes */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-pink-200/20 to-rose-100/20 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-rose-100/20 to-pink-200/20 rounded-full opacity-30 animate-pulse delay-1000"></div>

        {/* Floating warrior icons */}
        <motion.div
          animate={{
            y: [0, -15, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-16 left-16 w-6 h-6 text-pink-400 opacity-40"
        >
          <Sword className="w-full h-full" />
        </motion.div>

        <motion.div
          animate={{
            y: [0, 12, 0],
            rotate: [0, -8, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute top-24 right-20 w-4 h-4 bg-gradient-to-r from-rose-400 to-pink-400 rounded-lg opacity-35 transform rotate-45"
        ></motion.div>

        <motion.div
          animate={{
            y: [0, -8, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-20 left-20 w-3 h-3 text-pink-500 opacity-45"
        >
          <Trophy className="w-full h-full" />
        </motion.div>

        {/* Subtle warrior pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23f14164%22%20fill-opacity%3D%220.02%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-5xl">
          {/* Compact Header with Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-6"
          >
            {/* Enhanced Blood Warriors Logo */}
            <div className="flex justify-center mb-6">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Enhanced background glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-pink-200/30 to-rose-100/30 rounded-2xl blur-xl scale-110"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-100/20 to-rose-50/20 rounded-2xl blur-lg"></div>

                {/* Main logo container */}
                <div className="relative bg-white/98 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-pink-100/40 overflow-hidden">
                  {/* Decorative top accent */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500"></div>

                  {/* Logo content */}
                  <div className="flex items-center justify-center">
                    <Image
                      src="/blood-warriors-logo.png"
                      alt="Blood Warriors"
                      width={240}
                      height={72}
                      className="h-14 w-auto object-contain"
                      priority
                    />
                  </div>

                  {/* Floating accent elements */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg shadow-lg transform rotate-45"
                  ></motion.div>

                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                    className="absolute -bottom-2 -left-2 w-5 h-5 bg-gradient-to-r from-rose-400 to-pink-400 rounded-lg shadow-md transform -rotate-45"
                  ></motion.div>

                  {/* Subtle pattern overlay */}
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23f14164%22%20fill-opacity%3D%220.02%22%3E%3Ccircle%20cx%3D%2220%22%20cy%3D%2220%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
                </div>
              </motion.div>
            </div>

            {/* Blood Warriors Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-3"
            >
              <h1 className="text-2xl md:text-4xl font-light bg-gradient-to-r from-pink-600 via-rose-500 to-pink-600 bg-clip-text text-transparent mb-2 leading-tight">
                Thalassemia Warriors Quiz
              </h1>
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-8 h-0.5 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full"></div>
                <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full transform rotate-45"></div>
                <div className="w-8 h-0.5 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full"></div>
              </div>
            </motion.div>

            {/* Blood Warriors Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="max-w-2xl mx-auto"
            >
              <p className="text-base md:text-lg text-gray-600 font-light leading-relaxed mb-3">
                Join the Blood Warriors and help build a
                <span className="text-pink-600 font-medium">
                  {" "}
                  Thalassemia-free India by 2035
                </span>
              </p>
              <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Target className="w-3 h-3 text-pink-500" />
                  <span className="font-light">Challenge</span>
                </div>
                <div className="flex items-center gap-1">
                  <Trophy className="w-3 h-3 text-rose-500" />
                  <span className="font-light">Victory</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3 text-pink-400" />
                  <span className="font-light">Community</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 items-center">
            {/* Left Side - Compact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="order-2 lg:order-1"
            >
              <div className="relative">
                {/* Blood Warriors glassmorphism effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-pink-100/10 to-rose-100/10 rounded-2xl blur-lg"></div>
                <Card className="relative shadow-xl border-0 bg-white/95 backdrop-blur-md rounded-2xl overflow-hidden">
                  {/* Decorative top border */}
                  <div className="h-0.5 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500"></div>

                  <CardHeader className="text-center pb-4 pt-6">
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        delay: 0.7,
                        type: "spring",
                        stiffness: 200,
                      }}
                      className="relative mx-auto mb-4"
                    >
                      {/* Modern geometric design */}
                      <div className="relative w-20 h-20 mx-auto">
                        {/* Main geometric shape */}
                        <div className="relative w-full h-full bg-gradient-to-br from-pink-500 via-rose-500 to-pink-600 rounded-2xl shadow-xl transform rotate-3">
                          {/* Inner geometric pattern */}
                          <div className="absolute inset-2 bg-gradient-to-br from-pink-400 to-rose-400 rounded-xl opacity-40 transform -rotate-3"></div>

                          {/* Central accent */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-8 h-8 bg-white/20 rounded-lg transform rotate-12"></div>
                          </div>

                          {/* Corner accents */}
                          <div className="absolute top-1 left-1 w-3 h-3 bg-white/30 rounded-full"></div>
                          <div className="absolute bottom-1 right-1 w-3 h-3 bg-white/30 rounded-full"></div>
                        </div>

                        {/* Floating accent elements */}
                        <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full shadow-lg"></div>
                        <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full shadow-md"></div>
                      </div>

                      {/* Outer glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-rose-400 rounded-2xl blur-lg opacity-30 scale-110"></div>
                    </motion.div>
                    <CardTitle className="text-2xl font-light text-gray-800 mb-1">
                      Join the Blood Warriors
                    </CardTitle>
                    <p className="text-gray-600 text-sm font-light">
                      Begin your journey as a Thalassemia awareness warrior
                    </p>
                  </CardHeader>

                  <CardContent className="px-6 pb-6">
                    <form onSubmit={handleSubmit} className="space-y-5">
                      {/* Compact Name Input */}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 }}
                      >
                        <label
                          htmlFor="name"
                          className="block text-sm font-light text-gray-700 mb-2 flex items-center gap-2"
                        >
                          <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-rose-500 rounded-md flex items-center justify-center">
                            <User className="h-3 w-3 text-white" />
                          </div>
                          Your Warrior Name
                        </label>
                        <div className="relative">
                          <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all duration-300 bg-white/80 backdrop-blur-sm text-base font-light placeholder-gray-400"
                            required
                          />
                          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-pink-100/3 to-rose-100/3 pointer-events-none"></div>
                        </div>
                      </motion.div>

                      {/* Compact Submit Button */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                      >
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg blur-md opacity-60"></div>
                          <Button
                            type="submit"
                            disabled={!name.trim() || isSubmitting}
                            className="relative w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-light py-3 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 rounded-lg border-0"
                            size="lg"
                            loading={isSubmitting}
                          >
                            {isSubmitting
                              ? "Preparing Your Journey..."
                              : "Join the Blood Warriors"}
                            <Sword className="ml-2 h-5 w-5" />
                          </Button>
                        </div>
                      </motion.div>
                    </form>

                    {/* Compact Action Buttons */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.0 }}
                      className="mt-4 space-y-3"
                    >
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.push("/learn")}
                        className="w-full border-2 border-pink-200 text-pink-700 hover:bg-pink-50 hover:border-pink-300 hover:shadow-md transition-all duration-300 py-2 text-sm font-light rounded-lg bg-white/80 backdrop-blur-sm"
                      >
                        <BookOpen className="mr-2 h-4 w-4" />
                        Learn About Thalassemia
                      </Button>

                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.push("/leaderboard")}
                        className="w-full border-2 border-rose-200 text-rose-700 hover:bg-rose-50 hover:border-rose-300 hover:shadow-md transition-all duration-300 py-2 text-sm font-light rounded-lg bg-white/80 backdrop-blur-sm"
                      >
                        <Trophy className="mr-2 h-4 w-4" />
                        View Leaderboard
                      </Button>
                    </motion.div>

                    {/* Enhanced Quest Info with Stats */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.1 }}
                      className="mt-4 p-4 bg-gradient-to-r from-pink-100/10 to-rose-50 rounded-lg border border-pink-200/20 backdrop-blur-sm"
                    >
                      <h3 className="font-light text-pink-600 mb-3 flex items-center gap-2 text-sm">
                        <div className="w-5 h-5 bg-gradient-to-r from-pink-500 to-rose-500 rounded-md flex items-center justify-center">
                          <Target className="h-3 w-3 text-white" />
                        </div>
                        Warrior Training
                      </h3>
                      <ul className="text-xs text-pink-600 space-y-1 font-light mb-4">
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
                          Maximum 3 challenges per mission
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
                          Multiple choice, True/False, and Multi-select battles
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
                          Score based on accuracy and speed
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
                          Learn about Thalassemia prevention and awareness
                        </li>
                      </ul>

                      {/* Blood Warriors Vision */}
                      <div className="pt-3 border-t border-pink-200/30">
                        <h4 className="text-xs font-light text-pink-600 mb-2 text-center">
                          VISION
                        </h4>
                        <p className="text-xs text-gray-600 font-light leading-relaxed text-center">
                          A future where every child is born free of Thalassemia
                          and affected individuals receive holistic support to
                          live fulfilling, healthy lives without the burden of
                          disease.
                        </p>
                      </div>
                    </motion.div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>

            {/* Right Side - Our Impact Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="order-1 lg:order-2"
            >
              <div className="relative">
                {/* Blood Warriors Main Visual */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-200/15 to-rose-100/15 rounded-2xl blur-xl"></div>
                  <div className="relative bg-gradient-to-br from-white/95 to-pink-50/95 rounded-2xl p-6 shadow-xl border border-pink-100/30 backdrop-blur-md">
                    <div className="text-center">
                      <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.0 }}
                        className="text-xl font-light text-gray-800 mb-2"
                      >
                        Become a Blood Warrior
                      </motion.h3>

                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.1 }}
                        className="text-gray-600 mb-4 text-sm leading-relaxed font-light"
                      >
                        Your knowledge can save lives. Test your understanding
                        of Thalassemia and become a champion for awareness.
                      </motion.p>

                      {/* Blood Warriors Real Impact Stats */}
                      <div className="mb-4">
                        <motion.h4
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.1 }}
                          className="text-sm font-light text-pink-600 mb-3 text-center"
                        >
                          OUR IMPACT
                        </motion.h4>

                        {/* Primary Impact Stats */}
                        <div className="grid grid-cols-2 gap-3 mb-3">
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1.2 }}
                            className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-pink-100/30 hover:shadow-xl transition-all duration-300"
                          >
                            <div className="text-2xl font-light text-pink-600 mb-1">
                              3,606
                            </div>
                            <div className="text-xs text-gray-600 font-light">
                              Blood Donations
                            </div>
                            <div className="w-full bg-pink-100 rounded-full h-1 mt-2">
                              <div className="bg-gradient-to-r from-pink-500 to-rose-500 h-1 rounded-full w-4/5"></div>
                            </div>
                          </motion.div>
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1.3 }}
                            className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-pink-100/30 hover:shadow-xl transition-all duration-300"
                          >
                            <div className="text-2xl font-light text-pink-600 mb-1">
                              4,967
                            </div>
                            <div className="text-xs text-gray-600 font-light">
                              Registered Blood Donors
                            </div>
                            <div className="w-full bg-pink-100 rounded-full h-1 mt-2">
                              <div className="bg-gradient-to-r from-pink-500 to-rose-500 h-1 rounded-full w-3/4"></div>
                            </div>
                          </motion.div>
                        </div>

                        {/* Secondary Impact Stats */}
                        <div className="grid grid-cols-3 gap-2">
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.4 }}
                            className="bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-md border border-pink-100/20 text-center"
                          >
                            <div className="text-lg font-light text-pink-600 mb-1">
                              111
                            </div>
                            <div className="text-xs text-gray-600 font-light">
                              Blood Bridges
                            </div>
                          </motion.div>
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.5 }}
                            className="bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-md border border-pink-100/20 text-center"
                          >
                            <div className="text-lg font-light text-pink-600 mb-1">
                              2,364+
                            </div>
                            <div className="text-xs text-gray-600 font-light">
                              Regular Donors
                            </div>
                          </motion.div>
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.6 }}
                            className="bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-md border border-pink-100/20 text-center"
                          >
                            <div className="text-lg font-light text-pink-600 mb-1">
                              50,000+
                            </div>
                            <div className="text-xs text-gray-600 font-light">
                              Digital Outreach
                            </div>
                          </motion.div>
                        </div>

                        {/* Additional Stats Row */}
                        <div className="grid grid-cols-3 gap-2 mt-2">
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.7 }}
                            className="bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-md border border-pink-100/20 text-center"
                          >
                            <div className="text-lg font-light text-pink-600 mb-1">
                              50+
                            </div>
                            <div className="text-xs text-gray-600 font-light">
                              Collaborations
                            </div>
                          </motion.div>
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.8 }}
                            className="bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-md border border-pink-100/20 text-center"
                          >
                            <div className="text-lg font-light text-pink-600 mb-1">
                              300+
                            </div>
                            <div className="text-xs text-gray-600 font-light">
                              HPLC Tests
                            </div>
                          </motion.div>
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.9 }}
                            className="bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-md border border-pink-100/20 text-center"
                          >
                            <div className="text-lg font-light text-pink-600 mb-1">
                              100%
                            </div>
                            <div className="text-xs text-gray-600 font-light">
                              For Nation Building
                            </div>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
