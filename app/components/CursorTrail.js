"use client";

import { useEffect, useState, useCallback } from "react";

export default function CursorTrail() {
  const [particles, setParticles] = useState([]);
  const [nextId, setNextId] = useState(0);

  const handleMove = useCallback((e) => {
    const newParticle = {
      id: nextId,
      x: e.clientX,
      y: e.clientY,
      size: 3 + Math.random() * 4,
      opacity: 0.6 + Math.random() * 0.4,
    };
    setNextId((prev) => prev + 1);
    setParticles((prev) => [...prev.slice(-15), newParticle]);
  }, [nextId]);

  useEffect(() => {
    let throttle = false;
    const throttledMove = (e) => {
      if (throttle) return;
      throttle = true;
      setTimeout(() => { throttle = false; }, 50);
      handleMove(e);
    };
    window.addEventListener("mousemove", throttledMove);
    return () => window.removeEventListener("mousemove", throttledMove);
  }, [handleMove]);

  useEffect(() => {
    if (particles.length === 0) return;
    const timer = setTimeout(() => {
      setParticles((prev) => prev.slice(1));
    }, 300);
    return () => clearTimeout(timer);
  }, [particles]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9998]">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: p.x - p.size / 2,
            top: p.y - p.size / 2,
            width: p.size,
            height: p.size,
            backgroundColor: "var(--accent)",
            opacity: p.opacity,
            imageRendering: "pixelated",
            transition: "opacity 0.3s ease-out",
            animation: "trailFade 0.6s ease-out forwards",
          }}
        />
      ))}
      <style jsx>{`
        @keyframes trailFade {
          0% { opacity: 0.7; transform: scale(1); }
          100% { opacity: 0; transform: scale(0.3); }
        }
      `}</style>
    </div>
  );
}
