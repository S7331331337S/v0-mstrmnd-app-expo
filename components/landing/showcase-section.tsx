"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

const showcaseItems = [
  {
    title: "Architect your reality",
    subtitle: "Build systems, not apps",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5b0c8b5e-07c5-49e5-86dc-12ff93a42b38.jpeg",
  },
  {
    title: "Turn intent into execution",
    subtitle: "AI-powered system building",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5b0c8b5e-07c5-49e5-86dc-12ff93a42b38.jpeg",
  },
]

export function ShowcaseSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-balance">
            See it in action
          </h2>
          <p className="text-muted-foreground text-lg text-pretty">
            Experience the power of MSTRMND across every device and platform.
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8 }}
            className="relative aspect-video rounded-2xl overflow-hidden glass-card"
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5b0c8b5e-07c5-49e5-86dc-12ff93a42b38.jpeg"
              alt="MSTRMND App Showcase"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            
            {/* Overlay content */}
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Systems Built", value: "10M+" },
                  { label: "Countries", value: "190+" },
                  { label: "Uptime", value: "99.99%" },
                  { label: "Response Time", value: "<50ms" },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-xl md:text-2xl font-bold text-primary">
                      {stat.value}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Floating cards */}
          <motion.div
            initial={{ opacity: 0, x: -40, y: 20 }}
            animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: -40, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="absolute -left-4 md:-left-12 top-1/4 glass-card rounded-xl p-4 max-w-[200px] hidden md:block"
          >
            <div className="text-sm font-semibold mb-1">Weekly retention</div>
            <div className="text-2xl font-bold text-primary">41%</div>
            <div className="text-xs text-muted-foreground">After 8 weeks</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40, y: -20 }}
            animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: 40, y: -20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="absolute -right-4 md:-right-12 top-1/3 glass-card rounded-xl p-4 max-w-[200px] hidden md:block"
          >
            <div className="text-sm font-semibold mb-1">Progress</div>
            <div className="text-2xl font-bold text-primary flex items-center gap-2">
              49%
              <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
                +5.37
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
