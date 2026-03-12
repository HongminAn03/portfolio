"use client";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [dots, setDots] = useState(1);
  const [fading, setFading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const start = performance.now();
    const duration = 2100;

    const tick = (now: number) => {
      const p = Math.min(100, ((now - start) / duration) * 100);
      setProgress(p);
      if (p < 100) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(() => setFading(true), 200);
        setTimeout(() => setDone(true), 900);
      }
    };
    requestAnimationFrame(tick);

    const dotsInterval = setInterval(() => {
      setDots((d) => (d % 3) + 1);
    }, 400);

    return () => clearInterval(dotsInterval);
  }, []);

  if (done) return null;

  return (
    <div
      className="fixed inset-0 z-[99999] bg-[#0a0a0f] flex flex-col items-center justify-center"
      style={{
        opacity: fading ? 0 : 1,
        transition: fading ? "opacity 0.6s ease" : "none",
        pointerEvents: fading ? "none" : "all",
      }}
    >
      <p className="text-sm font-mono text-gray-400 tracking-widest mb-8 w-28">
        loading{".".repeat(dots)}
      </p>
      <div className="w-48 h-px bg-gray-800 relative overflow-hidden">
        <div
          className="absolute left-0 top-0 h-full bg-blue-400"
          style={{
            width: `${progress}%`,
            boxShadow: "0 0 8px rgba(96,165,250,0.8)",
            transition: "none",
          }}
        />
      </div>
      <p className="mt-3 text-xs font-mono text-gray-600 tracking-widest">{Math.round(progress)}%</p>
    </div>
  );
}
