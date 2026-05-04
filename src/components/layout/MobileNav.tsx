"use client";

import React from "react";
import { Home, BookOpen, Search, Settings, Menu, Heart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSearch } from "@/context/SearchContext";

interface MobileNavProps {
  onMenuClick?: () => void;
}

const MobileNav = ({ onMenuClick }: MobileNavProps = {}) => {
  const pathname = usePathname();
  const { openSearch } = useSearch();

  const navItems = [
    { icon: Menu, label: "Menu", onClick: onMenuClick },
    { icon: Home, label: "Home", href: "/" },
    { icon: BookOpen, label: "Read", href: "/read" },
    { icon: Search, label: "Search", onClick: openSearch },
    { icon: Settings, label: "Settings", href: "/settings" },
    { icon: Heart, label: "Favorites", href: "/favorites" },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-950/80 backdrop-blur-xl border-t border-slate-800/50 z-50 px-4 sm:px-6 py-3 pb-8 flex justify-between items-center">
      {navItems.map((item, idx) => {
        const isActive = pathname === item.href;
        
        if (item.label === "Search") {
          return (
            <button 
              key={idx}
              onClick={item.onClick}
              className="p-4 bg-emerald-500 text-white rounded-2xl -mt-12 shadow-xl shadow-emerald-500/20 active:scale-90 transition-transform"
            >
              <item.icon className="w-6 h-6" />
            </button>
          );
        }

        if (item.onClick) {
          return (
            <button 
              key={idx}
              onClick={item.onClick}
              className="p-1.5 sm:p-2 text-slate-500 hover:text-emerald-500 transition-colors"
            >
              <item.icon className="w-6 h-6" />
            </button>
          );
        }

        return (
          <Link 
            key={idx} 
            href={item.href!} 
            className={cn(
              "p-1.5 sm:p-2 transition-colors",
              isActive ? "text-emerald-500" : "text-slate-500 hover:text-slate-300"
            )}
          >
            <item.icon className="w-6 h-6" />
          </Link>
        );
      })}
    </nav>
  );
};

export default MobileNav;
