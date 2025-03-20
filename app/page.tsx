"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import { biodata } from "@/lib/data"
import HeroSection from "@/components/hero-section"
import PersonalSection from "@/components/personal-section"
import FamilySection from "@/components/family-section"
import EducationSection from "@/components/education-section"
import ContactSection from "@/components/contact-section"
import FloatingNav from "@/components/floating-nav"
import MobileNav from "@/components/mobile-nav"
import { staggerContainer } from "@/lib/framer-animations"

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero")
  const mainRef = useRef<HTMLDivElement>(null)

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

  // Debug log to check if data is available
  useEffect(() => {
    console.log('Biodata loaded:', biodata)
  }, [])

  return (
    <div className="relative min-h-screen bg-white">
      <main ref={mainRef} className="w-full">
        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <FloatingNav activeSection={activeSection} />
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden fixed top-0 left-0 right-0 z-50">
          <MobileNav activeSection={activeSection} />
        </div>

        <motion.div
          className="space-y-20 pb-20"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {biodata ? (
            <>
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
            </>
          ) : (
            <div className="flex items-center justify-center min-h-screen">
              <p className="text-xl text-gray-600">Loading biodata...</p>
            </div>
          )}
        </motion.div>

        <footer className="py-8 text-center text-sm text-gray-500">
          <div className="container mx-auto px-4">
            <p>
              © {new Date().getFullYear()} {biodata?.name || 'Biodata'} | Designed with elegance
            </p>
          </div>
        </footer>
      </main>
    </div>
  )
}

