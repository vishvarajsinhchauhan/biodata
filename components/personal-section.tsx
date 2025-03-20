"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useScroll, useTransform, useAnimation } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { PersonalDetailsType } from "@/lib/data"
import SectionDivider from "@/components/section-divider"
import { cn } from "@/lib/utils"
import { useEffect } from "react"

interface PersonalSectionProps {
  details: PersonalDetailsType
}

export default function PersonalSection({ details }: PersonalSectionProps) {
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
    <section id="personal" ref={sectionRef} className="py-20 min-h-screen flex flex-col justify-center relative">
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
            Personal Details
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
                              d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"
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
                              d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                            />
                          </svg>
                        }
                      />
                    </motion.div>
                  </div>

                  <div className="space-y-6 sm:space-y-8">
                    <motion.div variants={childVariant}>
                      <DetailItem
                        label="Education"
                        value={details.education}
                        icon={
                          <svg
                            className="w-5 h-5 text-primary"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M12 14l9-5-9-5-9 5 9 5z" />
                            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                            />
                          </svg>
                        }
                      />
                    </motion.div>

                    <motion.div variants={childVariant}>
                      <DetailItem
                        label="Current Status"
                        value={details.currentStatus}
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
                              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                            />
                          </svg>
                        }
                      />
                    </motion.div>

                    <motion.div variants={childVariant}>
                      <DetailItem
                        label="Caste"
                        value={details.caste}
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
                              d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                            />
                          </svg>
                        }
                      />
                    </motion.div>

                    <motion.div variants={childVariant}>
                      <DetailItem
                        label="Zodiac Sign"
                        value={details.zodiacSign}
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
                              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
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

