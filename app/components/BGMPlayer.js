"use client";

import { useState, useEffect, useRef } from "react";

export default function BGMPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Initialize audio volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3; // Default volume 30% so it's not too loud
    }
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.error("Audio play blocked", e));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <audio ref={audioRef} loop src="/LittlerootTown.mp3" />
      <button
        onClick={togglePlay}
        className="w-12 h-12 flex items-center justify-center border-4 border-border bg-section-alt hover:bg-primary text-text-main hover:text-white transition-colors duration-200 shadow-[4px_4px_0_var(--shadow-color)] active:translate-y-1 active:translate-x-1 active:shadow-none cursor-pointer"
        aria-label="Toggle Background Music"
        title={isPlaying ? "Mute Music" : "Play Music"}
      >
        {isPlaying ? (
          // Music On Icon
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
          </svg>
        ) : (
          // Music Off Icon
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M4.27 3L3 4.27l9 9v.28c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4v-1.73l4.56 4.56c-.44.75-1.12 1.34-1.93 1.63v2.06c1.47-.43 2.65-1.45 3.31-2.78l1.79 1.79L21 19.73 4.27 3zM14 7h4V3h-6v5.18l2 2z"/>
          </svg>
        )}
      </button>
    </div>
  );
}
