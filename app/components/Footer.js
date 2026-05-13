export default function Footer() {
  return (
    <footer className="py-10 px-6 bg-section-alt border-t-4 border-border mt-12">
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center">
        {/* Cute Pixel Icon / Mascot */}
        <div className="mb-6 animate-bounce-slow">
           <svg width="40" height="40" viewBox="0 0 16 16" style={{ imageRendering: "pixelated" }}>
             {/* Gameboy or little robot */}
             <rect x="3" y="1" width="10" height="14" fill="var(--primary)" />
             <rect x="4" y="2" width="8" height="6" fill="var(--bg)" />
             <rect x="5" y="3" width="2" height="2" fill="var(--text-main)" />
             <rect x="9" y="3" width="2" height="2" fill="var(--text-main)" />
             <rect x="5" y="10" width="3" height="3" fill="var(--text-main)" />
             <rect x="10" y="10" width="2" height="2" fill="var(--accent)" />
             <rect x="10" y="12" width="2" height="2" fill="var(--accent)" />
           </svg>
        </div>
        
        <p className="font-[family-name:var(--font-pixel)] text-text-main text-[0.6rem] md:text-xs tracking-widest mb-3">
          SALMAN ALFARISI © 2026
        </p>
        <p className="font-[family-name:var(--font-body)] text-text-secondary text-sm">
          Crafted with <span className="text-accent animate-pulse inline-block mx-1">♥</span> and lots of pixels
        </p>
      </div>
    </footer>
  );
}
