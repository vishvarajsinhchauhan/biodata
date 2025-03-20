"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { biodata } from "@/lib/data"
import HeroSection from "@/components/hero-section"
import PersonalSection from "@/components/personal-section"
import FamilySection from "@/components/family-section"
import EducationSection from "@/components/education-section"
import ContactSection from "@/components/contact-section"
import FloatingNav from "@/components/floating-nav"
import MobileNav from "@/components/mobile-nav"
import { cn } from "@/lib/utils"

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero")
  const mainRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: mainRef,
    offset: ["start start", "end end"],
  })

  // Background color transition based on scroll
  const backgroundColor = useTransform(scrollYProgress, [0, 0.8, 1], ["#ffffff", "#ffffff", "#f0f4ff"])

  // Observer for active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3 },
    )

    const sections = document.querySelectorAll("section[id]")
    sections.forEach((section) => observer.observe(section))

    return () => {
      sections.forEach((section) => observer.unobserve(section))
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-white">
      <motion.main
        ref={mainRef}
        className="w-full overflow-x-hidden overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ backgroundColor }}
      >
        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <FloatingNav activeSection={activeSection} />
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <MobileNav activeSection={activeSection} />
        </div>

        <div className="space-y-20 pb-20">
          <HeroSection
            name={biodata.name}
            intro={biodata.intro}
            profileImage={biodata.profileImage}
            additionalImages={biodata.additionalImages}
          />

          <PersonalSection details={biodata.personalDetails} />

          <FamilySection family={biodata.family} />

          <EducationSection education={biodata.education} />

          <ContactSection contact={biodata.contact} />
        </div>

        <footer className="py-8 text-center text-sm text-gray-500">
          <div className="container mx-auto px-4">
            <p>
              © {new Date().getFullYear()} {biodata.name} | Designed with elegance
            </p>
          </div>
        </footer>
      </motion.main>
    </div>
  )
}

