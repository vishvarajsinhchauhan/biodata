"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { FamilyType } from "@/lib/data"
import { motion } from "framer-motion"
import { cardVariants, staggerContainer, revealVariants } from "@/lib/framer-animations"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

interface FamilyDetailsProps {
  family: FamilyType
}

export default function FamilyDetails({ family }: FamilyDetailsProps) {
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
        Family Details
      </motion.h2>

      <motion.div variants={cardVariants}>
        <Card className="border-[#d4af37] bg-white/80 backdrop-blur-md shadow-xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-[#1e40af]/5 to-[#1e40af]/20 pb-2">
            <CardTitle className="text-[#1e40af] text-xl">Family Background</CardTitle>
          </CardHeader>
          <CardContent className="pt-8">
            <motion.div
              className="space-y-8"
              variants={staggerContainer}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <motion.div variants={revealVariants}>
                <FamilyMember relation="Father" name={family.father.name} occupation={family.father.occupation} />
              </motion.div>

              <motion.div variants={revealVariants}>
                <FamilyMember relation="Mother" name={family.mother.name} occupation={family.mother.occupation} />
              </motion.div>

              {family.siblings.map((sibling, index) => (
                <motion.div key={index} variants={revealVariants}>
                  <FamilyMember relation={sibling.relation} name={sibling.name} occupation={sibling.occupation || ""} />
                </motion.div>
              ))}
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute top-1/2 -translate-y-1/2 -right-20 w-40 h-40 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />
    </motion.section>
  )
}

function FamilyMember({ relation, name, occupation }: { relation: string; name: string; occupation: string }) {
  return (
    <motion.div
      className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-200 pb-6 last:border-0 last:pb-0 group"
      whileHover={{ x: 5, backgroundColor: "rgba(30, 64, 175, 0.03)" }}
      transition={{ duration: 0.2 }}
    >
      <div className="mb-2 md:mb-0">
        <h3 className="text-sm font-medium text-gray-500 group-hover:text-[#1e40af] transition-colors duration-300">
          {relation}
        </h3>
        <p className="text-base font-medium text-gray-900 group-hover:text-black transition-colors duration-300">
          {name}
        </p>
      </div>
      {occupation && (
        <motion.div
          className="bg-[#1e40af]/5 px-4 py-1.5 rounded-full text-sm text-[#1e40af] font-medium"
          whileHover={{ scale: 1.05, backgroundColor: "rgba(30, 64, 175, 0.1)" }}
        >
          {occupation}
        </motion.div>
      )}
    </motion.div>
  )
}

