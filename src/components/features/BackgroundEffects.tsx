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

  // Static radial gradients only: large blurred/animated layers and SVG noise
  // filters forced continuous full-screen repaints and froze the display on phones.
  return (
    <div
      className={`fixed inset-0 -z-10 overflow-hidden pointer-events-none ${theme.cssClass}`}
      style={{
        backgroundImage: [
          `radial-gradient(circle at 90% 0%, ${c1}40, transparent 45%)`,
          `radial-gradient(circle at 5% 100%, ${c2}40, transparent 40%)`,
          `radial-gradient(circle at 40% 50%, ${c1}26, transparent 35%)`,
        ].join(", "),
      }}
    />
  );
}
