"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { motion } from "framer-motion"
import { fadeUpVariants } from "@/lib/framer-animations"
import { useScrollAnimation, useParallax } from "@/hooks/use-scroll-animation"

interface HomeSectionProps {
  name: string
  intro: string
  profileImage: string
  additionalImages: string[]
}

export default function HomeSection({ name, intro, profileImage, additionalImages }: HomeSectionProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const allImages = [profileImage, ...additionalImages]
  const { ref, isInView } = useScrollAnimation(0.3)
  const { ref: imageRef, y } = useParallax(0.1)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length)
  }

  return (
    <section className="flex flex-col md:flex-row items-center justify-between py-16 gap-8 min-h-[80vh] relative overflow-hidden">
      <motion.div
        className="md:w-1/2 text-center md:text-left z-10"
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={fadeUpVariants}
      >
        <motion.h1
          className="text-5xl md:text-6xl font-bold mb-6 text-[#1e40af] font-serif tracking-tight"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {name}
        </motion.h1>
        <motion.p
          className="text-xl text-gray-700 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {intro}
        </motion.p>
      </motion.div>

      <motion.div className="md:w-1/2 flex justify-center z-10" ref={imageRef} style={{ y }}>
        <Dialog>
          <DialogTrigger asChild>
            <motion.div
              className="relative cursor-pointer group overflow-hidden rounded-lg border-4 border-[#d4af37] shadow-lg hover:shadow-xl transition-all duration-500"
              style={{ width: "280px", height: "350px" }}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                borderColor: "#f0c040",
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src={profileImage || "/placeholder.svg"}
                alt={name}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                <span className="text-white text-sm font-medium px-4 py-2 bg-black/30 backdrop-blur-sm rounded-full">
                  View gallery
                </span>
              </motion.div>
            </motion.div>
          </DialogTrigger>

          <DialogContent className="sm:max-w-3xl bg-white p-0 rounded-lg overflow-hidden">
            <div className="relative h-[70vh]">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                key={currentImageIndex}
                className="h-full w-full"
              >
                <Image
                  src={allImages[currentImageIndex] || "/placeholder.svg"}
                  alt={`Gallery image ${currentImageIndex + 1}`}
                  fill
                  className="object-contain"
                />
              </motion.div>

              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 rounded-full bg-black/20 hover:bg-black/40 text-white"
                onClick={() => document.querySelector("[data-dialog-close]")?.click()}
              >
                <X className="h-5 w-5" />
              </Button>

              <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full bg-white/80 hover:bg-white"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full bg-white/80 hover:bg-white"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </motion.div>
              </div>

              <div className="absolute bottom-4 right-4 bg-black/60 text-white px-2 py-1 rounded text-sm">
                {currentImageIndex + 1} / {allImages.length}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-blue-50 to-transparent opacity-70 pointer-events-none" />
    </section>
  )
}

