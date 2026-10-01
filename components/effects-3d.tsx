"use client"

import { useRef, useState, useEffect, useCallback, type ReactNode } from "react"
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion"

// ─── 3D Tilt Card ────────────────────────────────────────────────────
interface TiltCard3DProps {
  children: ReactNode
  className?: string
  intensity?: number
  glare?: boolean
}

export function TiltCard3D({ children, className, intensity = 15, glare = true }: TiltCard3DProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const glareX = useMotionValue(50)
  const glareY = useMotionValue(50)

  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 })
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY
    
    rotateX.set((-mouseY / (rect.height / 2)) * intensity)
    rotateY.set((mouseX / (rect.width / 2)) * intensity)
    glareX.set(((e.clientX - rect.left) / rect.width) * 100)
    glareY.set(((e.clientY - rect.top) / rect.height) * 100)
  }, [intensity, rotateX, rotateY, glareX, glareY])

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0)
    rotateY.set(0)
    setIsHovered(false)
  }, [rotateX, rotateY])

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative h-full"
      >
        {children}
        {glare && isHovered && (
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-3xl"
            style={{
              background: `radial-gradient(circle at ${glareX.get()}% ${glareY.get()}%, rgba(255,255,255,0.15) 0%, transparent 60%)`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </motion.div>
    </motion.div>
  )
}

// ─── Animated 3D Grid Background ─────────────────────────────────────
export function Grid3DBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      {/* Perspective grid floor */}
      <motion.div
        className="absolute inset-0"
        style={{
          perspective: "600px",
          perspectiveOrigin: "50% 40%",
        }}
      >
        <motion.div
          className="absolute w-[200%] h-[200%] -left-[50%] -top-[20%]"
          style={{
            transformStyle: "preserve-3d",
            transform: "rotateX(65deg)",
            backgroundImage: `
              linear-gradient(var(--primary)/0.06 1px, transparent 1px),
              linear-gradient(90deg, var(--primary)/0.06 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            maskImage: "radial-gradient(ellipse at 50% 0%, black 30%, transparent 70%)",
          }}
          animate={{
            backgroundPosition: ["0px 0px", "0px 60px"],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>

      {/* Floating orbs with depth */}
      <motion.div
        className="absolute top-[20%] left-[15%] w-72 h-72 rounded-full blur-[100px]"
        style={{
          background: "var(--primary)",
          opacity: 0.06,
        }}
        animate={{
          x: [0, 40, 0],
          y: [0, -30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-[20%] right-[10%] w-96 h-96 rounded-full blur-[120px]"
        style={{
          background: "var(--primary-soft)",
          opacity: 0.05,
        }}
        animate={{
          x: [0, -50, 0],
          y: [0, 40, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  )
}

// ─── Parallax Depth Section ──────────────────────────────────────────
interface ParallaxDepthProps {
  children: ReactNode
  className?: string
  speed?: number
  direction?: "up" | "down"
}

export function ParallaxDepth({ children, className, speed = 0.3, direction = "up" }: ParallaxDepthProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  const factor = direction === "up" ? -1 : 1
  const y = useTransform(scrollYProgress, [0, 1], [100 * speed * factor, -100 * speed * factor])
  const springY = useSpring(y, { stiffness: 100, damping: 30 })

  return (
    <motion.div ref={ref} style={{ y: springY }} className={className}>
      {children}
    </motion.div>
  )
}

// ─── Mouse-Tracking Perspective Container ────────────────────────────
interface PerspectiveContainerProps {
  children: ReactNode
  className?: string
  intensity?: number
}

export function PerspectiveContainer({ children, className, intensity = 5 }: PerspectiveContainerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springRX = useSpring(rotateX, { stiffness: 100, damping: 30 })
  const springRY = useSpring(rotateY, { stiffness: 100, damping: 30 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      rotateX.set(((e.clientY - centerY) / centerY) * -intensity)
      rotateY.set(((e.clientX - centerX) / centerX) * intensity)
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [intensity, rotateX, rotateY])

  return (
    <motion.div
      ref={ref}
      style={{
        perspective: "1200px",
        transformStyle: "preserve-3d",
        rotateX: springRX,
        rotateY: springRY,
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── Floating 3D Element ─────────────────────────────────────────────
interface Floating3DProps {
  children: ReactNode
  className?: string
  depth?: number // translateZ value
  delay?: number
}

export function Floating3D({ children, className, depth = 30, delay = 0 }: Floating3DProps) {
  return (
    <motion.div
      className={className}
      style={{
        transformStyle: "preserve-3d",
        transform: `translateZ(${depth}px)`,
      }}
      animate={{
        y: [0, -15, 0],
        rotateX: [0, 2, 0],
        rotateY: [0, -2, 0],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  )
}

// ─── Scroll Reveal with 3D rotation ─────────────────────────────────
interface ScrollReveal3DProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: "left" | "right" | "center"
}

export function ScrollReveal3D({ children, className, delay = 0, direction = "center" }: ScrollReveal3DProps) {
  const rotateY = direction === "left" ? -15 : direction === "right" ? 15 : 0
  const rotateX = direction === "center" ? 10 : 5

  return (
    <motion.div
      initial={{
        opacity: 0,
        rotateX,
        rotateY,
        y: 40,
        scale: 0.95,
      }}
      whileInView={{
        opacity: 1,
        rotateX: 0,
        rotateY: 0,
        y: 0,
        scale: 1,
      }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        delay,
      }}
      style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── Animated 3D Text ────────────────────────────────────────────────
interface Text3DProps {
  text: string
  className?: string
  as?: "h1" | "h2" | "h3" | "p" | "span"
}

export function Text3D({ text, className, as: Tag = "h1" }: Text3DProps) {
  const words = text.split(" ")
  
  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.3em]"
          initial={{ 
            opacity: 0, 
            y: 30, 
            rotateX: 45,
          }}
          whileInView={{ 
            opacity: 1, 
            y: 0, 
            rotateX: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
            delay: i * 0.04,
          }}
          style={{ 
            perspective: "500px",
            transformStyle: "preserve-3d",
          }}
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  )
}

// ─── Animated Particles (floating dots with depth) ───────────────────
export function FloatingParticles({ count = 20 }: { count?: number }) {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 8 + 4,
    delay: Math.random() * 4,
    depth: Math.random() * 60 - 30,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden -z-10" style={{ perspective: "600px" }}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: "var(--primary)",
            opacity: 0.15 + (p.size / 10),
            transform: `translateZ(${p.depth}px)`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  )
}

// ─── Morphing Blob Background ────────────────────────────────────────
export function MorphingBlob({ className }: { className?: string }) {
  return (
    <motion.div
      className={className}
      style={{
        borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
      }}
      animate={{
        borderRadius: [
          "30% 70% 70% 30% / 30% 30% 70% 70%",
          "70% 30% 30% 70% / 70% 70% 30% 30%",
          "50% 50% 70% 30% / 40% 60% 60% 40%",
          "30% 70% 70% 30% / 30% 30% 70% 70%",
        ],
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  )
}

// ─── Card with 3D hover and border glow ──────────────────────────────
interface GlowTiltCardProps {
  children: ReactNode
  className?: string
  glowColor?: string
}

export function GlowTiltCard({ children, className, glowColor = "var(--primary)" }: GlowTiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springRX = useSpring(rotateX, { stiffness: 300, damping: 30 })
  const springRY = useSpring(rotateY, { stiffness: 300, damping: 30 })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    rotateX.set(y * -12)
    rotateY.set(x * 12)
  }, [rotateX, rotateY])

  return (
    <motion.div
      ref={ref}
      className={`${className || ""} relative`}
      style={{
        perspective: "800px",
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        rotateX.set(0)
        rotateY.set(0)
        setIsHovered(false)
      }}
    >
      <motion.div
        style={{
          rotateX: springRX,
          rotateY: springRY,
          transformStyle: "preserve-3d",
        }}
        className="h-full"
      >
        {children}
        {/* Glow border effect */}
        <motion.div
          className="absolute -inset-px rounded-3xl pointer-events-none"
          style={{
            background: `linear-gradient(135deg, ${glowColor}30, transparent 50%, ${glowColor}20)`,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  )
}

// ─── Scroll-driven 3D rotation for sections ──────────────────────────
interface ScrollTilt3DProps {
  children: ReactNode
  className?: string
}

export function ScrollTilt3D({ children, className }: ScrollTilt3DProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [8, 0, -8])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.5, 1, 1, 0.5])
  
  const springRotate = useSpring(rotateX, { stiffness: 100, damping: 30 })
  const springScale = useSpring(scale, { stiffness: 100, damping: 30 })

  return (
    <motion.div
      ref={ref}
      style={{
        perspective: "1200px",
        rotateX: springRotate,
        scale: springScale,
        opacity,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
