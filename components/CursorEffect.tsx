"use client";
import { useEffect, useRef } from "react";

type CursorMode = "default" | "pointer" | "drag";

export default function CursorEffect() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const arrowsRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const mode = useRef<CursorMode>("default");
  const raf = useRef<number>(0);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (el.closest("[data-cursor='drag']")) {
        mode.current = "drag";
      } else if (el.closest("a, button, [role='button'], [data-cursor='pointer'], input, textarea, select, label")) {
        mode.current = "pointer";
      } else {
        mode.current = "default";
      }
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", onOver);

    const animate = () => {
      const m = mode.current;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
        if (m === "pointer") {
          dotRef.current.style.width = "14px";
          dotRef.current.style.height = "14px";
          dotRef.current.style.marginLeft = "-3px";
          dotRef.current.style.marginTop = "-3px";
          dotRef.current.style.boxShadow = "0 0 10px 4px rgba(96,165,250,0.7)";
          dotRef.current.style.opacity = "1";
        } else {
          dotRef.current.style.width = "8px";
          dotRef.current.style.height = "8px";
          dotRef.current.style.marginLeft = "0px";
          dotRef.current.style.marginTop = "0px";
          dotRef.current.style.boxShadow = "none";
          dotRef.current.style.opacity = m === "drag" ? "0" : "1";
        }
      }

      // Outer ring — slow lag (0.12)
      if (ringRef.current) {
        ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12;
        ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12;
        ringRef.current.style.transform = `translate(${ringPos.current.x - 20}px, ${ringPos.current.y - 20}px)`;
        ringRef.current.style.opacity = m === "default" ? "1" : "0";
      }

      if (arrowsRef.current) {
        arrowsRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
        arrowsRef.current.style.opacity = m === "drag" ? "1" : "0";
      }

      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      {/* Small dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-blue-400 rounded-full pointer-events-none z-[9999] mix-blend-difference transition-[width,height,box-shadow,opacity] duration-100"
        style={{ willChange: "transform" }}
      />
      {/* Outer ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 border border-blue-400/50 rounded-full pointer-events-none z-[9998] transition-opacity duration-150"
        style={{ willChange: "transform" }}
      />
      {/* Drag arrows */}
      <div
        ref={arrowsRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] transition-opacity duration-150 flex items-center gap-1 text-blue-400 -translate-x-1/2 -translate-y-1/2"
        style={{ willChange: "transform", opacity: 0 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 18-6-6 6-6"/>
        </svg>
        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m9 18 6-6-6-6"/>
        </svg>
      </div>
    </>
  );
}
