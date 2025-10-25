"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import Section from "./Section"
import Layout from "./Layout"
import AboutSection from "./AboutSection"
import WorkGallery from "./WorkGallery"
import PricingPlans from "./PricingPlans"
import PriceEstimator from "./PriceEstimator"
import ContactForm from "./ContactForm"
import { sections } from "./constants/sections"

export default function LandingPage() {
  const [activeSection, setActiveSection] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [contactMessage, setContactMessage] = useState("")
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const scrollTop = container.scrollTop
      const windowHeight = window.innerHeight
      const newActiveSection = Math.floor(scrollTop / windowHeight)
      setActiveSection(newActiveSection)

      // Calculate scroll progress for progress bar
      const scrollHeight = container.scrollHeight - windowHeight
      const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0
      setScrollProgress(progress)
    }

    container.addEventListener("scroll", handleScroll, { passive: true })
    return () => container.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = (index: number) => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: index * window.innerHeight,
        behavior: "smooth",
      })
    }
  }

  const handleContactNavigation = (message: string) => {
    setContactMessage(message)
    // Find contact section index
    const contactIndex = sections.findIndex(section => section.id === 'contact')
    if (contactIndex !== -1) {
      handleNavClick(contactIndex)
    }
  }

  const renderSection = (section: (typeof sections)[0], index: number, isActive: boolean) => {
    switch (section.type) {
      case "about":
        return <AboutSection key={section.id} isActive={isActive} />
      case "gallery":
        return <WorkGallery key={section.id} isActive={isActive} />
      case "pricing":
        return <PricingPlans key={section.id} isActive={isActive} />
      case "estimator":
        return <PriceEstimator key={section.id} isActive={isActive} onContactUs={handleContactNavigation} />
      case "contact":
        return <ContactForm key={section.id} isActive={isActive} prefilledMessage={contactMessage} />
      default:
        return <Section key={section.id} {...section} isActive={isActive} />
    }
  }

  return (
    <Layout>
      {/* Navigation dots */}
      <nav className="fixed top-0 right-0 h-screen flex flex-col justify-center z-30 p-4">
        {sections.map((section, index) => (
          <button
            key={section.id}
            className={`w-3 h-3 rounded-full my-2 transition-all duration-300 ${
              index === activeSection ? "bg-white scale-150" : "bg-gray-600 hover:bg-gray-400"
            }`}
            onClick={() => handleNavClick(index)}
            aria-label={`Go to section ${index + 1}`}
          />
        ))}
      </nav>

      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#FF4D00] to-orange-400 origin-left z-30"
        style={{ scaleX: scrollProgress }}
      />

      {/* Main scroll container */}
      <div ref={containerRef} className="h-full overflow-y-auto snap-y snap-mandatory scroll-smooth">
        {sections.map((section, index) => renderSection(section, index, index === activeSection))}
      </div>
    </Layout>
  )
}
