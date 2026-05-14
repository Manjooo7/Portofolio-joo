"use client";

import { useEffect, useState } from "react";

const POKEMONS = [
  { id: 1, src: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png", name: "Pikachu", speed: 15 },
  { id: 2, src: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png", name: "Charmander", speed: 20 },
  { id: 3, src: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png", name: "Squirtle", speed: 25 },
  { id: 4, src: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/17.png", name: "Pidgeotto", speed: 10, flying: true },
];

export default function PokemonBackground() {
  const [activePokemons, setActivePokemons] = useState([]);

  useEffect(() => {
    // Generate random instances of walking/flying pokemons
    const generatePokemons = () => {
      return Array.from({ length: 6 }).map((_, i) => {
        const template = POKEMONS[Math.floor(Math.random() * POKEMONS.length)];
        return {
          uid: i,
          ...template,
          delay: Math.random() * -30, // Random start time
          top: template.flying ? Math.random() * 40 + 10 : 85 + Math.random() * 5, // Flying at top, walking at bottom
          direction: Math.random() > 0.5 ? 1 : -1, // 1 for right to left, -1 for left to right
        };
      });
    };
    
    setActivePokemons(generatePokemons());
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[5] opacity-30">
      
      {/* Grass patches at the bottom */}
      <div 
        className="absolute bottom-0 w-full h-32 opacity-40"
        style={{
          backgroundImage: `url('data:image/svg+xml;utf8,<svg width="48" height="48" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M2 16V10h2V6h2v10H2zm8 0V8h2V4h2v12h-4z" fill="%2352B788" opacity="0.5"/></svg>')`,
          backgroundRepeat: "repeat-x",
          backgroundPosition: "bottom",
          imageRendering: "pixelated"
        }}
      />
      <div 
        className="absolute bottom-0 w-full h-16 opacity-60"
        style={{
          backgroundImage: `url('data:image/svg+xml;utf8,<svg width="64" height="64" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M4 16v-4h2v-4h2v8H4zm6 0v-6h2v-2h2v8h-4z" fill="%232D6A4F" opacity="0.6"/></svg>')`,
          backgroundRepeat: "repeat-x",
          backgroundPosition: "bottom",
          imageRendering: "pixelated"
        }}
      />

      {/* Moving Pokemons */}
      {activePokemons.map((pokemon) => (
        <div
          key={pokemon.uid}
          className="absolute"
          style={{
            top: `${pokemon.top}%`,
            animation: `walk-${pokemon.uid} ${pokemon.speed}s linear infinite`,
            animationDelay: `${pokemon.delay}s`,
            transform: pokemon.direction === -1 ? 'scaleX(-1)' : 'none',
          }}
        >
          <img 
            src={pokemon.src} 
            alt={pokemon.name}
            className="w-20 h-20 md:w-24 md:h-24 filter drop-shadow-md"
            style={{ imageRendering: "pixelated" }}
          />
          <style jsx>{`
            @keyframes walk-${pokemon.uid} {
              0% {
                left: ${pokemon.direction === 1 ? '110%' : '-10%'};
              }
              100% {
                left: ${pokemon.direction === 1 ? '-10%' : '110%'};
              }
            }
          `}</style>
        </div>
      ))}
    </div>
  );
}
