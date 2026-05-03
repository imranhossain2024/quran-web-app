import { getSurah } from "@/lib/quran";
import { notFound } from "next/navigation";
import React from "react";
import PlayAudioButton from "@/components/modules/quran/PlayAudioButton";
import JumpToAyah from "@/components/modules/quran/JumpToAyah";
import AyahNumber from "@/components/ui/AyahNumber";
import FavoriteButton from "@/components/modules/quran/FavoriteButton";

export async function generateStaticParams() {
  return Array.from({ length: 114 }, (_, i) => ({
    id: String(i + 1),
  }));
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function SurahPage({ params }: PageProps) {
  const { id } = await params;
  
  const data = getSurah(parseInt(id));
  
  if (!data) {
    notFound();
  }

  const { surah, ayahs } = data;

  return (
    <div className="p-6 lg:p-10 max-w-5xl mx-auto mb-20 relative">
      {/* Surah Header Card */}
      <div className="relative overflow-hidden rounded-3xl bg-emerald-600 p-8 lg:p-12 text-white mb-10 shadow-2xl shadow-emerald-500/20">
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none translate-x-1/4 -translate-y-1/4">
           <span className="text-[12rem] font-arabic leading-none">{surah.name.replace("سُورَةُ ", "")}</span>
        </div>
        
        <div className="relative z-10 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.3em] mb-4 opacity-80">
            Surah No. {surah.number}
          </p>
          <h1 className="text-4xl lg:text-6xl font-arabic mb-6 tracking-wide drop-shadow-md">
            {surah.name}
          </h1>
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-2xl font-bold">{surah.englishName}</h2>
            <p className="text-emerald-100 italic opacity-90">{surah.englishNameTranslation}</p>
          </div>
          
          <div className="mt-8 flex items-center justify-center gap-6 text-xs font-bold uppercase tracking-widest border-t border-white/20 pt-8">
            <div className="flex flex-col gap-1">
              <span className="opacity-60">Revelation</span>
              <span>{surah.revelationType}</span>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="flex flex-col gap-1">
              <span className="opacity-60">Ayahs</span>
              <span>{surah.numberOfAyahs}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Bar (Jump to Ayah) */}
      <div className="sticky top-20 z-30 flex justify-center mb-10 pointer-events-none">
         <div className="pointer-events-auto">
            <JumpToAyah totalAyahs={surah.numberOfAyahs} />
         </div>
      </div>

      {/* Bismillah */}
      {parseInt(id) !== 1 && parseInt(id) !== 9 && (
        <div className="text-center mb-16">
          <p className="text-4xl font-arabic text-slate-200 drop-shadow-sm">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
        </div>
      )}

      {/* Ayah List */}
      <div className="space-y-6">
        {ayahs.map((ayah) => (
          <div 
            key={ayah.id} 
            id={`ayah-${ayah.numberInSurah}`}
            className="group p-8 rounded-3xl bg-slate-900/40 border border-slate-800/50 hover:bg-slate-900/60 hover:border-emerald-500/20 transition-all duration-300 shadow-sm scroll-mt-32"
          >
            <div className="flex flex-col gap-8">
              {/* Ayah Meta & Action */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                   <AyahNumber number={ayah.numberInSurah} />
                   <PlayAudioButton url={ayah.audio} />
                   <FavoriteButton 
                      ayah={ayah} 
                      surahName={surah.englishName} 
                      surahNumber={surah.number} 
                   />
                </div>
                
                {/* Arabic Text (Right Aligned) */}
                <p className="font-arabic text-right leading-[2.5] text-slate-100 flex-1 ml-10">
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
    </div>
  );
}
