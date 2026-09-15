import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import "./background-ripple-effect.css";

export function BackgroundRippleEffect({ cellSize = 40, className }: { cellSize?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [size, setSize] = useState({ rows: 1, cols: 1 });

  useEffect(() => {
    const grid = ref.current;
    const host = grid?.parentElement;
    if (!grid || !host) return;
    const observer = new ResizeObserver(([entry]) => {
      setSize({ rows: Math.ceil(entry.contentRect.height / cellSize), cols: Math.ceil(entry.contentRect.width / cellSize) });
    });
    observer.observe(host);
    return () => observer.disconnect();
  }, [cellSize]);

  useEffect(() => {
    const grid = ref.current;
    const host = grid?.parentElement;
    if (!grid || !host) return;
    let previous = -1;
    const locate = (event: PointerEvent | MouseEvent) => {
      const bounds = grid.getBoundingClientRect();
      return { row: Math.floor((event.clientY - bounds.top) / cellSize), col: Math.floor((event.clientX - bounds.left) / cellSize) };
    };
    const clear = () => { grid.children[previous]?.removeAttribute("data-hovered"); previous = -1; };
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const { row, col } = locate(event);
      const index = row * size.cols + col;
      if (index === previous) return;
      clear();
      grid.children[index]?.setAttribute("data-hovered", "true");
      previous = index;
    };
    const click = (event: MouseEvent) => {
      if (reducedMotion || (event.target instanceof Element && event.target.closest("a, button"))) return;
      const origin = locate(event);
      Array.from(grid.children).forEach((cell, index) => {
        cell.getAnimations().forEach((animation) => animation.cancel());
        const distance = Math.hypot(Math.floor(index / size.cols) - origin.row, index % size.cols - origin.col);
        if (distance > 16) return;
        cell.animate([
          { backgroundColor: "rgba(56,189,248,0)", transform: "scale(1)" },
          { backgroundColor: "rgba(56,189,248,.26)", transform: "scale(.92)", offset: .4 },
          { backgroundColor: "rgba(56,189,248,0)", transform: "scale(1)" },
        ], { duration: 650, delay: distance * 45, easing: "ease-out" });
      });
    };
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", clear);
    host.addEventListener("click", click);
    return () => {
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", clear);
      host.removeEventListener("click", click);
      Array.from(grid.children).forEach((cell) => cell.getAnimations().forEach((animation) => animation.cancel()));
    };
  }, [size, cellSize, reducedMotion]);

  return <div ref={ref} aria-hidden="true" className={cn("background-ripple-grid", className)} style={{ gridTemplateColumns: `repeat(${size.cols}, ${cellSize}px)`, gridAutoRows: cellSize }}>
    {Array.from({ length: size.rows * size.cols }, (_, index) => <div key={index} className="background-ripple-cell" />)}
  </div>;
}
