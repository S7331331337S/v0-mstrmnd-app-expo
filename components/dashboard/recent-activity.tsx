"use client"

import { motion } from "framer-motion"
import { 
  Rocket, 
  Check, 
  AlertCircle, 
  Clock, 
  Zap,
  ChevronRight 
} from "lucide-react"
import { cn } from "@/lib/utils"

const activities = [
  {
    id: 1,
    type: "deploy",
    title: "Production deployment",
    description: "System v2.4.1 deployed successfully",
    time: "2 min ago",
    status: "success",
    icon: Rocket,
  },
  {
    id: 2,
    type: "build",
    title: "Build completed",
    description: "Authentication module built in 12.4s",
    time: "15 min ago",
    status: "success",
    icon: Check,
  },
  {
    id: 3,
    type: "alert",
    title: "Performance alert",
    description: "Response time increased to 120ms in EU-West",
    time: "1 hour ago",
    status: "warning",
    icon: AlertCircle,
  },
  {
    id: 4,
    type: "scheduled",
    title: "Scheduled maintenance",
    description: "Database optimization starting at 02:00 UTC",
    time: "3 hours ago",
    status: "pending",
    icon: Clock,
  },
  {
    id: 5,
    type: "system",
    title: "New system created",
    description: "Security monitoring system initialized",
    time: "5 hours ago",
    status: "success",
    icon: Zap,
  },
]

const statusColors = {
  success: "text-green-400 bg-green-400/10",
  warning: "text-yellow-400 bg-yellow-400/10",
  pending: "text-blue-400 bg-blue-400/10",
  error: "text-red-400 bg-red-400/10",
}

export function RecentActivity() {
  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Recent Activity</h2>
        <motion.button
          whileHover={{ x: 2 }}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          View all
          <ChevronRight className="w-4 h-4" />
        </motion.button>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-start gap-4 p-3 rounded-xl hover:bg-secondary/30 transition-colors cursor-pointer"
          >
            <div className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
              statusColors[activity.status as keyof typeof statusColors]
            )}>
              <activity.icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-medium truncate">{activity.title}</h3>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {activity.time}
                </span>
              </div>
              <p className="text-sm text-muted-foreground truncate">
                {activity.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
