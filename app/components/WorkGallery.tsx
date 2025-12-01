"use client"

import { motion } from "framer-motion"
import { useState } from "react"

interface WorkItem {
  id: string
  title: string
  category: string
  url: string
  description: string
}

const workItems: WorkItem[] = [
  {
    id: "1",
    title: "Hate2Love",
    category: "Blog Website",
    url: "https://hate2love.vercel.app/",
    description: "A modern blog platform with elegant design and smooth user experience",
  },
  {
    id: "2",
    title: "OmnivionAI",
    category: "AI Application",
    url: "https://omnivionai-landing-page.vercel.app/",
    description: "Cutting-edge AI application landing page with interactive features",
  },
  {
    id: "3",
    title: "SipStop",
    category: "Coffee Shop",
    url: "https://sipstop.vercel.app/",
    description: "Cozy coffee shop website with menu and ordering capabilities",
  },
  {
    id: "4",
    title: "Dentist Landing Page",
    category: "Healthcare Website",
    url: "https://dentistlandingpage.vercel.app/",
    description: "Professional dental practice website with appointment booking",
  },
  {
    id: "5",
    title: "Apex Resume",
    category: "Resume Builder",
    url: "https://www.apexresume.tech/",
    description: "Professional resume building platform with modern templates",
  },
]

export default function WorkGallery({ isActive }: { isActive: boolean }) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

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
    <section className="relative min-h-screen w-full snap-start flex flex-col justify-center px-6 py-16 md:px-12 md:py-20 lg:px-20 lg:py-24">
      <motion.div
        className="max-w-7xl mx-auto w-full"
        variants={containerVariants}
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
      >
        <motion.div className="mb-12" variants={itemVariants}>
          <span className="text-sm font-semibold text-[#FF4D00] uppercase tracking-wider">Our Work</span>
        </motion.div>

        <motion.h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-16" variants={itemVariants}>
          Featured Projects
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
        >
          {workItems.map((item) => (
            <motion.a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden rounded-lg cursor-pointer group block"
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              variants={itemVariants}
            >
              <div className="relative h-64 md:h-72 overflow-hidden bg-gradient-to-br from-neutral-900 to-neutral-800 flex flex-col justify-end p-6">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[#FF4D00]/20 to-orange-500/10"
                  animate={hoveredId === item.id ? { opacity: 1 } : { opacity: 0.3 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="relative z-10">
                  <motion.h3 
                    className="text-xl font-bold text-white mb-2"
                    animate={hoveredId === item.id ? { y: -5 } : { y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.title}
                  </motion.h3>
                  <p className="text-sm text-[#FF4D00] font-semibold mb-2">{item.category}</p>
                  <motion.p 
                    className="text-sm text-neutral-300"
                    initial={{ opacity: 0, height: 0 }}
                    animate={hoveredId === item.id ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.description}
                  </motion.p>
                  <motion.div
                    className="mt-3 flex items-center gap-2 text-white text-sm"
                    initial={{ opacity: 0 }}
                    animate={hoveredId === item.id ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span>View Project</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </motion.div>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
