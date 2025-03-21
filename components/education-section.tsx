"use client"

import { useRef, useEffect } from "react"
import { motion, useScroll, useTransform, useAnimation } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { EducationType } from "@/lib/data"
import SectionDivider from "@/components/section-divider"
import { cn } from "@/lib/utils"
import { GraduationCap, Award, Briefcase } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { staggerContainer, revealVariants, cardVariants, childVariant } from "@/lib/framer-animations"

interface EducationSectionProps {
  education: EducationType[]
}

export default function EducationSection({ education }: EducationSectionProps) {
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
            Education Details
          </motion.h2>

          <motion.div variants={cardVariants}>
            <motion.div
              initial="hidden"
              animate={controls}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
            >
              {education.map((item, index) => (
                <motion.div key={index} variants={childVariant}>
                  <Card className="border-secondary/30 bg-white/80 backdrop-blur-md shadow-[0_20px_80px_-15px_rgba(0,0,0,0.1)]">
                    <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 pb-4">
                      <CardTitle className="text-primary text-xl sm:text-2xl font-serif">{item.degree}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-8 pb-6">
                      <div className="space-y-6">
                        <DetailItem
                          label="Institution"
                          value={item.institution}
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
                        <DetailItem
                          label="Duration"
                          value={item.duration}
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
                        <DetailItem
                          label="Grade"
                          value={item.grade}
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
                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                              />
                            </svg>
                          }
                        />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function EducationItem({
  title,
  institution,
  year,
  description,
  type,
}: {
  title: string
  institution: string
  year: string
  description: string
  type: "education" | "award" | "experience"
}) {
  const getIcon = () => {
    switch (type) {
      case "education":
        return <GraduationCap className="w-5 h-5 text-primary" />
      case "award":
        return <Award className="w-5 h-5 text-primary" />
      case "experience":
        return <Briefcase className="w-5 h-5 text-primary" />
      default:
        return <GraduationCap className="w-5 h-5 text-primary" />
    }
  }

  return (
    <motion.div
      className="group"
      whileHover={{ x: 5, backgroundColor: "rgba(30, 64, 175, 0.03)" }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 mt-1 bg-primary/10 p-2 rounded-full">{getIcon()}</div>

        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
            <h3 className="text-lg font-medium text-gray-900 group-hover:text-primary transition-colors duration-300">
              {title}
            </h3>
            <div className="bg-secondary/10 px-3 py-1 rounded-full text-sm text-secondary font-medium mt-1 md:mt-0 inline-block">
              {year}
            </div>
          </div>

          <p className="text-base text-gray-700 mb-2">{institution}</p>

          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </motion.div>
  )
}

