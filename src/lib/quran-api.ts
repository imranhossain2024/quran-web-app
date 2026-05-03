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
    const [arabicRes, translationRes] = await Promise.all([
      fetch(`${BASE_URL}/surah/${id}/quran-uthmani`),
      fetch(`${BASE_URL}/surah/${id}/en.asad`)
    ]);

    const arabicData = await arabicRes.json();
    const translationData = await translationRes.json();

    if (!arabicData.data || !translationData.data) {
      throw new Error(`Data missing for surah ${id}`);
    }

    const ayahs: Ayah[] = arabicData.data.ayahs.map((ayah: any, index: number) => ({
      id: ayah.number,
      surahId: id,
      numberInSurah: ayah.numberInSurah,
      juz: ayah.juz,
      text: ayah.text,
      translation: translationData.data.ayahs[index]?.text || "Translation missing",
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
  if (!query || query.trim().length < 3) return [];
  try {
    const encodedQuery = encodeURIComponent(query.trim());
    const res = await fetch(`${BASE_URL}/search/${encodedQuery}/all/en.asad`);
    
    if (!res.ok) {
      const errorData = await res.json();
      console.error("API Search Error:", errorData);
      return [];
    }
    
    const data = await res.json();
    return data.data.matches || [];
  } catch (error) {
    console.error("Network or Search error:", error);
    return [];
  }
}
