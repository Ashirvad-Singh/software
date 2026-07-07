import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

import { ArrowRight } from "lucide-react"

export default function Cursor() {
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [cursorText, setCursorText] = useState<string | null>(null)
  
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  
  const cursorXDot = useMotionValue(-100)
  const cursorYDot = useMotionValue(-100)
  
  // Smooth spring for the outer ring (slower trailing effect)
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    // Hide cursor on touch devices to prevent stuck cursors
    if (window.matchMedia("(pointer: coarse)").matches) return

    setIsVisible(true)

    const moveCursor = (e: MouseEvent) => {
      // Offset by half the width/height of the new element (24px total size = 12px offset)
      cursorX.set(e.clientX - 12)
      cursorY.set(e.clientY - 12)
    }
    
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const computedStyle = window.getComputedStyle(target)
      
      const cursorAttr = target.closest('[data-cursor-text]')?.getAttribute('data-cursor-text')
      if (cursorAttr) {
        setCursorText(cursorAttr)
      } else {
        setCursorText(null)
      }

      if (
        !cursorAttr && (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']") ||
        target.closest("input") ||
        target.closest("textarea") ||
        computedStyle.cursor === 'pointer'
        )
      ) {
        setIsHovered(true)
      } else {
        setIsHovered(false)
      }
    }

    window.addEventListener("mousemove", moveCursor)
    window.addEventListener("mouseover", handleMouseOver)

    return () => {
      window.removeEventListener("mousemove", moveCursor)
      window.removeEventListener("mouseover", handleMouseOver)
    }
  }, [cursorX, cursorY, cursorXDot, cursorYDot])

  if (!isVisible) return null

  return (
    <>
      <motion.div
        className={`pointer-events-none fixed top-0 left-0 z-[10000] flex items-center justify-center overflow-hidden ${
          cursorText
            ? "bg-black text-white rounded-full px-4 py-2 font-medium text-sm whitespace-nowrap shadow-lg shadow-black/20"
            : "h-6 w-6 rounded-full bg-white mix-blend-difference"
        }`}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          scale: cursorText ? 1 : isHovered ? 2.5 : 1,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.3 }}
      >
        {cursorText && (
          <div className="flex items-center gap-2">
            <span>{cursorText}</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        )}
      </motion.div>
    </>
  )
}
