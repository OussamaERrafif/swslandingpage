import type { ReactNode } from "react"

export interface Section {
  id: string
  title?: string
  subtitle?: ReactNode
  content?: string
  showButton?: boolean
  buttonText?: string
  type?: "default" | "about" | "gallery" | "pricing" | "estimator" | "contact"
}

export interface SectionProps extends Section {
  isActive: boolean
}
