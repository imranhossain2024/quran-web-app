export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: "Meccan" | "Medinan";
}

export interface Ayah {
  id: number;
  surahId: number;
  numberInSurah: number;
  juz: number;
  text: string;
  translation: string;
  audio: string;
  audioSecondary?: string[];
}

export interface Settings {
  arabicFont: string;
  arabicFontSize: number;
  translationFontSize: number;
  theme: "light" | "dark";
}
export interface SearchResult {
  surah: Surah;
  ayah: Ayah;
}
export interface RawAyah {
  id: number;
  text: string;
  translation?: string;
}

export interface RawSurah {
  id: number;
  name: string;
  transliteration: string;
  type: string;
  total_verses: number;
  translation?: string;
  verses: RawAyah[];
}
