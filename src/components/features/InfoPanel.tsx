import { X, Phone, Mail, Globe, Shield, AlertTriangle } from "lucide-react";

interface InfoPanelProps {
  open: boolean;
  onClose: () => void;
}

export default function InfoPanel({ open, onClose }: InfoPanelProps) {
  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/30 z-[150] backdrop-blur-sm" onClick={onClose} />
      )}

      <div
        className={`sidebar-panel border-r border-amber-100 z-[200] transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ left: 0 }}
        dir="rtl"
      >
        <div className="flex items-center justify-between p-4 border-b border-amber-100 sticky top-0 bg-white z-10">
          <div className="text-amber-700 font-black text-lg">معلومات — About</div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center">
            <X size={16} className="text-amber-700" />
          </button>
        </div>

        <div className="p-4 space-y-4" dir="rtl">
          {/* Vision */}
          <div className="text-center bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-4 border border-amber-200">
            <div className="arabic-text text-xl font-black text-amber-800 gold-glow mb-2">
              لَا إِلَٰهَ إِلَّا اللَّهُ
            </div>
            <div className="text-amber-700 font-black text-base mb-1">SMART WORLD ORDER</div>
            <div className="text-amber-600 text-xs leading-relaxed">
              The Global Family Platform Vision<br />
              روح رواں اور کوشاں
            </div>
          </div>

          {/* About App */}
          <div className="bg-white rounded-xl border border-amber-100 p-3">
            <div className="text-amber-700 font-bold text-sm mb-2">📖 اس ایپ کے بارے میں</div>
            <div className="text-amber-800 text-xs leading-relaxed space-y-1" dir="rtl">
              <p>• مکمل قرآن پاک — تمام 114 سورتیں</p>
              <p>• اردو، انگلش ترجمہ بیک وقت</p>
              <p>• تفسیر ابن کثیر کے ساتھ</p>
              <p>• 10 مشہور قراء کی تلاوت</p>
              <p>• لائیو بیک گراؤنڈ تھیمز</p>
              <p>• آف لائن سپورٹ — کسی بھی جگہ</p>
            </div>
          </div>

          {/* Creator */}
          <div className="bg-white rounded-xl border border-amber-100 p-3 text-center">
            <div className="text-amber-600 text-xs mb-1">A Project of</div>
            <div className="shimmer-text text-lg font-black mb-1">SMART World Order</div>
            <div className="text-amber-800 font-bold text-sm mb-0.5">Dr M Irfan Qadir Thaheem</div>
            <div className="text-amber-500 text-xs italic mb-3">The One Man Army</div>
            <div className="space-y-1.5">
              <a href="tel:03004737757" className="flex items-center justify-center gap-2 text-xs text-amber-700 hover:text-amber-900">
                <Phone size={12} /> 0300-4737757
              </a>
              <a href="mailto:dr.mirfan5577@gmail.com" className="flex items-center justify-center gap-2 text-xs text-amber-700 hover:text-amber-900">
                <Mail size={12} /> dr.mirfan5577@gmail.com
              </a>
              <a href="mailto:doc.zaeem86@gmail.com" className="flex items-center justify-center gap-2 text-xs text-amber-700 hover:text-amber-900">
                <Mail size={12} /> doc.zaeem86@gmail.com
              </a>
            </div>
          </div>

          {/* Privacy */}
          <div className="bg-white rounded-xl border border-amber-100 p-3">
            <div className="flex items-center gap-2 text-amber-700 font-bold text-sm mb-2">
              <Shield size={14} /> پرائیویسی
            </div>
            <div className="text-amber-700 text-xs leading-relaxed space-y-1" dir="rtl">
              <p>• تمام ڈیٹا آپ کے آلے پر محفوظ</p>
              <p>• کوئی تھرڈ پارٹی شیئرنگ نہیں</p>
              <p>• آپ کی تلاوت کا ریکارڈ محفوظ</p>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-amber-50 rounded-xl border border-amber-200 p-3">
            <div className="flex items-center gap-2 text-amber-700 font-bold text-sm mb-2">
              <AlertTriangle size={14} /> ڈسکلیمر
            </div>
            <div className="text-amber-700 text-xs leading-relaxed" dir="rtl">
              قرآن پاک کا یہ ڈیجیٹل ایڈیشن تعلیمی اور تلاوت کے مقاصد کے لیے ہے۔ تمام تراجم معتبر علماء کے ہیں۔ کسی بھی غلطی کی اطلاع دیں۔
              <br /><br />
              <strong>© 2026 تمام حقوق محفوظ ہیں</strong><br />
              SMART WORLD ORDER — A Global Family Platform
            </div>
          </div>

          {/* References */}
          <div className="bg-white rounded-xl border border-amber-100 p-3">
            <div className="text-amber-700 font-bold text-sm mb-2">📚 ماخذ</div>
            <div className="text-amber-700 text-xs leading-relaxed space-y-1" dir="rtl">
              <p>• تفسیر ابن کثیر — امام ابن کثیر رحمہ اللہ</p>
              <p>• ترجمہ — مولانا فتح محمد جالندھری</p>
              <p>• Quran API — Quran.com & AlQuran.cloud</p>
              <p>• آڈیو — mp3quran.net</p>
              <p>• Arabic Font — Scheherazade New (SIL)</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
