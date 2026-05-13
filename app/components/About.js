"use client";

import { useEffect, useRef, useState } from "react";
import SectionTitle from "./SectionTitle";

const stats = [
  { value: "4", label: "Projects" },
  { value: "11", label: "Certificates" },
  { value: "2", label: "Years Exp" },
];

export default function About() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 px-6"
    >
      <div className="max-w-5xl mx-auto">
        <SectionTitle>ABOUT ME</SectionTitle>

        <div
          className={`grid md:grid-cols-12 gap-10 md:gap-14 items-center mt-10 ${visible ? "animate-fadeInUp" : "opacity-0"
            }`}
        >
          {/* RPG Dialog Box (Left) */}
          <div className="md:col-span-7 relative">
            <div className="pixel-card bg-surface p-6 md:p-8 relative pt-10 md:pt-8">
              {/* Character Sprite floating on top left */}
              <div className="absolute -top-12 -left-8 w-24 h-24 flex items-center justify-center animate-bounce-slow z-10 pointer-events-none">
                 <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png" alt="Eevee Sprite" className="w-full h-full object-contain scale-[1.5]" style={{ imageRendering: 'pixelated' }} />
              </div>

              <p className="font-[family-name:var(--font-body)] text-text-main text-base leading-relaxed mb-4">
                Saya adalah seorang <span className="text-primary font-bold">Front-End Web Developer</span> yang passionate dalam membangun antarmuka web yang indah, responsif, dan user-friendly.
              </p>
              <p className="font-[family-name:var(--font-body)] text-text-secondary text-sm md:text-base leading-relaxed">
                Saya percaya bahwa desain yang baik bukan hanya soal tampilan, tapi juga soal pengalaman pengguna yang intuitif dan menyenangkan. Setiap baris kode yang saya tulis bertujuan untuk menciptakan interface yang memukau dan fungsional.
              </p>
              
              {/* Blinking cursor */}
              <div className="absolute bottom-4 right-4 animate-pulse">
                <div className="w-3 h-3 bg-accent"></div>
              </div>
            </div>
          </div>

          {/* Character Stats (Right) */}
          <div className="md:col-span-5 flex flex-col gap-6">
            <h3 className="font-[family-name:var(--font-pixel)] text-text-main text-sm mb-2 text-center md:text-left tracking-widest">
              [ PLAYER STATS ]
            </h3>
            
            <div className="space-y-5">
              {stats.map((stat, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  {/* Stat Badge */}
                  <div className="w-14 h-14 bg-section-alt border-4 border-border flex items-center justify-center font-[family-name:var(--font-pixel)] text-primary text-lg group-hover:bg-primary group-hover:text-surface transition-colors shadow-[4px_4px_0_var(--shadow-color)] shrink-0">
                    {stat.value}
                  </div>
                  {/* Stat Bar */}
                  <div className="flex-1">
                    <h4 className="font-[family-name:var(--font-pixel)] text-text-main text-[0.55rem] md:text-[0.6rem] mb-2 tracking-wider">
                      {stat.label.toUpperCase()}
                    </h4>
                    <div className="h-4 w-full bg-section-alt border-[3px] border-border overflow-hidden p-[2px]">
                      <div 
                        className="h-full bg-accent transition-all duration-1000 ease-out" 
                        style={{ width: visible ? `${Math.min(100, (parseInt(stat.value) / 15) * 100 + 20)}%` : '0%' }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
