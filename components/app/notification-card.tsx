"use client"

import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

interface NotificationCardProps {
  projectName: string
  message: string
  progress?: number
  timestamp?: string
}

export function NotificationCard({ 
  projectName, 
  message, 
  progress = 0,
  timestamp = "0:16" 
}: NotificationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="glass-card rounded-2xl p-4 max-w-sm mx-auto"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 rounded-md bg-foreground/10 flex items-center justify-center">
          <span className="text-xs font-bold">M</span>
        </div>
        <span className="text-xs text-muted-foreground">/</span>
        <span className="text-sm font-medium">{projectName}</span>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-secondary rounded-full mb-2 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full bg-primary rounded-full"
        />
      </div>

      {/* Timestamp */}
      <div className="text-xs text-muted-foreground mb-2">{timestamp}</div>

      {/* Message */}
      <div className="flex items-start gap-2">
        <Sparkles className="w-4 h-4 text-chart-4 flex-shrink-0 mt-0.5" />
        <p className="text-sm leading-relaxed">{message}</p>
      </div>
    </motion.div>
  )
}
