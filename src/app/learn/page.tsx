"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  Heart,
  Users,
  Shield,
  Stethoscope,
  TestTube,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { AppHeader } from "@/components/navigation/AppHeader";
import { useRouter } from "next/navigation";

const learningModules = [
  {
    id: "basics",
    title: "What is Thalassemia?",
    icon: BookOpen,
    color: "from-blue-500 to-blue-600",
    content: {
      overview:
        "Thalassemia is a group of inherited blood disorders that affect the body's ability to produce hemoglobin, the protein in red blood cells that carries oxygen throughout the body.",
      keyPoints: [
        "It's a genetic condition passed down from parents",
        "Affects hemoglobin production in red blood cells",
        "Can cause anemia and other health complications",
        "More common in Mediterranean, Middle Eastern, and Asian populations",
      ],
      details:
        "Hemoglobin is made up of two types of protein chains: alpha and beta. Thalassemia occurs when there's a defect in the production of either alpha or beta chains, leading to abnormal hemoglobin formation and red blood cell destruction.",
    },
  },
  {
    id: "types",
    title: "Types of Thalassemia",
    icon: TestTube,
    color: "from-green-500 to-green-600",
    content: {
      overview:
        "There are two main types of Thalassemia: Alpha and Beta, each with different severity levels.",
      keyPoints: [
        "Alpha Thalassemia: Affects alpha protein chains",
        "Beta Thalassemia: Affects beta protein chains",
        "Thalassemia Major: Severe form requiring treatment",
        "Thalassemia Minor: Mild form, often asymptomatic",
      ],
      details:
        "Beta Thalassemia Major (also called Cooley's Anemia) is the most severe form and requires regular blood transfusions. Thalassemia Minor (trait) means you're a carrier but usually have no symptoms.",
    },
  },
  {
    id: "symptoms",
    title: "Symptoms & Effects",
    icon: Stethoscope,
    color: "from-red-500 to-red-600",
    content: {
      overview:
        "Symptoms vary depending on the type and severity of Thalassemia, ranging from no symptoms to life-threatening complications.",
      keyPoints: [
        "Fatigue and weakness",
        "Pale or yellowish skin",
        "Shortness of breath",
        "Slow growth in children",
        "Bone deformities in severe cases",
      ],
      details:
        "In severe cases, Thalassemia can lead to heart problems, liver damage, and bone deformities. Early detection and treatment can prevent many complications.",
    },
  },
  {
    id: "prevention",
    title: "Prevention & Screening",
    icon: Shield,
    color: "from-purple-500 to-purple-600",
    content: {
      overview:
        "While Thalassemia cannot be prevented in individuals, we can prevent the birth of affected children through proper screening and genetic counseling.",
      keyPoints: [
        "Pre-marital screening is crucial",
        "Genetic counseling helps families make informed decisions",
        "Prenatal testing can detect affected fetuses",
        "Carrier testing identifies at-risk individuals",
      ],
      details:
        "Blood tests like Complete Blood Count (CBC) and Hemoglobin Electrophoresis can identify carriers. If both parents are carriers, there's a 25% chance their child will have Thalassemia Major.",
    },
  },
  {
    id: "treatment",
    title: "Treatment Options",
    icon: Heart,
    color: "from-pink-500 to-pink-600",
    content: {
      overview:
        "Treatment depends on the severity of Thalassemia and may include blood transfusions, iron chelation therapy, and in some cases, bone marrow transplantation.",
      keyPoints: [
        "Regular blood transfusions for severe cases",
        "Iron chelation therapy to remove excess iron",
        "Bone marrow transplant can be curative",
        "Folic acid supplements help with red blood cell production",
      ],
      details:
        "With proper treatment, people with Thalassemia can lead normal, productive lives. Bone marrow transplantation offers the best chance for a cure but requires a suitable donor.",
    },
  },
  {
    id: "awareness",
    title: "Awareness & Support",
    icon: Users,
    color: "from-orange-500 to-orange-600",
    content: {
      overview:
        "Raising awareness about Thalassemia is crucial for prevention, early detection, and supporting affected families.",
      keyPoints: [
        "World Thalassemia Day is May 8th",
        "Support groups provide emotional and practical help",
        "Blood donation is essential for treatment",
        "Education reduces stigma and discrimination",
      ],
      details:
        "Blood Warriors Foundation and similar organizations work to make India Thalassemia-free by 2035 through awareness, screening, and support programs.",
    },
  },
];

