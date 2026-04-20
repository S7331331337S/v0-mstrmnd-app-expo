"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ArrowRight, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CTASection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6 }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-chart-2/20 to-primary/20 blur-3xl rounded-full" />
          
          <div className="relative glass-card rounded-3xl p-8 md:p-12 text-center overflow-hidden">
            {/* Animated background lines */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
                  style={{
                    top: `${30 + i * 20}%`,
                    left: 0,
                    right: 0,
                  }}
                  animate={{
                    x: ["0%", "100%", "0%"],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 8 + i * 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-balance">
                Ready to architect{" "}
                <span className="gradient-text">your reality?</span>
              </h2>
              
              <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8 text-pretty">
                Join thousands of builders who are creating the future with MSTRMND.
                Start free, scale infinitely.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 group min-h-[48px]"
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
                  className="w-full sm:w-auto border-border/50 hover:bg-secondary/50 min-h-[48px]"
                  asChild
                >
                  <Link href="/pricing">View pricing</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
