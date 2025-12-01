"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Globe, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TeamMember {
  name: string
  role: string
  description: string
  skills: string[]
  portfolio?: string
  linkedin?: string
  github?: string
  email?: string
  highlighted?: boolean
}

const teamMembers: TeamMember[] = [
  {
    name: "Oussama Errafif",
    role: "Full Stack Developer",
    description: "Passionate about creating elegant web solutions",
    skills: [
      "React & Next.js",
      "TypeScript",
      "Node.js",
      "UI/UX Design",
      "Database Design",
      "API Development",
    ],
    portfolio: "https://portfolio1-mu-sepia.vercel.app/",
    highlighted: true,
  },
  {
    name: "Youssef Sina",
    role: "Creative Developer",
    description: "Crafting innovative digital experiences",
    skills: [
      "Frontend Development",
      "JavaScript/TypeScript",
      "Modern Frameworks",
      "Responsive Design",
      "Performance Optimization",
      "Web Animation",
    ],
    portfolio: "https://www.youssefsina.me/",
  },
  {
    name: "Oussama Sina",
    role: "Software Engineer",
    description: "Building scalable and robust applications",
    skills: [
      "Software Architecture",
      "Backend Development",
      "Problem Solving",
      "System Design",
      "Code Quality",
      "Team Collaboration",
    ],
    linkedin: "https://www.linkedin.com/in/oussama-sina/",
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
    <section className="relative min-h-screen w-full snap-start flex flex-col justify-center px-4 py-12 sm:px-6 sm:py-16 md:px-12 md:py-20 lg:px-20 lg:py-24">
      <motion.div
        className="max-w-7xl mx-auto w-full"
        variants={containerVariants}
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
      >
        <motion.div className="mb-8 md:mb-12" variants={itemVariants}>
          <span className="text-sm font-semibold text-[#FF4D00] uppercase tracking-wider">Our Team</span>
        </motion.div>

        <motion.h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8 md:mb-16" variants={itemVariants}>
          Meet the Team
        </motion.h2>

        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8" variants={containerVariants}>
          {teamMembers.map((member) => (
            <motion.div
              key={member.name}
              className={`rounded-lg p-5 sm:p-6 md:p-8 border transition-all ${
                member.highlighted ? "border-[#FF4D00] bg-[#FF4D00]/10" : "border-neutral-700 bg-neutral-900/50"
              }`}
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="mb-5 sm:mb-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#FF4D00] to-orange-600 flex items-center justify-center mb-3 sm:mb-4">
                  <span className="text-2xl sm:text-3xl font-bold text-white">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2">{member.name}</h3>
                <p className="text-[#FF4D00] font-semibold text-xs sm:text-sm mb-2 sm:mb-3">{member.role}</p>
                <p className="text-neutral-400 text-xs sm:text-sm mb-4 sm:mb-6">{member.description}</p>
              </div>

              <div className="flex gap-2 sm:gap-3 mb-6 sm:mb-8">
                {member.portfolio && (
                  <a
                    href={member.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-neutral-800 hover:bg-[#FF4D00] transition-colors"
                    aria-label="Portfolio"
                  >
                    <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                )}
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-neutral-800 hover:bg-[#FF4D00] transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                )}
                {member.github && (
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-neutral-800 hover:bg-[#FF4D00] transition-colors"
                    aria-label="GitHub"
                  >
                    <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                )}
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="p-2 rounded-lg bg-neutral-800 hover:bg-[#FF4D00] transition-colors"
                    aria-label="Email"
                  >
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                )}
              </div>

              <div className="space-y-2 sm:space-y-3">
                <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Skills</p>
                <ul className="space-y-1.5 sm:space-y-2">
                  {member.skills.map((skill) => (
                    <li key={skill} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#FF4D00] flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-neutral-300">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
