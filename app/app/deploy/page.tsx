"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Rocket, 
  Globe, 
  Activity, 
  ExternalLink,
  Check,
  RefreshCw,
  Plus,
  Mic,
  Camera,
  ChevronRight
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
  live: { color: "text-green-400", bg: "bg-green-500", label: "Live" },
  building: { color: "text-yellow-400", bg: "bg-yellow-500", label: "Building" },
  stopped: { color: "text-muted-foreground", bg: "bg-muted-foreground", label: "Stopped" },
}

export default function DeployPage() {
  const [selectedEnv, setSelectedEnv] = useState("Production")
  const [inputValue, setInputValue] = useState("")

  const selectedDeployment = deployments.find(d => d.name === selectedEnv)

  return (
    <div className="px-4 py-6 pb-32">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold mb-1">Deploy</h1>
        <p className="text-sm text-muted-foreground">
          Launch to the world instantly
        </p>
      </motion.div>

      {/* Quick Deploy Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <div className="glass-card rounded-2xl p-4">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
              <Rocket className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full bg-transparent resize-none outline-none text-sm placeholder:text-muted-foreground min-h-[60px]"
                placeholder="Describe what you want to deploy..."
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-3 border-t border-border/30">
            <div className="flex items-center gap-2">
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="w-9 h-9 rounded-xl bg-secondary/60 flex items-center justify-center"
              >
                <Camera className="w-4 h-4 text-muted-foreground" />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="w-9 h-9 rounded-xl bg-secondary/60 flex items-center justify-center"
              >
                <Mic className="w-4 h-4 text-muted-foreground" />
              </motion.button>
            </div>
            <Button size="sm" className="h-9 px-4 bg-foreground text-background hover:bg-foreground/90 rounded-xl">
              Deploy
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Environment Pills */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide"
      >
        {deployments.map((env) => (
          <motion.button
            key={env.name}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedEnv(env.name)}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
              selectedEnv === env.name
                ? "bg-foreground text-background"
                : "bg-secondary/60 text-muted-foreground"
            )}
          >
            <span className={cn(
              "w-2 h-2 rounded-full",
              statusConfig[env.status as keyof typeof statusConfig].bg
            )} />
            {env.name}
          </motion.button>
        ))}
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-3 gap-3 mb-6"
      >
        <div className="glass-card rounded-2xl p-4 text-center">
          <Globe className="w-5 h-5 mx-auto mb-2 text-primary" />
          <div className="text-lg font-bold">{selectedDeployment?.uptime}</div>
          <div className="text-[10px] text-muted-foreground uppercase">Uptime</div>
        </div>
        <div className="glass-card rounded-2xl p-4 text-center">
          <Activity className="w-5 h-5 mx-auto mb-2 text-green-400" />
          <div className="text-lg font-bold">{selectedDeployment?.requests}</div>
          <div className="text-[10px] text-muted-foreground uppercase">Requests</div>
        </div>
        <div className="glass-card rounded-2xl p-4 text-center">
          <Rocket className="w-5 h-5 mx-auto mb-2 text-chart-4" />
          <div className="text-lg font-bold">{selectedDeployment?.latency}</div>
          <div className="text-[10px] text-muted-foreground uppercase">Latency</div>
        </div>
      </motion.div>

      {/* Endpoint Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="glass-card rounded-2xl p-4 mb-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-muted-foreground uppercase mb-1">Endpoint</div>
            <div className="font-mono text-sm">{selectedDeployment?.endpoint}</div>
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-xl bg-secondary/60 flex items-center justify-center"
          >
            <ExternalLink className="w-4 h-4" />
          </motion.button>
        </div>
      </motion.div>

      {/* Build History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">Build History</h2>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="flex items-center gap-1 text-xs text-muted-foreground"
          >
            <RefreshCw className="w-3 h-3" />
            Refresh
          </motion.button>
        </div>

        <div className="space-y-2">
          {recentBuilds.map((build, index) => (
            <motion.div
              key={build.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 + index * 0.05 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 p-3 rounded-xl bg-secondary/40 hover:bg-secondary/60 transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{build.message}</div>
                <div className="text-xs text-muted-foreground">{build.time}</div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
