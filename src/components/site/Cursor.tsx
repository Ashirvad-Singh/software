import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion"

const defaultLabels = [
  "Adat Soft Solutions",
  "Web Development",
  "UI/UX Design",
  "WordPress & Shopify",
  "Mobile Apps",
  "Custom Engineering",
  "SEO & Performance",
]

export default function Cursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [hasMoved, setHasMoved] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [hoverText, setHoverText] = useState<string | null>(null)
  const [labelIndex, setLabelIndex] = useState(0)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Smooth spring for trailing motion
  const springConfig = { damping: 28, stiffness: 500, mass: 0.2 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  // Rotate default label every 2.2 seconds when not hovering
  useEffect(() => {
    const timer = setInterval(() => {
      setLabelIndex((prev) => (prev + 1) % defaultLabels.length)
    }, 2200)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    // Hide cursor on mobile devices, small screens, or touch devices
    if (
      typeof window === "undefined" ||
      window.innerWidth < 768 ||
      window.matchMedia("(pointer: coarse)").matches ||
      "ontouchstart" in window
    ) {
      setIsVisible(false)
      return
    }

    setIsVisible(true)

    const handleMouseMove = (e: MouseEvent) => {
      setHasMoved(true)
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const computedStyle = window.getComputedStyle(target)

      // 1. Check for data-cursor-text attribute
      const cursorAttr = target.closest("[data-cursor-text]")?.getAttribute("data-cursor-text")
      if (cursorAttr) {
        setHoverText(cursorAttr.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, "").trim())
        setIsHovered(true)
        return
      }

      // 2. Check for links & buttons with smart context-aware labels
      const closestLink = target.closest("a")
      const closestBtn = target.closest("button, [role='button']")
      const closestInput = target.closest("input, textarea")

      if (closestInput) {
        setHoverText("Type Here")
        setIsHovered(true)
        return
      }

      if (closestLink || closestBtn || computedStyle.cursor === "pointer") {
        const href = closestLink?.getAttribute("href") || ""
        const btnText = (closestLink?.textContent || closestBtn?.textContent || "").toLowerCase()

        if (href.includes("contact") || btnText.includes("talk") || btnText.includes("contact") || btnText.includes("quote")) {
          setHoverText("Let's Talk")
        } else if (href.includes("work") || href.includes("project") || btnText.includes("work") || btnText.includes("case")) {
          setHoverText("View Work")
        } else if (href.includes("service") || btnText.includes("service") || btnText.includes("explore")) {
          setHoverText("Explore")
        } else if (href.includes("about") || href.includes("team") || btnText.includes("about") || btnText.includes("team")) {
          setHoverText("Meet Us")
        } else if (href.includes("blog") || btnText.includes("read") || btnText.includes("article")) {
          setHoverText("Read Article")
        } else {
          setHoverText("Click Here")
        }
        setIsHovered(true)
        return
      }

      // Default state
      setHoverText(null)
      setIsHovered(false)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseover", handleMouseOver)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseover", handleMouseOver)
    }
  }, [mouseX, mouseY])

  if (!isVisible || !hasMoved) return null

  const displayText = hoverText ? hoverText : defaultLabels[labelIndex]
  const badgeBg = isHovered ? "#6366F1" : "#0EA5E9" // Indigo on hover, Sky Blue default

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[99999] flex items-start gap-1"
      style={{
        x: smoothX,
        y: smoothY,
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.15 }}
    >
      {/* Figma Pointer Arrow */}
      <motion.svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-md"
        animate={{
          scale: isHovered ? 1.2 : 1,
          rotate: isHovered ? -8 : 0,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <path
          d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500001 16.8829L0.500001 1.19841L11.7841 12.3673H5.65376Z"
          fill={badgeBg}
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </motion.svg>

      {/* Figma Name / Action Pill Badge */}
      <motion.div
        className="flex items-center gap-1.5 px-3 py-1 rounded-full text-white font-semibold text-xs shadow-lg border border-white/40 backdrop-blur-md select-none translate-x-1 translate-y-2 whitespace-nowrap overflow-hidden"
        animate={{
          backgroundColor: badgeBg,
          scale: isHovered ? 1.08 : 1,
        }}
        transition={{ duration: 0.25 }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping shrink-0" />
        
        <AnimatePresence mode="wait">
          <motion.span
            key={displayText}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="inline-block"
          >
            {displayText}
          </motion.span>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}
