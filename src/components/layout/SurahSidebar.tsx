"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Surah } from "@/types/quran";
import { getSurahList } from "@/lib/quran-api";
import Link from "next/link";
import { useParams } from "next/navigation";

const SurahSidebar = () => {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const params = useParams();
  
  // The route is /surah/[id], so we check params.id
  const currentSurahNumber = params.id ? parseInt(params.id as string) : null;

  useEffect(() => {
    const fetchSurahs = async () => {
      const data = await getSurahList();
      setSurahs(data);
      setLoading(false);
    };
    fetchSurahs();
  }, []);

  const filteredSurahs = surahs.filter((s) =>
    s.englishName.toLowerCase().includes(search.toLowerCase()) ||
    s.number.toString().includes(search)
  );

  return (
    <div className="w-80 border-r border-slate-800/50 bg-slate-900/50 h-screen fixed left-16 top-0 hidden md:flex flex-col overflow-hidden">
      <div className="p-6 border-b border-slate-800/50 bg-slate-900/80 backdrop-blur-md z-10">
        <h2 className="text-xl font-bold text-white tracking-tight">Surah List</h2>
        <div className="mt-4 relative">
           <input 
            type="text" 
            placeholder="Search surah..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-800/40 border border-slate-700/50 rounded-xl py-2.5 px-4 text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all placeholder:text-slate-600"
           />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {loading ? (
          <div className="flex flex-col gap-2 p-4">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="h-16 w-full bg-slate-800/30 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="flex flex-col">
            {filteredSurahs.map((surah) => (
              <Link
                key={surah.number}
                href={`/surah/${surah.number}`}
                className={cn(
                  "flex items-center gap-4 p-4 hover:bg-slate-800/40 transition-all border-b border-slate-800/10 text-left group",
                  currentSurahNumber === surah.number && "bg-emerald-500/10 border-l-4 border-l-emerald-500"
                )}
              >
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold transition-all duration-300",
                  currentSurahNumber === surah.number 
                    ? "bg-emerald-500 text-white rotate-0" 
                    : "bg-slate-800/50 text-slate-500 group-hover:bg-emerald-500/10 group-hover:text-emerald-500 rotate-45 group-hover:rotate-0"
                )}>
                  <span className={cn(
                    "transition-transform",
                    currentSurahNumber !== surah.number && "-rotate-45 group-hover:rotate-0"
                  )}>{surah.number}</span>
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className={cn(
                    "text-sm font-semibold transition-colors truncate",
                    currentSurahNumber === surah.number ? "text-emerald-400" : "text-slate-200 group-hover:text-white"
                  )}>{surah.englishName}</p>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-medium">{surah.englishNameTranslation}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-arabic text-emerald-500/80 group-hover:text-emerald-400 transition-colors leading-relaxed">
                    {surah.name.replace("سُورَةُ ", "")}
                  </p>
                  <p className="text-[9px] text-slate-600">{surah.numberOfAyahs} Ayahs</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SurahSidebar;
