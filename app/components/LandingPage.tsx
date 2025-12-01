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
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const scrollTop = container.scrollTop
      const scrollHeight = container.scrollHeight - container.clientHeight
      const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0
      setScrollProgress(progress)
    }

    const observerOptions = {
      root: container,
      threshold: 0.2, // Lower threshold for better mobile detection
    }

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = sectionRefs.current.indexOf(entry.target as HTMLDivElement)
          if (index !== -1) {
            setActiveSection(index)
          }
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)
    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    container.addEventListener("scroll", handleScroll, { passive: true })
    
    return () => {
      container.removeEventListener("scroll", handleScroll)
      observer.disconnect()
    }
  }, [])

  const handleNavClick = (index: number) => {
    const section = sectionRefs.current[index]
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
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
        return <Section key={section.id} {...(section as any)} isActive={isActive} />
    }
  }

  return (
    <Layout>
      {/* Navigation dots - Hidden on mobile */}
      <nav className="hidden md:flex fixed top-0 right-0 h-screen flex-col justify-center z-30 p-4">
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
      <div ref={containerRef} className="h-full overflow-y-auto md:snap-y md:snap-mandatory scroll-smooth">
        {sections.map((section, index) => (
          <div
            key={section.id}
            ref={(el) => {
              sectionRefs.current[index] = el
            }}
            className="w-full md:snap-start"
          >
            {renderSection(section, index, index === activeSection)}
          </div>
        ))}
      </div>
    </Layout>
  )
}
