"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { ProjectsList } from "@/components/app/projects-list"
import { FloatingInput } from "@/components/app/floating-input"
import { OnboardingCarousel } from "@/components/app/onboarding-carousel"
import { PublishSheet } from "@/components/app/publish-sheet"
import { 
  Zap, 
  ArrowUpRight, 
  BarChart3, 
  Activity,
  Clock,
  Globe,
  Plus,
  Sparkles,
  Play
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ProgressCard } from "@/components/dashboard/progress-card"

const quickActions = [
  { icon: Sparkles, label: "AI Generate", href: "/app/capture", color: "bg-chart-4/20 text-chart-4" },
  { icon: BarChart3, label: "Analytics", href: "/app/analytics", color: "bg-primary/20 text-primary" },
  { icon: Globe, label: "Deploy", href: "/app/deploy", color: "bg-chart-2/20 text-chart-2" },
  { icon: Plus, label: "New", href: "#", color: "bg-chart-3/20 text-chart-3" },
]

const stats = [
  { label: "Active", value: "12", icon: Zap },
  { label: "Requests", value: "2.4M", icon: Activity },
  { label: "Response", value: "45ms", icon: Clock },
  { label: "Regions", value: "24", icon: Globe },
]

export default function DashboardPage() {
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [showPublish, setShowPublish] = useState(false)
  const [viewMode, setViewMode] = useState<"home" | "projects">("home")

  // Check if first visit
  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem("mstrmnd-onboarding")
    if (!hasSeenOnboarding) {
      setShowOnboarding(true)
    }
  }, [])

  const handleCloseOnboarding = () => {
    localStorage.setItem("mstrmnd-onboarding", "true")
    setShowOnboarding(false)
  }

  const sampleProject = {
    name: "AI Image Generator",
    version: 2,
    thumbnail: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dd090ad5-b46f-486f-8484-c3a8bd2725c9.jpeg",
    status: "ready" as const,
    domains: ["mstrmnd-ai.vercel.app", "mstrmnd.dev"],
    author: "mstrmnd",
    updatedAt: "2m ago"
  }

  return (
    <>
      <OnboardingCarousel isOpen={showOnboarding} onClose={handleCloseOnboarding} />
      <PublishSheet 
        isOpen={showPublish} 
        onClose={() => setShowPublish(false)} 
        project={sampleProject}
      />
      
      <div className="min-h-screen pb-32">
        {/* View Toggle */}
        <div className="px-4 pt-4 pb-2">
          <div className="flex items-center gap-2 p-1 bg-secondary/40 rounded-xl w-fit">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode("home")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                viewMode === "home" 
                  ? "bg-secondary text-foreground" 
                  : "text-muted-foreground"
              }`}
            >
              Home
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode("projects")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                viewMode === "projects" 
                  ? "bg-secondary text-foreground" 
                  : "text-muted-foreground"
              }`}
            >
              Projects
            </motion.button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {viewMode === "projects" ? (
            <motion.div
              key="projects"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-[calc(100vh-180px)]"
            >
              <ProjectsList />
            </motion.div>
          ) : (
            <motion.div
              key="home"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="px-4"
            >
              {/* Welcome Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-6"
              >
                <h1 className="text-2xl font-bold mb-1">Good morning</h1>
                <p className="text-muted-foreground text-sm">
                  What would you like to build today?
                </p>
              </motion.div>

              {/* Quick Actions Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid grid-cols-4 gap-3 mb-6"
              >
                {quickActions.map((action, index) => (
                  <motion.div
                    key={action.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <Link href={action.href}>
                      <motion.div
                        whileTap={{ scale: 0.95 }}
                        className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-secondary/40 hover:bg-secondary/60 transition-colors"
                      >
                        <div className={`w-10 h-10 rounded-xl ${action.color} flex items-center justify-center`}>
                          <action.icon className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-medium">{action.label}</span>
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              {/* Stats Row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-4 gap-2 mb-6"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                    className="p-3 rounded-xl bg-secondary/40 text-center"
                  >
                    <stat.icon className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
                    <div className="text-lg font-bold">{stat.value}</div>
                    <div className="text-[10px] text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Progress Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-6"
              >
                <ProgressCard />
              </motion.div>

              {/* Recent Project Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                onClick={() => setShowPublish(true)}
                className="cursor-pointer"
              >
                <div className="glass-card rounded-2xl p-4 glow-card">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-sm">Continue building</h3>
                    <span className="text-xs text-muted-foreground">2m ago</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-chart-1/20 to-chart-2/20 flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">AI Image Generator</h4>
                      <p className="text-xs text-muted-foreground">Version 2 - Ready to publish</p>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center"
                    >
                      <Play className="w-4 h-4 text-primary" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              {/* Quick Deploy CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-6"
              >
                <div className="glass-card rounded-2xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">Ready to deploy?</h3>
                      <p className="text-xs text-muted-foreground">Launch in seconds</p>
                    </div>
                  </div>
                  <Button size="sm" className="bg-primary text-primary-foreground h-9 px-4" asChild>
                    <Link href="/app/deploy">
                      Deploy
                      <ArrowUpRight className="ml-1 w-3 h-3" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Input */}
        <FloatingInput />
      </div>
    </>
  )
}