export default function LearnPage() {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const router = useRouter();

  const selectedModuleData = learningModules.find(
    (m) => m.id === selectedModule
  );

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
        title="Learn About Thalassemia"
        subtitle="Master the knowledge to make a difference"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {!selectedModule ? (
            <motion.div
              key="modules"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Enhanced Introduction */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#f14164]/20 to-blue-100/20 rounded-3xl blur-xl"></div>
                <Card className="relative bg-gradient-to-r from-[#f14164]/10 to-blue-50 border-[#f14164]/20 rounded-3xl overflow-hidden backdrop-blur-sm">
                  <div className="h-1 bg-gradient-to-r from-[#f14164] via-blue-500 to-[#f14164]"></div>
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-[#f14164] to-[#e03a5a] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                        <Globe className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-3">
                          Welcome to Thalassemia Education
                        </h2>
                        <p className="text-gray-700 text-lg leading-relaxed mb-4">
                          Thalassemia affects millions of people worldwide.
                          Understanding this condition is the first step toward
                          prevention, early detection, and supporting those
                          affected. Explore our comprehensive learning modules
                          to become informed about this important health topic.
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-[#f14164] rounded-full"></div>
                            <span>6 Learning Modules</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span>Interactive Content</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>Expert Knowledge</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Enhanced Learning Modules Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {learningModules.map((module, index) => (
                  <motion.div
                    key={module.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="group"
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#f14164]/10 to-blue-100/10 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <Card
                        className="relative cursor-pointer hover:shadow-2xl transition-all duration-300 bg-white/90 backdrop-blur-sm border-0 rounded-3xl overflow-hidden"
                        onClick={() => setSelectedModule(module.id)}
                      >
                        <div className="h-1 bg-gradient-to-r from-[#f14164] via-blue-500 to-[#f14164] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <CardHeader className="pb-6 pt-8">
                          <div className="flex items-center gap-4">
                            <div
                              className={`w-16 h-16 bg-gradient-to-r ${module.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                            >
                              <module.icon className="h-8 w-8 text-white" />
                            </div>
                            <CardTitle className="text-xl font-bold group-hover:text-[#f14164] transition-colors duration-300">
                              {module.title}
                            </CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0 px-6 pb-8">
                          <p className="text-gray-600 text-sm leading-relaxed mb-6">
                            {module.content.overview.substring(0, 120)}...
                          </p>
                          <div className="mt-4">
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full border-2 border-[#f14164]/20 text-[#f14164] hover:bg-[#f14164] hover:text-white transition-all duration-300 rounded-xl font-semibold"
                              onClick={() => setSelectedModule(module.id)}
                            >
                              Learn More
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Quick Facts */}
              <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Quick Facts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-white rounded-lg">
                      <div className="text-2xl font-bold text-red-600">4%</div>
                      <div className="text-sm text-gray-600">
                        of India&apos;s population are carriers
                      </div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg">
                      <div className="text-2xl font-bold text-red-600">
                        10,000+
                      </div>
                      <div className="text-sm text-gray-600">
                        new cases born annually in India
                      </div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg">
                      <div className="text-2xl font-bold text-red-600">
                        May 8
                      </div>
                      <div className="text-sm text-gray-600">
                        World Thalassemia Day
                      </div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg">
                      <div className="text-2xl font-bold text-red-600">
                        2035
                      </div>
                      <div className="text-sm text-gray-600">
                        Target: Thalassemia-free India
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key={selectedModule}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              {selectedModuleData && (
                <Card className="max-w-4xl mx-auto">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedModule(null)}
                        className="flex items-center gap-2"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Modules
                      </Button>
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-12 h-12 bg-gradient-to-r ${selectedModuleData.color} rounded-lg flex items-center justify-center`}
                        >
                          <selectedModuleData.icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-2xl">
                            {selectedModuleData.title}
                          </CardTitle>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="prose max-w-none">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Overview
                      </h3>
                      <p className="text-gray-700 mb-6">
                        {selectedModuleData.content.overview}
                      </p>

                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Key Points
                      </h3>
                      <ul className="space-y-2 mb-6">
                        {selectedModuleData.content.keyPoints.map(
                          (point, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-gray-700">{point}</span>
                            </li>
                          )
                        )}
                      </ul>

                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Detailed Information
                      </h3>
                      <p className="text-gray-700">
                        {selectedModuleData.content.details}
                      </p>
                    </div>

                    <div className="flex gap-4 pt-6 border-t">
                      <Button
                        onClick={() => setSelectedModule(null)}
                        variant="outline"
                        className="flex-1"
                      >
                        Back to Modules
                      </Button>
                      <Button
                        onClick={() => router.push("/quiz")}
                        className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
                      >
                        Take Quiz
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
