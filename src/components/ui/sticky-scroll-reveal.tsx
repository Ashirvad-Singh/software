"use client";
import React, { useRef, useState } from "react";
import { useScroll, useMotionValueEvent, motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode | any;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef<any>(null);
  
  // We use scrollYProgress of the wrapper div
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setActiveCard(closestBreakpointIndex);
  });

  return (
    <motion.div
      className="flex relative space-x-10 p-2 md:p-10 max-w-7xl mx-auto"
      ref={ref}
    >
      <div className="relative flex items-start px-4 w-full lg:w-1/2">
        <div className="w-full pb-[30vh]">
          {content.map((item, index) => (
            <div key={item.title + index} className="my-32">
              <motion.div
                initial={{ opacity: 0.3 }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                  scale: activeCard === index ? 1.05 : 1,
                  x: activeCard === index ? 10 : 0,
                }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-3xl font-bold text-neutral-900">
                  {item.title}
                </h2>
                <p className="text-lg text-neutral-500 mt-6 max-w-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            </div>
          ))}
          <div className="h-40" />
        </div>
      </div>
      <div
        className={cn(
          "hidden lg:block h-[400px] xl:h-[500px] w-1/2 rounded-2xl sticky top-32 overflow-hidden shadow-2xl border border-neutral-100 bg-neutral-100",
          contentClassName
        )}
      >
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeCard}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-full h-full absolute inset-0"
          >
            {content[activeCard].content ?? null}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
