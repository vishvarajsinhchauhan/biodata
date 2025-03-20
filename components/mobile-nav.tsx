"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, User, Users, GraduationCap, Phone, Home, Download } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { generatePDF } from "@/lib/pdf-generator"
import { useTouchRipple } from "@/hooks/use-touch-gestures"

interface MobileNavProps {
  activeSection: string
}

export default function MobileNav({ activeSection }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { createRipple } = useTouchRipple()

  // Close menu when section changes
  useEffect(() => {
    setIsOpen(false)
  }, [activeSection])

  const sections = [
    { id: "hero", icon: <Home className="w-5 h-5" />, label: "Home" },
    { id: "personal", icon: <User className="w-5 h-5" />, label: "Personal" },
    { id: "family", icon: <Users className="w-5 h-5" />, label: "Family" },
    { id: "education", icon: <GraduationCap className="w-5 h-5" />, label: "Education" },
    { id: "contact", icon: <Phone className="w-5 h-5" />, label: "Contact" },
  ]

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsOpen(false)
    }
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <motion.button
        className={cn(
          "fixed top-4 right-4 z-50 p-2 rounded-full",
          "bg-white/80 backdrop-blur-md shadow-md border border-gray-200",
          "md:hidden",
        )}
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.9 }}
        onTouchStart={createRipple}
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-6 h-6 text-primary" /> : <Menu className="w-6 h-6 text-primary" />}
      </motion.button>

      {/* PDF Download Button */}
      <motion.button
        className={cn(
          "fixed top-4 left-4 z-50 p-2 rounded-full",
          "bg-white/80 backdrop-blur-md shadow-md border border-gray-200",
          "md:hidden",
        )}
        onClick={generatePDF}
        whileTap={{ scale: 0.9 }}
        onTouchStart={createRipple}
        aria-label="Download PDF"
      >
        <Download className="w-6 h-6 text-primary" />
      </motion.button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={cn(
              "fixed right-0 top-0 z-40 h-full w-3/4 max-w-xs",
              "bg-white/95 backdrop-blur-md shadow-xl",
              "flex flex-col md:hidden",
            )}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="p-6 flex flex-col space-y-6 mt-12">
              {sections.map((section) => (
                <motion.button
                  key={section.id}
                  className={cn(
                    "flex items-center space-x-3 p-3 rounded-lg relative overflow-hidden",
                    activeSection === section.id
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-gray-700 hover:bg-gray-100",
                  )}
                  onClick={() => scrollToSection(section.id)}
                  whileTap={{ scale: 0.98 }}
                  onTouchStart={createRipple}
                >
                  <div
                    className={cn("p-2 rounded-full", activeSection === section.id ? "bg-primary/20" : "bg-gray-100")}
                  >
                    {section.icon}
                  </div>
                  <span>{section.label}</span>

                  {activeSection === section.id && (
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 w-1 bg-primary"
                      layoutId="activeSection"
                      transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            <div className="mt-auto p-6">
              <Button className="w-full" onClick={generatePDF} onTouchStart={createRipple}>
                <Download className="mr-2 h-4 w-4" />
                Download Biodata PDF
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

