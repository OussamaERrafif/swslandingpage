"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function ContactForm({ isActive, prefilledMessage }: { isActive: boolean, prefilledMessage?: string }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: prefilledMessage || "",
  })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (prefilledMessage) {
      setFormData(prev => ({ ...prev, message: prefilledMessage }))
    }
  }, [prefilledMessage])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setFormData({ name: "", email: "", company: "", message: "" })
      setSubmitted(false)
    }, 3000)
  }

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
    <section className="relative min-h-screen w-full snap-start py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isActive ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start"
        >
          {/* Left side - Title and description */}
          <motion.div variants={itemVariants} className="space-y-4 sm:space-y-6">
            <div>
              <span className="text-sm font-semibold text-[#FF4D00] uppercase tracking-wider">Contact</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Let's Talk About Your Project
            </h2>
            <p className="text-base sm:text-lg text-neutral-400 leading-relaxed">
              Ready to bring your digital vision to life? We'd love to hear about your project and discuss how we can help you achieve your goals.
            </p>
          </motion.div>

          {/* Right side - Contact Form */}
          <motion.div
            className="w-full max-w-2xl"
            variants={itemVariants}
          >
            {submitted ? (
              <motion.div
                className="bg-[#FF4D00]/10 border border-[#FF4D00] rounded-lg p-6 sm:p-8 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <h3 className="text-xl sm:text-2xl font-bold mb-2">Thank You!</h3>
                <p className="text-sm sm:text-base text-neutral-300">We'll get back to you within 24 hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-neutral-900/50 border border-neutral-700 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder-neutral-500 focus:outline-none focus:border-[#FF4D00] transition-colors"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-neutral-900/50 border border-neutral-700 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder-neutral-500 focus:outline-none focus:border-[#FF4D00] transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold mb-2">Company</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full bg-neutral-900/50 border border-neutral-700 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder-neutral-500 focus:outline-none focus:border-[#FF4D00] transition-colors"
                    placeholder="Your company"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full bg-neutral-900/50 border border-neutral-700 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder-neutral-500 focus:outline-none focus:border-[#FF4D00] transition-colors resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <Button className="w-full bg-[#FF4D00] text-black hover:bg-[#FF4D00]/90 py-2.5 sm:py-3 text-sm sm:text-base font-semibold">
                  Send Message
                </Button>
              </form>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
