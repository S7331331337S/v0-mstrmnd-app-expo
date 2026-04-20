"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Plus, Mic, Camera, Image as ImageIcon, ChartLine, Sparkles } from "lucide-react"
import { useState } from "react"

const suggestions = [
  { icon: Sparkles, label: "Nano Banana playground", color: "text-chart-4" },
  { icon: ChartLine, label: "Finance dashboard", color: "text-chart-1" },
]

export function FloatingInput() {
  const [isFocused, setIsFocused] = useState(false)
  const [value, setValue] = useState("")

  return (
    <div className="fixed bottom-20 md:bottom-6 left-0 right-0 px-4 z-40">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="max-w-lg mx-auto"
      >
        {/* Suggestions - shown when focused and empty */}
        <AnimatePresence>
          {isFocused && !value && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="flex items-center gap-2 mb-3 overflow-x-auto pb-2 scrollbar-hide"
            >
              {suggestions.map((suggestion, index) => (
                <motion.button
                  key={suggestion.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2.5 bg-secondary/80 backdrop-blur-xl rounded-full whitespace-nowrap border border-border/50"
                  onClick={() => setValue(suggestion.label)}
                >
                  <suggestion.icon className={`w-4 h-4 ${suggestion.color}`} />
                  <span className="text-sm">{suggestion.label}</span>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input Container */}
        <motion.div
          className={`flex items-center gap-2 p-2 rounded-2xl transition-all duration-200 ${
            isFocused
              ? "bg-secondary/95 backdrop-blur-xl shadow-2xl shadow-black/50 border border-border/50"
              : "bg-secondary/80 backdrop-blur-xl border border-border/30"
          }`}
        >
          {/* Plus button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-muted/50 hover:bg-muted transition-colors flex-shrink-0"
          >
            <Plus className="w-5 h-5" />
          </motion.button>

          {/* Input field */}
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Ask MSTRMND to build..."
            className="flex-1 bg-transparent py-2 px-1 text-sm outline-none placeholder:text-muted-foreground min-w-0"
          />

          {/* Voice button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary/20 hover:bg-primary/30 transition-colors flex-shrink-0"
          >
            <Mic className="w-5 h-5 text-primary" />
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  )
}
