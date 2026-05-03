import type { Metadata } from "next";
import { Inter, Amiri, Lateef } from "next/font/google";
import "./globals.css";
import IconSidebar from "@/components/layout/IconSidebar";
import SurahSidebar from "@/components/layout/SurahSidebar";
import SettingsPanel from "@/components/layout/SettingsPanel";
import { SettingsProvider } from "@/context/SettingsContext";

const inter = Inter({ subsets: ["latin"] });
const amiri = Amiri({ weight: ["400", "700"], subsets: ["arabic"], variable: "--font-amiri" });
const lateef = Lateef({ weight: ["400", "700"], subsets: ["arabic"], variable: "--font-lateef" });

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
    <html lang="en" className={`h-full dark ${amiri.variable} ${lateef.variable}`}>
      <body className={`${inter.className} min-h-full flex bg-slate-950 text-slate-50 antialiased`}>
        <SettingsProvider>
          {/* Left Icon Sidebar */}
          <IconSidebar />
          
          {/* Middle Surah Sidebar */}
          <SurahSidebar />
          
          {/* Main Content Area */}
          <main className="flex-1 min-h-screen md:ml-16 lg:ml-[24rem] transition-all duration-300">
            {children}
          </main>

          {/* Settings Panel Toggle & Sidebar */}
          <SettingsPanel />
        </SettingsProvider>
      </body>
    </html>
  );
}
