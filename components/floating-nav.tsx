"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { User, Users, GraduationCap, Phone, Home } from "lucide-react"

interface FloatingNavProps {
  activeSection: string
}

export default function FloatingNav({ activeSection }: FloatingNavProps) {
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
    }
  }

  return (
    <motion.div
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      <motion.div
        className="flex items-center bg-white/80 backdrop-blur-md rounded-full px-2 py-1.5 shadow-lg border border-gray-200"
        layout
      >
        {sections.map((section) => (
          <motion.button
            key={section.id}
            className={cn(
              "flex items-center justify-center rounded-full p-2 mx-1 transition-all duration-300",
              activeSection === section.id
                ? "bg-primary text-white"
                : "text-gray-500 hover:text-primary hover:bg-primary/10",
            )}
            onClick={() => scrollToSection(section.id)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {section.icon}
            {activeSection === section.id && (
              <motion.span
                className="ml-2 text-sm font-medium"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "auto", opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {section.label}
              </motion.span>
            )}
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  )
}

