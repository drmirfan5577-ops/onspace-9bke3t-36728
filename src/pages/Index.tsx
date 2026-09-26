import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Heart, LayoutGrid, Filter } from "lucide-react";
import Header from "@/components/layout/Header";
import SurahCard from "@/components/features/SurahCard";
import SettingsPanel from "@/components/features/SettingsPanel";
import InfoPanel from "@/components/features/InfoPanel";
import BackgroundEffects from "@/components/features/BackgroundEffects";
import { SURAHS } from "@/constants/surahs";
import { useFavorites } from "@/hooks/useFavorites";
import { useReadingPosition } from "@/hooks/useReadingPosition";
import { useQuranSettings } from "@/hooks/useQuranSettings";
import type { Surah } from "@/types/quran";

type FilterType = "all" | "meccan" | "medinan" | "favorites";

export default function Index() {
  const navigate = useNavigate();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const { position } = useReadingPosition();
  const { settings, updateSetting, resetSettings } = useQuranSettings();
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);

  const filtered = useMemo<Surah[]>(() => {
    let list = SURAHS;

    if (filter === "meccan") list = list.filter((s) => s.type === "Meccan");
    else if (filter === "medinan") list = list.filter((s) => s.type === "Medinan");
    else if (filter === "favorites") list = list.filter((s) => isFavorite(s.number));

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (s) =>
          s.nameUrdu.includes(q) ||
          s.nameEnglish.toLowerCase().includes(q) ||
          s.nameArabic.includes(q) ||
          s.nameTransliteration.toLowerCase().includes(q) ||
          s.meaning.toLowerCase().includes(q) ||
          s.meaningUrdu.includes(q) ||
          String(s.number) === q
      );
    }

    return list;
  }, [filter, searchQuery, favorites]);

  const resumeSurah = position ? SURAHS.find((s) => s.number === position.surahNumber) : null;

  return (
    <div className="min-h-screen" dir="rtl">
      <BackgroundEffects themeId={settings.theme} />

      <Header
        onSettingsOpen={() => setSettingsOpen(true)}
        onInfoOpen={() => setInfoOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        showSearch
      />

      <main className="max-w-lg mx-auto pb-6 px-3">
        {/* Index Hero */}
        <div className="my-4 bg-white/70 border border-amber-100 rounded-2xl p-4 text-center shadow-sm">
          <div className="arabic-text text-4xl font-black text-amber-800 gold-glow-intense mb-1">
            الفهرس
          </div>
          <div className="text-amber-700 font-black text-lg mb-0.5">INDEX OF SURAHS</div>
          <div className="urdu-text text-sm text-amber-600">
            مکمل قرآن پاک — 114 سورتوں کی فہرست
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          {(
            [
              { key: "medinan", label: "مدنی 🌙", eng: "Medinan" },
              { key: "meccan", label: "مکی 🕌", eng: "Meccan" },
              { key: "all", label: `تمام ${SURAHS.length}`, eng: `All ${SURAHS.length}` },
            ] as { key: FilterType; label: string; eng: string }[]
          ).map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                filter === f.key
                  ? "bg-amber-400 border-amber-400 text-white shadow"
                  : "bg-white/80 border-amber-200 text-amber-700"
              }`}
            >
              <span className="block">{f.eng}</span>
              <span className="urdu-text block text-[11px]">{f.label}</span>
            </button>
          ))}
          <button
            onClick={() => setFilter("favorites")}
            className={`py-2 px-3 rounded-xl border transition-all flex items-center gap-1 text-xs font-bold ${
              filter === "favorites"
                ? "bg-red-400 border-red-400 text-white shadow"
                : "bg-white/80 border-amber-200 text-amber-700"
            }`}
          >
            <Heart size={12} className={filter === "favorites" ? "fill-white" : "fill-red-400 text-red-400"} />
            <span className="text-[11px]">{favorites.size}</span>
          </button>
        </div>

        {/* Stats bar */}
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="text-xs text-amber-500 font-medium">
            {filtered.length} / 114 سورتیں
          </span>
          {filter !== "all" || searchQuery ? (
            <button
              onClick={() => { setFilter("all"); setSearchQuery(""); }}
              className="text-xs text-amber-600 font-semibold"
            >
              ✕ فلٹر ہٹائیں
            </button>
          ) : null}
        </div>

        {/* Resume reading */}
        {resumeSurah && filter === "all" && !searchQuery && (
          <div
            className="mb-3 bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200 rounded-2xl p-3 flex items-center justify-between cursor-pointer hover:border-amber-300 transition-colors"
            onClick={() => navigate(`/reader/${resumeSurah.number}`)}
          >
            <button className="flex items-center gap-2 bg-amber-400 text-white text-xs font-bold px-3 py-2 rounded-xl">
              <BookOpen size={13} />
              جاری رکھیں
            </button>
            <div className="text-right">
              <div className="text-xs text-amber-500">آخری پوزیشن — Continue Reading</div>
              <div className="urdu-text text-sm font-bold text-amber-800">
                {resumeSurah.nameUrdu} — Ayah {position?.ayahNumber}
              </div>
            </div>
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-md bg-gradient-to-br from-amber-400 to-amber-600"
            >
              {resumeSurah.number}
            </div>
          </div>
        )}

        {/* Surah list */}
        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-5xl mb-3">📭</div>
            <div className="text-amber-700 font-semibold">کوئی نتیجہ نہیں ملا</div>
            <div className="text-amber-500 text-sm mt-1">No results found</div>
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((surah) => (
              <SurahCard
                key={surah.number}
                surah={surah}
                isFavorite={isFavorite(surah.number)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-amber-100 text-center text-xs text-amber-500 space-y-1">
          <div className="shimmer-text font-black text-sm">SMART World Order</div>
          <div className="text-amber-600">Dr M Irfan Qadir Thaheem · The One Man Army</div>
          <div>📧 dr.mirfan5577@gmail.com · 📱 0300-4737757</div>
          <div className="mt-2 text-[10px]">
            © 2026 تمام حقوق محفوظ · All Rights Reserved<br />
            SMART WORLD ORDER — A Global Family Platform
          </div>
        </div>
      </main>

      <SettingsPanel
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        settings={settings}
        onUpdate={updateSetting}
        onReset={resetSettings}
      />
      <InfoPanel open={infoOpen} onClose={() => setInfoOpen(false)} />
    </div>
  );
}
