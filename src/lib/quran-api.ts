import { Surah, Ayah, SearchResult } from "@/types/quran";
import { getAllSurahs, getSurah } from "./quran";

export async function getSurahList(): Promise<Surah[]> {
  return getAllSurahs();
}

export async function getSurahDetails(id: number): Promise<{ surah: Surah; ayahs: Ayah[] }> {
  const data = getSurah(id);
  if (!data) throw new Error(`Surah ${id} not found`);
  return data;
}

export async function searchAyahs(query: string): Promise<SearchResult[]> {
  if (!query || query.trim().length < 3) return [];
  
  const allSurahs = getAllSurahs();
  const matches: SearchResult[] = [];
  
  for (const s of allSurahs) {
    const details = getSurah(s.number);
    if (!details) continue;
    
    for (const ayah of details.ayahs) {
      if (ayah.translation.toLowerCase().includes(query.toLowerCase())) {
        matches.push({
          surah: details.surah,
          ayah: ayah
        });
      }
    }
    if (matches.length >= 20) break; // Limit search results
  }
  
  return matches;
}
