"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import { motion, useScroll, useTransform, useAnimation } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, MapPin, Mail, MessageSquare, Download, Instagram, FileText } from "lucide-react"
import type { ContactType } from "@/lib/data"
import { cn } from "@/lib/utils"
import { generatePDF, generateDOCX } from "@/lib/pdf-generator"
import { useTouchRipple } from "@/hooks/use-touch-gestures"
import { staggerContainer, revealVariants, cardVariants, childVariant } from "@/lib/framer-animations"

interface ContactSectionProps {
  contact: ContactType
}

export default function ContactSection({ contact }: ContactSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const { createRipple } = useTouchRipple()
  const controls = useAnimation()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"],
  })

  useEffect(() => {
    controls.start("visible")
  }, [controls])

  return (
    <section id="contact" ref={sectionRef} className="py-20 min-h-screen flex flex-col justify-center">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h2
            className={cn(
              "text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-center mb-12 sm:mb-16",
              "bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80",
            )}
            variants={revealVariants}
          >
            Get In Touch
          </motion.h2>

          <motion.div variants={cardVariants}>
            <Card
              className={cn(
                "border-secondary/30 bg-white/90",
                "shadow-[0_20px_80px_-15px_rgba(0,0,0,0.1)]",
                "overflow-hidden",
              )}
            >
              <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 pb-4">
                <CardTitle className="text-primary text-xl sm:text-2xl font-serif">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="pt-8 pb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <motion.div variants={childVariant}>
                      <ContactItem
                        icon={<MapPin className="h-5 w-5 text-primary" />}
                        label="Address"
                        value={contact.address}
                      />
                    </motion.div>

                    <motion.div variants={childVariant}>
                      <ContactItem
                        icon={<Mail className="h-5 w-5 text-primary" />}
                        label="Email"
                        value={contact.email}
                        isLink={true}
                        href={`mailto:${contact.email}`}
                      />
                    </motion.div>
                  </div>

                  <div className="space-y-6">
                    <motion.div variants={childVariant}>
                      <ContactItem
                        icon={<Phone className="h-5 w-5 text-primary" />}
                        label="Phone"
                        value={contact.phone}
                        isLink={true}
                        href={`tel:${contact.phone}`}
                      />
                    </motion.div>

                    <motion.div variants={childVariant}>
                      <ContactItem
                        icon={<Phone className="h-5 w-5 text-primary" />}
                        label="Father's Phone"
                        value={contact.fatherPhone}
                        isLink={true}
                        href={`tel:${contact.fatherPhone}`}
                      />
                    </motion.div>

                    <motion.div variants={childVariant} className="pt-4 space-y-4">
                      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="w-full">
                        <Button
                          className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white shadow-lg hover:shadow-xl transition-all duration-300"
                          onClick={() => window.open(contact.whatsapp, "_blank")}
                          onTouchStart={createRipple}
                        >
                          <MessageSquare className="mr-2 h-5 w-5" />
                          Chat on WhatsApp
                        </Button>
                      </motion.div>

                      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="w-full">
                        <Button
                          className="w-full bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] text-white shadow-lg hover:shadow-xl transition-all duration-300"
                          onClick={() => window.open(contact.instagram, "_blank")}
                          onTouchStart={createRipple}
                        >
                          <Instagram className="mr-2 h-5 w-5" />
                          Follow on Instagram
                        </Button>
                      </motion.div>

                      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="w-full">
                        <Button
                          variant="outline"
                          className="w-full border-primary text-primary hover:bg-primary hover:text-white shadow-lg hover:shadow-xl transition-all duration-300"
                          onClick={generatePDF}
                          onTouchStart={createRipple}
                        >
                          <Download className="mr-2 h-5 w-5" />
                          Download PDF
                        </Button>
                      </motion.div>

                      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="w-full">
                        <Button
                          variant="outline"
                          className="w-full border-secondary text-secondary hover:bg-secondary hover:text-white shadow-lg hover:shadow-xl transition-all duration-300"
                          onClick={generateDOCX}
                          onTouchStart={createRipple}
                        >
                          <FileText className="mr-2 h-5 w-5" />
                          Download Word (DOCX)
                        </Button>
                      </motion.div>
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
    </section>
  )
}

function ContactItem({
  icon,
  label,
  value,
  isLink = false,
  href = "",
}: {
  icon: React.ReactNode
  label: string
  value: string
  isLink?: boolean
  href?: string
}) {
  const { createRipple } = useTouchRipple()

  const content = (
    <motion.div className="flex items-start group" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
      <motion.div
        className="flex-shrink-0 mr-3 mt-0.5 bg-primary/10 p-2 rounded-full"
        whileHover={{ scale: 1.1, rotate: 5 }}
      >
        {icon}
      </motion.div>
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

  if (isLink) {
    return (
      <motion.a
        href={href}
        className="block hover:opacity-90 transition-opacity"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onTouchStart={createRipple}
      >
        {content}
      </motion.a>
    )
  }

  return content
}

