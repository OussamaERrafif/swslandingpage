import { Badge } from "../ui/badge"

export const sections = [
  {
    id: "hero",
    subtitle: (
      <Badge variant="outline" className="text-white border-white">
        Digital Agency
      </Badge>
    ),
    title: "Transform Your Ideas Into Digital Experiences",
    showButton: true,
    buttonText: "Get Started",
  },
  {
    id: "about",
    type: "about",
  },
  {
    id: "gallery",
    type: "gallery",
  },
  {
    id: "pricing",
    type: "pricing",
  },
  {
    id: "estimator",
    type: "estimator",
  },
  {
    id: "contact",
    type: "contact",
  },
  {
    id: "join",
    title: "Ready to Build Something Great?",
    content:
      "Let's discuss your project and explore how Sous Web Studio can help bring your digital vision to life. Contact us today to get started.",
    showButton: true,
    buttonText: "Contact Us",
  },
]
