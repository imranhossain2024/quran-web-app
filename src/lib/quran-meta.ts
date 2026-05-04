/**
 * Quran metadata: Juz and Page mappings based on the standard Madinah Mushaf.
 */

export interface JuzInfo {
  number: number;
  name: string;        // Arabic name of the Juz
  nameEn: string;      // Transliterated name
  startSurah: number;
  startAyah: number;
  endSurah: number;
  endAyah: number;
}

export interface PageRange {
  page: number;
  surah: number;       // Starting surah on this page
  ayah: number;        // Starting ayah on this page
}

// ========== JUZ DATA (30 Juz) ==========
export const JUZ_DATA: JuzInfo[] = [
  { number: 1,  name: "الٓمٓ",                nameEn: "Alif Lam Mim",         startSurah: 1,  startAyah: 1,   endSurah: 2,  endAyah: 141 },
  { number: 2,  name: "سَيَقُولُ",            nameEn: "Sayaqul",              startSurah: 2,  startAyah: 142, endSurah: 2,  endAyah: 252 },
  { number: 3,  name: "تِلْكَ ٱلرُّسُلُ",     nameEn: "Tilkar Rusul",         startSurah: 2,  startAyah: 253, endSurah: 3,  endAyah: 92  },
  { number: 4,  name: "لَن تَنَالُوا",         nameEn: "Lan Tanaloo",          startSurah: 3,  startAyah: 93,  endSurah: 4,  endAyah: 23  },
  { number: 5,  name: "وَٱلْمُحْصَنَاتُ",     nameEn: "Wal Muhsanat",         startSurah: 4,  startAyah: 24,  endSurah: 4,  endAyah: 147 },
  { number: 6,  name: "لَا يُحِبُّ ٱللَّهُ",  nameEn: "La Yuhibbullah",       startSurah: 4,  startAyah: 148, endSurah: 5,  endAyah: 81  },
  { number: 7,  name: "وَإِذَا سَمِعُوا",     nameEn: "Wa Iza Sami'u",        startSurah: 5,  startAyah: 82,  endSurah: 6,  endAyah: 110 },
  { number: 8,  name: "وَلَوْ أَنَّنَا",       nameEn: "Wa Lau Annana",        startSurah: 6,  startAyah: 111, endSurah: 7,  endAyah: 87  },
  { number: 9,  name: "قَالَ ٱلْمَلَأُ",      nameEn: "Qalal Mala'u",         startSurah: 7,  startAyah: 88,  endSurah: 8,  endAyah: 40  },
  { number: 10, name: "وَٱعْلَمُوا",          nameEn: "Wa'lamu",              startSurah: 8,  startAyah: 41,  endSurah: 9,  endAyah: 92  },
  { number: 11, name: "يَعْتَذِرُونَ",        nameEn: "Ya'tadhiruna",         startSurah: 9,  startAyah: 93,  endSurah: 11, endAyah: 5   },
  { number: 12, name: "وَمَا مِن دَابَّةٍ",    nameEn: "Wa Ma Min Dabbah",     startSurah: 11, startAyah: 6,   endSurah: 12, endAyah: 52  },
  { number: 13, name: "وَمَا أُبَرِّئُ",       nameEn: "Wa Ma Ubarri'u",       startSurah: 12, startAyah: 53,  endSurah: 14, endAyah: 52  },
  { number: 14, name: "رُبَمَا",              nameEn: "Rubama",               startSurah: 15, startAyah: 1,   endSurah: 16, endAyah: 128 },
  { number: 15, name: "سُبْحَانَ ٱلَّذِي",    nameEn: "Subhanal Ladhi",       startSurah: 17, startAyah: 1,   endSurah: 18, endAyah: 74  },
  { number: 16, name: "قَالَ أَلَمْ",          nameEn: "Qal Alam",             startSurah: 18, startAyah: 75,  endSurah: 20, endAyah: 135 },
  { number: 17, name: "ٱقْتَرَبَ",            nameEn: "Iqtaraba",             startSurah: 21, startAyah: 1,   endSurah: 22, endAyah: 78  },
  { number: 18, name: "قَدْ أَفْلَحَ",         nameEn: "Qad Aflaha",           startSurah: 23, startAyah: 1,   endSurah: 25, endAyah: 20  },
  { number: 19, name: "وَقَالَ ٱلَّذِينَ",     nameEn: "Wa Qalal Ladhina",     startSurah: 25, startAyah: 21,  endSurah: 27, endAyah: 55  },
  { number: 20, name: "أَمَّنْ خَلَقَ",        nameEn: "A'man Khalaq",         startSurah: 27, startAyah: 56,  endSurah: 29, endAyah: 45  },
  { number: 21, name: "ٱتْلُ مَا أُوحِيَ",    nameEn: "Utlu Ma Uhiya",        startSurah: 29, startAyah: 46,  endSurah: 33, endAyah: 30  },
  { number: 22, name: "وَمَن يَقْنُتْ",       nameEn: "Wa Man Yaqnut",        startSurah: 33, startAyah: 31,  endSurah: 36, endAyah: 27  },
  { number: 23, name: "وَمَا لِيَ",            nameEn: "Wa Mali",              startSurah: 36, startAyah: 28,  endSurah: 39, endAyah: 31  },
  { number: 24, name: "فَمَنْ أَظْلَمُ",       nameEn: "Faman Azlamu",         startSurah: 39, startAyah: 32,  endSurah: 41, endAyah: 46  },
  { number: 25, name: "إِلَيْهِ يُرَدُّ",      nameEn: "Ilaihi Yuraddu",       startSurah: 41, startAyah: 47,  endSurah: 45, endAyah: 37  },
  { number: 26, name: "حمٓ",                  nameEn: "Ha Mim",               startSurah: 46, startAyah: 1,   endSurah: 51, endAyah: 30  },
  { number: 27, name: "قَالَ فَمَا خَطْبُكُمْ", nameEn: "Qala Fama Khatbukum", startSurah: 51, startAyah: 31,  endSurah: 57, endAyah: 29  },
  { number: 28, name: "قَدْ سَمِعَ",           nameEn: "Qad Sami'a",           startSurah: 58, startAyah: 1,   endSurah: 66, endAyah: 12  },
  { number: 29, name: "تَبَارَكَ ٱلَّذِي",     nameEn: "Tabarakal Ladhi",      startSurah: 67, startAyah: 1,   endSurah: 77, endAyah: 50  },
  { number: 30, name: "عَمَّ",                nameEn: "Amma",                 startSurah: 78, startAyah: 1,   endSurah: 114,endAyah: 6   },
];

