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
  title: "Glass OS — Spatial Resonance",
  description:
    "An operating system that breathes. A visual showcase of depth, glassmorphism, and spatial UI — where interfaces feel calm, intentional, and deeply human.",
  keywords: [
    "Glass OS",
    "glassmorphism",
    "spatial UI",
    "design showcase",
    "operating system concept",
    "visionOS",
    "Linear",
    "UI design",
  ],
  authors: [{ name: "Glass OS" }],
  openGraph: {
    title: "Glass OS — Spatial Resonance",
    description:
      "An operating system that breathes. Depth, clarity, and silence for the next generation of thought.",
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
