"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react"
import { cn } from "@/lib/utils"
import SectionDivider from "@/components/section-divider"
import { useTouchRipple } from "@/hooks/use-touch-gestures"
import { staggerContainer, revealVariants, childVariant } from "@/lib/framer-animations"

interface HeroSectionProps {
  name: string
  intro: string
  profileImage: string
  additionalImages: string[]
}

export default function HeroSection({ name, intro, profileImage, additionalImages }: HeroSectionProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const allImages = [profileImage, ...additionalImages]
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const { createRipple } = useTouchRipple()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9])

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length)
    setIsZoomed(false)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length)
    setIsZoomed(false)
  }

  const toggleZoom = () => {
    setIsZoomed(!isZoomed)
  }

  const closeDialog = () => {
    setIsDialogOpen(false)
  }

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center py-20 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-blue-50/50 to-transparent opacity-70 pointer-events-none" />

      <motion.div
        className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        style={{ y, opacity, scale }}
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.div
          className="text-center lg:text-left order-2 lg:order-1 mt-8 sm:mt-0"
          variants={childVariant}
        >
          <motion.h1
            className={cn(
              "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6",
              "bg-clip-text text-transparent bg-gradient-to-r from-[#0f3460] to-[#0f3460]/80",
              "tracking-tight leading-tight",
            )}
            variants={revealVariants}
          >
            {name}
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-gray-700 leading-relaxed max-w-xl mx-auto lg:mx-0"
            variants={revealVariants}
          >
            {intro}
          </motion.p>
        </motion.div>

        <motion.div
          className="relative order-1 lg:order-2"
          variants={childVariant}
        >
          <div
            ref={imageRef}
            className={cn(
              "relative aspect-square w-full max-w-md mx-auto",
              "rounded-2xl overflow-hidden",
              "shadow-[0_20px_80px_-15px_rgba(0,0,0,0.1)]",
              "cursor-pointer",
              isZoomed ? "z-50" : "z-0",
            )}
            onClick={toggleZoom}
            onTouchStart={createRipple}
          >
            <Image
              src={allImages[currentImageIndex]}
              alt={name}
              fill
              className={cn(
                "object-cover transition-transform duration-300",
                isZoomed ? "scale-110" : "scale-100",
              )}
              priority
            />
          </div>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-12 left-0 right-0 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <SectionDivider />
        </motion.div>
      </div>
    </section>
  )
}

