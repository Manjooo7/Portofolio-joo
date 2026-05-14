"use client";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-12 px-6 bg-section-alt border-t-4 border-border mt-12">
      <div className="max-w-5xl mx-auto">
        {/* Back to Top */}
        <div className="flex justify-center mb-10">
          <button
            onClick={scrollToTop}
            className="pixel-btn pixel-btn-outline pixel-btn-small flex items-center gap-2 group"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" style={{ imageRendering: "pixelated" }} className="transition-transform group-hover:-translate-y-1">
              <rect x="7" y="2" width="2" height="10" fill="currentColor" />
              <rect x="5" y="4" width="2" height="2" fill="currentColor" />
              <rect x="9" y="4" width="2" height="2" fill="currentColor" />
              <rect x="3" y="6" width="2" height="2" fill="currentColor" />
              <rect x="11" y="6" width="2" height="2" fill="currentColor" />
            </svg>
            BACK TO TOP
          </button>
        </div>

        {/* Footer Content */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left - Pixel Mascot + Name */}
          <div className="flex items-center gap-4">
            <div className="animate-bounce-slow">
              <img
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png"
                alt="Eevee"
                width={40}
                height={40}
                style={{ imageRendering: "pixelated" }}
              />
            </div>
            <div>
              <p className="font-[family-name:var(--font-pixel)] text-text-main text-[0.6rem] md:text-xs tracking-widest">
                SALMAN ALFARISI
              </p>
              <p className="font-[family-name:var(--font-body)] text-text-secondary text-xs mt-1">
                Front-End Web Developer
              </p>
            </div>
          </div>

          {/* Center - Heart */}
          <p className="font-[family-name:var(--font-body)] text-text-secondary text-sm order-last md:order-none">
            Crafted with <span className="text-accent animate-pulse inline-block mx-1">♥</span> and lots of pixels
          </p>

          {/* Right - Copyright */}
          <p className="font-[family-name:var(--font-pixel)] text-text-secondary text-[0.45rem] tracking-wider">
            © 2026 Salman AlFarisi
          </p>
        </div>
      </div>
    </footer>
  );
}
