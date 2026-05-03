"use client";

import React from "react";
import { cn } from "@/lib/utils";

const SurahSidebar = () => {
  // Dummy data for now, we will replace this with real JSON later
  const surahs = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    name: i === 0 ? "Al-Fatihah" : "Al-Baqarah",
    arabic: i === 0 ? "الفاتحة" : "البقرة",
    english: i === 0 ? "The Opening" : "The Cow",
  }));

  return (
    <div className="w-80 border-r border-slate-800/50 bg-slate-900/50 h-screen fixed left-16 top-0 hidden lg:block overflow-y-auto custom-scrollbar">
      <div className="p-6 border-b border-slate-800/50 sticky top-0 bg-slate-900/80 backdrop-blur-md z-10">
        <h2 className="text-xl font-bold text-white tracking-tight">Surah List</h2>
        <div className="mt-4 relative">
           <input 
            type="text" 
            placeholder="Search surah..." 
            className="w-full bg-slate-800/40 border border-slate-700/50 rounded-xl py-2.5 px-4 text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all placeholder:text-slate-600"
           />
        </div>
      </div>
      <div className="flex flex-col">
        {surahs.map((surah) => (
          <button
            key={surah.id}
            className="flex items-center gap-4 p-4 hover:bg-slate-800/40 transition-all border-b border-slate-800/20 text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-800/50 flex items-center justify-center text-xs font-bold text-slate-500 group-hover:bg-emerald-500/10 group-hover:text-emerald-500 transition-all duration-300 rotate-45 group-hover:rotate-0">
              <span className="-rotate-45 group-hover:rotate-0 transition-transform">{surah.id}</span>
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors truncate">{surah.name}</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-medium">{surah.english}</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-arabic text-emerald-500/80 group-hover:text-emerald-400 transition-colors leading-relaxed">
                {surah.arabic}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SurahSidebar;
