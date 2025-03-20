"use client"

import { useEffect, useState, useRef } from "react"
import { useInView } from "framer-motion"

export function useScrollAnimation(threshold = 0.2) {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: false, // Changed to false to allow re-animation when scrolling back
    amount: threshold,
    // Adding fallback for mobile devices
    fallback: true,
  })

  return { ref, isInView }
}

export function useParallax(speed = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Check if we're on a mobile device
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Reduce parallax effect on mobile for better performance
  const mobileAdjustedSpeed = isMobile ? speed * 0.3 : speed
  const y = scrollY * mobileAdjustedSpeed

  return { ref, y }
}

export function useStickySection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isSticky, setIsSticky] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(entry.intersectionRatio < 1)
      },
      { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] },
    )

    observer.observe(section)

    const handleScroll = () => {
      if (!section) return

      const rect = section.getBoundingClientRect()
      const sectionHeight = rect.height
      const viewportHeight = window.innerHeight

      // Calculate how far we've scrolled into the section
      const scrollIntoSection = viewportHeight - rect.top

      // Calculate progress (0 to 1)
      const calculatedProgress = Math.min(Math.max(scrollIntoSection / (sectionHeight + viewportHeight), 0), 1)

      setProgress(calculatedProgress)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      if (section) observer.unobserve(section)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return { sectionRef, isSticky, progress }
}

