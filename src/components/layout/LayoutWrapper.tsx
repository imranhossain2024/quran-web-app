"use client";

import React, { useState } from "react";
import IconSidebar from "@/components/layout/IconSidebar";
import SurahSidebar from "@/components/layout/SurahSidebar";
import MobileNav from "@/components/layout/MobileNav";
import ScrollToTop from "@/components/ui/ScrollToTop";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-950">
      {/* Sidebars only on non-home pages */}
      {!isHomePage && (
        <>
          <IconSidebar />
          {/* Desktop Surah Sidebar */}
          <SurahSidebar className="hidden md:flex fixed left-16 top-0" />
          
          {/* Mobile Surah Sidebar Drawer */}
          <div 
            className={cn(
              "fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300",
              isMobileSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            )} 
            onClick={() => setIsMobileSidebarOpen(false)} 
          />
          <div 
            className={cn(
              "fixed inset-y-0 left-0 z-50 md:hidden transform transition-transform duration-300 ease-in-out w-80",
              isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}
          >
            <SurahSidebar 
               className="w-full relative h-full left-0 top-0 border-r-0 border-slate-800/50 shadow-2xl" 
               onClose={() => setIsMobileSidebarOpen(false)} 
            />
          </div>
        </>
      )}

      {/* Main Content Area */}
      <main className={cn(
        "flex-1 min-h-screen transition-all duration-300",
        !isHomePage ? "md:ml-[24rem] pb-24 md:pb-0" : "w-full pb-24 md:pb-0"
      )}>
        {children}
      </main>

      {/* Mobile Nav on all pages */}
      <MobileNav onMenuClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)} />

      {/* Scroll to Top FAB */}
      <ScrollToTop />
    </div>
  );
}
