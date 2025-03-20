"use client"

import { useEffect, useState, useRef } from "react"
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion"
import { biodata } from "@/lib/data"
import HeroSection from "@/components/hero-section"
import PersonalSection from "@/components/personal-section"
import FamilySection from "@/components/family-section"
import EducationSection from "@/components/education-section"
import ContactSection from "@/components/contact-section"
import LoadingScreen from "@/components/loading-screen"
import FloatingNav from "@/components/floating-nav"
import MobileNav from "@/components/mobile-nav"
import { cn } from "@/lib/utils"
import { useSwipe } from "@/hooks/use-touch-gestures"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeSection, setActiveSection] = useState("hero")
  const mainRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: mainRef,
    offset: ["start start", "end end"],
  })

  // Background color transition based on scroll
  const backgroundColor = useTransform(scrollYProgress, [0, 0.8, 1], ["#ffffff", "#ffffff", "#f0f4ff"])

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

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
      { threshold: 0.3 }, // Reduced threshold for better mobile experience
    )

    const sections = document.querySelectorAll("section[id]")
    sections.forEach((section) => observer.observe(section))

    return () => {
      sections.forEach((section) => observer.unobserve(section))
    }
  }, [isLoading])

  // Fix for mobile scrolling issues
  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      // Prevent default only if needed for specific elements
      if ((e.target as Element).closest(".prevent-scroll")) {
        e.preventDefault()
      }
    }

    // Fix for iOS momentum scrolling issues
    document.addEventListener("touchmove", handleTouchMove, { passive: false })

    return () => {
      document.removeEventListener("touchmove", handleTouchMove)
    }
  }, [])

  // Additional fix for mobile scrolling issues
  useEffect(() => {
    // Force redraw on mobile devices to fix scrolling
    const handleResize = () => {
      if (window.innerWidth < 768) {
        document.body.style.display = "none"
        setTimeout(() => {
          document.body.style.display = ""
        }, 0)
      }
    }

    // Apply on initial load
    if (typeof window !== "undefined" && !isLoading) {
      setTimeout(handleResize, 100)
    }

    // Listen for orientation changes
    window.addEventListener("orientationchange", () => {
      setTimeout(handleResize, 100)
    })

    return () => {
      window.removeEventListener("orientationchange", handleResize)
    }
  }, [isLoading])

  // Handle swipe gestures for section navigation
  useSwipe({
    onSwipeUp: () => {
      const sections = ["hero", "personal", "family", "education", "contact"]
      const currentIndex = sections.indexOf(activeSection)
      if (currentIndex < sections.length - 1) {
        const nextSection = sections[currentIndex + 1]
        document.getElementById(nextSection)?.scrollIntoView({ behavior: "smooth" })
      }
    },
    onSwipeDown: () => {
      const sections = ["hero", "personal", "family", "education", "contact"]
      const currentIndex = sections.indexOf(activeSection)
      if (currentIndex > 0) {
        const prevSection = sections[currentIndex - 1]
        document.getElementById(prevSection)?.scrollIntoView({ behavior: "smooth" })
      }
    },
  })

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loading" />
        ) : (
          <motion.main
            ref={mainRef}
            className={cn("min-h-screen w-full overflow-x-hidden", "selection:bg-primary/20 selection:text-primary")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
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

            <footer className="py-8 text-center text-sm text-gray-500">
              <div className="container mx-auto px-4">
                <p>
                  © {new Date().getFullYear()} {biodata.name} | Designed with elegance
                </p>
              </div>
            </footer>
          </motion.main>
        )}
      </AnimatePresence>
    </>
  )
}

