"use client"

import { motion } from "framer-motion"
import { useState } from "react"

interface WorkItem {
  id: string
  title: string
  category: string
  image: string
}

const workItems: WorkItem[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    category: "Web Development",
    image: "/modern-ecommerce-interface.png",
  },
  {
    id: "2",
    title: "Brand Identity",
    category: "Branding",
    image: "/modern-brand-identity.png",
  },
  {
    id: "3",
    title: "Mobile App Design",
    category: "UI/UX Design",
    image: "/mobile-app-ui.png",
  },
  {
    id: "4",
    title: "SaaS Dashboard",
    category: "Web Development",
    image: "/saas-dashboard-analytics-interface.jpg",
  },
  {
    id: "5",
    title: "Marketing Website",
    category: "Web Design",
    image: "/modern-marketing-website-design.jpg",
  },
  {
    id: "6",
    title: "Visual System",
    category: "Design System",
    image: "/design-system-components.png",
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
            <motion.div
              key={item.id}
              className="relative overflow-hidden rounded-lg cursor-pointer group"
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              variants={itemVariants}
            >
              <div className="relative h-64 md:h-72 overflow-hidden bg-neutral-900">
                <motion.img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  animate={hoveredId === item.id ? { scale: 1.1 } : { scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="absolute inset-0 bg-black/60 flex flex-col justify-end p-6"
                  initial={{ opacity: 0 }}
                  animate={hoveredId === item.id ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-neutral-300">{item.category}</p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
