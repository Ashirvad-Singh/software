"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ContainerTextFlipProps {
  words?: string[];
  interval?: number;
  className?: string;
  textClassName?: string;
  animationDuration?: number;
}

const defaultWords = ["better", "modern", "beautiful", "awesome"];

export function ContainerTextFlip({
  words = defaultWords,
  interval = 3000,
  className,
  textClassName,
  animationDuration = 700,
}: ContainerTextFlipProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [width, setWidth] = useState<number>();
  const textRef = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();
  const word = words[currentWordIndex % words.length] ?? "";

  useEffect(() => {
    const text = textRef.current;
    if (!text) return;
    const updateWidth = () => setWidth(text.getBoundingClientRect().width + 30);
    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(text);
    return () => observer.disconnect();
  }, [word]);

  useEffect(() => {
    if (reduceMotion || words.length < 2) return;
    const timer = window.setInterval(() => {
      setCurrentWordIndex((index) => (index + 1) % words.length);
    }, interval);
    return () => window.clearInterval(timer);
  }, [words.length, interval, reduceMotion]);

  if (!words.length) return null;

  return (
    <motion.span
      animate={{ width }}
      transition={{ duration: reduceMotion ? 0 : animationDuration / 2000 }}
      className={cn(
        "relative inline-block rounded-lg px-[15px] pt-2 pb-3 text-center align-baseline text-4xl font-bold text-black md:text-7xl dark:text-white",
        "bg-gradient-to-b from-gray-100 to-gray-200",
        "shadow-[inset_0_-1px_#d1d5db,inset_0_0_0_1px_#d1d5db,0_4px_8px_#d1d5db]",
        "dark:from-gray-700 dark:to-gray-800",
        "dark:shadow-[inset_0_-1px_#10171e,inset_0_0_0_1px_hsla(205,89%,46%,.24),0_4px_8px_#00000052]",
        className,
      )}
    >
      <span className="sr-only">{words[0]}</span>
      <span
        key={word}
        ref={textRef}
        aria-hidden="true"
        className={cn("inline-block whitespace-nowrap", textClassName)}
      >
        {word.split("").map((letter, index) => (
          <motion.span
            key={index}
            initial={reduceMotion ? false : { opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{
              duration: reduceMotion ? 0 : animationDuration / 1000,
              delay: reduceMotion ? 0 : index * 0.02,
              ease: "easeInOut",
            }}
          >
            {letter}
          </motion.span>
        ))}
      </span>
    </motion.span>
  );
}
