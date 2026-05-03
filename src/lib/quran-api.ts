import { Surah, Ayah } from "@/types/quran";

const BASE_URL = "https://api.alquran.cloud/v1";

// Improved utility function for fetching with more retries and longer backoff
async function fetchWithRetry(url: string, retries = 5, backoff = 2000): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      // Use Next.js fetch with revalidation
      const res = await fetch(url, { next: { revalidate: 3600 } });
      if (res.ok) return res;
      
      if (res.status === 429 || res.status >= 500) { 
        const wait = backoff * (i + 1);
        console.warn(`API Busy/Error (${res.status}) for ${url}. Retrying in ${wait}ms...`);
        await new Promise(resolve => setTimeout(resolve, wait));
        continue;
      }
      return res; // Return other non-ok responses
    } catch (error) {
      if (i === retries - 1) throw error;
      const wait = backoff * (i + 1);
      await new Promise(resolve => setTimeout(resolve, wait));
    }
  }
  throw new Error(`Failed to fetch ${url} after ${retries} retries`);
}

export async function getSurahList(): Promise<Surah[]> {
  try {
    const res = await fetchWithRetry(`${BASE_URL}/surah`);
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching surah list:", error);
    return [];
  }
}

export async function getSurahDetails(id: number): Promise<{ surah: Surah; ayahs: Ayah[] }> {
  try {
    const res = await fetchWithRetry(`${BASE_URL}/surah/${id}/editions/quran-uthmani,en.asad`);
    const json = await res.json();
    const data = json.data;

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
    const res = await fetch(`${BASE_URL}/search/${encodedQuery}/all/en.asad`, { next: { revalidate: 3600 } });
    
    if (!res.ok) return [];
    
    const data = await res.json();
    return data.data.matches || [];
  } catch (error) {
    console.error("Search error:", error);
    return [];
  }
}
