"use client";

import { useRouter } from "next/navigation";
import { WizardOnboarding } from "@/components/onboarding/WizardOnboarding";

export default function Home() {
  const router = useRouter();

  const handleOnboardingSubmit = (data: { name: string; language: string }) => {
    // Store user data in sessionStorage for the quiz session
    sessionStorage.setItem("userName", data.name);
    sessionStorage.setItem("userLanguage", data.language);

    // Navigate to quiz
    router.push("/quiz");
  };

  return <WizardOnboarding onSubmit={handleOnboardingSubmit} />;
}
