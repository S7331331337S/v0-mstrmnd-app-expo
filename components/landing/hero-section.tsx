"use client"

import { motion } from "framer-motion"
import { ArrowRight, Play, Zap, Sparkles, ChartLine, Plus, Mic } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
      
      {/* Animated lines */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
            style={{
              top: `${20 + i * 15}%`,
              left: 0,
              right: 0,
            }}
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: "100%", opacity: [0, 1, 0] }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary mb-8"
              >
                <Zap className="w-4 h-4" />
                <span>Now in public beta</span>
              </motion.div>

              {/* Main headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6"
              >
                <span className="block text-balance">Turn your ideas</span>
                <span className="block gradient-text text-balance">into apps</span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-muted-foreground max-w-md mx-auto lg:mx-0 mb-8 text-pretty"
              >
                Build systems, not apps. Turn intent into execution with AI-powered
                infrastructure that evolves in real time.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
              >
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-foreground text-background hover:bg-foreground/90 group min-h-[52px] rounded-xl"
                  asChild
                >
                  <Link href="/app">
                    Start building free
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-border/50 hover:bg-secondary/50 min-h-[52px] rounded-xl"
                >
                  <Play className="mr-2 w-4 h-4" />
                  Watch demo
                </Button>
              </motion.div>
            </div>

            {/* Phone mockup preview */}
            <motion.div
              initial={{ opacity: 0, y: 60, rotateY: -10 }}
              animate={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="flex-shrink-0"
            >
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute -inset-8 bg-primary/20 blur-3xl rounded-full opacity-60" />
                
                {/* Phone frame */}
                <div className="relative w-[280px] sm:w-[320px]">
                  {/* Phone bezel */}
                  <div className="relative bg-card rounded-[3rem] p-3 shadow-2xl shadow-black/50 border border-border/50">
                    {/* Screen */}
                    <div className="bg-background rounded-[2.25rem] overflow-hidden">
                      {/* Status bar */}
                      <div className="flex items-center justify-between px-8 py-3">
                        <span className="text-sm font-semibold">9:41</span>
                        <div className="flex items-center gap-1.5">
                          <div className="flex gap-0.5">
                            <div className="w-1 h-2 bg-foreground/60 rounded-full" />
                            <div className="w-1 h-3 bg-foreground/60 rounded-full" />
                            <div className="w-1 h-2.5 bg-foreground/60 rounded-full" />
                            <div className="w-1 h-1.5 bg-foreground/40 rounded-full" />
                          </div>
                          <div className="w-4 h-2.5 bg-foreground/60 rounded-sm" />
                          <div className="w-7 h-3 bg-primary rounded-sm relative">
                            <div className="absolute right-0 top-0 bottom-0 w-1 bg-foreground/40 rounded-r-sm" />
                          </div>
                        </div>
                      </div>
                      
                      {/* App header */}
                      <div className="px-6 py-2 flex items-center justify-between">
                        <div className="w-6 h-0.5 bg-foreground" />
                        <Play className="w-5 h-5" />
                      </div>

                      {/* App content */}
                      <div className="px-6 py-8 flex flex-col items-center justify-center min-h-[320px]">
                        {/* Logo */}
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 1, duration: 0.5 }}
                          className="mb-8"
                        >
                          <span className="text-4xl font-bold tracking-tighter">
                            mstrmnd
                          </span>
                        </motion.div>

                        {/* Suggestion chips */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.2 }}
                          className="flex gap-2 mb-6 w-full overflow-hidden"
                        >
                          <div className="flex items-center gap-2 px-3 py-2 bg-secondary/60 rounded-full text-xs whitespace-nowrap">
                            <Sparkles className="w-3 h-3 text-chart-4" />
                            Nano Banana playground
                          </div>
                          <div className="flex items-center gap-2 px-3 py-2 bg-secondary/60 rounded-full text-xs whitespace-nowrap">
                            <ChartLine className="w-3 h-3 text-chart-1" />
                            Finance...
                          </div>
                        </motion.div>

                        {/* Input field */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.4 }}
                          className="flex items-center gap-2 w-full"
                        >
                          <div className="w-8 h-8 rounded-lg bg-secondary/60 flex items-center justify-center">
                            <Plus className="w-4 h-4" />
                          </div>
                          <div className="flex-1 flex items-center bg-secondary/60 rounded-lg px-3 py-2">
                            <span className="text-xs text-muted-foreground">Ask v0 to build...</span>
                          </div>
                          <div className="w-8 h-8 rounded-lg bg-secondary/60 flex items-center justify-center">
                            <Mic className="w-4 h-4" />
                          </div>
                        </motion.div>
                      </div>

                      {/* Home indicator */}
                      <div className="flex justify-center pb-2">
                        <div className="w-32 h-1 bg-foreground/20 rounded-full" />
                      </div>
                    </div>
                  </div>

                  {/* Dynamic island */}
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 w-24 h-7 bg-black rounded-full" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
          >
            {[
              { value: "50k+", label: "Active builders" },
              { value: "98%", label: "Faster deployments" },
              { value: "300%", label: "Productivity boost" },
              { value: "24/7", label: "AI assistance" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
