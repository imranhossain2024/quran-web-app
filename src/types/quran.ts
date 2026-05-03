export interface Surah {
  id: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  arabicName: string;
  revelationType: "Meccan" | "Medinan";
  numberOfAyahs: number;
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
