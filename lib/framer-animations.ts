"use client"

import type { Variants } from "framer-motion"

// Simple fade in animation for all elements
export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
}

// Hover animations for interactive elements
export const hoverScale = {
  scale: 1.05,
  transition: { duration: 0.3, ease: "easeOut" },
}

export const hoverButton = {
  scale: 1.03,
  transition: { duration: 0.2, ease: "easeOut" },
}

// Card animation
export const cardVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
}

// Text reveal animation
export const revealVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
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
      staggerChildren: 0.1,
      delayChildren: 0.1,
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

