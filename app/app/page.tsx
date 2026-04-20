"use client"

import { motion } from "framer-motion"
import { 
  Zap, 
  ArrowUpRight, 
  BarChart3, 
  Globe, 
  Activity,
  Clock,
  Users,
  Server,
  Plus,
  ChevronRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ProgressCard } from "@/components/dashboard/progress-card"
import { RetentionCard } from "@/components/dashboard/retention-card"
import { RecentActivity } from "@/components/dashboard/recent-activity"

const quickActions = [
  { icon: Plus, label: "New System", href: "/app/deploy", color: "text-primary" },
  { icon: Server, label: "Deploy", href: "/app/deploy", color: "text-chart-1" },
  { icon: BarChart3, label: "Analytics", href: "/app/analytics", color: "text-chart-2" },
  { icon: Users, label: "Team", href: "#", color: "text-chart-4" },
]

const stats = [
  { label: "Active Systems", value: "12", change: "+2", icon: Zap },
  { label: "Total Requests", value: "2.4M", change: "+15%", icon: Activity },
  { label: "Avg Response", value: "45ms", change: "-12ms", icon: Clock },
  { label: "Regions", value: "24", change: "+4", icon: Globe },
]

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back. Here&apos;s what&apos;s happening with your systems.
        </p>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8"
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
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="glass-card rounded-xl p-4 flex flex-col items-center justify-center gap-2 h-24 cursor-pointer hover:border-primary/30 transition-colors"
              >
                <action.icon className={`w-6 h-6 ${action.color}`} />
                <span className="text-sm font-medium">{action.label}</span>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.05 }}
            className="glass-card rounded-xl p-4 glow-card"
          >
            <div className="flex items-center justify-between mb-2">
              <stat.icon className="w-5 h-5 text-muted-foreground" />
              <span className="text-xs text-green-400 font-medium">{stat.change}</span>
            </div>
            <div className="text-2xl font-bold mb-1">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <ProgressCard />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
        >
          <RetentionCard />
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <RecentActivity />
      </motion.div>

      {/* Quick Deploy CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 glass-card rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
            <Zap className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">Ready to deploy?</h3>
            <p className="text-sm text-muted-foreground">
              Launch your next system in seconds
            </p>
          </div>
        </div>
        <Button className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 min-h-[44px]" asChild>
          <Link href="/app/deploy">
            Deploy Now
            <ArrowUpRight className="ml-2 w-4 h-4" />
          </Link>
        </Button>
      </motion.div>
    </div>
  )
}
