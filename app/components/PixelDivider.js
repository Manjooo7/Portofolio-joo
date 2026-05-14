"use client";

export default function PixelDivider({ variant = "wave", flip = false }) {
  const dividers = {
    wave: (
      <svg width="100%" height="24" viewBox="0 0 120 24" preserveAspectRatio="none" style={{ imageRendering: "pixelated", display: "block" }}>
        <rect x="0"  y="16" width="8" height="8" fill="var(--primary)" />
        <rect x="8"  y="12" width="8" height="4" fill="var(--primary)" />
        <rect x="16" y="8"  width="8" height="4" fill="var(--accent)" />
        <rect x="24" y="4"  width="8" height="4" fill="var(--accent)" />
        <rect x="32" y="8"  width="8" height="4" fill="var(--primary)" />
        <rect x="40" y="12" width="8" height="4" fill="var(--primary)" />
        <rect x="48" y="16" width="8" height="8" fill="var(--primary)" />
        <rect x="56" y="12" width="8" height="4" fill="var(--primary)" />
        <rect x="64" y="8"  width="8" height="4" fill="var(--accent)" />
        <rect x="72" y="4"  width="8" height="4" fill="var(--accent)" />
        <rect x="80" y="8"  width="8" height="4" fill="var(--primary)" />
        <rect x="88" y="12" width="8" height="4" fill="var(--primary)" />
        <rect x="96" y="16" width="8" height="8" fill="var(--primary)" />
        <rect x="104" y="12" width="8" height="4" fill="var(--primary)" />
        <rect x="112" y="8"  width="8" height="4" fill="var(--accent)" />
      </svg>
    ),
    dots: (
      <div className="flex justify-center gap-3 py-2">
        {[...Array(7)].map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 transition-colors"
            style={{
              backgroundColor: i % 2 === 0 ? "var(--accent)" : "var(--primary)",
              opacity: Math.abs(3 - i) < 2 ? 1 : 0.4,
            }}
          />
        ))}
      </div>
    ),
    grass: (
      <svg width="100%" height="16" viewBox="0 0 160 16" preserveAspectRatio="none" style={{ imageRendering: "pixelated", display: "block" }}>
        {[...Array(20)].map((_, i) => {
          const h = [12, 8, 16, 10, 14, 6, 12, 16, 8, 10, 14, 12, 8, 16, 10, 6, 14, 12, 8, 16][i];
          return (
            <rect
              key={i}
              x={i * 8}
              y={16 - h}
              width="8"
              height={h}
              fill={i % 3 === 0 ? "var(--accent)" : "var(--primary)"}
              opacity={0.15 + (h / 16) * 0.25}
            />
          );
        })}
      </svg>
    ),
  };

  return (
    <div
      className="w-full overflow-hidden opacity-40 pointer-events-none"
      style={{ transform: flip ? "scaleY(-1)" : "none" }}
    >
      {dividers[variant]}
    </div>
  );
}
