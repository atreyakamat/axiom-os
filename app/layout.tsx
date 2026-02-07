import type { Metadata } from "next";
import "./globals.css";
import SystemBar from "@/components/ui/SystemBar";
import Sidebar from "@/components/ui/Sidebar";

export const metadata: Metadata = {
  title: "Axiom OS - Designed Around Clarity, Restraint, and Intention",
  description: "A concept OS-inspired showcase demonstrating system-level UI thinking, calm UX, and consistent design architecture.",
  keywords: ["design system", "UI showcase", "glassmorphism", "operating system", "product design"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <SystemBar />
        <Sidebar />
        <main className="ml-20 mt-16">
          {children}
        </main>
      </body>
    </html>
  );
}
