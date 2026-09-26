import { X, RotateCcw } from "lucide-react";
import { THEMES } from "@/constants/themes";
import { RECITERS } from "@/constants/reciters";
import type { QuranSettings } from "@/types/quran";

interface SettingsPanelProps {
  open: boolean;
  onClose: () => void;
  settings: QuranSettings;
  onUpdate: <K extends keyof QuranSettings>(k: K, v: QuranSettings[K]) => void;
  onReset: () => void;
}

function Toggle({ on, onClick }: { on: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`relative w-11 h-6 rounded-full transition-colors ${on ? "bg-amber-400" : "bg-gray-200"}`}
    >
      <div
        className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${on ? "left-6" : "left-1"}`}
      />
    </button>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 text-amber-700 font-bold text-sm mb-2 pb-1 border-b border-amber-100">
      {children}
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-amber-50 last:border-0">
      <div className="text-right text-sm text-amber-900 font-medium">{label}</div>
      {children}
    </div>
  );
}

export default function SettingsPanel({ open, onClose, settings, onUpdate, onReset }: SettingsPanelProps) {
  return (
    <>
      {/* Overlay */}
      {open && (
        <div className="fixed inset-0 bg-black/30 z-[150] backdrop-blur-sm" onClick={onClose} />
      )}

      {/* Panel */}
      <div
        className={`sidebar-panel right-0 border-l border-amber-100 z-[200] transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ right: 0 }}
        dir="rtl"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-amber-100 sticky top-0 bg-white z-10">
          <div className="text-amber-700 font-black text-lg">اعدادات — Settings</div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center">
            <X size={16} className="text-amber-700" />
          </button>
        </div>

        <div className="p-4 space-y-5">
          {/* Background Theme */}
          <div>
            <SectionTitle>🎨 بیک گراؤنڈ تھیم</SectionTitle>
            <div className="grid grid-cols-5 gap-2">
              {THEMES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => onUpdate("theme", t.id)}
                  className={`aspect-square rounded-xl border-2 transition-all ${
                    settings.theme === t.id
                      ? "border-amber-500 scale-110 shadow-md"
                      : "border-transparent"
                  }`}
                  style={{ background: t.preview }}
                  title={t.nameUrdu}
                />
              ))}
            </div>
          </div>

          {/* Arabic Text Size */}
          <div>
            <SectionTitle>📏 عربی متن کا سائز</SectionTitle>
            <div className="flex items-center gap-3 bg-amber-50 rounded-xl p-3">
              <button
                onClick={() => onUpdate("arabicSize", Math.max(20, settings.arabicSize - 2))}
                className="w-9 h-9 rounded-lg bg-white border border-amber-200 font-bold text-amber-700 text-lg"
              >
                −
              </button>
              <span className="flex-1 text-center font-bold text-amber-800">
                {settings.arabicSize}px
              </span>
              <button
                onClick={() => onUpdate("arabicSize", Math.min(52, settings.arabicSize + 2))}
                className="w-9 h-9 rounded-lg bg-white border border-amber-200 font-bold text-amber-700 text-lg"
              >
                +
              </button>
            </div>
          </div>

          {/* Display options */}
          <div>
            <SectionTitle>👁️ ڈسپلے آپشنز</SectionTitle>
            <div className="bg-amber-50 rounded-xl overflow-hidden">
              <Row label="اردو ترجمہ">
                <Toggle on={settings.showUrdu} onClick={() => onUpdate("showUrdu", !settings.showUrdu)} />
              </Row>
              <Row label="English Translation">
                <Toggle on={settings.showEnglish} onClick={() => onUpdate("showEnglish", !settings.showEnglish)} />
              </Row>
              <Row label="تفسیر">
                <Toggle on={settings.showTafseer} onClick={() => onUpdate("showTafseer", !settings.showTafseer)} />
              </Row>
              <Row label="گلو ایفیکٹ">
                <Toggle on={settings.glowEffect} onClick={() => onUpdate("glowEffect", !settings.glowEffect)} />
              </Row>
              <Row label="آٹو سکرول">
                <Toggle on={settings.autoScroll} onClick={() => onUpdate("autoScroll", !settings.autoScroll)} />
              </Row>
            </div>
          </div>

          {/* Reciter */}
          <div>
            <SectionTitle>🎙️ قاری منتخب کریں</SectionTitle>
            <div className="bg-amber-50 rounded-xl overflow-hidden">
              {RECITERS.map((r) => (
                <button
                  key={r.id}
                  onClick={() => onUpdate("reciterId", r.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 border-b border-amber-100 last:border-0 text-right transition-colors ${
                    settings.reciterId === r.id ? "bg-amber-100" : "hover:bg-amber-50"
                  }`}
                >
                  <div>
                    <div className="text-sm font-bold text-amber-900 arabic-text">{r.nameArabic}</div>
                    <div className="text-[11px] text-amber-600">{r.country} · {r.style}</div>
                  </div>
                  {settings.reciterId === r.id && (
                    <div className="w-5 h-5 rounded-full bg-amber-400 flex items-center justify-center text-white text-xs">✓</div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Reset */}
          <button
            onClick={onReset}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-amber-200 text-amber-700 text-sm font-semibold hover:bg-amber-50 transition-colors"
          >
            <RotateCcw size={14} />
            ڈیفالٹ سیٹنگ
          </button>
        </div>
      </div>
    </>
  );
}
