import type { Metadata } from "next";
import { Inter, Amiri, Lateef } from "next/font/google";
import "./globals.css";
import SettingsPanel from "@/components/layout/SettingsPanel";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import { SettingsProvider } from "@/context/SettingsContext";
import { SearchProvider } from "@/context/SearchContext";
import { FavoritesProvider } from "@/context/FavoritesContext";

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
      <body className={`${inter.className} min-h-full bg-slate-950 text-slate-50 antialiased`}>
        <SettingsProvider>
          <SearchProvider>
            <FavoritesProvider>
              <LayoutWrapper>
                {children}
              </LayoutWrapper>

              {/* Settings Panel Toggle & Sidebar */}
              <SettingsPanel />
            </FavoritesProvider>
          </SearchProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}
