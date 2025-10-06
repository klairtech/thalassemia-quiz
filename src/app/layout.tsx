import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Thalassemia Awareness Quiz",
  description:
    "Test your knowledge about Thalassemia prevention and awareness. Learn about this important blood disorder through our gamified quiz experience.",
  keywords: [
    "thalassemia",
    "awareness",
    "quiz",
    "health",
    "prevention",
    "blood disorder",
  ],
  authors: [{ name: "Thalassemia Awareness Team" }],
  openGraph: {
    title: "Thalassemia Awareness Quiz",
    description:
      "Test your knowledge about Thalassemia prevention and awareness",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
