"use client"

import { motion } from "framer-motion"

export default function AboutSection({ isActive }: { isActive: boolean }) {
  const items = [
    {
      title: "Why Sous Web Studio?",
      content:
        "We combine clean design, thoughtful strategy, and technical excellence to create digital experiences that inspire, engage, and convert. Your vision deserves precision and purpose.",
    },
    {
      title: "What We Offer",
      content:
        "Web design & development, branding & visual identity, e-commerce solutions, UI/UX design, SEO optimization, and ongoing support. Full-spectrum digital services tailored to your needs.",
    },
    {
      title: "Our Approach",
      content:
        "We work closely with clients to understand their vision. Through collaboration, creativity, and innovation, we deliver solutions that communicate value and drive growth.",
    },
  ]

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
    <section className="relative min-h-screen w-full snap-start flex flex-col justify-center px-4 py-12 sm:px-6 sm:py-16 md:px-12 md:py-20 lg:px-20 lg:py-24">
      <motion.div
        className="max-w-6xl mx-auto w-full"
        variants={containerVariants}
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
      >
        <motion.div className="mb-8 md:mb-16" variants={itemVariants}>
          <span className="text-sm font-semibold text-[#FF4D00] uppercase tracking-wider">About Us</span>
        </motion.div>

        <motion.h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8 md:mb-16" variants={itemVariants}>
          Our Studio
        </motion.h2>

        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12" variants={containerVariants}>
          {items.map((item, index) => (
            <motion.div key={index} className="flex flex-col" variants={itemVariants}>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 md:mb-4 text-white">{item.title}</h3>
              <p className="text-sm sm:text-base md:text-lg text-neutral-400 leading-relaxed">{item.content}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
