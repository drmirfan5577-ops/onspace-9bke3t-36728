import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Surah } from "@/types/quran";
import { SURAH_COLORS } from "@/constants/surahs";

interface SurahCardProps {
  surah: Surah;
  isFavorite: boolean;
  onToggleFavorite: (n: number) => void;
}

export default function SurahCard({ surah, isFavorite, onToggleFavorite }: SurahCardProps) {
  const navigate = useNavigate();
  const colorIdx = (surah.number - 1) % SURAH_COLORS.length;
  const gradClass = SURAH_COLORS[colorIdx];

  return (
    <div
      className="group flex items-center gap-3 p-3.5 bg-white/80 border border-amber-100 rounded-2xl shadow-sm hover:shadow-md hover:border-amber-200 transition-all duration-200 cursor-pointer active:scale-[0.98]"
      onClick={() => navigate(`/reader/${surah.number}`)}
    >
      {/* Read icon */}
      <button
        onClick={(e) => { e.stopPropagation(); navigate(`/reader/${surah.number}`); }}
        className={`w-11 h-11 rounded-xl bg-gradient-to-br ${gradClass} bg-opacity-90 flex items-center justify-center text-white shadow-sm flex-shrink-0`}
        title="پڑھیں"
      >
        📖
      </button>

      {/* Info */}
      <div className="flex-1 min-w-0 text-right">
        <div className="flex items-center justify-end gap-2 mb-0.5">
          <span className="urdu-text text-base font-bold text-amber-900 leading-tight">
            {surah.nameUrdu}
          </span>
        </div>
        <div className="flex items-center justify-end gap-1.5 flex-wrap">
          <span className="text-xs text-amber-600 font-medium italic">{surah.meaning}</span>
          <span className="text-amber-300 text-xs">·</span>
          <span className="text-xs text-amber-700 font-semibold">{surah.nameEnglish}</span>
        </div>
        <div className="flex items-center justify-end gap-2 mt-0.5">
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              surah.type === "Meccan"
                ? "bg-orange-100 text-orange-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {surah.type === "Meccan" ? "مکی" : "مدنی"} · {surah.type}
          </span>
          <span className="text-[11px] text-amber-500">{surah.verses} آیات</span>
        </div>
      </div>

      {/* Fav + Number */}
      <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-md bg-gradient-to-br ${gradClass}`}
        >
          {surah.number}
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onToggleFavorite(surah.number); }}
          className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
        >
          <Heart
            size={15}
            className={isFavorite ? "fill-red-500 text-red-500" : "text-amber-300"}
          />
        </button>
      </div>
    </div>
  );
}
