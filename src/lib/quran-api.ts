import { Surah, Ayah } from "@/types/quran";
import { getAllSurahs, getSurah } from "./quran";

const BASE_URL = "https://api.alquran.cloud/v1";

export async function getSurahList(): Promise<Surah[]> {
  return getAllSurahs();
}

export async function getSurahDetails(id: number): Promise<{ surah: Surah; ayahs: Ayah[] }> {
  const data = getSurah(id);
  if (!data) throw new Error(`Surah ${id} not found`);
  return data;
}

export async function searchAyahs(query: string): Promise<any[]> {
  if (!query || query.trim().length < 3) return [];
  try {
    const encodedQuery = encodeURIComponent(query.trim());
    const res = await fetch(`${BASE_URL}/search/${encodedQuery}/all/en.asad`, { next: { revalidate: 3600 } });
    
    if (!res.ok) return [];
    
    const data = await res.json();
    return data.data.matches || [];
  } catch (error) {
    console.error("Search error:", error);
    return [];
  }
}
