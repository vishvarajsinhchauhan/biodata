"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.2,
        }}
        className="relative w-24 h-24 mb-8 rounded-full overflow-hidden"
      >
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2140.JPG-yG1TXCFrOCUANfvoiVCQnQEwQ7fQxX.jpeg"
          alt="Vishvarajsinh"
          fill
          className="object-cover"
        />
      </motion.div>

      <motion.h1
        className="text-3xl font-serif font-bold text-primary mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.4,
        }}
      >
        Vishvarajsinh Biodata
      </motion.h1>

      <div className="space-y-2">
        <motion.div
          className="h-1 w-40 bg-gradient-to-r from-transparent via-primary/50 to-transparent rounded-full overflow-hidden"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            duration: 1.5,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.6,
          }}
        >
          <motion.div
            className="h-full w-full bg-primary/80"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 1.5,
              ease: "linear",
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
          />
        </motion.div>

        <motion.p
          className="text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.8,
          }}
        >
          Loading biodata...
        </motion.p>
      </div>
    </motion.div>
  )
}

