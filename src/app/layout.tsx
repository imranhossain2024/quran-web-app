import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import IconSidebar from "@/components/layout/IconSidebar";
import SurahSidebar from "@/components/layout/SurahSidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quran App - Read & Listen",
  description: "A production-level Quran application built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full dark">
      <body className={`${inter.className} min-h-full flex bg-slate-950 text-slate-50 antialiased`}>
        {/* Left Icon Sidebar */}
        <IconSidebar />
        
        {/* Middle Surah Sidebar */}
        <SurahSidebar />
        
        {/* Main Content Area */}
        <main className="flex-1 min-h-screen md:ml-16 lg:ml-[24rem] transition-all duration-300">
          {children}
        </main>
      </body>
    </html>
  );
}
