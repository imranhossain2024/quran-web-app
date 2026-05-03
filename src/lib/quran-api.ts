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
    // Fetching both Arabic (uthmani) and English (asad) in a single request
    const res = await fetch(`${BASE_URL}/surah/${id}/editions/quran-uthmani,en.asad`);
    
    if (!res.ok) {
      throw new Error(`Failed to fetch surah ${id} from API`);
    }

    const json = await res.json();
    const data = json.data;

    // data[0] is arabic, data[1] is translation
    if (!data || data.length < 2) {
      throw new Error(`Data missing for surah ${id}`);
    }

    const arabicSurah = data[0];
    const translationSurah = data[1];

    const ayahs: Ayah[] = arabicSurah.ayahs.map((ayah: any, index: number) => ({
      id: ayah.number,
      surahId: id,
      numberInSurah: ayah.numberInSurah,
      juz: ayah.juz,
      text: ayah.text,
      translation: translationSurah.ayahs[index]?.text || "Translation not available",
      audio: `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${ayah.number}.mp3`,
    }));

    return {
      surah: {
        number: arabicSurah.number,
        name: arabicSurah.name,
        englishName: arabicSurah.englishName,
        englishNameTranslation: arabicSurah.englishNameTranslation,
        numberOfAyahs: arabicSurah.numberOfAyahs,
        revelationType: arabicSurah.revelationType,
      },
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
