"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"

export default function PriceEstimator({ isActive, onContactUs }: { isActive: boolean, onContactUs?: (message: string) => void }) {
  const [pages, setPages] = useState(5)
  const [features, setFeatures] = useState<string[]>(["responsive"])
  const [timeline, setTimeline] = useState("standard")

  const basePrice = 1000
  const pricePerPage = 300
  const featurePrices: Record<string, number> = {
    ecommerce: 2000,
    cms: 1500,
    api: 1200,
    seo: 800,
    analytics: 600,
  }
  const timelineMultiplier: Record<string, number> = {
    rush: 1.5,
    standard: 1,
    flexible: 0.85,
  }

  const featuresCost = features.reduce((sum, f) => sum + (featurePrices[f] || 0), 0)
  const estimatedPrice = Math.round((basePrice + pages * pricePerPage + featuresCost) * timelineMultiplier[timeline])

  const toggleFeature = (feature: string) => {
    setFeatures((prev) => (prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature]))
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
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={isActive ? "visible" : "hidden"}
        >
          {/* Left side - Title and description */}
          <motion.div variants={itemVariants} className="space-y-4 sm:space-y-6">
            <div>
              <span className="text-sm font-semibold text-[#FF4D00] uppercase tracking-wider">Estimator</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Get Your Price Estimate
            </h2>
            <p className="text-base sm:text-lg text-neutral-400 leading-relaxed">
              Use our interactive calculator to get a rough estimate for your web project. Adjust the parameters below to see how the price changes.
            </p>
          </motion.div>

          {/* Right side - Calculator */}
          <motion.div
            className="w-full"
            variants={itemVariants}
          >
            <div className="bg-neutral-900/50 border border-neutral-700 rounded-xl p-4 sm:p-6 md:p-8 shadow-2xl backdrop-blur-sm">
              <div className="space-y-5 sm:space-y-6">
                {/* Header Grid: Pages + Price */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  {/* Pages Slider */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-neutral-300">Number of Pages</Label>
                    <Slider
                      value={[pages]}
                      onValueChange={(value) => setPages(value[0])}
                      max={50}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-neutral-400">
                      <span>1 page</span>
                      <span className="font-semibold text-white">{pages} pages</span>
                      <span>50 pages</span>
                    </div>
                  </div>

                  {/* Estimated Price Display */}
                  <div className="flex flex-col justify-center items-center p-4 bg-neutral-800/50 rounded-lg border border-neutral-700">
                    <span className="text-sm text-neutral-400 mb-1">Estimated Price</span>
                    <span className="text-3xl font-bold text-[#FF4D00]">DH{estimatedPrice.toLocaleString()}</span>
                    <p className="text-xs text-neutral-500 mt-1">Starting price</p>
                  </div>
                </div>

                {/* Features and Timeline Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  {/* Features */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-neutral-300">Features</Label>
                    <div className="space-y-2">
                      {Object.entries(featurePrices).map(([feature, price]) => (
                        <div key={feature} className="flex items-center space-x-2">
                          <Checkbox
                            id={feature}
                            checked={features.includes(feature)}
                            onCheckedChange={() => toggleFeature(feature)}
                            className="data-[state=checked]:bg-[#FF4D00] data-[state=checked]:border-[#FF4D00]"
                          />
                          <Label
                            htmlFor={feature}
                            className="text-xs sm:text-sm text-neutral-300 cursor-pointer"
                          >
                            {feature}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-neutral-300">Timeline</Label>
                    <RadioGroup value={timeline} onValueChange={setTimeline} className="space-y-2">
                      {Object.entries(timelineMultiplier).map(([option, multiplier]) => (
                        <div key={option} className="flex items-center space-x-2">
                          <RadioGroupItem value={option} id={option} />
                          <Label
                            htmlFor={option}
                            className="text-xs sm:text-sm text-neutral-300 cursor-pointer flex-1"
                          >
                            <div className="flex justify-between items-center">
                              <span>{option}</span>
                              <span className={`text-xs font-medium ${
                                multiplier > 1 ? 'text-red-400' : multiplier < 1 ? 'text-green-400' : 'text-neutral-400'
                              }`}>
                                {multiplier > 1 ? '+' : ''}{((multiplier - 1) * 100).toFixed(0)}%
                              </span>
                            </div>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2 sm:pt-4">
                  <Button className="w-full sm:flex-1 bg-[#FF4D00] text-black hover:bg-[#FF4D00]/90 font-semibold">
                    Request Quote
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full sm:flex-1 border-neutral-600 hover:border-[#FF4D00] hover:text-[#FF4D00] font-semibold"
                    onClick={() => {
                      const message = `Hi! I used your price estimator and got an estimate of $${estimatedPrice.toLocaleString()} for a project with:\n\n- ${pages} pages\n- Features: ${features.join(', ') || 'None'}\n- Timeline: ${timeline}\n\nI'd like to discuss this project further.`
                      onContactUs?.(message)
                    }}
                  >
                    Contact Us
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
