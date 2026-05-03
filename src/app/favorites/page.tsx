"use client";

import React from "react";
import { useFavorites } from "@/context/FavoritesContext";
import { Heart, BookOpen, Trash2, ArrowRight } from "lucide-react";
import Link from "next/link";
import PlayAudioButton from "@/components/modules/quran/PlayAudioButton";
import AyahNumber from "@/components/ui/AyahNumber";

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <div className="p-6 lg:p-12 max-w-5xl mx-auto mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mb-12">
        <h1 className="text-4xl font-black text-white mb-3 tracking-tight flex items-center gap-4">
           <Heart className="w-10 h-10 text-rose-500 fill-current" /> My Favorites
        </h1>
        <p className="text-slate-500 max-w-xl leading-relaxed">
          Your saved ayahs from the Holy Quran. Access your favorite verses quickly and easily even offline.
        </p>
      </header>

      {favorites.length === 0 ? (
        <div className="py-24 text-center bg-slate-900/20 rounded-[3rem] border border-slate-800/50">
          <div className="w-24 h-24 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-8 text-slate-700">
             <Heart className="w-12 h-12" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">No favorites yet</h2>
          <p className="text-slate-500 max-w-xs mx-auto mb-10">
            Start reading the Quran and click the heart icon on any ayah to save it here.
          </p>
          <Link 
            href="/read" 
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-emerald-600/20"
          >
            Go to Quran <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          {favorites.map((ayah) => (
            <div 
              key={ayah.id} 
              className="group p-8 rounded-[2.5rem] bg-slate-900/40 border border-slate-800/50 hover:bg-slate-900/60 hover:border-emerald-500/20 transition-all duration-300 shadow-sm"
            >
              <div className="flex flex-col gap-8">
                {/* Ayah Meta & Action */}
                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                       <AyahNumber number={ayah.numberInSurah} />
                       <div className="flex flex-col">
                         <span className="text-sm font-bold text-emerald-500 uppercase tracking-widest">{ayah.surahName}</span>
                         <span className="text-[10px] text-slate-500 font-bold">Ayah {ayah.numberInSurah}</span>
                       </div>
                    </div>
                    <div className="flex items-center gap-2">
                       <PlayAudioButton url={ayah.audio} />
                       <button
                          onClick={() => toggleFavorite(ayah, ayah.surahName, ayah.surahNumber)}
                          className="p-2 rounded-xl bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white transition-all"
                          title="Remove from favorites"
                       >
                          <Trash2 className="w-4 h-4" />
                       </button>
                       <Link 
                         href={`/surah/${ayah.surahNumber}#ayah-${ayah.numberInSurah}`}
                         className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-all"
                         title="Go to Surah"
                       >
                          <BookOpen className="w-4 h-4" />
                       </Link>
                    </div>
                  </div>
                  
                  {/* Arabic Text (Right Aligned) */}
                  <p className="font-arabic text-right leading-[2.5] text-slate-100 flex-1 ml-10 text-3xl">
                     {ayah.text}
                  </p>
                </div>

                {/* Translation (Left Aligned) */}
                <div className="pl-14 border-l-2 border-emerald-500/10 py-2">
                  <p className="font-translation text-slate-400 leading-relaxed font-medium">
                    {ayah.translation}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
