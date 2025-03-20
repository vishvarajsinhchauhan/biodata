"use client"

import { useRef, useEffect } from "react"
import { motion, useScroll, useTransform, useAnimation } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { EducationType } from "@/lib/data"
import SectionDivider from "@/components/section-divider"
import { cn } from "@/lib/utils"
import { GraduationCap, Award, Briefcase } from "lucide-react"

interface EducationSectionProps {
  education: EducationType[]
}

export default function EducationSection({ education }: EducationSectionProps) {
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
    <section id="education" ref={sectionRef} className="py-20 min-h-screen flex flex-col justify-center relative">
      <div className="container mx-auto px-4">
        <motion.div style={{ opacity, y, scale }} className="max-w-4xl mx-auto">
          <motion.h2
            className={cn(
              "text-4xl md:text-5xl font-serif font-bold text-center mb-16",
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
            Education & Career
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
                <CardTitle className="text-primary text-2xl font-serif">Academic & Professional Journey</CardTitle>
              </CardHeader>
              <CardContent className="pt-8 pb-6">
                <div className="space-y-8">
                  {education.map((item, index) => (
                    <motion.div key={index} variants={childVariant}>
                      <EducationItem
                        title={item.degree}
                        institution={item.institution}
                        year={item.year}
                        description={item.description}
                        type={item.type}
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
      <div className="absolute top-1/4 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-40 h-40 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="absolute bottom-12 left-0 right-0 flex justify-center">
        <SectionDivider />
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

