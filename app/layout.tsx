import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AXIOM OS — An Operating System Without Noise",
  description: "A calm, ad-free operating system experience. Designed around clarity, restraint, and intention.",
  keywords: ["design system", "UI showcase", "glassmorphism", "operating system", "product design", "calm UX"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-background">
        {children}
      </body>
    </html>
  );
}
