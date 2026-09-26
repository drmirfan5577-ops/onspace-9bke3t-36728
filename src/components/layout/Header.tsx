import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Settings, Info, Home, Search, X } from "lucide-react";

interface HeaderProps {
  onSettingsOpen: () => void;
  onInfoOpen: () => void;
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
  showSearch?: boolean;
}

export default function Header({
  onSettingsOpen,
  onInfoOpen,
  searchQuery = "",
  onSearchChange,
  showSearch = false,
}: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const isReader = location.pathname.includes("/reader/");
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 milky-card border-b border-amber-100 shadow-sm">
      {/* Top bismillah */}
      <div className="text-center py-1.5 border-b border-amber-50">
        <span className="arabic-text text-base font-bold text-amber-700 gold-glow">
          ° بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ °
        </span>
      </div>
      {/* Brand bar */}
      <div className="text-center pb-0.5">
        <span className="shimmer-text text-xs font-black tracking-widest uppercase">
          SMART WORLD ORDER
        </span>
      </div>

      {/* Main header row */}
      <div className="flex items-center justify-between px-3 py-2 gap-2">
        {/* Left: logo + title */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 min-w-0"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-xl shadow-md flex-shrink-0">
            🕌
          </div>
          <div className="text-right min-w-0">
            <div className="arabic-text text-lg font-bold text-amber-800 leading-tight gold-glow truncate">
              القرآن الکریم
            </div>
            <div className="text-[10px] text-amber-600 font-semibold tracking-wide truncate">
              الٹرا پرو ایڈیشن
            </div>
          </div>
        </button>

        {/* Right: actions */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {isReader && (
            <button
              onClick={() => navigate("/")}
              className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 hover:bg-amber-100 transition-colors"
            >
              <Home size={16} />
            </button>
          )}
          {showSearch && (
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 hover:bg-amber-100 transition-colors"
            >
              <Search size={16} />
            </button>
          )}
          <button
            onClick={onSettingsOpen}
            className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 hover:bg-amber-100 transition-colors"
          >
            <Settings size={16} />
          </button>
          <button
            onClick={onInfoOpen}
            className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 hover:bg-amber-100 transition-colors"
          >
            <Info size={16} />
          </button>
        </div>
      </div>

      {/* Search bar */}
      {showSearch && searchOpen && (
        <div className="px-3 pb-2">
          <div className="relative">
            <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
              placeholder="سورہ / Surah name, number or meaning"
              className="w-full bg-amber-50 border border-amber-200 rounded-xl py-2 pr-9 pl-9 text-sm text-right text-amber-900 placeholder-amber-400 outline-none focus:ring-2 focus:ring-amber-300"
              dir="rtl"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange?.("")}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-400"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
