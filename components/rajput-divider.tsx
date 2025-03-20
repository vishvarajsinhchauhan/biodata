"use client"

import { motion } from "framer-motion"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export default function RajputDivider() {
  const { ref, isInView } = useScrollAnimation(0.5)

  return (
    <motion.div
      className="flex items-center justify-center my-12"
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent w-1/3"
        initial={{ width: 0 }}
        animate={isInView ? { width: "33%" } : { width: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="mx-4"
        initial={{ scale: 0, rotate: -180 }}
        animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.2, rotate: 5 }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-[#1e40af]"
        >
          <path
            d="M14 19L12 15L10 19"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 15V3M12 3L16 7M12 3L8 7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M5 21H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
      <motion.div
        className="h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent w-1/3"
        initial={{ width: 0 }}
        animate={isInView ? { width: "33%" } : { width: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.div>
  )
}

