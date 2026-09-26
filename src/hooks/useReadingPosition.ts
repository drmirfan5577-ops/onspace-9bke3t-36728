import { useState, useCallback } from "react";
import type { ReadingPosition } from "@/types/quran";

function loadPosition(): ReadingPosition | null {
  try {
    const saved = localStorage.getItem("quran_position");
    if (saved) return JSON.parse(saved);
  } catch {}
  return null;
}

export function useReadingPosition() {
  const [position, setPosition] = useState<ReadingPosition | null>(loadPosition);

  const savePosition = useCallback((surahNumber: number, ayahNumber: number) => {
    const pos: ReadingPosition = { surahNumber, ayahNumber, timestamp: Date.now() };
    setPosition(pos);
    localStorage.setItem("quran_position", JSON.stringify(pos));
  }, []);

  const clearPosition = useCallback(() => {
    setPosition(null);
    localStorage.removeItem("quran_position");
  }, []);

  return { position, savePosition, clearPosition };
}
