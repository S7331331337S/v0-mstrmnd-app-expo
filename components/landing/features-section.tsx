"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { 
  Zap, 
  Globe, 
  Shield, 
  BarChart3, 
  Code2, 
  Sparkles,
  ArrowRight
} from "lucide-react"
import { cn } from "@/lib/utils"

const features = [
  {
    icon: Zap,
    title: "Instant deployment",
    description: "Push to production in seconds. Our edge network ensures your systems are globally distributed.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Sparkles,
    title: "AI-powered building",
    description: "Turn natural language into working systems. Let AI handle the complexity while you focus on vision.",
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
  },
  {
    icon: Globe,
    title: "Global scale",
    description: "Built for billions. Automatically scale from zero to planetary without configuration.",
    color: "text-chart-1",
    bgColor: "bg-chart-1/10",
  },
  {
    icon: Shield,
    title: "Enterprise security",
    description: "Bank-grade security by default. SOC2, HIPAA, and GDPR compliant out of the box.",
    color: "text-chart-4",
    bgColor: "bg-chart-4/10",
  },
  {
    icon: BarChart3,
    title: "Real-time analytics",
    description: "Deep insights into every aspect of your systems. Monitor, optimize, and iterate with confidence.",
    color: "text-chart-5",
    bgColor: "bg-chart-5/10",
  },
  {
    icon: Code2,
    title: "Developer first",
    description: "Powerful APIs, comprehensive SDKs, and a CLI that makes development a joy.",
    color: "text-foreground",
    bgColor: "bg-foreground/10",
  },
]

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="glass-card rounded-2xl p-6 h-full glow-card transition-all duration-300 hover:scale-[1.02]">
        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-4", feature.bgColor)}>
          <feature.icon className={cn("w-6 h-6", feature.color)} />
        </div>
        <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {feature.description}
        </p>
        <div className="mt-4 flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
          Learn more
          <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.div>
  )
}

export function FeaturesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-balance">
            Everything you need to build{" "}
            <span className="gradient-text">the future</span>
          </h2>
          <p className="text-muted-foreground text-lg text-pretty">
            From concept to production in minutes. MSTRMND provides all the tools
            you need to architect, deploy, and scale your vision.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
