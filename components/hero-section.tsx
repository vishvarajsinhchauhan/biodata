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
      >
        <motion.div
          className="text-center lg:text-left order-2 lg:order-1 mt-8 sm:mt-0"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.2,
          }}
        >
          <motion.h1
            className={cn(
              "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6",
              "bg-clip-text text-transparent bg-gradient-to-r from-[#0f3460] to-[#0f3460]/80",
              "tracking-tight leading-tight",
            )}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.4,
            }}
          >
            {name}
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-gray-700 leading-relaxed max-w-xl mx-auto lg:mx-0"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.6,
            }}
          >
            {intro}
          </motion.p>
        </motion.div>

        <motion.div
          className="flex justify-center order-1 lg:order-2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.4,
          }}
        >
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <motion.div
                className={cn(
                  "relative cursor-pointer overflow-hidden rounded-2xl",
                  "border-4 border-[#b8860b] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.2)]",
                  "transition-all duration-500 ease-out",
                )}
                style={{ width: "280px", height: "350px" }}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.3)",
                  borderColor: "#d4af37",
                }}
                whileTap={{ scale: 0.98 }}
                onTouchStart={createRipple}
              >
                <Image
                  src={profileImage || "/placeholder.svg"}
                  alt={name}
                  fill
                  priority
                  sizes="(max-width: 768px) 280px, 350px"
                  className="object-cover transition-transform duration-700 ease-out profile-image"
                  style={{
                    transformOrigin: "center center",
                    transition: "transform 8s cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.1)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)"
                  }}
                />
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent",
                    "opacity-0 hover:opacity-100 transition-opacity duration-500",
                    "flex items-end justify-center pb-6",
                  )}
                >
                  <span className="text-white text-sm font-medium px-4 py-2 bg-black/30 backdrop-blur-sm rounded-full">
                    View gallery
                  </span>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#b8860b]/20 to-transparent rounded-bl-3xl" />
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-[#0f3460]/20 to-transparent rounded-tr-3xl" />
              </motion.div>
            </DialogTrigger>

            <DialogContent className="sm:max-w-4xl bg-white/90 backdrop-blur-md p-0 rounded-2xl overflow-hidden border border-[#b8860b]/30">
              <DialogTitle className="sr-only">Image Gallery</DialogTitle>
              <DialogDescription className="sr-only">View and navigate through the image gallery</DialogDescription>
              <div className="relative h-[80vh]">
                <motion.div
                  ref={imageRef}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  key={currentImageIndex}
                  className="h-full w-full"
                  style={{
                    transformOrigin: "center center",
                    transition: "transform 0.3s ease-out",
                    transform: isZoomed ? "scale(1.5)" : "scale(1)",
                  }}
                >
                  <Image
                    src={allImages[currentImageIndex] || "/placeholder.svg"}
                    alt={`Gallery image ${currentImageIndex + 1}`}
                    fill
                    priority={currentImageIndex === 0}
                    sizes="(max-width: 768px) 100vw, 80vw"
                    className="object-contain"
                    onClick={toggleZoom}
                  />
                </motion.div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 rounded-full bg-black/20 hover:bg-black/40 text-white"
                  onClick={closeDialog}
                  onTouchStart={createRipple}
                >
                  <X className="h-5 w-5" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 left-4 rounded-full bg-black/20 hover:bg-black/40 text-white"
                  onClick={toggleZoom}
                  onTouchStart={createRipple}
                >
                  <ZoomIn className="h-5 w-5" />
                </Button>

                <div className="absolute inset-x-0 bottom-8 flex justify-center gap-4">
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full bg-white/80 hover:bg-white border-[#b8860b]/20 hover:border-[#b8860b]/50"
                      onClick={prevImage}
                      onTouchStart={createRipple}
                    >
                      <ChevronLeft className="h-5 w-5 text-[#0f3460]" />
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full bg-white/80 hover:bg-white border-[#b8860b]/20 hover:border-[#b8860b]/50"
                      onClick={nextImage}
                      onTouchStart={createRipple}
                    >
                      <ChevronRight className="h-5 w-5 text-[#0f3460]" />
                    </Button>
                  </motion.div>
                </div>

                <div className="absolute bottom-8 right-8 bg-black/60 text-white px-3 py-1.5 rounded-full text-sm backdrop-blur-sm">
                  {currentImageIndex + 1} / {allImages.length}
                </div>

                {/* Touch instructions */}
                <div className="absolute bottom-20 inset-x-0 flex justify-center">
                  <div className="text-xs text-white bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    Tap image to zoom in/out
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
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

