"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { generatePDF } from "@/lib/pdf-generator"
import { motion } from "framer-motion"
import { hoverButton } from "@/lib/framer-animations"

export default function Header() {
  return (
    <motion.header
      className="flex justify-between items-center py-6 mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div className="flex items-center" whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
        <Image src="/placeholder.svg?height=40&width=40" alt="Ganesha Icon" width={40} height={40} className="mr-2" />
        <h2 className="text-lg font-semibold text-[#1e40af]">Vishvarajsinh Biodata</h2>
      </motion.div>
      <motion.div whileHover={hoverButton}>
        <Button
          onClick={generatePDF}
          variant="outline"
          className="border-[#1e40af] text-[#1e40af] hover:bg-[#1e40af] hover:text-white transition-all duration-300"
        >
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </Button>
      </motion.div>
    </motion.header>
  )
}

