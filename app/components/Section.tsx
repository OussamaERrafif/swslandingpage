"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import type { SectionProps } from "../types"

export default function Section({ id, title, subtitle, content, isActive, showButton, buttonText }: SectionProps) {
  const containerVariants = {
    hidden: { opacity: 0.3 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section
      id={id}
      className="relative min-h-screen w-full snap-start flex flex-col justify-center px-4 py-12 sm:px-6 sm:py-16 md:px-12 md:py-20 lg:px-20 lg:py-24"
    >
      <motion.div
        className="max-w-4xl mx-auto w-full"
        variants={containerVariants}
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
      >
        {subtitle && (
          <motion.div className="mb-8 md:mb-12" variants={itemVariants}>
            {subtitle}
          </motion.div>
        )}
        <motion.h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 md:mb-8" variants={itemVariants}>
          {title}
        </motion.h2>
        {content && (
          <motion.p className="text-base sm:text-lg md:text-xl text-neutral-400 leading-relaxed mb-6 md:mb-8" variants={itemVariants}>
            {content}
          </motion.p>
        )}
        {showButton && (
          <motion.div variants={itemVariants}>
            <Button
              variant="outline"
              size="lg"
              className="text-[#FF4D00] bg-transparent border-[#FF4D00] hover:bg-[#FF4D00] hover:text-black transition-colors w-full sm:w-auto"
            >
              {buttonText}
            </Button>
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}
