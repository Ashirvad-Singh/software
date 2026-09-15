import { memo, useId } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

// The reference's parallel curves, offset seven units right and eight units up.
const paths = Array.from({ length: 50 }, (_, index) => {
  const x = index * 7;
  const y = index * -8;
  return `M${-380 + x} ${-189 + y}C${-380 + x} ${-189 + y} ${-312 + x} ${216 + y} ${152 + x} ${343 + y}C${616 + x} ${470 + y} ${684 + x} ${875 + y} ${684 + x} ${875 + y}`;
});

export const BackgroundBeams = memo(function BackgroundBeams({ className }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  const reducedMotion = useReducedMotion();
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <svg className="absolute h-full w-full" viewBox="0 0 696 316" preserveAspectRatio="xMidYMid slice" fill="none" focusable="false">
        <path d={paths.join(" ")} stroke="#7dd3fc" strokeOpacity="0.18" strokeWidth="0.5" />
        {paths.map((path, index) => <path key={index} d={path} stroke={`url(#${id}-beam-${index})`} strokeOpacity="0.5" strokeWidth="0.65" />)}
        <defs>
          {paths.map((_, index) => (
            <motion.linearGradient
              key={index}
              id={`${id}-beam-${index}`}
              initial={{ x1: "0%", x2: "0%", y1: "0%", y2: "0%" }}
              animate={reducedMotion ? { x1: "0%", x2: "95%", y1: "0%", y2: "100%" } : {
                x1: ["0%", "100%"], x2: ["0%", "95%"],
                y1: ["0%", "100%"], y2: ["0%", `${93 + (index * 3 % 8)}%`],
              }}
              transition={reducedMotion ? { duration: 0 } : {
                duration: 10 + (index * 7 % 10), ease: "easeInOut", repeat: Infinity, delay: (index * 3 % 10),
              }}
            >
              <stop stopColor="#18CCFC" stopOpacity="0" />
              <stop offset="12%" stopColor="#0ea5e9" />
              <stop offset="32.5%" stopColor="#6344F5" />
              <stop offset="100%" stopColor="#AE48FF" stopOpacity="0" />
            </motion.linearGradient>
          ))}
        </defs>
      </svg>
    </div>
  );
});
