import { SkipBack, SkipForward, Play, Pause, Repeat, Volume2 } from "lucide-react";
import { formatTime } from "@/lib/utils";
import { RECITERS } from "@/constants/reciters";
import { SURAHS } from "@/constants/surahs";
import type { PlayerState } from "@/hooks/useAudioPlayer";

interface AudioPlayerProps {
  playerState: PlayerState;
  onTogglePlay: () => void;
  onSeek: (fraction: number) => void;
  onSetSpeed: (speed: number) => void;
  onSetVolume: (v: number) => void;
  onToggleLoop: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const SPEEDS = [0.75, 1, 1.25, 1.5, 2];

export default function AudioPlayer({
  playerState,
  onTogglePlay,
  onSeek,
  onSetSpeed,
  onSetVolume,
  onToggleLoop,
  onPrev,
  onNext,
}: AudioPlayerProps) {
  if (!playerState.surahNumber) return null;

  const surah = SURAHS.find((s) => s.number === playerState.surahNumber);
  const reciter = RECITERS[playerState.reciterId] || RECITERS[0];
  const progress = playerState.duration ? (playerState.currentTime / playerState.duration) * 100 : 0;

  return (
    <div className="player-bar px-4 pb-safe">
      {/* Surah info */}
      <div className="flex items-center gap-3 pt-2 pb-1">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-xl flex-shrink-0">
          🎧
        </div>
        <div className="flex-1 text-right min-w-0">
          <div className="arabic-text text-base font-bold text-amber-900 leading-tight truncate gold-glow">
            {surah ? `سورہ ${surah.nameUrdu}` : `Surah ${playerState.surahNumber}`}
          </div>
          <div className="text-xs text-amber-600 truncate">{reciter.nameArabic}</div>
        </div>
        <div className="text-xs text-amber-500 font-mono">
          {`${playerState.surahNumber}/114`}
        </div>
      </div>

      {/* Progress bar */}
      <div className="flex items-center gap-2 mb-1.5">
        <span className="text-[10px] text-amber-500 font-mono w-8 text-center">
          {formatTime(playerState.currentTime)}
        </span>
        <div
          className="flex-1 h-2 bg-amber-100 rounded-full cursor-pointer relative overflow-hidden"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            onSeek((e.clientX - rect.left) / rect.width);
          }}
        >
          <div
            className="progress-bar h-full absolute left-0 top-0"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-[10px] text-amber-500 font-mono w-8 text-center">
          {formatTime(playerState.duration)}
        </span>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between pb-2">
        {/* Speed */}
        <div className="flex items-center gap-1">
          {SPEEDS.map((sp) => (
            <button
              key={sp}
              onClick={() => onSetSpeed(sp)}
              className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md transition-colors ${
                playerState.speed === sp
                  ? "bg-amber-400 text-white"
                  : "bg-amber-50 text-amber-600 border border-amber-200"
              }`}
            >
              {sp}x
            </button>
          ))}
        </div>

        {/* Main controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={onPrev}
            className="w-9 h-9 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 hover:bg-amber-100 transition-colors"
          >
            <SkipBack size={16} />
          </button>
          <button
            onClick={onTogglePlay}
            className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white shadow-lg hover:shadow-amber-200 transition-all active:scale-95"
          >
            {playerState.loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : playerState.isPlaying ? (
              <Pause size={20} />
            ) : (
              <Play size={20} className="ml-0.5" />
            )}
          </button>
          <button
            onClick={onNext}
            className="w-9 h-9 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 hover:bg-amber-100 transition-colors"
          >
            <SkipForward size={16} />
          </button>
        </div>

        {/* Loop + Vol */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={onToggleLoop}
            className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
              playerState.loop
                ? "bg-amber-400 text-white"
                : "bg-amber-50 border border-amber-200 text-amber-600"
            }`}
          >
            <Repeat size={14} />
          </button>
          <div className="flex items-center gap-1">
            <Volume2 size={12} className="text-amber-500" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={playerState.volume}
              onChange={(e) => onSetVolume(+e.target.value)}
              className="w-14 accent-amber-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
