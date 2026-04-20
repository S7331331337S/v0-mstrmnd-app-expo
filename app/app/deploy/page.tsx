"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Rocket, 
  Globe, 
  Activity, 
  Users,
  ExternalLink,
  Check,
  Clock,
  Zap,
  Play,
  Pause,
  RefreshCw,
  Terminal,
  Camera,
  Mic
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const deployments = [
  {
    id: 1,
    name: "Production",
    status: "live",
    endpoint: "api.mstrmnd.app",
    uptime: "99.99%",
    requests: "12.7M",
    latency: "45ms",
  },
  {
    id: 2,
    name: "Staging",
    status: "live",
    endpoint: "staging.mstrmnd.app",
    uptime: "99.95%",
    requests: "1.2M",
    latency: "52ms",
  },
  {
    id: 3,
    name: "Development",
    status: "building",
    endpoint: "dev.mstrmnd.app",
    uptime: "-",
    requests: "-",
    latency: "-",
  },
]

const recentBuilds = [
  { id: 1, message: "Deploy enhanced security system", time: "2m ago", status: "success" },
  { id: 2, message: "Add anomaly detection logic", time: "15m ago", status: "success" },
  { id: 3, message: "Activate resources alert system", time: "1h ago", status: "success" },
  { id: 4, message: "Full deployment v2.4.1", time: "3h ago", status: "success" },
]

const statusConfig = {
  live: { color: "text-green-400", bg: "bg-green-400", label: "Live" },
  building: { color: "text-yellow-400", bg: "bg-yellow-400", label: "Building" },
  stopped: { color: "text-muted-foreground", bg: "bg-muted-foreground", label: "Stopped" },
}

export default function DeployPage() {
  const [selectedEnv, setSelectedEnv] = useState("Production")

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Deploy</h1>
        <p className="text-muted-foreground">
          Manage your deployments and launch to the world instantly.
        </p>
      </motion.div>

      {/* Quick Deploy Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card rounded-2xl p-6 mb-8"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <Rocket className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-lg">Quick Deploy</h2>
              <p className="text-sm text-muted-foreground">
                Deploy enhanced security system & integrate anomaly detection module
              </p>
            </div>
          </div>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 min-h-[44px]">
            <Rocket className="w-4 h-4 mr-2" />
            Deploy Now
          </Button>
        </div>

        {/* Input area */}
        <div className="relative">
          <div className="glass-card rounded-xl p-4 min-h-[100px]">
            <textarea
              className="w-full bg-transparent resize-none outline-none text-sm placeholder:text-muted-foreground"
              placeholder="Describe what you want to deploy..."
              rows={3}
            />
          </div>
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-lg bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <Camera className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-lg bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mic className="w-5 h-5" />
              </motion.button>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>IMAGELOGIC: 0</span>
              <span>|</span>
              <span>RiteRateLimits_opts</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Environment Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="flex gap-2 mb-6 overflow-x-auto pb-2"
      >
        {deployments.map((env) => (
          <motion.button
            key={env.name}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedEnv(env.name)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors min-h-[44px]",
              selectedEnv === env.name
                ? "bg-primary text-primary-foreground"
                : "bg-secondary/50 text-muted-foreground hover:text-foreground"
            )}
          >
            <span className="flex items-center gap-2">
              <span className={cn(
                "w-2 h-2 rounded-full",
                statusConfig[env.status as keyof typeof statusConfig].bg
              )} />
              {env.name}
            </span>
          </motion.button>
        ))}
      </motion.div>

      {/* Deployment Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
      >
        {/* Stats Cards */}
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <Globe className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Endpoint</div>
              <div className="font-medium flex items-center gap-2">
                {deployments.find(d => d.name === selectedEnv)?.endpoint}
                <ExternalLink className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
              <Activity className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Live</div>
              <div className="font-medium">
                {deployments.find(d => d.name === selectedEnv)?.requests || "12.7"} Requests
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Sessions</div>
              <div className="font-medium">1,489 Active</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Build History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="glass-card rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-semibold text-lg">Build History</h2>
          <Button variant="ghost" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>

        <div className="space-y-3">
          {recentBuilds.map((build, index) => (
            <motion.div
              key={build.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              className="flex items-center gap-4 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                <Check className="w-4 h-4 text-green-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{build.message}</div>
                <div className="text-sm text-muted-foreground">{build.time}</div>
              </div>
              <Button variant="ghost" size="sm" className="min-h-[44px] min-w-[44px]">
                <ExternalLink className="w-4 h-4" />
              </Button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
