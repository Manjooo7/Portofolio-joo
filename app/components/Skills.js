"use client";

import { useEffect, useRef, useState } from "react";
import SectionTitle from "./SectionTitle";

const frontendSkills = [
  { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "React.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Bootstrap", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
];

const toolsSkills = [
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
  { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
  { name: "npm", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg" },
];

function SkillCard({ skill, delay }) {
  return (
    <div
      className="pixel-card p-4 flex flex-col items-center gap-3 group"
      style={{ animationDelay: `${delay}s` }}
    >
      <img
        src={skill.icon}
        alt={skill.name}
        width={40}
        height={40}
        className="transition-transform duration-200 group-hover:scale-110"
        loading="lazy"
      />
      <span className="font-[family-name:var(--font-code)] text-text-main text-xs text-center">
        {skill.name}
      </span>
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
      className="py-24 px-6 bg-section-alt"
    >
      <div className="max-w-5xl mx-auto">
        <SectionTitle>SKILLS</SectionTitle>

        <div
          className={`${visible ? "animate-fadeInUp" : "opacity-0"}`}
        >
          {/* Frontend Technologies */}
          <div className="mb-12">
            <div className="flex justify-center mb-6">
              <span className="pixel-badge">FRONTEND</span>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
              {frontendSkills.map((skill, i) => (
                <SkillCard key={skill.name} skill={skill} delay={i * 0.08} />
              ))}
            </div>
          </div>

          {/* Tools & Others */}
          <div>
            <div className="flex justify-center mb-6">
              <span className="pixel-badge pixel-badge-outline">TOOLS & OTHERS</span>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 max-w-xl mx-auto">
              {toolsSkills.map((skill, i) => (
                <SkillCard key={skill.name} skill={skill} delay={i * 0.08 + 0.3} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
