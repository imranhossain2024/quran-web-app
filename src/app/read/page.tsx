import React from "react";
import { getSurahList } from "@/lib/quran-api";
import Link from "next/link";
import { BookOpen, MapPin, Hash, ArrowRight } from "lucide-react";

export default async function ReadPage() {
  const surahs = await getSurahList();

  return (
    <div className="p-6 lg:p-12 max-w-7xl mx-auto mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-white mb-3 tracking-tight">The Holy Quran</h1>
          <p className="text-slate-500 max-w-xl leading-relaxed">
            Select a Surah to start reading and exploring its deep meanings and beautiful recitations.
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-slate-500 bg-slate-900/50 p-4 rounded-2xl border border-slate-800/50">
           <div className="flex flex-col gap-1 pr-4 border-r border-slate-800">
              <span className="opacity-60">Total Surahs</span>
              <span className="text-emerald-500 text-lg">114</span>
           </div>
           <div className="flex flex-col gap-1 pl-4">
              <span className="opacity-60">Total Ayahs</span>
              <span className="text-emerald-500 text-lg">6236</span>
           </div>
        </div>
      </header>

      {/* Surah Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {surahs.map((surah) => (
          <Link
            key={surah.number}
            href={`/surah/${surah.number}`}
            className="group p-6 rounded-[2rem] bg-slate-900/40 border border-slate-800/50 hover:bg-slate-900/80 hover:border-emerald-500/30 transition-all duration-300 relative overflow-hidden"
          >
            {/* Background Arabic Name Effect */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 p-6 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
               <span className="text-6xl font-arabic">{surah.name.replace("سُورَةُ ", "")}</span>
            </div>

            <div className="flex items-start justify-between relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center group-hover:bg-emerald-600 transition-colors duration-500">
                   <span className="text-sm font-black text-slate-400 group-hover:text-white">{surah.number}</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">{surah.englishName}</h3>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{surah.englishNameTranslation}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-arabic text-slate-200 mb-1">{surah.name}</p>
                <div className="flex items-center justify-end gap-2 text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                   <span>{surah.numberOfAyahs} Ayahs</span>
                   <span className="w-1 h-1 rounded-full bg-slate-700" />
                   <span>{surah.revelationType}</span>
                </div>
              </div>
            </div>

            {/* Hover Indicator */}
            <div className="mt-6 pt-4 border-t border-slate-800/50 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500">
               <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-[0.2em]">Start Reading</span>
               <ArrowRight className="w-4 h-4 text-emerald-500 translate-x-[-10px] group-hover:translate-x-0 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
