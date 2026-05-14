"use client";

import { useState } from "react";
import GameStartScreen from "./components/GameStartScreen";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CursorTrail from "./components/CursorTrail";
import KonamiEasterEgg from "./components/KonamiEasterEgg";
import PixelDivider from "./components/PixelDivider";
import BGMPlayer from "./components/BGMPlayer";
import PixelClouds from "./components/PixelClouds";

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <>
      {!gameStarted && (
        <GameStartScreen onStart={() => setGameStarted(true)} />
      )}
      <div
        className={`transition-opacity duration-700 ${
          gameStarted ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <PixelClouds />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
      <CursorTrail />
      <KonamiEasterEgg />
      <BGMPlayer />
    </>
  );
}
