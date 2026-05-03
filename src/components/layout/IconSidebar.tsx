"use client";

import React from "react";
import { Home, Book, Search, Settings, Heart, Info } from "lucide-react";
import { useSearch } from "@/context/SearchContext";
import Link from "next/link";
import { cn } from "@/lib/utils";

const IconSidebar = () => {
  const { openSearch } = useSearch();
  
  const menuItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Book, label: "Read", href: "/read" },
    { icon: Search, label: "Search", onClick: openSearch },
    { icon: Heart, label: "Favorites", href: "/favorites" },
    { icon: Settings, label: "Settings", href: "/settings" },
    { icon: Info, label: "About", href: "/about" },
  ];

  return (
    <aside className="hidden md:flex w-16 flex-col items-center py-6 bg-slate-950 text-white h-screen fixed left-0 top-0 z-50 border-r border-slate-800/50">
      <div className="mb-10 flex items-center justify-center">
        <Link href="/" className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
           <Book className="w-6 h-6 text-white" />
        </Link>
      </div>
      <nav className="flex-1 flex flex-col gap-6 items-center">
        {menuItems.map((item, idx) => {
          const content = (
            <>
              <item.icon className="w-6 h-6 text-slate-400 group-hover:text-emerald-400 group-hover:scale-110 transition-transform" />
              <span className="absolute left-14 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap">
                {item.label}
              </span>
            </>
          );

          if (item.onClick) {
            return (
              <button
                key={idx}
                onClick={item.onClick}
                className="p-3 rounded-2xl hover:bg-slate-800/50 transition-all duration-300 group relative"
                title={item.label}
              >
                {content}
              </button>
            );
          }

          return (
            <Link
              key={idx}
              href={item.href || "#"}
              className="p-3 rounded-2xl hover:bg-slate-800/50 transition-all duration-300 group relative"
              title={item.label}
            >
              {content}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default IconSidebar;
