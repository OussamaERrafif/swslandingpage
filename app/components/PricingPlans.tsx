"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Plan {
  name: string
  price: string
  description: string
  features: string[]
  highlighted?: boolean
}

const plans: Plan[] = [
  {
    name: "Starter",
    price: "$2,999",
    description: "Perfect for small projects and startups",
    features: [
      "Up to 5 pages",
      "Responsive design",
      "Basic SEO optimization",
      "Contact form",
      "2 weeks delivery",
      "Email support",
    ],
  },
  {
    name: "Professional",
    price: "$7,999",
    description: "Ideal for growing businesses",
    features: [
      "Up to 15 pages",
      "Advanced SEO",
      "E-commerce integration",
      "Analytics setup",
      "CMS integration",
      "4 weeks delivery",
      "Priority support",
      "Monthly maintenance",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For complex, large-scale projects",
    features: [
      "Unlimited pages",
      "Custom development",
      "API integrations",
      "Advanced security",
      "Performance optimization",
      "Custom timeline",
      "24/7 support",
      "Ongoing optimization",
    ],
  },
]

export default function PricingPlans({ isActive }: { isActive: boolean }) {
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
          <span className="text-sm font-semibold text-[#FF4D00] uppercase tracking-wider">Pricing</span>
        </motion.div>

        <motion.h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-16" variants={itemVariants}>
          Simple, Transparent Plans
        </motion.h2>

        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8" variants={containerVariants}>
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              className={`rounded-lg p-8 border transition-all ${
                plan.highlighted ? "border-[#FF4D00] bg-[#FF4D00]/10" : "border-neutral-700 bg-neutral-900/50"
              }`}
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-neutral-400 text-sm mb-6">{plan.description}</p>
              <div className="mb-8">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.price !== "Custom" && <span className="text-neutral-400 ml-2">one-time</span>}
              </div>
              <Button
                className={`w-full mb-8 ${
                  plan.highlighted
                    ? "bg-[#FF4D00] text-black hover:bg-[#FF4D00]/90"
                    : "bg-transparent border border-[#FF4D00] text-[#FF4D00] hover:bg-[#FF4D00] hover:text-black"
                }`}
              >
                Get Started
              </Button>
              <ul className="space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-[#FF4D00] flex-shrink-0" />
                    <span className="text-sm text-neutral-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
