import { useState, useCallback } from "react";

function loadFavorites(): Set<number> {
  try {
    const saved = localStorage.getItem("quran_favorites");
    if (saved) return new Set(JSON.parse(saved));
  } catch {}
  return new Set();
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<Set<number>>(loadFavorites);

  const toggleFavorite = useCallback((surahNumber: number) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(surahNumber)) {
        next.delete(surahNumber);
      } else {
        next.add(surahNumber);
      }
      localStorage.setItem("quran_favorites", JSON.stringify([...next]));
      return next;
    });
  }, []);

  const isFavorite = useCallback(
    (surahNumber: number) => favorites.has(surahNumber),
    [favorites]
  );

  return { favorites, toggleFavorite, isFavorite };
}
