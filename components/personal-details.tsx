"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { PersonalDetailsType } from "@/lib/data"
import { motion } from "framer-motion"
import { cardVariants, staggerContainer, revealVariants } from "@/lib/framer-animations"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

interface PersonalDetailsProps {
  details: PersonalDetailsType
}

export default function PersonalDetails({ details }: PersonalDetailsProps) {
  const { ref, isInView } = useScrollAnimation(0.2)

  return (
    <motion.section
      className="py-16 relative"
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
    >
      <motion.h2 className="text-3xl font-bold text-center mb-12 text-[#1e40af] font-serif" variants={revealVariants}>
        Personal Details
      </motion.h2>

      <motion.div variants={cardVariants}>
        <Card className="border-[#d4af37] bg-white/80 backdrop-blur-md shadow-xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-[#1e40af]/5 to-[#1e40af]/20 pb-2">
            <CardTitle className="text-[#1e40af] text-xl">About Me</CardTitle>
          </CardHeader>
          <CardContent className="pt-8">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              variants={staggerContainer}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <div className="space-y-6">
                <motion.div variants={revealVariants}>
                  <DetailItem label="Date of Birth" value={details.birthdate} />
                </motion.div>
                <motion.div variants={revealVariants}>
                  <DetailItem label="Birth Place" value={details.birthplace} />
                </motion.div>
                <motion.div variants={revealVariants}>
                  <DetailItem label="Height" value={details.height} />
                </motion.div>
                <motion.div variants={revealVariants}>
                  <DetailItem label="Weight" value={details.weight} />
                </motion.div>
              </div>

              <div className="space-y-6">
                <motion.div variants={revealVariants}>
                  <DetailItem label="Education" value={details.education} />
                </motion.div>
                <motion.div variants={revealVariants}>
                  <DetailItem label="Current Status" value={details.currentStatus} />
                </motion.div>
                <motion.div variants={revealVariants}>
                  <DetailItem label="Religion" value={details.religion} />
                </motion.div>
                <motion.div variants={revealVariants}>
                  <DetailItem label="Caste" value={details.caste} />
                </motion.div>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#1e40af]/10 rounded-full blur-3xl pointer-events-none" />
    </motion.section>
  )
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <motion.div className="group" whileHover={{ scale: 1.02, x: 5 }} transition={{ duration: 0.2 }}>
      <h3 className="text-sm font-medium text-gray-500 group-hover:text-[#1e40af] transition-colors duration-300">
        {label}
      </h3>
      <p className="text-base font-medium text-gray-900 group-hover:text-black transition-colors duration-300">
        {value}
      </p>
    </motion.div>
  )
}

