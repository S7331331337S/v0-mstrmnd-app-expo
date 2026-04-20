"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Search, Sparkles, ChevronRight, Play, Plus, Mic, ArrowDown } from "lucide-react"
import { useState } from "react"

interface Message {
  id: number
  type: "user" | "assistant"
  content: string
  thinking?: string
  actions?: { label: string; icon?: typeof Search }[]
  version?: { number: number; label: string }
  avatar?: string
}

const sampleMessages: Message[] = [
  {
    id: 1,
    type: "user",
    content: "Build an AI image generator using gemini-2.5-flash-image",
    avatar: "M"
  },
  {
    id: 2,
    type: "assistant",
    content: "I'll help you build an AI image generator using gemini-2.5-flash-image! Let me first gather the necessary context and create a compelling design for your app.",
    thinking: "Thought for 3s",
    actions: [
      { label: "Searched AI SDK examples", icon: Search },
      { label: "Generated design inspiration", icon: Sparkles },
      { label: "Understood codebase", icon: Search },
    ],
  },
  {
    id: 3,
    type: "assistant",
    content: "I'll build an AI image generator using gemini-2.5-flash-image with a sleek, modern design inspired by these AI platforms. Let me create the app for you.",
    version: { number: 1, label: "Built AI image generator" }
  },
  {
    id: 4,
    type: "assistant",
    content: "I've built a sleek AI image generator using gemini-2.5-flash-image with a modern dark theme inspired by the AI platforms you shared. The app features a clean interface with a gradient purple accent color, a prominent text input for prompts, and displays generated images with download functionality. The design uses subtle glow effects and smooth animations for a premium feel."
  }
]

export function ChatInterface() {
  const [messages] = useState<Message[]>(sampleMessages)

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/30">
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="w-10 h-10 flex items-center justify-center"
        >
          <div className="w-5 h-0.5 bg-foreground" />
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="w-10 h-10 flex items-center justify-center"
        >
          <Play className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {message.type === "user" ? (
                <div className="flex justify-end">
                  <div className="flex items-start gap-2 max-w-[85%]">
                    <div className="bg-secondary/80 rounded-2xl rounded-tr-md px-4 py-3">
                      <p className="text-sm">{message.content}</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-chart-4 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-white">{message.avatar}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {/* Thinking indicator */}
                  {message.thinking && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-2 text-muted-foreground"
                    >
                      <Sparkles className="w-4 h-4 text-chart-4" />
                      <span className="text-sm">{message.thinking}</span>
                      <ChevronRight className="w-4 h-4" />
                    </motion.div>
                  )}

                  {/* Message content */}
                  <p className="text-sm leading-relaxed">{message.content}</p>

                  {/* Actions */}
                  {message.actions && (
                    <div className="space-y-2">
                      {message.actions.map((action, i) => (
                        <motion.button
                          key={action.label}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex items-center gap-2 text-sm text-chart-4 hover:text-chart-4/80"
                        >
                          {action.icon && <action.icon className="w-4 h-4" />}
                          <span>{action.label}</span>
                          <ChevronRight className="w-4 h-4" />
                        </motion.button>
                      ))}
                    </div>
                  )}

                  {/* Version indicator */}
                  {message.version && (
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl bg-secondary/60 w-full"
                    >
                      <span className="text-sm text-muted-foreground">v{message.version.number}</span>
                      <span className="flex-1 text-sm text-left">{message.version.label}</span>
                      <Play className="w-4 h-4 text-muted-foreground" />
                    </motion.button>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center pt-4"
        >
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="w-8 h-8 rounded-full bg-secondary/60 flex items-center justify-center"
          >
            <ArrowDown className="w-4 h-4 text-muted-foreground" />
          </motion.button>
        </motion.div>
      </div>

      {/* Input */}
      <div className="px-4 py-4 border-t border-border/30">
        <div className="flex items-center gap-2">
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-secondary/60"
          >
            <Plus className="w-5 h-5" />
          </motion.button>
          <div className="flex-1 flex items-center bg-secondary/60 rounded-xl px-4 py-2.5">
            <input
              type="text"
              placeholder="Ask v0..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-secondary/60"
          >
            <Mic className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </div>
  )
}
