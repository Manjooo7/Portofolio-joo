"use client";

import { useEffect, useRef, useState } from "react";

export default function PixelRevealCanvas({ 
  srcPixel, 
  srcReal, 
  className = "", 
  gridSize = 12 
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const imgPixelRef = useRef(null);
  const imgRealRef = useRef(null);
  const blocksRef = useRef([]);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const animationRef = useRef(null);

  useEffect(() => {
    let loaded = 0;
    const checkLoad = () => {
      loaded++;
      if (loaded === 2) setImagesLoaded(true);
    };

    const imgP = new Image();
    imgP.src = srcPixel;
    imgP.onload = checkLoad;
    imgPixelRef.current = imgP;

    const imgR = new Image();
    imgR.src = srcReal;
    imgR.onload = checkLoad;
    imgRealRef.current = imgR;
  }, [srcPixel, srcReal]);

  useEffect(() => {
    if (!imagesLoaded || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: false }); // optimize
    const container = containerRef.current;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      
      const newBlocks = [];
      const colWidth = canvas.width / gridSize;
      const rowHeight = canvas.height / gridSize;
      
      for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
          newBlocks.push({
            x: x * colWidth,
            y: y * rowHeight,
            w: colWidth,
            h: rowHeight,
            progress: 0, 
            delay: Math.random() * 0.1 // random delay offset
          });
        }
      }
      blocksRef.current = newBlocks;
    };

    resize();
    window.addEventListener("resize", resize);

    const drawPiece = (ctx, img, block, cw, ch) => {
      const imgAspect = img.width / img.height;
      const canvasAspect = cw / ch;
      
      let sx, sy, sw, sh;
      if (imgAspect > canvasAspect) {
        sh = img.height;
        sw = img.height * canvasAspect;
        sx = (img.width - sw) / 2;
        sy = 0;
      } else {
        sw = img.width;
        sh = img.width / canvasAspect;
        sx = 0;
        sy = (img.height - sh) / 2;
      }

      const sourceX = sx + (block.x / cw) * sw;
      const sourceY = sy + (block.y / ch) * sh;
      const sourceW = (block.w / cw) * sw;
      const sourceH = (block.h / ch) * sh;

      ctx.drawImage(
        img,
        sourceX, sourceY, sourceW, sourceH,
        Math.floor(block.x), Math.floor(block.y), Math.ceil(block.w) + 1, Math.ceil(block.h) + 1
      );
    };

    const render = () => {
      const blocks = blocksRef.current;
      const mouse = mouseRef.current;

      blocks.forEach(block => {
        const centerX = block.x + block.w / 2;
        const centerY = block.y + block.h / 2;
        const dx = centerX - mouse.x;
        const dy = centerY - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Interaction radius
        const radius = canvas.width * 0.6;

        let targetProgress = 0;
        if (mouse.active && dist < radius) {
          targetProgress = 1;
        }

        if (block.progress < targetProgress) {
          block.progress += 0.02 + (block.delay * 0.2); 
          if (block.progress > 1) block.progress = 1;
        } else if (block.progress > targetProgress) {
          block.progress -= 0.015 + (block.delay * 0.2);
          if (block.progress < 0) block.progress = 0;
        }

        if (block.progress === 0) {
          drawPiece(ctx, imgPixelRef.current, block, canvas.width, canvas.height);
        } else if (block.progress === 1) {
          drawPiece(ctx, imgRealRef.current, block, canvas.width, canvas.height);
        } else {
          // Transition block color
          if (block.progress > 0.2 && block.progress < 0.8) {
            ctx.fillStyle = "#52B788"; // Primary green flash
            ctx.fillRect(Math.floor(block.x), Math.floor(block.y), Math.ceil(block.w) + 1, Math.ceil(block.h) + 1);
          } else if (block.progress <= 0.2) {
             drawPiece(ctx, imgPixelRef.current, block, canvas.width, canvas.height);
          } else {
             drawPiece(ctx, imgRealRef.current, block, canvas.width, canvas.height);
          }
        }
      });

      animationRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [imagesLoaded, gridSize]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true
    };
  };

  const handleMouseLeave = () => {
    mouseRef.current.active = false;
  };

  return (
    <div 
      ref={containerRef} 
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {!imagesLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-section-alt animate-pulse">
        </div>
      )}
      <canvas 
        ref={canvasRef} 
        className="block w-full h-full"
        style={{ opacity: imagesLoaded ? 1 : 0, transition: 'opacity 0.3s' }}
      />
    </div>
  );
}
