"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import { motion, useScroll, useTransform, useAnimation } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { FamilyType } from "@/lib/data"
import SectionDivider from "@/components/section-divider"
import { cn } from "@/lib/utils"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

interface FamilySectionProps {
  family: FamilyType
}

export default function FamilySection({ family }: FamilySectionProps) {
  const { ref, isInView } = useScrollAnimation(0.2)
  const controls = useAnimation()

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  }

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  return (
    <section ref={ref} className="py-16">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl font-serif font-bold text-center mb-12"
          initial="hidden"
          animate={controls}
          variants={fadeInVariants}
        >
          Family Details
        </motion.h2>
        <motion.div
          initial="hidden"
          animate={controls}
          variants={fadeInVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          <motion.div variants={fadeInVariants}>
            <Card className="border-secondary/30 bg-white/80 backdrop-blur-md shadow-[0_20px_80px_-15px_rgba(0,0,0,0.1)]">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 pb-4">
                <CardTitle className="text-primary text-xl sm:text-2xl font-serif">Father</CardTitle>
              </CardHeader>
              <CardContent className="pt-8 pb-6">
                <div className="space-y-6">
                  <DetailItem
                    label="Name"
                    value={family.father.name}
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
                  <DetailItem
                    label="Occupation"
                    value={family.father.occupation}
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
                          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={fadeInVariants}>
            <Card className="border-secondary/30 bg-white/80 backdrop-blur-md shadow-[0_20px_80px_-15px_rgba(0,0,0,0.1)]">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 pb-4">
                <CardTitle className="text-primary text-xl sm:text-2xl font-serif">Mother</CardTitle>
              </CardHeader>
              <CardContent className="pt-8 pb-6">
                <div className="space-y-6">
                  <DetailItem
                    label="Name"
                    value={family.mother.name}
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
                  <DetailItem
                    label="Occupation"
                    value={family.mother.occupation}
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
                          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={fadeInVariants}>
            <Card className="border-secondary/30 bg-white/80 backdrop-blur-md shadow-[0_20px_80px_-15px_rgba(0,0,0,0.1)]">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 pb-4">
                <CardTitle className="text-primary text-xl sm:text-2xl font-serif">Sister</CardTitle>
              </CardHeader>
              <CardContent className="pt-8 pb-6">
                <div className="space-y-6">
                  <DetailItem
                    label="Name"
                    value={family.sister.name}
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
                  <DetailItem
                    label="Occupation"
                    value={family.sister.occupation}
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
                          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={fadeInVariants}>
            <Card className="border-secondary/30 bg-white/80 backdrop-blur-md shadow-[0_20px_80px_-15px_rgba(0,0,0,0.1)]">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 pb-4">
                <CardTitle className="text-primary text-xl sm:text-2xl font-serif">Brother</CardTitle>
              </CardHeader>
              <CardContent className="pt-8 pb-6">
                <div className="space-y-6">
                  <DetailItem
                    label="Name"
                    value={family.brother.name}
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
                  <DetailItem
                    label="Occupation"
                    value={family.brother.occupation}
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
                          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    }
                  />
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

