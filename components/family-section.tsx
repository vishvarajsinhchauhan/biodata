"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import { motion, useScroll, useTransform, useAnimation } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { FamilyType } from "@/lib/data"
import SectionDivider from "@/components/section-divider"
import { cn } from "@/lib/utils"

interface FamilySectionProps {
  family: FamilyType
}

export default function FamilySection({ family }: FamilySectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const controls = useAnimation()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, 100])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])

  // Start animations when section comes into view
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const isInView = rect.top < window.innerHeight && rect.bottom > 0

      if (isInView) {
        controls.start("visible")
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Check on mount

    return () => window.removeEventListener("scroll", handleScroll)
  }, [controls])

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const childVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <section id="family" ref={sectionRef} className="py-20 min-h-screen flex flex-col justify-center relative">
      <div className="container mx-auto px-4">
        <motion.div style={{ opacity, y, scale }} className="max-w-4xl mx-auto">
          <motion.h2
            className={cn(
              "text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-center mb-12 sm:mb-16",
              "bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80",
            )}
            initial={{ opacity: 0, y: 30 }}
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            Family Background
          </motion.h2>

          <motion.div initial="hidden" animate={controls} variants={staggerChildren}>
            <Card
              className={cn(
                "border-secondary/30 bg-white/80 backdrop-blur-md",
                "shadow-[0_20px_80px_-15px_rgba(0,0,0,0.1)]",
                "overflow-hidden",
              )}
            >
              <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 pb-4">
                <CardTitle className="text-primary text-xl sm:text-2xl font-serif">Family Members</CardTitle>
              </CardHeader>
              <CardContent className="pt-8 pb-6">
                <div className="space-y-8">
                  <motion.div variants={childVariant}>
                    <FamilyMember
                      relation="Father"
                      name={family.father.name}
                      occupation={family.father.occupation}
                      icon={
                        <svg
                          className="w-5 h-5 text-primary"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      }
                    />
                  </motion.div>

                  <motion.div variants={childVariant}>
                    <FamilyMember
                      relation="Mother"
                      name={family.mother.name}
                      occupation={family.mother.occupation}
                      icon={
                        <svg
                          className="w-5 h-5 text-primary"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      }
                    />
                  </motion.div>

                  {family.siblings.map((sibling, index) => (
                    <motion.div key={index} variants={childVariant}>
                      <FamilyMember
                        relation={sibling.relation}
                        name={sibling.name}
                        occupation={sibling.occupation || ""}
                        icon={
                          <svg
                            className="w-5 h-5 text-primary"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                            />
                          </svg>
                        }
                      />
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/3 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 -left-20 w-40 h-40 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="absolute bottom-12 left-0 right-0 flex justify-center">
        <SectionDivider />
      </div>
    </section>
  )
}

function FamilyMember({
  relation,
  name,
  occupation,
  icon,
}: {
  relation: string
  name: string
  occupation: string
  icon: React.ReactNode
}) {
  return (
    <motion.div
      className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-200 pb-6 last:border-0 last:pb-0 group"
      whileHover={{ x: 5, backgroundColor: "rgba(30, 64, 175, 0.03)" }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center mb-2 sm:mb-0">
        <div className="flex-shrink-0 mr-3 bg-primary/10 p-2 rounded-full">{icon}</div>
        <div>
          <h3 className="text-sm font-medium text-gray-500 group-hover:text-primary transition-colors duration-300">
            {relation}
          </h3>
          <p className="text-base font-medium text-gray-900 group-hover:text-black transition-colors duration-300">
            {name}
          </p>
        </div>
      </div>
      {occupation && (
        <motion.div
          className="bg-primary/5 px-4 py-1.5 rounded-full text-sm text-primary font-medium mt-2 sm:mt-0 inline-block sm:inline"
          whileHover={{ scale: 1.05, backgroundColor: "rgba(30, 64, 175, 0.1)" }}
        >
          {occupation}
        </motion.div>
      )}
    </motion.div>
  )
}

