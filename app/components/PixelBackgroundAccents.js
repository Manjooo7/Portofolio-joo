"use client";

import { useEffect, useState } from "react";

const ACCENT_SYMBOLS = ["+", "■", "▫", "×", "<>", "/>"];

export default function PixelBackgroundAccents() {
  const [accents, setAccents] = useState([]);

  useEffect(() => {
    // Generate random floating accents that are much larger and more visible
    const newAccents = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 20 + 15, // Larger size
      symbol: ACCENT_SYMBOLS[Math.floor(Math.random() * ACCENT_SYMBOLS.length)],
      duration: Math.random() * 15 + 10,
      delay: Math.random() * -20, // Start at different points in animation
      opacity: Math.random() * 0.4 + 0.3, // Higher opacity
    }));
    setAccents(newAccents);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[10]">
      {accents.map((accent) => (
        <div
          key={accent.id}
          className="absolute font-[family-name:var(--font-pixel)] select-none drop-shadow-md"
          style={{
            left: `${accent.x}%`,
            top: `${accent.y}%`,
            fontSize: `${accent.size}px`,
            color: "var(--accent)", // Use accent color for better visibility
            opacity: accent.opacity,
            animation: `float ${accent.duration}s linear infinite`,
            animationDelay: `${accent.delay}s`,
          }}
        >
          {accent.symbol}
        </div>
      ))}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(100vh) rotate(0deg);
          }
          50% {
            transform: translateY(0vh) translateX(30px) rotate(180deg);
          }
          100% {
            transform: translateY(-100vh) translateX(-30px) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
