import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export default function Cursor() {
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  
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
      // Offset by half the width/height of the elements to center them
      cursorX.set(e.clientX - 16)
      cursorY.set(e.clientY - 16)
      
      cursorXDot.set(e.clientX - 4)
      cursorYDot.set(e.clientY - 4)
    }
    
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const computedStyle = window.getComputedStyle(target)
      
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']") ||
        target.closest("input") ||
        target.closest("textarea") ||
        computedStyle.cursor === 'pointer'
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
      {/* Inner Dot - Immediate Follow */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[10000] h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_rgba(59,130,246,0.5)]"
        style={{
          x: cursorXDot,
          y: cursorYDot,
        }}
        animate={{
          opacity: isHovered ? 0 : 1,
          scale: isHovered ? 0 : 1,
        }}
        transition={{ duration: 0.2 }}
      />
      
      {/* Outer Ring - Spring Follow */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] flex h-8 w-8 items-center justify-center rounded-full border border-primary/40 backdrop-blur-[2px]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          scale: isHovered ? 2 : 1,
          backgroundColor: isHovered ? "rgba(59, 130, 246, 0.15)" : "transparent",
          borderColor: isHovered ? "rgba(59, 130, 246, 0.1)" : "rgba(59, 130, 246, 0.4)",
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.3 }}
      />
    </>
  )
}
