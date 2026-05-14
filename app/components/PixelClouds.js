"use client";

const CLOUD_CONFIGS = [
  { id: 1, size: 250, top: 10, speed: 60, delay: 0, opacity: 0.36, dir: 1 },
  { id: 2, size: 400, top: 40, speed: 90, delay: -30, opacity: 0.26, dir: -1 },
  { id: 3, size: 300, top: 70, speed: 75, delay: -15, opacity: 0.32, dir: 1 },
  { id: 4, size: 200, top: 25, speed: 80, delay: -45, opacity: 0.28, dir: -1 },
];

export default function PixelClouds({
  positionClass = "fixed",
  zClass = "z-0",
  opacityMultiplier = 1,
}) {
  return (
    <div className={`${positionClass} inset-0 pointer-events-none overflow-hidden ${zClass}`}>
      {CLOUD_CONFIGS.map((cloud) => (
        <div
          key={cloud.id}
          className="absolute"
          style={{
            top: `${cloud.top}%`,
            width: `${cloud.size}px`,
            opacity: cloud.opacity * opacityMultiplier,
            animation: `float-cloud-${cloud.id} ${cloud.speed}s linear infinite`,
            animationDelay: `${cloud.delay}s`,
            filter: "drop-shadow(8px 8px 0px rgba(26,26,46,0.05))",
          }}
        >
          <svg viewBox="0 0 24 14" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: "pixelated", width: "100%", height: "auto" }}>
            {/* Top layer (Light) */}
            <rect x="8" y="2" width="6" height="2" fill="#d4dde2" opacity="0.95"/>
            <rect x="6" y="4" width="12" height="2" fill="#d4dde2" opacity="0.95"/>
            <rect x="4" y="6" width="16" height="4" fill="#d4dde2" opacity="0.95"/>
            <rect x="2" y="8" width="20" height="2" fill="#d4dde2" opacity="0.95"/>
            
            {/* Bottom layer (3D Shadow) */}
            <rect x="4" y="10" width="16" height="2" fill="#b9c8cf" opacity="0.7"/>
            <rect x="6" y="12" width="12" height="2" fill="#b9c8cf" opacity="0.7"/>
          </svg>
          <style jsx>{`
            @keyframes float-cloud-${cloud.id} {
              0% {
                transform: translateX(${cloud.dir === 1 ? '100vw' : `-${cloud.size + 100}px`}) scaleX(${cloud.dir});
              }
              100% {
                transform: translateX(${cloud.dir === 1 ? `-${cloud.size + 100}px` : '100vw'}) scaleX(${cloud.dir});
              }
            }
          `}</style>
        </div>
      ))}
    </div>
  );
}
