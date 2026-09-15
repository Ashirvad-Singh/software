import { useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export function MagneticButton({ children, strength = 0.8, maxDistance = 100, className }: { children: ReactNode; strength?: number; maxDistance?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const moved = !reducedMotion && (position.x !== 0 || position.y !== 0);
  return (
    <div ref={ref} data-magnetic-zone className={cn("inline-block rounded-full border border-dashed transition-colors duration-150", className)}
      style={{ borderColor: moved ? "#0ea5e9" : "transparent", backgroundColor: moved ? "rgb(14 165 233 / 15%)" : "transparent" }}
      onPointerMove={(event) => {
        if (reducedMotion || event.pointerType !== "mouse" || !ref.current || ref.current.querySelector(':disabled, [aria-disabled="true"]')) return;
        const rect = ref.current.getBoundingClientRect();
        let x = (event.clientX - rect.left - rect.width / 2) * strength;
        let y = (event.clientY - rect.top - rect.height / 2) * strength;
        const distance = Math.hypot(x, y);
        if (distance > maxDistance) { x *= maxDistance / distance; y *= maxDistance / distance; }
        setPosition({ x, y });
      }}
      onPointerLeave={() => setPosition({ x: 0, y: 0 })}
      onFocusCapture={() => setPosition({ x: 0, y: 0 })}>
      <motion.div animate={reducedMotion ? { x: 0, y: 0 } : position} transition={{ type: "spring", stiffness: 150, damping: 25, mass: 0.1 }}>{children}</motion.div>
    </div>
  );
}
