import { Surah, Ayah } from "@/types/quran";

const BASE_URL = "https://api.alquran.cloud/v1";

export async function getSurahList(): Promise<Surah[]> {
  try {
    const res = await fetch(`${BASE_URL}/surah`);
    if (!res.ok) throw new Error("Failed to fetch surahs");
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching surah list:", error);
    return [];
  }
}

export async function getSurahDetails(id: number): Promise<{ surah: Surah; ayahs: Ayah[] }> {
  try {
    // Fetching translation and arabic text
    const [arabicRes, translationRes] = await Promise.all([
      fetch(`${BASE_URL}/surah/${id}/quran-uthmani`),
      fetch(`${BASE_URL}/surah/${id}/en.asad`)
    ]);

    const arabicData = await arabicRes.json();
    const translationData = await translationRes.json();

    const ayahs: Ayah[] = arabicData.data.ayahs.map((ayah: any, index: number) => ({
      id: ayah.number,
      surahId: id,
      numberInSurah: ayah.numberInSurah,
      juz: ayah.juz,
      text: ayah.text,
      translation: translationData.data.ayahs[index].text,
      audio: `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${ayah.number}.mp3`,
    }));

    return {
      surah: arabicData.data,
      ayahs
    };
  } catch (error) {
    console.error(`Error fetching surah ${id}:`, error);
    throw error;
  }
}

export async function searchAyahs(query: string): Promise<any[]> {
  if (!query || query.length < 3) return [];
  try {
    const res = await fetch(`${BASE_URL}/search/${query}/all/en.asad`);
    if (!res.ok) throw new Error("Search failed");
    const data = await res.json();
    return data.data.matches || [];
  } catch (error) {
    console.error("Search error:", error);
    return [];
  }
}
