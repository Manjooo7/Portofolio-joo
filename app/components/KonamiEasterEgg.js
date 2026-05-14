"use client";

import { useEffect, useState, useCallback } from "react";

const KONAMI_CODE = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a"
];

export default function KonamiEasterEgg() {
  const [sequence, setSequence] = useState([]);
  const [activated, setActivated] = useState(false);
  const [sparkles, setSparkles] = useState([]);

  const handleKeyDown = useCallback((e) => {
    setSequence((prev) => {
      const newSeq = [...prev, e.key].slice(-KONAMI_CODE.length);
      if (newSeq.length === KONAMI_CODE.length && 
          newSeq.every((key, i) => key === KONAMI_CODE[i])) {
        setActivated(true);
      }
      return newSeq;
    });
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (!activated) return;
    
    // Spawn sparkle particles
    const s = [];
    for (let i = 0; i < 50; i++) {
      s.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 4 + Math.random() * 8,
        color: ["#FFD700", "#FF6B6B", "#4ECDC4", "#52B788", "#A78BFA", "#FCA5A5"][Math.floor(Math.random() * 6)],
        delay: Math.random() * 2,
        duration: 1 + Math.random() * 2,
      });
    }
    setSparkles(s);

    const timer = setTimeout(() => {
      setActivated(false);
      setSparkles([]);
      setSequence([]);
    }, 5000);
    return () => clearTimeout(timer);
  }, [activated]);

  if (!activated) return null;

  return (
    <div className="fixed inset-0 z-[99999] pointer-events-none flex items-center justify-center">
      {/* Background flash */}
      <div className="absolute inset-0 bg-text-main/20 animate-pulse" />

      {/* Sparkles */}
      {sparkles.map((sp) => (
        <div
          key={sp.id}
          className="absolute"
          style={{
            left: `${sp.x}%`,
            top: `${sp.y}%`,
            width: sp.size,
            height: sp.size,
            backgroundColor: sp.color,
            imageRendering: "pixelated",
            animation: `konamiSparkle ${sp.duration}s ease-in-out ${sp.delay}s infinite`,
          }}
        />
      ))}

      {/* Easter egg message */}
      <div className="relative z-10 bg-surface border-4 border-accent p-8 text-center shadow-[8px_8px_0_var(--shadow-color)] animate-bounce-slow">
        <p className="font-[family-name:var(--font-pixel)] text-accent text-lg mb-2">
          🎮 KONAMI CODE!
        </p>
        <p className="font-[family-name:var(--font-pixel)] text-primary text-[0.5rem] mb-4">
          SECRET UNLOCKED!
        </p>
        <p className="font-[family-name:var(--font-pixel)] text-text-secondary text-[0.45rem]">
          +999 EXP · ALL ACHIEVEMENTS UNLOCKED
        </p>
        <div className="mt-4 flex justify-center gap-2">
          {["🏆", "⭐", "🎯", "💎", "🔥"].map((emoji, i) => (
            <span key={i} className="text-2xl" style={{ animation: `konamiBounce 0.5s ease ${i * 0.1}s infinite alternate` }}>
              {emoji}
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes konamiSparkle {
          0%, 100% { transform: scale(0) rotate(0deg); opacity: 0; }
          50% { transform: scale(1) rotate(180deg); opacity: 1; }
        }
        @keyframes konamiBounce {
          0% { transform: translateY(0); }
          100% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}
