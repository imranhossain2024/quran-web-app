"use client";

import React from "react";
import { Search, Globe, Settings, Heart, MapPin, Calendar, Clock, Play, SkipBack, SkipForward, Repeat, Volume2, MoreHorizontal, BookOpen } from "lucide-react";
import Link from "next/link";
import { useSearch } from "@/context/SearchContext";

export default function Home() {
  const { openSearch } = useSearch();
  return (
    <div className="min-h-screen bg-[#050805] text-white font-sans relative overflow-x-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-20 left-10 opacity-20 pointer-events-none">
        <div className="w-px h-40 bg-gradient-to-b from-transparent via-emerald-500 to-transparent" />
        <div className="w-4 h-4 rounded-full border border-emerald-500 -ml-[7px] mt-2" />
      </div>
      <div className="absolute top-20 right-10 opacity-20 pointer-events-none text-right">
        <div className="w-px h-40 bg-gradient-to-b from-transparent via-emerald-500 to-transparent inline-block" />
        <div className="w-4 h-4 rounded-full border border-emerald-500 -mr-[7px] mt-2" />
      </div>

      {/* Top Navigation */}
      <nav className="flex items-center justify-between px-8 py-4 bg-[#050805]/90 backdrop-blur-xl fixed top-0 left-0 right-0 z-[60] border-b border-white/5">
        <div className="flex items-center gap-3">
          <Link href="/" className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-600/20">
             <span className="text-2xl">📖</span>
          </Link>
          <div>
            <h1 className="text-xl font-bold leading-tight">Quran Mazid</h1>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-medium">Read, Study, and Learn</p>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium text-emerald-500">Home</Link>
          <Link href="/surah/1" className="text-sm font-medium text-slate-400 hover:text-emerald-500 transition-colors">Read Quran</Link>
          <Link href="#" className="text-sm font-medium text-slate-400 hover:text-emerald-500 transition-colors">Prayer Time</Link>
          <Link href="#" className="text-sm font-medium text-slate-400 hover:text-emerald-500 transition-colors">Ramadan 2026</Link>
          <Link href="#" className="text-sm font-medium text-slate-400 hover:text-emerald-500 transition-colors">Others</Link>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={openSearch}
            className="p-2 text-slate-400 hover:text-emerald-500 transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>
          <Link href="/settings" className="p-2 text-slate-400 hover:text-emerald-500 transition-colors">
            <Settings className="w-5 h-5" />
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-12 text-center px-4">
        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="text-5xl lg:text-7xl animate-pulse">🌙</span>
          <h2 className="text-5xl lg:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Ramadan Mubarak 2026
          </h2>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-slate-400 font-bold uppercase tracking-[0.2em] text-xs">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-500" />
            SATKHIRA, BANGLADESH
          </div>
          <span className="hidden md:inline text-slate-700">|</span>
          <div className="flex items-center gap-2">
            Dhu al-Qi'dah 16, 1447
          </div>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="max-w-4xl mx-auto px-4 mb-10">
        <div className="bg-[#111111]/60 border border-white/5 rounded-[2.5rem] p-8 lg:p-12 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10">
             <Calendar className="w-12 h-12 text-emerald-500" />
          </div>
          
          <h3 className="text-center text-xl font-bold uppercase tracking-[0.3em] mb-12 flex items-center justify-center gap-3">
             <span>⏳</span> RAMADAN COUNTDOWN
          </h3>

          <div className="grid grid-cols-4 gap-4 lg:gap-8">
            {[
              { label: "Days", value: "280" },
              { label: "Hours", value: "05" },
              { label: "Mins", value: "55" },
              { label: "Secs", value: "20" },
            ].map((unit, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="text-5xl lg:text-7xl font-black text-white mb-4 bg-slate-900/50 w-full py-8 rounded-3xl border border-white/5 shadow-inner flex items-center justify-center">
                  {unit.value}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{unit.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sehri & Iftar Cards */}
      <section className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
        {/* Sehri Card */}
        <div className="bg-[#111111]/80 border border-white/5 rounded-[2.5rem] p-10 relative overflow-hidden group hover:border-emerald-500/20 transition-all duration-500">
           <div className="absolute -right-8 -top-8 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-all" />
           <div className="flex flex-col items-center text-center">
              <div className="flex items-center gap-2 text-emerald-500 text-xs font-bold uppercase tracking-widest mb-8">
                 <span>☀️</span> TODAY'S SEHRI TIME IN SATKHIRA
              </div>
              <div className="text-6xl font-black text-emerald-500 mb-10 tracking-tighter">04:00 AM</div>
              <p className="text-2xl font-arabic mb-6 leading-relaxed text-slate-200">وَبِصَوْمِ غَدٍ نَّوَيْتُ مِنْ شَهْرِ رَمَضَانَ</p>
              <p className="text-xs text-slate-500 italic max-w-xs mx-auto leading-relaxed">
                I intend to keep the fast for tomorrow in the month of Ramadan
              </p>
           </div>
        </div>

        {/* Iftar Card */}
        <div className="bg-[#111111]/80 border border-white/5 rounded-[2.5rem] p-10 relative overflow-hidden group hover:border-emerald-500/20 transition-all duration-500">
           <div className="absolute -right-8 -top-8 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-all" />
           <div className="flex flex-col items-center text-center">
              <div className="flex items-center gap-2 text-emerald-500 text-xs font-bold uppercase tracking-widest mb-8">
                 <span>🌙</span> TODAY'S IFTAR TIME IN SATKHIRA
              </div>
              <div className="text-6xl font-black text-emerald-500 mb-10 tracking-tighter">06:32 PM</div>
              <p className="text-2xl font-arabic mb-6 leading-relaxed text-slate-200">اللَّهُمَّ إِنِّي لَكَ صُمْتُ وَبِكَ آمَنْتُ وَعَلَى رِزْقِكَ أَفْطَرْتُ</p>
              <p className="text-xs text-slate-500 italic max-w-xs mx-auto leading-relaxed">
                O Allah, I fasted for You and I believe in You and I break my fast with Your sustenance
              </p>
           </div>
        </div>
      </section>

      {/* Bottom Player Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0A0A0A]/95 backdrop-blur-2xl border-t border-white/5 px-6 py-4 z-[60] flex items-center justify-between">
         <div className="flex items-center gap-4 w-1/4">
            <div className="text-sm font-bold">Al Baqarah : 6</div>
            <div className="text-[10px] text-slate-500 uppercase tracking-widest">Alafasy</div>
         </div>
         
         <div className="flex flex-col items-center gap-3 flex-1 max-w-2xl">
            <div className="flex items-center gap-8">
               <button className="text-slate-500 hover:text-white transition-colors"><Repeat className="w-4 h-4" /></button>
               <button className="text-slate-200 hover:text-emerald-500 transition-colors"><SkipBack className="w-6 h-6 fill-current" /></button>
               <button className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-all shadow-lg shadow-emerald-600/20">
                  <Play className="w-6 h-6 fill-current translate-x-0.5" />
               </button>
               <button className="text-slate-200 hover:text-emerald-500 transition-colors"><SkipForward className="w-6 h-6 fill-current" /></button>
               <button className="text-slate-500 hover:text-white transition-colors"><MoreHorizontal className="w-4 h-4" /></button>
            </div>
            <div className="w-full flex items-center gap-4">
               <span className="text-[10px] font-mono text-slate-500">00:48</span>
               <div className="flex-1 h-1 bg-white/5 rounded-full relative group cursor-pointer">
                  <div className="absolute top-0 left-0 h-full w-1/3 bg-emerald-600 rounded-full">
                     <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg" />
                  </div>
               </div>
               <span className="text-[10px] font-mono text-slate-500">01:39:12</span>
            </div>
         </div>

         <div className="flex items-center justify-end gap-6 w-1/4">
            <div className="flex items-center gap-3">
               <Volume2 className="w-4 h-4 text-slate-500" />
               <div className="w-24 h-1 bg-white/5 rounded-full">
                  <div className="h-full w-2/3 bg-emerald-600 rounded-full" />
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
