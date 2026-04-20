"use client"

import { motion } from "framer-motion"
import { Camera, Undo2, ArrowDownToLine, MoreHorizontal, Share, Clock, MessageSquare } from "lucide-react"
import { useState } from "react"

const styles = ["Minimalist", "Art Deco", "Cyberpunk", "Brutalist", "Glassmorphism"]

export function CaptureInterface() {
  const [selectedStyle, setSelectedStyle] = useState("Art Deco")
  const [version, setVersion] = useState(1)

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-secondary flex items-center justify-center">
          <span className="text-lg">🧪</span>
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary/60"
          >
            <Undo2 className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary/60"
          >
            <ArrowDownToLine className="w-5 h-5" />
          </motion.button>
        </div>
        <span className="text-xs text-muted-foreground">Open in v0</span>
      </div>

      {/* Main capture area */}
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        {/* Swipe hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="px-4 py-2 rounded-full bg-secondary/40 backdrop-blur-sm mb-8"
        >
          <span className="text-xs text-muted-foreground flex items-center gap-2">
            <span>←</span>
            swipe & capture
            <span>→</span>
          </span>
        </motion.div>

        {/* Camera button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-20 h-20 rounded-full bg-secondary/60 border-2 border-muted-foreground/30 flex items-center justify-center mb-8"
        >
          <Camera className="w-8 h-8" />
        </motion.button>

        {/* Style selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-hide max-w-full px-2">
          {styles.map((style) => (
            <motion.button
              key={style}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedStyle(style)}
              className={`px-4 py-2 rounded-full whitespace-nowrap text-sm transition-colors ${
                selectedStyle === style
                  ? "bg-secondary border border-border/50"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {style}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Bottom toolbar */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-border/30">
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="w-10 h-10 flex items-center justify-center"
        >
          <MessageSquare className="w-5 h-5 text-muted-foreground" />
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/60"
        >
          <Clock className="w-4 h-4" />
          <span className="text-sm">v{version}</span>
        </motion.button>

        <div className="flex items-center gap-2">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 flex items-center justify-center"
          >
            <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 flex items-center justify-center"
          >
            <Share className="w-5 h-5 text-muted-foreground" />
          </motion.button>
        </div>
      </div>
    </div>
  )
}
