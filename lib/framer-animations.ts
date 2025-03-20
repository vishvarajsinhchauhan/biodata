"use client"

import type { Variants } from "framer-motion"

// Base animation variants
export const staggerChildren = 0.1
export const childVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

// Fade up animation for sections
export const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
}

// Staggered fade in for list items
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren: 0.1,
    },
  },
}

// Card animation
export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

// Parallax effect for images
export const parallaxVariants = (strength = 0.3): Variants => ({
  hidden: { y: 0 },
  visible: {
    y: [`${-strength * 100}%`, `${strength * 100}%`],
    transition: {
      repeat: 0,
      repeatType: "reverse",
      ease: "linear",
    },
  },
})

// Reveal text animation
export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

// Hover animations for interactive elements
export const hoverScale = {
  scale: 1.05,
  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
}

export const hoverButton = {
  scale: 1.03,
  transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
}

// Background blur effect for sections
export const blurVariants: Variants = {
  hidden: {
    opacity: 0,
    filter: "blur(10px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
}

// Simple fade in animation
export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
}