// ========== SURAH START PAGES (Madinah Mushaf, 604 pages) ==========
// Maps surah number (1-114) to the page it starts on.
export const SURAH_START_PAGE: Record<number, number> = {
  1: 1,    2: 2,    3: 50,   4: 77,   5: 106,  6: 128,  7: 151,  8: 177,
  9: 187,  10: 208, 11: 221, 12: 235, 13: 249, 14: 255, 15: 262, 16: 267,
  17: 282, 18: 293, 19: 305, 20: 312, 21: 322, 22: 332, 23: 342, 24: 350,
  25: 359, 26: 367, 27: 377, 28: 385, 29: 396, 30: 404, 31: 411, 32: 415,
  33: 418, 34: 428, 35: 434, 36: 440, 37: 446, 38: 453, 39: 458, 40: 467,
  41: 477, 42: 483, 43: 489, 44: 496, 45: 499, 46: 502, 47: 507, 48: 511,
  49: 515, 50: 518, 51: 520, 52: 523, 53: 526, 54: 528, 55: 531, 56: 534,
  57: 537, 58: 542, 59: 545, 60: 549, 61: 551, 62: 553, 63: 554, 64: 556,
  65: 558, 66: 560, 67: 562, 68: 564, 69: 566, 70: 568, 71: 570, 72: 572,
  73: 574, 74: 575, 75: 577, 76: 578, 77: 580, 78: 582, 79: 583, 80: 585,
  81: 586, 82: 587, 83: 587, 84: 589, 85: 590, 86: 591, 87: 591, 88: 592,
  89: 593, 90: 594, 91: 595, 92: 595, 93: 596, 94: 596, 95: 597, 96: 597,
  97: 598, 98: 598, 99: 599, 100: 599, 101: 600, 102: 600, 103: 601,
  104: 601, 105: 601, 106: 602, 107: 602, 108: 602, 109: 603, 110: 603,
  111: 603, 112: 604, 113: 604, 114: 604,
};

const TOTAL_PAGES = 604;

/**
 * Given a Mushaf page number (1-604), returns which surah it belongs to.
 */
export function getSurahForPage(page: number): number {
  // Find the surah whose start page is <= page, and the next surah's start page is > page.
  const surahNumbers = Object.keys(SURAH_START_PAGE)
    .map(Number)
    .sort((a, b) => a - b);
  
  let result = 1;
  for (const surahNum of surahNumbers) {
    if (SURAH_START_PAGE[surahNum] <= page) {
      result = surahNum;
    } else {
      break;
    }
  }
  return result;
}

/**
 * Returns a list of page groups for the sidebar, grouped by tens.
 * Each group shows the page range and which surahs are covered.
 */
export function getPageGroups(): { startPage: number; endPage: number; label: string }[] {
  const groups = [];
  const groupSize = 20;

  for (let start = 1; start <= TOTAL_PAGES; start += groupSize) {
    const end = Math.min(start + groupSize - 1, TOTAL_PAGES);
    const startSurah = getSurahForPage(start);
    const endSurah = getSurahForPage(end);
    groups.push({
      startPage: start,
      endPage: end,
      label: startSurah === endSurah
        ? `Surah ${startSurah}`
        : `Surah ${startSurah}–${endSurah}`,
    });
  }
  return groups;
}
