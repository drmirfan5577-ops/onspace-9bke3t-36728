import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-white flex flex-col items-center justify-center p-8 text-center" dir="rtl">
      <div className="text-6xl mb-4">📭</div>
      <div className="arabic-text text-2xl font-black text-amber-800 mb-2">صفحہ نہیں ملا</div>
      <div className="text-amber-600 mb-6">Page Not Found</div>
      <button
        onClick={() => navigate("/")}
        className="bg-gradient-to-r from-amber-400 to-amber-600 text-white font-bold px-6 py-3 rounded-xl shadow"
      >
        🏠 گھر واپس
      </button>
    </div>
  );
}
