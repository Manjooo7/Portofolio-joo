"use client";

import { useState, useEffect } from "react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }, [darkMode]);

  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-200 ${scrolled
        ? "navbar-scrolled bg-[var(--nav-bg)] backdrop-blur-sm"
        : "bg-transparent"
        }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-2 group"
        >
          {/* Pokeball pixel icon */}
          <svg width="20" height="20" viewBox="0 0 16 16" style={{ imageRendering: "pixelated" }} className="transition-transform group-hover:rotate-180 duration-500">
            <rect x="0" y="0" width="16" height="7" fill="var(--accent)" />
            <rect x="0" y="7" width="16" height="2" fill="var(--text-main)" />
            <rect x="0" y="9" width="16" height="7" fill="var(--surface)" />
            <rect x="6" y="5" width="4" height="6" fill="var(--text-main)" />
            <rect x="7" y="6" width="2" height="4" fill="var(--surface)" />
          </svg>
          <span className="font-[family-name:var(--font-pixel)] text-primary text-xs md:text-sm tracking-wider hover:text-accent transition-colors">
            Portofolio
          </span>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`relative font-[family-name:var(--font-body)] text-sm font-medium transition-colors duration-200 ${activeSection === link.href.replace("#", "")
                ? "text-accent"
                : "text-text-main hover:text-primary"
                }`}
            >
              {link.label}
              {/* Pixel underline indicator */}
              {activeSection === link.href.replace("#", "") && (
                <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-accent" style={{ imageRendering: "pixelated" }} />
              )}
            </a>
          ))}

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-9 h-9 flex items-center justify-center border-2 border-border bg-surface hover:bg-section-alt transition-colors"
            aria-label="Toggle dark mode"
          >
            <span className="font-[family-name:var(--font-pixel)] text-[0.5rem]">
              {darkMode ? "☀" : "☾"}
            </span>
          </button>

          <a
            href="#contact"
            className="pixel-btn pixel-btn-small"
          >
            Collab with me
          </a>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center gap-3">
          {/* Dark Mode Toggle Mobile */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-9 h-9 flex items-center justify-center border-2 border-border bg-surface"
            aria-label="Toggle dark mode"
          >
            <span className="font-[family-name:var(--font-pixel)] text-[0.5rem]">
              {darkMode ? "☀" : "☾"}
            </span>
          </button>
          <button
            className="flex flex-col gap-[5px] p-2 border-2 border-border bg-surface"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-5 h-[2px] bg-text-main transition-transform duration-200 ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""
                }`}
            />
            <span
              className={`block w-5 h-[2px] bg-text-main transition-opacity duration-200 ${mobileOpen ? "opacity-0" : ""
                }`}
            />
            <span
              className={`block w-5 h-[2px] bg-text-main transition-transform duration-200 ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""
                }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
          }`}
        style={{ backgroundColor: "var(--nav-bg, rgba(248,249,250,0.98))", backdropFilter: "blur(8px)" }}
      >
        <div className="flex flex-col items-center gap-5 py-6 border-t-2 border-border">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleLinkClick}
              className={`font-[family-name:var(--font-body)] text-sm font-medium transition-colors ${activeSection === link.href.replace("#", "")
                ? "text-accent"
                : "text-text-main hover:text-primary"
                }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={handleLinkClick}
            className="pixel-btn pixel-btn-small"
          >
            Collab with me
          </a>
        </div>
      </div>
    </nav>
  );
}
