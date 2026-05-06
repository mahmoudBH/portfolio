import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Mahmoud Bousbih — Digital Portfolio",
  description: "Portfolio of Mahmoud Bousbih. Crafting High-End Digital Experiences & Robust Full-Stack Architecture.",
  keywords: ["Full-Stack Developer", "Next.js", "TypeScript", "JavaScript", "UX/UI Design", "Creative Developer"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className="antialiased bg-background text-foreground min-h-screen selection:bg-white selection:text-black" suppressHydrationWarning>
        <div className="grain-overlay" />
        <CustomCursor />

        {children}
      </body>
    </html>
  );
}
