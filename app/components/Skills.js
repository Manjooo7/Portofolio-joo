"use client";

import { useEffect, useRef, useState } from "react";
import SectionTitle from "./SectionTitle";

const frontendSkills = [
  { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", level: 5, rarity: "legendary" },
  { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", level: 5, rarity: "legendary" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", level: 4, rarity: "epic" },
  { name: "React.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", level: 4, rarity: "epic" },
  { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", level: 4, rarity: "epic" },
  { name: "Bootstrap", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg", level: 3, rarity: "rare" },
];

const toolsSkills = [
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", level: 4, rarity: "epic" },
  { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", level: 4, rarity: "epic" },
  { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", level: 3, rarity: "rare" },
  { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg", level: 5, rarity: "legendary" },
  { name: "npm", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg", level: 3, rarity: "rare" },
];

const rarityColors = {
  legendary: { border: "var(--accent)", bg: "rgba(82,183,136,0.08)", stars: "var(--accent)", label: "★ LEGENDARY" },
  epic: { border: "var(--primary)", bg: "rgba(45,106,79,0.06)", stars: "var(--primary)", label: "✦ EPIC" },
  rare: { border: "var(--text-secondary)", bg: "rgba(108,117,125,0.05)", stars: "var(--text-secondary)", label: "◆ RARE" },
};

function InventorySlot({ skill, index, visible }) {
  const rarity = rarityColors[skill.rarity];
  const stars = "★".repeat(skill.level) + "☆".repeat(5 - skill.level);

  return (
    <div
      className="relative group"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `all 0.4s ease ${index * 0.07}s`,
      }}
    >
      {/* Item Slot */}
      <div
        className="relative bg-surface border-[3px] p-4 flex flex-col items-center gap-3 transition-all duration-200 hover:-translate-y-2"
        style={{
          borderColor: rarity.border,
          background: `linear-gradient(${rarity.bg}, ${rarity.bg}), var(--surface)`,
          boxShadow: `4px 4px 0px ${rarity.border}`,
        }}
      >
        {/* Rarity indicator corner */}
        <div
          className="absolute top-0 right-0 w-3 h-3"
          style={{ backgroundColor: rarity.border }}
        />

        {/* Icon */}
        <div className="w-12 h-12 flex items-center justify-center p-1">
          <img
            src={skill.icon}
            alt={skill.name}
            width={40}
            height={40}
            className="transition-transform duration-200 group-hover:scale-125 group-hover:rotate-12"
            loading="lazy"
          />
        </div>

        {/* Name */}
        <span className="font-[family-name:var(--font-code)] text-text-main text-[0.65rem] text-center font-bold">
          {skill.name}
        </span>

        {/* Stars */}
        <span
          className="font-[family-name:var(--font-pixel)] text-[0.4rem] tracking-wider"
          style={{ color: rarity.stars }}
        >
          {stars}
        </span>
      </div>

      {/* Tooltip on Hover */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-text-main text-surface px-3 py-1.5 font-[family-name:var(--font-pixel)] text-[0.4rem] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20 border-2 border-border shadow-[2px_2px_0_var(--shadow-color)]">
        <span style={{ color: rarity.stars }}>{rarity.label}</span>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-transparent border-t-text-main" />
      </div>
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-24 px-6 relative"
    >
      <div className="absolute inset-0 bg-section-alt z-[-2]" />
      <div className="max-w-5xl mx-auto">
        <SectionTitle>SKILLS</SectionTitle>

        <div className={`${visible ? "animate-fadeInUp" : "opacity-0"}`}>
          {/* Inventory Header */}
          <div className="flex items-center justify-center gap-3 mb-10">
            <div className="h-[2px] flex-1 max-w-[80px] bg-border opacity-30" />
            <span className="font-[family-name:var(--font-pixel)] text-text-secondary text-[0.5rem] tracking-[0.3em]">
              INVENTORY
            </span>
            <div className="h-[2px] flex-1 max-w-[80px] bg-border opacity-30" />
          </div>

          {/* Frontend Inventory */}
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-6 bg-accent flex items-center justify-center">
                <span className="text-surface text-xs font-bold">⚔</span>
              </div>
              <span className="font-[family-name:var(--font-pixel)] text-text-main text-[0.55rem] tracking-wider">
                FRONTEND WEAPONS
              </span>
              <div className="flex-1 h-[2px] bg-border opacity-20" />
              <span className="font-[family-name:var(--font-code)] text-text-secondary text-[0.6rem]">
                {frontendSkills.length} items
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {frontendSkills.map((skill, i) => (
                <InventorySlot key={skill.name} skill={skill} index={i} visible={visible} />
              ))}
            </div>
          </div>

          {/* Tools Inventory */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-6 bg-primary flex items-center justify-center">
                <span className="text-surface text-xs font-bold">🛡</span>
              </div>
              <span className="font-[family-name:var(--font-pixel)] text-text-main text-[0.55rem] tracking-wider">
                TOOLS & EQUIPMENT
              </span>
              <div className="flex-1 h-[2px] bg-border opacity-20" />
              <span className="font-[family-name:var(--font-code)] text-text-secondary text-[0.6rem]">
                {toolsSkills.length} items
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 max-w-3xl mx-auto">
              {toolsSkills.map((skill, i) => (
                <InventorySlot key={skill.name} skill={skill} index={i + frontendSkills.length} visible={visible} />
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-6 mt-12 pt-6 border-t-2 border-border border-dashed">
            {Object.entries(rarityColors).map(([key, val]) => (
              <div key={key} className="flex items-center gap-2">
                <div className="w-3 h-3 border-2" style={{ borderColor: val.border, backgroundColor: val.bg }} />
                <span className="font-[family-name:var(--font-pixel)] text-[0.4rem] tracking-wider" style={{ color: val.stars }}>
                  {val.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
