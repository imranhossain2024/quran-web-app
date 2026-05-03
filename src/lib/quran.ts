import quranData from "../../public/quran.json";
import { Surah, Ayah } from "@/types/quran";

const quran = quranData as any[];

export function getAllSurahs(): Surah[] {
  return quran.map((s) => ({
    number: s.id,
    name: s.name,
    englishName: s.transliteration,
    englishNameTranslation: s.translation,
    numberOfAyahs: s.total_verses,
    revelationType: s.type === "meccan" ? "Meccan" : "Medinan",
  }));
}

export function getSurah(id: number): { surah: Surah; ayahs: Ayah[] } | null {
  const s = quran.find((surah) => surah.id === id);
  if (!s) return null;

  // Calculate starting absolute ayah number (offset)
  let absoluteAyahOffset = 0;
  for (let i = 0; i < quran.length; i++) {
    if (quran[i].id === id) break;
    absoluteAyahOffset += quran[i].total_verses;
  }

  const surah: Surah = {
    number: s.id,
    name: s.name,
    englishName: s.transliteration,
    englishNameTranslation: s.translation,
    numberOfAyahs: s.total_verses,
    revelationType: s.type === "meccan" ? "Meccan" : "Medinan",
  };

  const ayahs: Ayah[] = s.verses.map((v: any) => {
    const absoluteNumber = absoluteAyahOffset + v.id;
    return {
      id: absoluteNumber,
      surahId: id,
      numberInSurah: v.id,
      juz: 0, 
      text: v.text,
      translation: v.translation,
      audio: `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${absoluteNumber}.mp3`,
    };
  });

  return { surah, ayahs };
}
