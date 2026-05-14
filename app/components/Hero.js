"use client";

import { useEffect, useState } from "react";
import PixelRevealCanvas from "./PixelRevealCanvas";
export default function Hero() {
  const [showTagline, setShowTagline] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowTagline(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="hero"
      className="dot-grid min-h-screen flex flex-col justify-center px-6 pt-20 relative"
    >
      <div className="max-w-6xl mx-auto w-full flex flex-col-reverse md:flex-row items-center justify-between gap-12 md:gap-8 pb-20">
        
        {/* Left Column - Text */}
        <div className="flex-1 text-center md:text-left flex flex-col md:items-start items-center">
          {/* Greeting */}
          <h2 className="font-[family-name:var(--font-body)] text-primary text-xl md:text-2xl mb-2 md:mb-3 font-bold">
            Hello, I'm
          </h2>
          
          {/* Name */}
          <h1 className="font-[family-name:var(--font-pixel)] text-text-main text-xl md:text-3xl lg:text-4xl mb-5 leading-relaxed tracking-wide">
            SALMAN ALFARISI
          </h1>
          
          {/* Divider */}
          <div className="w-48 md:w-full max-w-md h-[3px] bg-primary mb-5 hidden md:block"></div>

          {/* Role */}
          <p className="font-[family-name:var(--font-pixel)] text-text-secondary text-[0.6rem] md:text-sm mb-6 tracking-widest">
            Front-End Web Developer
          </p>

          {/* Tagline with typewriter */}
          <div className="min-h-[4rem] mb-10 w-full flex justify-center md:justify-start">
            {showTagline && (
              <div className="relative w-fit">
                {/* Ghost text to set the container width */}
                <p className="font-[family-name:var(--font-body)] text-sm md:text-base italic invisible whitespace-nowrap">
                  &quot;Crafting pixel-perfect interfaces, one block at a time.&quot;
                </p>
                {/* Actual animated text */}
                <p className="absolute top-0 left-0 font-[family-name:var(--font-body)] text-text-main text-sm md:text-base italic typewriter-text whitespace-nowrap">
                  &quot;Crafting pixel-perfect interfaces, one block at a time.&quot;
                </p>
              </div>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <a href="#projects" className="pixel-btn pixel-btn-outline">
              <span className="text-accent mr-2">{"< >"}</span> View Projects
            </a>
          </div>

          {/* Social Links */}
          <div className="flex gap-4 mt-6 justify-center md:justify-start">
            <a 
              href="https://github.com/Manjooo7" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center border-4 border-border bg-section-alt hover:bg-primary text-text-main hover:text-white transition-colors duration-200 shadow-[4px_4px_0_var(--shadow-color)] active:translate-y-1 active:translate-x-1 active:shadow-none cursor-pointer"
              aria-label="GitHub"
            >
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
            <a 
              href="https://www.linkedin.com/in/salman-alfarisi-1231b7260?utm_source=share_via&utm_content=profile&utm_medium=member_ios" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center border-4 border-border bg-section-alt hover:bg-primary text-text-main hover:text-white transition-colors duration-200 shadow-[4px_4px_0_var(--shadow-color)] active:translate-y-1 active:translate-x-1 active:shadow-none cursor-pointer"
              aria-label="LinkedIn"
            >
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
            <a 
              href="https://x.com/Manjoooww" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center border-4 border-border bg-section-alt hover:bg-primary text-text-main hover:text-white transition-colors duration-200 shadow-[4px_4px_0_var(--shadow-color)] active:translate-y-1 active:translate-x-1 active:shadow-none cursor-pointer"
              aria-label="X (Twitter)"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
          </div>
        </div>

        {/* Right Column - Avatar */}
        <div className="flex-1 flex justify-center md:justify-end mb-8 md:mb-0">
          
          {/* Wrapper for Avatar and Bulbasaur to keep them together */}
          <div className="relative inline-block mt-4 md:mt-0">
            {/* Pixel Art Circular Portrait Frame */}
            <div className="relative filter drop-shadow-[8px_8px_0_var(--shadow-color)] group cursor-pointer transition-transform duration-300 hover:-translate-y-2">
              <div 
                className="relative w-56 h-56 md:w-64 md:h-64 bg-border p-[6px] md:p-2"
                style={{
                  clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)"
                }}
              >
                <div 
                  className="w-full h-full relative overflow-hidden bg-section-alt"
                  style={{
                    clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)"
                  }}
                >
                  <PixelRevealCanvas 
                    srcPixel="/avatar-pixel.png" 
                    srcReal="/avatar-real.jpeg" 
                    gridSize={12} 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Bulbasaur Pixel Sprite - Di dekat frame */}
            <div className="absolute -bottom-4 -left-6 md:-bottom-2 md:-left-10 pointer-events-none animate-bounce-slow z-10">
              <img 
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" 
                alt="Bulbasaur" 
                className="w-24 h-24 md:w-32 md:h-32 drop-shadow-md"
                style={{ imageRendering: "pixelated" }}
              />
            </div>
          </div>

        </div>

      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce-slow flex flex-col items-center text-text-secondary">
        <svg
          width="24"
          height="24"
          viewBox="0 0 8 8"
          style={{ imageRendering: "pixelated" }}
        >
          <rect x="3" y="0" width="2" height="2" fill="#6C757D" />
          <rect x="2" y="2" width="4" height="2" fill="#6C757D" />
          <rect x="1" y="4" width="6" height="2" fill="#6C757D" />
          <rect x="3" y="6" width="2" height="2" fill="#6C757D" />
        </svg>
        <span className="font-[family-name:var(--font-pixel)] text-[0.45rem] mt-2 tracking-wider">
          SCROLL
        </span>
      </div>
    </section>
  );
}
