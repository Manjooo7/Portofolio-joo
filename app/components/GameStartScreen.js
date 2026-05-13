"use client";

import { useState, useCallback, useEffect } from "react";

export default function GameStartScreen({ onStart }) {
  const [exiting, setExiting] = useState(false);
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    // Generate sparkles for the sky
    const s = [];
    for (let i = 0; i < 20; i++) {
      s.push({
        x: Math.random() * 100,
        y: Math.random() * 60, // Only in sky area
        delay: Math.random() * 2,
        duration: 0.8 + Math.random() * 1.5
      });
    }
    setSparkles(s);
  }, []);

  const handleStart = useCallback(() => {
    if (exiting) return;
    setExiting(true);
    setTimeout(() => {
      onStart();
    }, 800);
  }, [exiting, onStart]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-all duration-700 overflow-hidden ${
        exiting ? "opacity-0 scale-110 pointer-events-none" : "opacity-100 scale-100"
      }`}
      style={{ backgroundColor: "var(--section-alt)" }}
    >
      {/* Background Layers (Sky & Cityscape) */}
      <div className="absolute inset-0 z-0 pointer-events-none flex flex-col justify-end">
        {/* Sky gradient bands */}
        <div className="absolute top-0 w-full h-[60%] flex flex-col justify-end opacity-20">
            <div className="h-6 w-full" style={{ backgroundColor: "var(--primary)" }}></div>
            <div className="h-4 w-full" style={{ backgroundColor: "var(--accent)" }}></div>
            <div className="h-2 w-full" style={{ backgroundColor: "var(--text-main)" }}></div>
        </div>

        {/* Pixel City Skyline */}
        <div className="w-full h-32 flex items-end justify-between px-4 opacity-30 gap-1 overflow-hidden" style={{ borderBottom: "4px solid var(--primary)"}}>
          {[...Array(30)].map((_, i) => {
            const height = 20 + Math.random() * 80;
            const width = 20 + Math.random() * 40;
            return (
              <div 
                key={i} 
                className="flex-shrink-0"
                style={{ 
                  width: `${width}px`, 
                  height: `${height}px`, 
                  backgroundColor: "var(--primary)",
                  position: "relative"
                }}
              >
                {/* Windows */}
                {Math.random() > 0.5 && (
                   <div className="absolute top-2 left-2 w-2 h-2 bg-surface"></div>
                )}
                {Math.random() > 0.5 && (
                   <div className="absolute top-6 right-2 w-2 h-2 bg-surface"></div>
                )}
              </div>
            )
          })}
        </div>
        
        {/* Ground */}
        <div className="h-16 w-full relative" style={{ backgroundColor: "var(--accent)" }}>
            <div className="absolute top-2 w-full h-1" style={{ backgroundColor: "rgba(255,255,255,0.3)" }}></div>
            <div className="absolute bottom-4 w-full h-2" style={{ backgroundColor: "var(--primary)", opacity: 0.5 }}></div>
        </div>
        <div className="h-12 w-full" style={{ backgroundColor: "var(--primary)" }}></div>
      </div>

      {/* Top Right Pixel Hearts (Lives) */}
      <div className="absolute top-8 right-8 z-10 flex gap-2">
        {[1, 2, 3].map(i => (
          <svg key={i} width="28" height="28" viewBox="0 0 16 16" fill="var(--accent)">
            <path d="M4 2h2v1h2v1h2V3h2V2h2v3h1v4h-1v2h-1v1h-1v1h-1v1H8v-1H7v-1H6v-1H5V9H4V7H3V5h1V2z" />
          </svg>
        ))}
      </div>

      {/* Sparkles in Sky */}
      {sparkles.map((sp, i) => (
        <div
          key={i}
          className="absolute z-0 pointer-events-none"
          style={{
            left: `${sp.x}%`,
            top: `${sp.y}%`,
            animation: `sparkle ${sp.duration}s step-end infinite alternate`,
            animationDelay: `${sp.delay}s`,
          }}
        >
          <svg width="12" height="12" viewBox="0 0 16 16" fill="var(--text-secondary)" style={{ opacity: 0.3 }}>
            <rect x="6" y="0" width="4" height="16" />
            <rect x="0" y="6" width="16" height="4" />
          </svg>
        </div>
      ))}

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center mt-[-10vh]">
        
        {/* Small Tagline */}
        <p className="font-[family-name:var(--font-code)] text-xs md:text-sm tracking-widest uppercase mb-4" style={{ color: "var(--text-secondary)" }}>
          Front-End Developer
        </p>

        {/* 3D Pixel Title */}
        <div className="text-center mb-16 relative">
          <h1 
            className="font-[family-name:var(--font-pixel)] text-4xl md:text-7xl leading-snug tracking-wide"
            style={{ 
              color: "var(--surface)", 
              WebkitTextStroke: "2px var(--text-main)",
              textShadow: `
                4px 4px 0 var(--text-main),
                4px 6px 0 var(--text-main),
                4px 8px 0 var(--text-main),
                6px 10px 0 var(--primary),
                8px 12px 0 var(--primary)
              `
            }}
          >
            PORTFOLIO
            <br />
            <span style={{ color: "var(--accent)" }}>QUEST</span>
          </h1>
        </div>

        {/* Start Button */}
        <button
          onClick={handleStart}
          className="group relative cursor-pointer outline-none"
          style={{ border: 'none', background: 'none' }}
        >
          {/* Outer Border Box */}
          <div 
            className="relative bg-accent font-[family-name:var(--font-pixel)] text-xl md:text-2xl py-4 px-12 transition-transform active:translate-y-2 overflow-hidden"
            style={{
              color: "var(--text-main)",
              border: "4px solid var(--text-main)",
              borderRadius: "40px",
              boxShadow: "0 8px 0 var(--text-main)",
            }}
          >
            {/* Inner top highlight */}
            <div className="absolute top-0 left-0 w-full h-2 bg-white opacity-40"></div>
            <span className="relative z-10">START</span>
          </div>
          
          {/* Blinking Selection Cursor */}
          <div className="absolute -left-12 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity animate-pulse">
            <svg width="24" height="24" viewBox="0 0 16 16" fill="var(--text-main)">
              <path d="M12 7V6h-1V5H9V4H7v2h2v1H2v2h7v1H7v2h2v-1h2v-1h1V9h1V7z" />
            </svg>
          </div>
        </button>
      </div>

      <style jsx>{`
        @keyframes sparkle {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1); opacity: 1; }
          100% { transform: scale(0); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
