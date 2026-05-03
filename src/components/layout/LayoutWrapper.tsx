"use client";

import React from "react";
import IconSidebar from "@/components/layout/IconSidebar";
import SurahSidebar from "@/components/layout/SurahSidebar";
import MobileNav from "@/components/layout/MobileNav";
import ScrollToTop from "@/components/ui/ScrollToTop";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <div className="flex min-h-screen bg-slate-950">
      {/* Sidebars only on non-home pages */}
      {!isHomePage && (
        <>
          <IconSidebar />
          <SurahSidebar />
        </>
      )}

      {/* Main Content Area */}
      <main className={cn(
        "flex-1 min-h-screen transition-all duration-300",
        !isHomePage ? "md:ml-[24rem] pb-24 md:pb-0" : "w-full"
      )}>
        {children}
      </main>

      {/* Mobile Nav only on non-home pages or based on design */}
      {!isHomePage && <MobileNav />}

      {/* Scroll to Top FAB */}
      <ScrollToTop />
    </div>
  );
}
