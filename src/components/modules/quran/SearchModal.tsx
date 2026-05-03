"use client";

import React, { useState, useEffect } from "react";
import { Search, X, BookOpen, ArrowRight, Loader2 } from "lucide-react";
import { searchAyahs } from "@/lib/quran-api";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query || query.length < 3) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const data = await searchAyahs(query);
        setResults(data);
      } catch (error) {
        console.error("Search failed", error);
      } finally {
        setLoading(false);
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4">
      <div 
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300" 
        onClick={onClose} 
      />
      
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800/50 rounded-[2rem] shadow-2xl overflow-hidden animate-in slide-in-from-top-10 duration-500">
        <div className="p-6 border-b border-slate-800/50 flex items-center gap-4 bg-slate-900/50">
          <Search className={cn("w-6 h-6 transition-colors", loading ? "text-emerald-500 animate-pulse" : "text-slate-500")} />
          <input
            autoFocus
            type="text"
            placeholder="Search ayahs (e.g. 'Mercy', 'صبر')..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent border-none text-xl text-white focus:outline-none placeholder:text-slate-600 font-medium"
          />
          {loading ? (
            <Loader2 className="w-5 h-5 text-emerald-500 animate-spin" />
          ) : (
            <button 
              onClick={onClose} 
              className="p-2 hover:bg-slate-800 rounded-xl transition-colors text-slate-500 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          )}
        </div>

        <div className="max-h-[65vh] overflow-y-auto custom-scrollbar p-6">
          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-32 bg-slate-800/30 rounded-3xl animate-pulse border border-slate-800/50" />
              ))}
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-4">
              {results.map((item, idx) => (
                <Link
                  key={idx}
                  href={`/surah/${item.surah.number}#ayah-${item.numberInSurah}`}
                  onClick={onClose}
                  className="block p-6 rounded-3xl bg-slate-800/20 border border-slate-800/50 hover:bg-emerald-500/[0.03] hover:border-emerald-500/30 transition-all group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                     <span className="text-4xl font-arabic">{item.surah.name.replace("سُورَةُ ", "")}</span>
                  </div>
                  
                  <div className="flex justify-between items-center mb-4">
                    <div className="px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                      <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-[0.2em]">
                        {item.surah.englishName} • {item.surah.number}:{item.numberInSurah}
                      </span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                  <p className="text-3xl font-arabic text-right text-slate-200 mb-4 leading-relaxed group-hover:text-emerald-400 transition-colors">
                    {item.text}
                  </p>
                  <p className="text-sm text-slate-400 line-clamp-2 italic leading-relaxed group-hover:text-slate-300">
                    {item.translation || "Translation not available"}
                  </p>
                </Link>
              ))}
            </div>
          ) : query.length >= 3 ? (
            <div className="py-24 text-center">
              <div className="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-10 h-10 text-slate-600" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No results found</h3>
              <p className="text-slate-500">We couldn't find any ayahs matching "{query}"</p>
            </div>
          ) : (
            <div className="py-24 text-center">
              <div className="w-20 h-20 bg-emerald-500/5 rounded-full flex items-center justify-center mx-auto mb-6">
                 <Search className="w-10 h-10 text-emerald-500/20" />
              </div>
              <p className="text-slate-500 max-w-xs mx-auto">
                Search for any word in English or Arabic to find its occurrence in the Holy Quran.
              </p>
              <p className="mt-4 text-[10px] uppercase tracking-widest text-slate-600 font-bold">
                Min. 3 characters required
              </p>
            </div>
          )}
        </div>
        
        <div className="p-4 bg-slate-900/80 border-t border-slate-800/50 text-center">
          <p className="text-[10px] text-slate-600 font-medium uppercase tracking-[0.2em]">
            Quran Search Engine Powered by Al-Quran API
          </p>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
