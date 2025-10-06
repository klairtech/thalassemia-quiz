"use client";

import { createContext, useContext, ReactNode } from "react";
import { useTranslation } from "@/hooks/useTranslation";

interface TranslationContextType {
  t: (text: string) => string;
  isLoading: boolean;
  error: string | null;
  language: string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(
  undefined
);

interface TranslationProviderProps {
  children: ReactNode;
  language: string;
}

export function TranslationProvider({
  children,
  language,
}: TranslationProviderProps) {
  const { t, isLoading, error } = useTranslation(language);

  return (
    <TranslationContext.Provider value={{ t, isLoading, error, language }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslationContext() {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error(
      "useTranslationContext must be used within a TranslationProvider"
    );
  }
  return context;
}
