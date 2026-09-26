import { THEMES } from "@/constants/themes";

interface BackgroundEffectsProps {
  themeId: string;
}

export default function BackgroundEffects({ themeId }: BackgroundEffectsProps) {
  const theme = THEMES.find((t) => t.id === themeId) || THEMES[0];

  const blobColors: Record<string, [string, string]> = {
    white: ["#fef3c7", "#d1fae5"],
    paradise: ["#6ee7b7", "#34d399"],
    ocean: ["#93c5fd", "#60a5fa"],
    sunset: ["#fcd34d", "#f97316"],
    galaxy: ["#c4b5fd", "#818cf8"],
    rose: ["#f9a8d4", "#f472b6"],
    mint: ["#6ee7b7", "#10b981"],
    golden: ["#fcd34d", "#f59e0b"],
    pearl: ["#cbd5e1", "#94a3b8"],
    lavender: ["#c4b5fd", "#a78bfa"],
  };

  const [c1, c2] = blobColors[themeId] || blobColors.white;

  return (
    <div className={`fixed inset-0 -z-10 overflow-hidden ${theme.cssClass}`}>
      {/* Animated blobs */}
      <div
        className="blob"
        style={{
          width: 500,
          height: 500,
          background: `radial-gradient(circle, ${c1}, transparent)`,
          top: "-10%",
          right: "-10%",
          animationDelay: "0s",
        }}
      />
      <div
        className="blob"
        style={{
          width: 400,
          height: 400,
          background: `radial-gradient(circle, ${c2}, transparent)`,
          bottom: "-10%",
          left: "-5%",
          animationDelay: "-4s",
        }}
      />
      <div
        className="blob"
        style={{
          width: 300,
          height: 300,
          background: `radial-gradient(circle, ${c1}88, transparent)`,
          top: "40%",
          left: "30%",
          animationDelay: "-8s",
        }}
      />
      {/* Subtle grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
      />
    </div>
  );
}
