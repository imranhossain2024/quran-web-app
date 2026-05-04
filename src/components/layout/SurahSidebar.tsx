"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Surah } from "@/types/quran";
import { getSurahList } from "@/lib/quran-api";
import { JUZ_DATA, SURAH_START_PAGE, getSurahForPage } from "@/lib/quran-meta";
import Link from "next/link";
import { useParams } from "next/navigation";

type FilterTab = "surah" | "juz" | "page";

const SurahSidebar = () => {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<FilterTab>("surah");
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

  // Clear search when switching tabs
  useEffect(() => {
    setSearch("");
  }, [activeTab]);

  // Helper to normalize strings for search by removing spaces, hyphens, and apostrophes
  const normalize = (str: string) => str.toLowerCase().replace(/[-'\s]/g, "");
  const normalizedSearch = normalize(search);

  // ========== FILTERED DATA ==========
  const filteredSurahs = surahs.filter(
    (s) =>
      normalize(s.englishName).includes(normalizedSearch) ||
      normalize(s.name).includes(normalizedSearch) ||
      s.number.toString().includes(search)
  );

  const filteredJuz = JUZ_DATA.filter(
    (j) =>
      j.number.toString().includes(search) ||
      normalize(j.nameEn).includes(normalizedSearch)
  );

  // Build page items: 1-604
  const allPages = Array.from({ length: 604 }, (_, i) => i + 1);
  const filteredPages = search
    ? allPages.filter((p) => p.toString().includes(search))
    : allPages;

  const searchPlaceholder: Record<FilterTab, string> = {
    surah: "Search surah...",
    juz: "Search juz...",
    page: "Search page number...",
  };

  // Find surah name helper
  const getSurahName = (surahNum: number): string => {
    const s = surahs.find((su) => su.number === surahNum);
    return s ? s.englishName : `Surah ${surahNum}`;
  };

  return (
    <div className="w-80 border-r border-slate-800/50 bg-slate-900/50 h-screen fixed left-16 top-0 hidden md:flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-6 pb-4 border-b border-slate-800/50 bg-slate-900/80 backdrop-blur-md z-10">
        <h2 className="text-xl font-bold text-white tracking-tight mb-4">
          Navigation
        </h2>

        {/* Tab Filter */}
        <div className="flex gap-1 p-1 bg-slate-800/60 rounded-xl mb-4">
          {(["surah", "juz", "page"] as FilterTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "flex-1 py-2 px-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300",
                activeTab === tab
                  ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/25"
                  : "text-slate-400 hover:text-white hover:bg-slate-700/50"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <svg
            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder={searchPlaceholder[activeTab]}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-800/40 border border-slate-700/50 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all placeholder:text-slate-600"
          />
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {loading && activeTab === "surah" ? (
          <div className="flex flex-col gap-2 p-4">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="h-16 w-full bg-slate-800/30 rounded-xl animate-pulse"
              />
            ))}
          </div>
        ) : (
          <>
            {/* ===== SURAH TAB ===== */}
            {activeTab === "surah" && (
              <div className="flex flex-col">
                {filteredSurahs.map((surah) => (
                  <Link
                    key={surah.number}
                    href={`/surah/${surah.number}`}
                    className={cn(
                      "flex items-center gap-4 p-4 hover:bg-slate-800/40 transition-all border-b border-slate-800/10 text-left group",
                      currentSurahNumber === surah.number &&
                        "bg-emerald-500/10 border-l-4 border-l-emerald-500"
                    )}
                  >
                    <div
                      className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold transition-all duration-300",
                        currentSurahNumber === surah.number
                          ? "bg-emerald-500 text-white rotate-0"
                          : "bg-slate-800/50 text-slate-500 group-hover:bg-emerald-500/10 group-hover:text-emerald-500 rotate-45 group-hover:rotate-0"
                      )}
                    >
                      <span
                        className={cn(
                          "transition-transform",
                          currentSurahNumber !== surah.number &&
                            "-rotate-45 group-hover:rotate-0"
                        )}
                      >
                        {surah.number}
                      </span>
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p
                        className={cn(
                          "text-sm font-semibold transition-colors truncate",
                          currentSurahNumber === surah.number
                            ? "text-emerald-400"
                            : "text-slate-200 group-hover:text-white"
                        )}
                      >
                        {surah.englishName}
                      </p>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest font-medium">
                        {surah.englishNameTranslation}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-arabic text-emerald-500/80 group-hover:text-emerald-400 transition-colors leading-relaxed">
                        {surah.name.replace("سُورَةُ ", "")}
                      </p>
                      <p className="text-[9px] text-slate-600">
                        {surah.numberOfAyahs} Ayahs
                      </p>
                    </div>
                  </Link>
                ))}
                {filteredSurahs.length === 0 && (
                  <p className="text-center text-slate-500 text-sm py-10">
                    No surah found
                  </p>
                )}
              </div>
            )}

            {/* ===== JUZ TAB ===== */}
            {activeTab === "juz" && (
              <div className="flex flex-col">
                {filteredJuz.map((juz) => {
                  const isActive =
                    currentSurahNumber !== null &&
                    currentSurahNumber >= juz.startSurah &&
                    currentSurahNumber <= juz.endSurah;

                  return (
                    <Link
                      key={juz.number}
                      href={`/surah/${juz.startSurah}#ayah-${juz.startAyah}`}
                      className={cn(
                        "flex items-center gap-4 p-4 hover:bg-slate-800/40 transition-all border-b border-slate-800/10 text-left group",
                        isActive &&
                          "bg-emerald-500/10 border-l-4 border-l-emerald-500"
                      )}
                    >
                      {/* Juz Number Badge */}
                      <div
                        className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold transition-all duration-300",
                          isActive
                            ? "bg-emerald-500 text-white"
                            : "bg-slate-800/50 text-slate-500 group-hover:bg-emerald-500/10 group-hover:text-emerald-500"
                        )}
                      >
                        {juz.number}
                      </div>

                      {/* Juz Info */}
                      <div className="flex-1 overflow-hidden">
                        <p
                          className={cn(
                            "text-sm font-semibold transition-colors truncate",
                            isActive
                              ? "text-emerald-400"
                              : "text-slate-200 group-hover:text-white"
                          )}
                        >
                          Juz {juz.number}
                        </p>
                        <p className="text-[10px] text-slate-500 truncate">
                          {getSurahName(juz.startSurah)}{" "}
                          {juz.startSurah !== juz.endSurah &&
                            `→ ${getSurahName(juz.endSurah)}`}
                        </p>
                      </div>

                      {/* Arabic Name */}
                      <div className="text-right shrink-0">
                        <p className="text-lg font-arabic text-emerald-500/80 group-hover:text-emerald-400 transition-colors leading-relaxed">
                          {juz.name}
                        </p>
                        <p className="text-[9px] text-slate-600">
                          {juz.startSurah}:{juz.startAyah}
                        </p>
                      </div>
                    </Link>
                  );
                })}
                {filteredJuz.length === 0 && (
                  <p className="text-center text-slate-500 text-sm py-10">
                    No juz found
                  </p>
                )}
              </div>
            )}

            {/* ===== PAGE TAB ===== */}
            {activeTab === "page" && (
              <div className="p-4">
                {/* Page grid  */}
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-medium mb-3">
                  Madinah Mushaf · 604 Pages
                </p>
                <div className="grid grid-cols-5 gap-1.5">
                  {filteredPages.map((page) => {
                    const surahOnPage = getSurahForPage(page);
                    // Is this the start of a surah?
                    const isSurahStart = Object.values(SURAH_START_PAGE).includes(page);
                    const isCurrentPage =
                      currentSurahNumber !== null &&
                      surahOnPage === currentSurahNumber;

                    return (
                      <Link
                        key={page}
                        href={`/surah/${surahOnPage}`}
                        title={`Page ${page} · ${getSurahName(surahOnPage)}`}
                        className={cn(
                          "relative flex items-center justify-center h-10 rounded-lg text-xs font-semibold transition-all duration-200",
                          isCurrentPage
                            ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/30"
                            : isSurahStart
                              ? "bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 ring-1 ring-emerald-500/20"
                              : "bg-slate-800/40 text-slate-400 hover:bg-slate-700/60 hover:text-white"
                        )}
                      >
                        {page}
                      </Link>
                    );
                  })}
                </div>
                {filteredPages.length === 0 && (
                  <p className="text-center text-slate-500 text-sm py-10">
                    No page found
                  </p>
                )}
                {/* Legend */}
                <div className="mt-4 flex items-center gap-4 text-[10px] text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-emerald-500/15 ring-1 ring-emerald-500/20" />
                    Surah start
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-emerald-500" />
                    Current
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SurahSidebar;
