export interface Surah {
  number: number;
  nameArabic: string;
  nameEnglish: string;
  nameUrdu: string;
  nameTransliteration: string;
  meaning: string;
  meaningUrdu: string;
  verses: number;
  type: "Meccan" | "Medinan";
  para: number;
  order: number; // revelation order
}

export interface Ayah {
  number: number;
  arabic: string;
  urdu: string;
  english: string;
  tafseer?: string;
}

export interface Reciter {
  id: number;
  nameArabic: string;
  nameEnglish: string;
  country: string;
  style: string;
  baseUrl: string;
}

export interface QuranSettings {
  theme: string;
  arabicSize: number;
  urduSize: number;
  showUrdu: boolean;
  showEnglish: boolean;
  showTafseer: boolean;
  showTransliteration: boolean;
  glowEffect: boolean;
  reciterId: number;
  playbackSpeed: number;
  volume: number;
  autoPlay: boolean;
  loopAyah: boolean;
  loopSurah: boolean;
  autoScroll: boolean;
  bgOpacity: number;
}

export interface ReadingPosition {
  surahNumber: number;
  ayahNumber: number;
  timestamp: number;
}
