import { useEffect, useRef, useState } from "react"
import { motion, useInView, useSpring } from "framer-motion"

interface CounterProps {
  value: number
  suffix?: string
  duration?: number
}

function Counter({ value, suffix = "", duration = 2 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-50px" })
  const [hasAnimated, setHasAnimated] = useState(false)
  
  const spring = useSpring(0, {
    stiffness: 50,
    damping: 20,
    duration: duration * 1000,
  })

  useEffect(() => {
    if (inView && !hasAnimated) {
      spring.set(value)
      setHasAnimated(true)
    }
  }, [inView, spring, value, hasAnimated])

  useEffect(() => {
    spring.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toString() + suffix
      }
    })
  }, [spring, suffix])

  return <span ref={ref}>0{suffix}</span>
}

export default function StatsCounter() {
  const stats = [
    { label: "Projects Delivered", value: 50, suffix: "+" },
    { label: "Happy Clients", value: 30, suffix: "+" },
    { label: "Years Experience", value: 5, suffix: "+" },
    { label: "Tech Experts", value: 10, suffix: "+" },
  ]

  return (
    <div className="w-full bg-secondary/50 py-16 border-y border-border/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-border/50">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex flex-col items-center text-center px-4"
            >
              <h3 className="text-4xl md:text-5xl font-bold text-primary mb-2">
                <Counter value={stat.value} suffix={stat.suffix} />
              </h3>
              <p className="text-sm md:text-base text-muted-foreground font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
