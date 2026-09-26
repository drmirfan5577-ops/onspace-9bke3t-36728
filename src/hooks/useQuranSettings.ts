import { useState, useCallback } from "react";
import type { QuranSettings } from "@/types/quran";

const DEFAULT_SETTINGS: QuranSettings = {
  theme: "white",
  arabicSize: 32,
  urduSize: 16,
  showUrdu: true,
  showEnglish: false,
  showTafseer: false,
  showTransliteration: false,
  glowEffect: true,
  reciterId: 0,
  playbackSpeed: 1,
  volume: 0.9,
  autoPlay: false,
  loopAyah: false,
  loopSurah: false,
  autoScroll: true,
  bgOpacity: 100,
};

function loadSettings(): QuranSettings {
  try {
    const saved = localStorage.getItem("quran_settings");
    if (saved) return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
  } catch {}
  return DEFAULT_SETTINGS;
}

export function useQuranSettings() {
  const [settings, setSettings] = useState<QuranSettings>(loadSettings);

  const updateSetting = useCallback(<K extends keyof QuranSettings>(
    key: K,
    value: QuranSettings[K]
  ) => {
    setSettings((prev) => {
      const next = { ...prev, [key]: value };
      localStorage.setItem("quran_settings", JSON.stringify(next));
      return next;
    });
  }, []);

  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
    localStorage.setItem("quran_settings", JSON.stringify(DEFAULT_SETTINGS));
  }, []);

  return { settings, updateSetting, resetSettings };
}
