"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  showIcon?: boolean
  size?: "sm" | "md" | "lg"
}

export function Logo({ className, showIcon = true, size = "md" }: LogoProps) {
  const sizes = {
    sm: { icon: "w-6 h-6", text: "text-lg" },
    md: { icon: "w-8 h-8", text: "text-xl" },
    lg: { icon: "w-10 h-10", text: "text-2xl" },
  }

  return (
    <motion.div 
      className={cn("flex items-center gap-2", className)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {showIcon && (
        <div className={cn(
          "rounded-lg bg-primary/20 flex items-center justify-center",
          sizes[size].icon
        )}>
          <svg 
            viewBox="0 0 100 100" 
            className="w-5 h-5 text-primary"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {/* Tetrahedron shape */}
            <path d="M50 10 L90 80 L10 80 Z" />
            <path d="M50 10 L50 60" />
            <path d="M50 60 L10 80" />
            <path d="M50 60 L90 80" />
          </svg>
        </div>
      )}
      <span className={cn("font-bold tracking-tight", sizes[size].text)}>
        mstrmnd
      </span>
      <sup className="text-[8px] text-muted-foreground -top-2 relative">&reg;</sup>
    </motion.div>
  )
}
