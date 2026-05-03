"use client";

import React from "react";
import { Home, Book, Search, Settings, Heart, Info } from "lucide-react";
import { cn } from "@/lib/utils";

const IconSidebar = () => {
  const menuItems = [
    { icon: Home, label: "Home" },
    { icon: Book, label: "Read" },
    { icon: Search, label: "Search" },
    { icon: Heart, label: "Favorites" },
    { icon: Settings, label: "Settings" },
    { icon: Info, label: "About" },
  ];

  return (
    <aside className="hidden md:flex w-16 flex-col items-center py-6 bg-slate-950 text-white h-screen fixed left-0 top-0 z-50 border-r border-slate-800/50">
      <div className="mb-10 flex items-center justify-center">
        <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
           <Book className="w-6 h-6 text-white" />
        </div>
      </div>
      <nav className="flex-1 flex flex-col gap-6 items-center">
        {menuItems.map((item, idx) => (
          <button
            key={idx}
            className="p-3 rounded-2xl hover:bg-slate-800/50 transition-all duration-300 group relative"
            title={item.label}
          >
            <item.icon className="w-6 h-6 text-slate-400 group-hover:text-emerald-400 group-hover:scale-110 transition-transform" />
            <span className="absolute left-14 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap">
              {item.label}
            </span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default IconSidebar;
