"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useScroll, useTransform, useAnimation } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { PersonalDetailsType } from "@/lib/data"
import SectionDivider from "@/components/section-divider"
import { cn } from "@/lib/utils"
import { useEffect } from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { staggerContainer, revealVariants, cardVariants, childVariant } from "@/lib/framer-animations"

interface PersonalSectionProps {
  details: PersonalDetailsType
}

export default function PersonalSection({ details }: PersonalSectionProps) {
  const { ref, isInView } = useScrollAnimation(0.2)
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  return (
    <section ref={ref} className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.h2 className="text-3xl font-serif font-bold text-center mb-12" variants={revealVariants}>
            Personal Details
          </motion.h2>

          <motion.div variants={cardVariants}>
            <motion.div
              initial="hidden"
              animate={controls}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
            >
              <Card
                className={cn(
                  "border-secondary/30 bg-white/80 backdrop-blur-md",
                  "shadow-[0_20px_80px_-15px_rgba(0,0,0,0.1)]",
                  "overflow-hidden",
                )}
              >
                <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 pb-4">
                  <CardTitle className="text-primary text-xl sm:text-2xl font-serif">About Me</CardTitle>
                </CardHeader>
                <CardContent className="pt-8 pb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                    <div className="space-y-6 sm:space-y-8">
                      <motion.div variants={childVariant}>
                        <DetailItem
                          label="Date of Birth"
                          value={details.birthdate}
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
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                          }
                        />
                      </motion.div>

                      <motion.div variants={childVariant}>
                        <DetailItem
                          label="Birth Place"
                          value={details.birthplace}
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
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                          }
                        />
                      </motion.div>

                      <motion.div variants={childVariant}>
                        <DetailItem
                          label="Gender"
                          value={details.gender}
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
                        <DetailItem
                          label="Marital Status"
                          value={details.maritalStatus}
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
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                              />
                            </svg>
                          }
                        />
                      </motion.div>
                    </div>

                    <div className="space-y-6 sm:space-y-8">
                      <motion.div variants={childVariant}>
                        <DetailItem
                          label="Height"
                          value={details.height}
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
                                d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                              />
                            </svg>
                          }
                        />
                      </motion.div>

                      <motion.div variants={childVariant}>
                        <DetailItem
                          label="Weight"
                          value={details.weight}
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
                                d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                              />
                            </svg>
                          }
                        />
                      </motion.div>

                      <motion.div variants={childVariant}>
                        <DetailItem
                          label="Blood Group"
                          value={details.bloodGroup}
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
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                              />
                            </svg>
                          }
                        />
                      </motion.div>

                      <motion.div variants={childVariant}>
                        <DetailItem
                          label="Religion"
                          value={details.religion}
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
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          }
                        />
                      </motion.div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 -left-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-40 h-40 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="absolute bottom-12 left-0 right-0 flex justify-center">
        <SectionDivider />
      </div>
    </section>
  )
}

function DetailItem({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <motion.div className="group flex items-start space-x-3" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
      <div className="flex-shrink-0 mt-1 bg-primary/10 p-2 rounded-full">{icon}</div>
      <div>
        <h3 className="text-sm font-medium text-gray-500 group-hover:text-primary transition-colors duration-300">
          {label}
        </h3>
        <p className="text-base font-medium text-gray-900 group-hover:text-black transition-colors duration-300">
          {value}
        </p>
      </div>
    </motion.div>
  )
}

