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
    </>
  );
}
