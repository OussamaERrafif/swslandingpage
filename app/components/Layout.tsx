import { ReactNode } from 'react'
import Image from 'next/image'
import { Squares } from "./ui/squares-background"

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="h-[100dvh] overflow-hidden bg-black relative">
      <div className="absolute inset-0 z-10">
        <Squares 
          direction="diagonal"
          speed={0.5}
          squareSize={40}
          borderColor="#333" 
          hoverFillColor="#222"
        />
      </div>
      
      {/* Logo/Icon in top-left corner */}
      <div className="fixed top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8 z-30">
        <Image 
          src="/icon.png" 
          alt="SWS Logo" 
          width={48} 
          height={48}
          className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain"
          priority
        />
      </div>
      
      <div className="relative z-20 h-full touch-pan-y">
        {children}
      </div>
    </div>
  )
}
