
import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Heart,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Play,
  Share2,
} from "lucide-react";
import { toast } from "sonner";
import Header from "@/components/layout/Header";
import AudioPlayer from "@/components/features/AudioPlayer";
import SettingsPanel from "@/components/features/SettingsPanel";
import InfoPanel from "@/components/features/InfoPanel";
import BackgroundEffects from "@/components/features/BackgroundEffects";
import { SURAHS } from "@/constants/surahs";
import { getSurahAyahs } from "@/constants/quranData";
import { RECITERS } from "@/constants/reciters";
import { useFavorites } from "@/hooks/useFavorites";
import { useReadingPosition } from "@/hooks/useReadingPosition";
import { useQuranSettings } from "@/hooks/useQuranSettings";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { cn } from "@/lib/utils";
import type { Ayah } from "@/types/quran";

export default function Reader() {
  const { surahNumber } = useParams<{ surahNumber: string }>();
  const navigate = useNavigate();
  const num = parseInt(surahNumber || "1", 10);
  const surah = SURAHS.find((s) => s.number === num);
  const ayahs: Ayah[] = getSurahAyahs(num);

  const { isFavorite, toggleFavorite } = useFavorites();
  const { savePosition } = useReadingPosition();
  const { settings, updateSetting, resetSettings } = useQuranSettings();
  const { state: playerState, loadSurah, togglePlay, seekTo, setSpeed, setVolume, toggleLoop, stop } = useAudioPlayer();

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [activeAyah, setActiveAyah] = useState<number | null>(null);
  const [bookmarked, setBookmarked] = useState<Set<number>>(new Set());
  const ayahRefs = useRef<Record<number, HTMLDivElement | null>>({});

  // Save position on open
  useEffect(() => {
    if (surah) savePosition(num, 1);
    // The previous error message was about 'react-hooks/exhaustive-deps' rule definition not found,
    // which indicates an ESLint configuration issue, not a syntax error in the code itself.
    // However, if the intent was to fix the exhaustive-deps warning, the dependencies were already correctly listed.
    // I'm removing the `eslint-disable-next-line` comment as it's not a syntax fix and potentially hides a real issue if ESLint is misconfigured.
    // If the linter is properly configured, these dependencies are correct.
  }, [num, surah, savePosition]);

  // Load audio
  useEffect(() => {
    loadSurah(num, settings.reciterId);
    return () => stop();
    // Same as above, removing the eslint-disable-next-line comment.
  }, [num, settings.reciterId, loadSurah, stop]);

  const handlePlaySurah = () => {
    loadSurah(num, settings.reciterId, true);
    toast.success(`▶ سورہ ${surah?.nameUrdu} — ${RECITERS[settings.reciterId]?.nameArabic}`);
  };

  const handleAyahClick = (ayahNum: number) => {
    setActiveAyah(ayahNum === activeAyah ? null : ayahNum);
    savePosition(num, ayahNum);
  };

  const handleBookmark = (ayahNum: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarked((prev) => {
      const next = new Set(prev);
      if (next.has(ayahNum)) { next.delete(ayahNum); toast("🔖 بکمارک ہٹا دیا"); }
      else { next.add(ayahNum); toast.success("🔖 بکمارک محفوظ"); }
      return next;
    });
  };

  const handleShare = async (ayah: Ayah, e: React.MouseEvent) => {
    e.stopPropagation();
    const text = `${ayah.arabic}\n\n${ayah.urdu}\n\n📖 سورہ ${surah?.nameUrdu} — آیت ${ayah.number}\n🕌 SMART World Order`;
    try {
      if (navigator.share) {
        await navigator.share({ text, title: "القرآن الکریم" });
      } else {
        await navigator.clipboard.writeText(text);
        toast.success("✅ کاپی ہو گئی");
      }
    } catch {}
  };

  const prevSurah = num > 1 ? () => navigate(`/reader/${num - 1}`) : undefined;
  const nextSurah = num < 114 ? () => navigate(`/reader/${num + 1}`) : undefined;

  if (!surah) return <div className="text-center p-8">سورہ نہیں ملی</div>;

  return (
    <div className="min-h-screen" dir="rtl">
      <BackgroundEffects themeId={settings.theme} />

      <Header
        onSettingsOpen={() => setSettingsOpen(true)}
        onInfoOpen={() => setInfoOpen(true)}
      />

      <main className="max-w-lg mx-auto pb-40 px-3 pt-2">
        {/* Surah header card */}
        <div className="bg-white/80 border border-amber-200 rounded-2xl p-4 text-center mb-4 shadow-sm">
          <div className="arabic-text text-2xl font-black text-amber-800 gold-glow mb-1">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </div>
          <div className="arabic-text text-3xl font-black text-amber-900 gold-glow-intense mb-1">
            {surah.nameArabic}
          </div>
          <div className="urdu-text text-lg font-bold text-amber-700 mb-0.5">{surah.nameUrdu}</div>
          <div className="flex items-center justify-center gap-2 text-xs text-amber-500 mb-3 flex-wrap">
            <span className="font-bold">{surah.nameEnglish}</span>
            <span>·</span>
            <span>{surah.meaning}</span>
            <span>·</span>
            <span
              className={`font-bold px-2 py-0.5 rounded-full ${
                surah.type === "Meccan" ? "bg-orange-100 text-orange-700" : "bg-blue-100 text-blue-700"
              }`}
            >
              {surah.type === "Meccan" ? "مکی" : "مدنی"}
            </span>
            <span>·</span>
            <span>{surah.verses} آیات</span>
            <span>·</span>
            <span>پارہ {surah.para}</span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <button
              onClick={handlePlaySurah}
              className="flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-600 text-white text-sm font-bold px-4 py-2 rounded-xl shadow"
            >
              <Play size={14} />
              مکمل سوره — Play Full Surah
            </button>
            <button
              onClick={() => toggleFavorite(surah.number)}
              className={cn(
                "w-9 h-9 rounded-xl border flex items-center justify-center transition-colors",
                isFavorite(surah.number)
                  ? "bg-red-50 border-red-200 text-red-500"
                  : "bg-amber-50 border-amber-200 text-amber-500"
              )}
            >
              <Heart size={16} className={isFavorite(surah.number) ? "fill-red-500" : ""} />
            </button>
          </div>
        </div>

        {/* Ayahs */}
        <div className="space-y-3">
          {ayahs.map((ayah) => (
            <div
              key={ayah.number}
              ref={(el) => { ayahRefs.current[ayah.number] = el; }}
              onClick={() => handleAyahClick(ayah.number)}
              className={cn(
                "bg-white/80 border rounded-2xl transition-all duration-200 cursor-pointer hover:shadow-md",
                activeAyah === ayah.number
                  ? "ayah-active border-amber-400"
                  : "border-amber-100"
              )}
            >
              {/* Ayah number badge */}
              <div className="flex items-center justify-between px-4 pt-3 pb-1">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={(e) => handleBookmark(ayah.number, e)}
                    className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-amber-50"
                  >
                    <Bookmark
                      size={13}
                      className={bookmarked.has(ayah.number) ? "fill-amber-500 text-amber-500" : "text-amber-300"}
                    />
                  </button>
                  <button
                    onClick={(e) => handleShare(ayah, e)}
                    className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-amber-50"
                  >
                    <Share2 size={13} className="text-amber-300" />
                  </button>
                </div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                  {ayah.number}
                </div>
              </div>

              {/* Arabic text */}
              <div className="px-4 pb-2">
                <div
                  className={cn(
                    "arabic-text font-bold text-center leading-loose pb-3 border-b border-amber-50",
                    settings.glowEffect ? "gold-glow text-amber-900" : "text-amber-900"
                  )}
                  style={{ fontSize: settings.arabicSize }}
                >
                  {ayah.arabic}
                </div>

                {/* Urdu translation */}
                {settings.showUrdu && (
                  <div className="mt-2 urdu-text text-amber-800 bg-amber-50/50 rounded-xl px-3 py-2 border border-amber-100"
                    style={{ fontSize: settings.urduSize, lineHeight: 2.2 }}
                    dir="rtl"
                  >
                    <span className="text-[10px] font-bold text-amber-500 block mb-1">
                      📘 اردو — Muhammad Junagarhi
                    </span>
                    {ayah.urdu}
                  </div>
                )}

                {/* English translation */}
                {settings.showEnglish && (
                  <div className="mt-2 text-amber-800 bg-blue-50/30 rounded-xl px-3 py-2 border border-blue-100 text-sm leading-relaxed" dir="ltr">
                    <span className="text-[10px] font-bold text-blue-400 block mb-1">
                      📗 English — Sahih International
                    </span>
                    {ayah.english}
                  </div>
                )}

                {/* Tafseer */}
                {settings.showTafseer && ayah.tafseer && (
                  <div className="mt-2 urdu-text text-amber-700 bg-purple-50/30 rounded-xl px-3 py-2 border border-purple-100"
                    style={{ fontSize: 13, lineHeight: 2 }}
                    dir="rtl"
                  >
                    <span className="text-[10px] font-bold text-purple-400 block mb-1">
                      📕 تفسیر — ابن کثیر
                    </span>
                    {ayah.tafseer}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6 gap-3">
          <button
            onClick={nextSurah}
            disabled={num >= 114}
            className="flex-1 flex items-center justify-center gap-2 bg-white/80 border border-amber-200 rounded-xl py-3 text-amber-700 font-bold text-sm hover:bg-amber-50 disabled:opacity-40 transition-colors"
          >
            <ChevronRight size={16} />
            اگلی سورہ
          </button>
          <div className="text-center bg-white/80 border border-amber-100 rounded-xl px-4 py-3 text-xs font-bold text-amber-700">
            {num} / 114
          </div>
          <button
            onClick={prevSurah}
            disabled={num <= 1}
            className="flex-1 flex items-center justify-center gap-2 bg-white/80 border border-amber-200 rounded-xl py-3 text-amber-700 font-bold text-sm hover:bg-amber-50 disabled:opacity-40 transition-colors"
          >
            پچھلی سورہ
            <ChevronLeft size={16} />
          </button>
        </div>
      </main>

      {/* Audio Player */}
      <AudioPlayer
        playerState={playerState}
        onTogglePlay={togglePlay}
        onSeek={seekTo}
        onSetSpeed={setSpeed}
        onSetVolume={setVolume}
        onToggleLoop={toggleLoop}
        onPrev={() => prevSurah?.()}
        onNext={() => nextSurah?.()}
      />

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
