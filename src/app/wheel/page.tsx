"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { AppHeader } from "@/components/navigation/AppHeader";
import { useRouter } from "next/navigation";
import {
  RotateCcw,
  BookOpen,
  Heart,
  Shield,
  Stethoscope,
  TestTube,
  Users,
  ArrowRight,
  CheckCircle,
  XCircle,
  Star,
} from "lucide-react";

// Wheel segments with learning topics and questions
const wheelSegments = [
  {
    id: "basics",
    title: "Thalassemia Basics",
    icon: BookOpen,
    color: "from-blue-500 to-blue-600",
    learningContent: {
      title: "What is Thalassemia?",
      content:
        "Thalassemia is a group of inherited blood disorders that affect the body's ability to produce hemoglobin, the protein in red blood cells that carries oxygen throughout the body. It's caused by mutations in the DNA of cells that make hemoglobin.",
      keyPoints: [
        "Inherited blood disorder",
        "Affects hemoglobin production",
        "Can cause anemia",
        "More common in certain populations",
      ],
    },
    question: {
      text: "Thalassemia is primarily caused by:",
      options: [
        "Viral infection",
        "Genetic mutations",
        "Poor diet",
        "Environmental factors",
      ],
      correct: 1,
      explanation:
        "Thalassemia is caused by genetic mutations that affect hemoglobin production. It's inherited from parents, not caused by infections, diet, or environmental factors.",
    },
  },
  {
    id: "types",
    title: "Types of Thalassemia",
    icon: TestTube,
    color: "from-green-500 to-green-600",
    learningContent: {
      title: "Types of Thalassemia",
      content:
        "There are two main types of Thalassemia: Alpha and Beta. Each type has different severity levels, from minor (carrier) to major (requiring treatment).",
      keyPoints: [
        "Alpha Thalassemia affects alpha protein chains",
        "Beta Thalassemia affects beta protein chains",
        "Thalassemia Major is the severe form",
        "Thalassemia Minor is the carrier form",
      ],
    },
    question: {
      text: "How many main types of Thalassemia are there?",
      options: ["One", "Two", "Three", "Four"],
      correct: 1,
      explanation:
        "There are two main types: Alpha Thalassemia and Beta Thalassemia, each affecting different protein chains in hemoglobin.",
    },
  },
  {
    id: "symptoms",
    title: "Symptoms & Signs",
    icon: Stethoscope,
    color: "from-red-500 to-red-600",
    learningContent: {
      title: "Symptoms of Thalassemia",
      content:
        "Symptoms vary depending on the type and severity of Thalassemia. Common symptoms include fatigue, weakness, pale skin, and slow growth in children.",
      keyPoints: [
        "Fatigue and weakness",
        "Pale or yellowish skin",
        "Slow growth in children",
        "Bone deformities in severe cases",
      ],
    },
    question: {
      text: "Which of the following is NOT a common symptom of Thalassemia?",
      options: ["Fatigue", "Pale skin", "High blood pressure", "Slow growth"],
      correct: 2,
      explanation:
        "High blood pressure is not a typical symptom of Thalassemia. Common symptoms include fatigue, pale skin, and slow growth.",
    },
  },
  {
    id: "prevention",
    title: "Prevention",
    icon: Shield,
    color: "from-purple-500 to-purple-600",
    learningContent: {
      title: "Preventing Thalassemia",
      content:
        "Since Thalassemia is genetic, prevention focuses on genetic counseling, carrier testing, and prenatal diagnosis to help families make informed decisions.",
      keyPoints: [
        "Genetic counseling before marriage",
        "Carrier testing for at-risk populations",
        "Prenatal diagnosis during pregnancy",
        "Pre-marital screening programs",
      ],
    },
    question: {
      text: "The best way to prevent Thalassemia is through:",
      options: [
        "Vaccination",
        "Genetic counseling and testing",
        "Healthy diet",
        "Regular exercise",
      ],
      correct: 1,
      explanation:
        "Since Thalassemia is genetic, prevention involves genetic counseling and carrier testing to help families make informed decisions about having children.",
    },
  },
  {
    id: "treatment",
    title: "Treatment Options",
    icon: Heart,
    color: "from-pink-500 to-pink-600",
    learningContent: {
      title: "Treatment for Thalassemia",
      content:
        "Treatment depends on the severity and may include blood transfusions, iron chelation therapy, folic acid supplements, and in some cases, bone marrow transplantation.",
      keyPoints: [
        "Regular blood transfusions for severe cases",
        "Iron chelation therapy to remove excess iron",
        "Bone marrow transplant can be curative",
        "Folic acid supplements help with red blood cell production",
      ],
    },
    question: {
      text: "Which treatment can potentially cure Thalassemia?",
      options: [
        "Blood transfusions",
        "Iron chelation therapy",
        "Bone marrow transplant",
        "Folic acid supplements",
      ],
      correct: 2,
      explanation:
        "Bone marrow transplantation offers the best chance for a cure, but it requires a suitable donor and carries risks.",
    },
  },
  {
    id: "awareness",
    title: "Awareness & Support",
    icon: Users,
    color: "from-orange-500 to-orange-600",
    learningContent: {
      title: "Awareness and Support",
      content:
        "Raising awareness about Thalassemia is crucial for prevention, early detection, and supporting affected families. World Thalassemia Day is celebrated on May 8th.",
      keyPoints: [
        "World Thalassemia Day is May 8th",
        "Support groups provide emotional help",
        "Blood donation is essential for treatment",
        "Education reduces stigma and discrimination",
      ],
    },
    question: {
      text: "When is World Thalassemia Day celebrated?",
      options: ["March 8th", "April 8th", "May 8th", "June 8th"],
      correct: 2,
      explanation:
        "World Thalassemia Day is celebrated on May 8th to raise awareness about this condition and support those affected.",
    },
  },
];

