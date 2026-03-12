"use client";
import { useEffect, useRef } from "react";

export default function Navbar() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const FRAME_W = 32;
    const FRAME_H = 32;
    const COLS = 2;
    const SCALE = 1.5;
    const DISPLAY_W = FRAME_W * SCALE;
    const DISPLAY_H = FRAME_H * SCALE;

    const imgLeft = new Image();
    imgLeft.src = "/walk left.png";
    const imgRight = new Image();
    imgRight.src = "/walk right.png";

    let frame = 0;
    let frameTimer = 0;
    const FRAME_SPEED = 14;

    let x = 120;
    let dir = 1;
    const speed = 0.6;

    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth ?? window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight ?? 64;
    };
    resize();

    let rafId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      frameTimer++;
      if (frameTimer >= FRAME_SPEED) {
        frameTimer = 0;
        frame = (frame + 1) % 4;
      }

      x += speed * dir;

      const PAD_RIGHT = 140;
      const PAD_LEFT = 60;
      if (x > canvas.width - PAD_RIGHT - DISPLAY_W) { x = canvas.width - PAD_RIGHT - DISPLAY_W; dir = -1; }
      if (x < PAD_LEFT) { x = PAD_LEFT; dir = 1; }

      const img = dir > 0 ? imgRight : imgLeft;
      const col = frame % COLS;
      const row = Math.floor(frame / COLS);
      const y = canvas.height - DISPLAY_H + 2;

      ctx.drawImage(img, col * FRAME_W, row * FRAME_H, FRAME_W, FRAME_H, x, y, DISPLAY_W, DISPLAY_H);

      rafId = requestAnimationFrame(animate);
    };

    let loaded = 0;
    const onLoad = () => { loaded++; if (loaded === 2) animate(); };
    imgLeft.onload = onLoad;
    imgRight.onload = onLoad;

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-5 bg-[#0a0a0f]/80 backdrop-blur-md border-b border-gray-800/50">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
      <button
        onClick={() => document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" })}
        className="text-gray-400 hover:text-white transition-colors relative z-10"
        aria-label="Home"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      </button>
      <div className="flex gap-6 text-gray-400 relative z-10">
        <a href="https://github.com/HongminAn03" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="GitHub">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/>
          </svg>
        </a>
        <a href="https://www.linkedin.com/in/hongmin-an-417994349/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="LinkedIn">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </a>
        <a href="mailto:hpa5199@psu.edu" className="hover:text-white transition-colors" aria-label="Email">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="16" x="2" y="4" rx="2"/>
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
          </svg>
        </a>
      </div>
    </nav>
  );
}
