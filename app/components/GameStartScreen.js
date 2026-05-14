"use client";

import { useState, useCallback, useEffect, useRef } from "react";

export default function GameStartScreen({ onStart }) {
  const [exiting, setExiting] = useState(false);
  const [sparkles, setSparkles] = useState([]);
  const [isBgmPlaying, setIsBgmPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Generate sparkles for the sky
    const s = [];
    for (let i = 0; i < 20; i++) {
      s.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 60, // Only in sky area
        delay: Math.random() * 2,
        duration: 0.8 + Math.random() * 1.5
      });
    }
    setSparkles(s);

    // Try to autoplay
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
      audioRef.current.play().then(() => {
        setIsBgmPlaying(true);
      }).catch(() => console.log("Waiting for user interaction to play BGM..."));
    }
  }, []);

  const toggleBgm = (e) => {
    e.stopPropagation();
    if (audioRef.current) {
      if (isBgmPlaying) {
        audioRef.current.pause();
        setIsBgmPlaying(false);
      } else {
        audioRef.current.play()
          .then(() => setIsBgmPlaying(true))
          .catch(err => console.log(err));
      }
    }
  };

  const handleScreenClick = () => {
    if (audioRef.current && audioRef.current.paused && !isBgmPlaying) {
      audioRef.current.play().then(() => setIsBgmPlaying(true)).catch(e => console.log(e));
    }
  };

  const handleStart = useCallback((e) => {
    e.stopPropagation();
    if (exiting) return;
    setExiting(true);
    
    // Play 8-bit Start Sound using Web Audio API
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (Ctx) {
        const audioCtx = new Ctx();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(987.77, audioCtx.currentTime); // B5 note
        oscillator.frequency.setValueAtTime(1318.51, audioCtx.currentTime + 0.1); // E6 note
        
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.5);
        
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.5);
      }
    } catch(err) {
      console.log("Audio API not supported or blocked");
    }

    setTimeout(() => {
      onStart();
    }, 800);
  }, [exiting, onStart]);

  return (
    <div
      onClick={handleScreenClick}
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-all duration-700 overflow-hidden ${
        exiting ? "opacity-0 scale-110 pointer-events-none" : "opacity-100 scale-100"
      }`}
      style={{ backgroundColor: "var(--section-alt)" }}
    >
      <audio ref={audioRef} loop src="/LittlerootTown.mp3" />
      
      {/* Top Left BGM Toggle */}
      <div className="absolute top-8 left-8 z-20">
        <button
          onClick={toggleBgm}
          className="w-12 h-12 flex items-center justify-center border-4 border-border bg-surface hover:bg-primary text-text-main hover:text-white transition-colors duration-200 shadow-[4px_4px_0_var(--shadow-color)] active:translate-y-1 active:translate-x-1 active:shadow-none cursor-pointer"
        >
          {isBgmPlaying ? (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M4.27 3L3 4.27l9 9v.28c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4v-1.73l4.56 4.56c-.44.75-1.12 1.34-1.93 1.63v2.06c1.47-.43 2.65-1.45 3.31-2.78l1.79 1.79L21 19.73 4.27 3zM14 7h4V3h-6v5.18l2 2z"/>
            </svg>
          )}
        </button>
      </div>

      {/* Background Layers (Sky & Cityscape) */}
      <div className="absolute inset-0 z-0 pointer-events-none flex flex-col justify-end">
        
        {/* Pixel Clouds */}
        <div className="absolute top-[15%] left-[10%] opacity-40 animate-[cloudMove_60s_linear_infinite]">
          <svg width="120" height="60" viewBox="0 0 12 6" fill="var(--text-main)" style={{ imageRendering: "pixelated" }}>
            <rect x="2" y="1" width="6" height="1" />
            <rect x="1" y="2" width="9" height="1" />
            <rect x="0" y="3" width="11" height="1" />
            <rect x="1" y="4" width="8" height="1" />
          </svg>
        </div>
        <div className="absolute top-[25%] right-[15%] opacity-20 animate-[cloudMove_80s_linear_infinite_reverse]">
          <svg width="160" height="80" viewBox="0 0 12 6" fill="var(--text-main)" style={{ imageRendering: "pixelated" }}>
            <rect x="3" y="1" width="5" height="1" />
            <rect x="1" y="2" width="9" height="1" />
            <rect x="0" y="3" width="12" height="1" />
            <rect x="2" y="4" width="9" height="1" />
          </svg>
        </div>

        {/* Sky gradient bands */}
        <div className="absolute top-0 w-full h-[60%] flex flex-col justify-end opacity-20">
            <div className="h-6 w-full" style={{ backgroundColor: "var(--primary)" }}></div>
            <div className="h-4 w-full" style={{ backgroundColor: "var(--accent)" }}></div>
            <div className="h-2 w-full" style={{ backgroundColor: "var(--text-main)" }}></div>
        </div>

        {/* Animated Pixel Grass (Scrolling Floor) */}
        <div className="absolute bottom-0 w-full overflow-hidden h-40 flex items-end">
          <div className="flex w-[200vw] animate-[moveGrass_10s_linear_infinite]">
            {/* Generate enough grass tiles to cover 200vw seamlessly */}
            {[...Array(120)].map((_, i) => (
              <svg key={i} width="64" height="128" viewBox="0 0 16 32" className="flex-shrink-0" style={{ imageRendering: "pixelated" }}>
                {/* Deep Ground */}
                <rect x="0" y="20" width="16" height="12" fill="var(--primary)" />
                {/* Mid Ground */}
                <rect x="0" y="16" width="16" height="4" fill="var(--highlight)" />
                {/* Grass Base */}
                <rect x="0" y="12" width="16" height="4" fill="var(--accent)" />
                {/* Grass Blades */}
                <rect x="0" y="8" width="2" height="4" fill="var(--accent)" />
                <rect x="4" y="10" width="2" height="2" fill="var(--accent)" />
                <rect x="6" y="6" width="2" height="6" fill="var(--accent)" />
                <rect x="10" y="9" width="2" height="3" fill="var(--accent)" />
                <rect x="12" y="7" width="2" height="5" fill="var(--accent)" />
              </svg>
            ))}
          </div>
        </div>
      </div>

      {/* Top Right Pixel Hearts (Lives) */}
      <div className="absolute top-8 right-8 z-10 flex gap-2">
        {[1, 2, 3].map(i => (
          <svg key={i} width="32" height="32" viewBox="0 0 16 16" fill="var(--accent)" className="animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}>
            <path d="M4 2h2v1h2v1h2V3h2V2h2v3h1v4h-1v2h-1v1h-1v1h-1v1H8v-1H7v-1H6v-1H5V9H4V7H3V5h1V2z" />
          </svg>
        ))}
      </div>

      {/* Sparkles in Sky */}
      {sparkles.map((sp) => (
        <div
          key={sp.id}
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
        <p className="font-[family-name:var(--font-code)] text-sm md:text-base tracking-[0.3em] uppercase mb-4" style={{ color: "var(--text-secondary)" }}>
          Front-End Developer
        </p>

        {/* 3D Pixel Title */}
        <div className="text-center mb-16 relative">
          <h1 
            className="font-[family-name:var(--font-pixel)] text-5xl md:text-8xl leading-snug tracking-wide"
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

        {/* Classic Arcade Start Button */}
        <div className="mt-8 h-16 flex items-center justify-center">
          <button
            onClick={handleStart}
            className="group relative cursor-pointer outline-none animate-[pulse_1.5s_infinite] hover:animate-none transition-transform active:scale-95"
            style={{ border: 'none', background: 'none' }}
          >
            <span 
              className="font-[family-name:var(--font-pixel)] text-2xl md:text-3xl tracking-[0.2em] text-text-main"
            >
              &gt; PRESS START &lt;
            </span>
            
            {/* Hover indicator (Classic RPG Arrow) */}
            <div className="absolute -left-12 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
              <svg width="28" height="28" viewBox="0 0 16 16" fill="var(--primary)" style={{ imageRendering: "pixelated" }}>
                <path d="M12 7V6h-1V5H9V4H7v2h2v1H2v2h7v1H7v2h2v-1h2v-1h1V9h1V7z" />
              </svg>
            </div>
            <div className="absolute -right-12 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
              <svg width="28" height="28" viewBox="0 0 16 16" fill="var(--primary)" style={{ imageRendering: "pixelated", transform: "scaleX(-1)" }}>
                <path d="M12 7V6h-1V5H9V4H7v2h2v1H2v2h7v1H7v2h2v-1h2v-1h1V9h1V7z" />
              </svg>
            </div>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes sparkle {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1); opacity: 1; }
          100% { transform: scale(0); opacity: 0; }
        }
        @keyframes cloudMove {
          0% { transform: translateX(100vw); }
          100% { transform: translateX(-100vw); }
        }
        @keyframes moveGrass {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50vw); }
        }
      `}</style>
    </div>
  );
}