export default function WheelPage() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState<
    (typeof wheelSegments)[0] | null
  >(null);
  const [showLearning, setShowLearning] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [spins, setSpins] = useState(0);
  const router = useRouter();

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setSelectedSegment(null);
    setShowLearning(false);
    setShowQuestion(false);
    setShowResult(false);
    setSelectedAnswer(null);

    // Randomly select a segment
    const randomIndex = Math.floor(Math.random() * wheelSegments.length);
    const selected = wheelSegments[randomIndex];

    // Simulate spinning delay
    setTimeout(() => {
      setSelectedSegment(selected);
      setIsSpinning(false);
      setSpins((prev) => prev + 1);
    }, 2000);
  };

  const handleLearnMore = () => {
    setShowLearning(true);
  };

  const handleStartQuiz = () => {
    setShowLearning(false);
    setShowQuestion(true);
  };

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === selectedSegment?.question.correct;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setShowResult(true);
  };

  const handleNextSpin = () => {
    setSelectedSegment(null);
    setShowLearning(false);
    setShowQuestion(false);
    setShowResult(false);
    setSelectedAnswer(null);
  };

  const getRotation = () => {
    if (!selectedSegment) return 0;
    const segmentIndex = wheelSegments.findIndex(
      (s) => s.id === selectedSegment.id
    );
    return (360 / wheelSegments.length) * segmentIndex;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-[#f14164]/5 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#f14164]/15 to-blue-100 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-100 to-[#f14164]/15 rounded-full opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-[#f14164]/8 to-blue-50 rounded-full opacity-15 animate-pulse delay-500"></div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23f14164%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
      </div>

      <AppHeader
        title="Spin the Wheel"
        subtitle="Learn and test your Thalassemia knowledge"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {!selectedSegment ? (
            <motion.div
              key="wheel"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              {/* Score Display */}
              <div className="mb-8">
                <div className="flex justify-center gap-8">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                    <div className="text-3xl font-bold text-[#f14164]">
                      {score}
                    </div>
                    <div className="text-sm text-gray-600">Correct Answers</div>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                    <div className="text-3xl font-bold text-blue-600">
                      {spins}
                    </div>
                    <div className="text-sm text-gray-600">Total Spins</div>
                  </div>
                </div>
              </div>

              {/* Wheel */}
              <div className="relative mx-auto w-96 h-96 mb-8">
                <motion.div
                  className="relative w-full h-full"
                  animate={{
                    rotate: isSpinning ? 3600 + getRotation() : getRotation(),
                    transition: {
                      duration: isSpinning ? 2 : 0.5,
                      ease: "easeOut",
                    },
                  }}
                >
                  {/* Wheel Segments */}
                  {wheelSegments.map((segment, index) => {
                    const angle = (360 / wheelSegments.length) * index;
                    const Icon = segment.icon;
                    return (
                      <div
                        key={segment.id}
                        className="absolute w-full h-full"
                        style={{
                          transform: `rotate(${angle}deg)`,
                          transformOrigin: "center",
                        }}
                      >
                        <div
                          className={`absolute top-0 left-1/2 w-0 h-0 border-l-[192px] border-r-[192px] border-b-[192px] border-l-transparent border-r-transparent bg-gradient-to-r ${segment.color}`}
                          style={{
                            transform: "translateX(-50%)",
                            clipPath: `polygon(50% 100%, 0% 0%, 100% 0%)`,
                            opacity: 0.9,
                          }}
                        />
                        <div
                          className="absolute top-8 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                          style={{
                            transform: `translateX(-50%) translateY(-50%) rotate(${-angle}deg)`,
                          }}
                        >
                          <div className="flex flex-col items-center gap-1">
                            <Icon className="h-6 w-6 text-white" />
                            <span className="text-xs text-white font-semibold text-center max-w-20">
                              {segment.title}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </motion.div>

                {/* Center Circle */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full shadow-lg border-4 border-[#f14164] flex items-center justify-center">
                  <RotateCcw className="h-8 w-8 text-[#f14164]" />
                </div>

                {/* Pointer */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-[#f14164]"></div>
              </div>

              {/* Spin Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={spinWheel}
                  disabled={isSpinning}
                  className="bg-gradient-to-r from-[#f14164] to-[#d6335a] hover:from-[#d6335a] hover:to-[#c22d4f] text-white font-bold py-4 px-8 text-xl rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300"
                  size="lg"
                >
                  {isSpinning ? "Spinning..." : "Spin the Wheel!"}
                  <RotateCcw className="ml-3 h-6 w-6" />
                </Button>
              </motion.div>

              {/* Instructions */}
              <div className="mt-8 max-w-2xl mx-auto">
                <Card className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                      <Star className="h-5 w-5 text-[#f14164]" />
                      How to Play
                    </h3>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#f14164] rounded-full"></div>
                        Spin the wheel to select a learning topic
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#f14164] rounded-full"></div>
                        Read the learning content about the topic
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#f14164] rounded-full"></div>
                        Answer a quiz question to test your knowledge
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#f14164] rounded-full"></div>
                        Earn points for correct answers and spin again!
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          ) : showLearning ? (
            <motion.div
              key="learning"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="max-w-4xl mx-auto">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#f14164]/20 to-blue-100/20 rounded-3xl blur-xl"></div>
                  <Card className="relative bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl border border-white/20">
                    <div className="h-1 bg-gradient-to-r from-[#f14164] via-blue-500 to-[#f14164]"></div>
                    <CardHeader className="text-center pb-6 pt-8">
                      <div className="flex items-center justify-center gap-4 mb-4">
                        <div
                          className={`w-16 h-16 bg-gradient-to-r ${selectedSegment.color} rounded-2xl flex items-center justify-center shadow-lg`}
                        >
                          <selectedSegment.icon className="h-8 w-8 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-3xl font-bold text-gray-800">
                            {selectedSegment.learningContent.title}
                          </CardTitle>
                          <p className="text-gray-600 text-lg">
                            {selectedSegment.title}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="px-8 pb-8">
                      <div className="prose prose-lg max-w-none">
                        <p className="text-gray-700 leading-relaxed mb-6">
                          {selectedSegment.learningContent.content}
                        </p>
                        <div className="bg-gradient-to-r from-[#f14164]/10 to-blue-50 rounded-2xl p-6 border border-[#f14164]/20">
                          <h4 className="font-bold text-gray-800 mb-4">
                            Key Points:
                          </h4>
                          <ul className="space-y-2">
                            {selectedSegment.learningContent.keyPoints.map(
                              (point, index) => (
                                <li
                                  key={index}
                                  className="flex items-center gap-2 text-gray-700"
                                >
                                  <div className="w-2 h-2 bg-[#f14164] rounded-full"></div>
                                  {point}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                      <div className="mt-8 flex justify-center">
                        <Button
                          onClick={handleStartQuiz}
                          className="bg-gradient-to-r from-[#f14164] to-[#d6335a] hover:from-[#d6335a] hover:to-[#c22d4f] text-white font-bold py-3 px-8 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          Take Quiz
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </motion.div>
          ) : showQuestion ? (
            <motion.div
              key="question"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="max-w-3xl mx-auto">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#f14164]/20 to-blue-100/20 rounded-3xl blur-xl"></div>
                  <Card className="relative bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl border border-white/20">
                    <div className="h-1 bg-gradient-to-r from-[#f14164] via-blue-500 to-[#f14164]"></div>
                    <CardHeader className="text-center pb-6 pt-8">
                      <CardTitle className="text-2xl font-bold text-gray-800">
                        Quiz Question
                      </CardTitle>
                      <p className="text-gray-600">
                        Test your knowledge about {selectedSegment.title}
                      </p>
                    </CardHeader>
                    <CardContent className="px-8 pb-8">
                      <div className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-800 mb-6">
                          {selectedSegment.question.text}
                        </h3>
                        <div className="space-y-3">
                          {selectedSegment.question.options.map(
                            (option, index) => (
                              <motion.button
                                key={index}
                                onClick={() => handleAnswerSelect(index)}
                                className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-300 ${
                                  selectedAnswer === index
                                    ? "border-[#f14164] bg-[#f14164]/10 text-[#f14164] font-semibold"
                                    : "border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50"
                                }`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <div className="flex items-center gap-3">
                                  <div
                                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                      selectedAnswer === index
                                        ? "border-[#f14164] bg-[#f14164]"
                                        : "border-gray-300"
                                    }`}
                                  >
                                    {selectedAnswer === index && (
                                      <div className="w-2 h-2 bg-white rounded-full"></div>
                                    )}
                                  </div>
                                  <span>{option}</span>
                                </div>
                              </motion.button>
                            )
                          )}
                        </div>
                      </div>
                      <div className="flex justify-center">
                        <Button
                          onClick={handleSubmitAnswer}
                          disabled={selectedAnswer === null}
                          className="bg-gradient-to-r from-[#f14164] to-[#d6335a] hover:from-[#d6335a] hover:to-[#c22d4f] text-white font-bold py-3 px-8 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Submit Answer
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </motion.div>
          ) : showResult ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="max-w-3xl mx-auto">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#f14164]/20 to-blue-100/20 rounded-3xl blur-xl"></div>
                  <Card className="relative bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl border border-white/20">
                    <div className="h-1 bg-gradient-to-r from-[#f14164] via-blue-500 to-[#f14164]"></div>
                    <CardHeader className="text-center pb-6 pt-8">
                      <div className="flex justify-center mb-4">
                        {selectedAnswer ===
                        selectedSegment?.question.correct ? (
                          <CheckCircle className="h-16 w-16 text-green-500" />
                        ) : (
                          <XCircle className="h-16 w-16 text-red-500" />
                        )}
                      </div>
                      <CardTitle
                        className={`text-3xl font-bold ${
                          selectedAnswer === selectedSegment?.question.correct
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {selectedAnswer === selectedSegment?.question.correct
                          ? "Correct!"
                          : "Incorrect"}
                      </CardTitle>
                      {selectedAnswer === selectedSegment?.question.correct && (
                        <p className="text-gray-600 text-lg">
                          Great job! You earned 1 point.
                        </p>
                      )}
                    </CardHeader>
                    <CardContent className="px-8 pb-8">
                      <div className="bg-gradient-to-r from-[#f14164]/10 to-blue-50 rounded-2xl p-6 border border-[#f14164]/20 mb-6">
                        <h4 className="font-bold text-gray-800 mb-3">
                          Explanation:
                        </h4>
                        <p className="text-gray-700">
                          {selectedSegment?.question.explanation}
                        </p>
                      </div>
                      <div className="flex justify-center gap-4">
                        <Button
                          onClick={handleNextSpin}
                          className="bg-gradient-to-r from-[#f14164] to-[#d6335a] hover:from-[#d6335a] hover:to-[#c22d4f] text-white font-bold py-3 px-8 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          Spin Again
                          <RotateCcw className="ml-2 h-5 w-5" />
                        </Button>
                        <Button
                          onClick={() => router.push("/quiz")}
                          variant="outline"
                          className="border-2 border-[#f14164] text-[#f14164] hover:bg-[#f14164] hover:text-white font-bold py-3 px-8 text-lg rounded-xl transition-all duration-300"
                        >
                          Take Full Quiz
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="segment"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center"
            >
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#f14164]/20 to-blue-100/20 rounded-3xl blur-xl"></div>
                  <Card className="relative bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl border border-white/20">
                    <div className="h-1 bg-gradient-to-r from-[#f14164] via-blue-500 to-[#f14164]"></div>
                    <CardHeader className="text-center pb-6 pt-8">
                      <div className="flex items-center justify-center gap-4 mb-4">
                        <div
                          className={`w-20 h-20 bg-gradient-to-r ${selectedSegment.color} rounded-2xl flex items-center justify-center shadow-lg`}
                        >
                          <selectedSegment.icon className="h-10 w-10 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-3xl font-bold text-gray-800">
                            {selectedSegment.title}
                          </CardTitle>
                          <p className="text-gray-600 text-lg">
                            You landed on this topic!
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="px-8 pb-8">
                      <p className="text-gray-700 text-lg mb-6">
                        Ready to learn about {selectedSegment.title}? Click
                        below to start learning and then test your knowledge
                        with a quiz question!
                      </p>
                      <div className="flex justify-center">
                        <Button
                          onClick={handleLearnMore}
                          className="bg-gradient-to-r from-[#f14164] to-[#d6335a] hover:from-[#d6335a] hover:to-[#c22d4f] text-white font-bold py-3 px-8 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          Learn & Quiz
                          <BookOpen className="ml-2 h-5 w-5" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
