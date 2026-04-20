"use client"

import { motion } from "framer-motion"
import { 
  TrendingUp, 
  TrendingDown, 
  Globe, 
  Users, 
  Activity,
  Clock,
  Server,
  Zap
} from "lucide-react"
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie
} from "recharts"
import { cn } from "@/lib/utils"

const trafficData = [
  { time: "00:00", requests: 2400 },
  { time: "04:00", requests: 1398 },
  { time: "08:00", requests: 9800 },
  { time: "12:00", requests: 3908 },
  { time: "16:00", requests: 4800 },
  { time: "20:00", requests: 3800 },
  { time: "24:00", requests: 4300 },
]

const regionData = [
  { name: "North America", value: 35, color: "hsl(var(--primary))" },
  { name: "Europe", value: 28, color: "hsl(var(--chart-2))" },
  { name: "Asia Pacific", value: 22, color: "hsl(var(--chart-4))" },
  { name: "Other", value: 15, color: "hsl(var(--muted))" },
]

const latencyData = [
  { region: "US-East", latency: 32 },
  { region: "US-West", latency: 28 },
  { region: "EU-West", latency: 45 },
  { region: "AP-South", latency: 68 },
  { region: "AP-East", latency: 52 },
]

const metrics = [
  { 
    label: "Total Requests", 
    value: "2.4M", 
    change: "+12.5%", 
    trend: "up",
    icon: Activity 
  },
  { 
    label: "Active Users", 
    value: "18.2K", 
    change: "+8.3%", 
    trend: "up",
    icon: Users 
  },
  { 
    label: "Avg Latency", 
    value: "45ms", 
    change: "-15%", 
    trend: "down",
    icon: Clock 
  },
  { 
    label: "Error Rate", 
    value: "0.02%", 
    change: "-0.01%", 
    trend: "down",
    icon: Server 
  },
]

export default function AnalyticsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Analytics</h1>
        <p className="text-muted-foreground">
          Real-time insights into your system performance.
        </p>
      </motion.div>

      {/* Metrics Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            className="glass-card rounded-xl p-4 glow-card"
          >
            <div className="flex items-center justify-between mb-2">
              <metric.icon className="w-5 h-5 text-muted-foreground" />
              <span className={cn(
                "text-xs font-medium flex items-center gap-1",
                metric.trend === "up" ? "text-green-400" : "text-green-400"
              )}>
                {metric.trend === "up" ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                {metric.change}
              </span>
            </div>
            <div className="text-2xl font-bold mb-1">{metric.value}</div>
            <div className="text-sm text-muted-foreground">{metric.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Traffic Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card rounded-2xl p-6 mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-semibold text-lg">Traffic Overview</h2>
            <p className="text-sm text-muted-foreground">Requests over the last 24 hours</p>
          </div>
          <div className="flex items-center gap-2">
            {["24h", "7d", "30d"].map((period) => (
              <button
                key={period}
                className={cn(
                  "px-3 py-1 rounded-lg text-sm font-medium transition-colors min-h-[36px]",
                  period === "24h"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary/50 text-muted-foreground hover:text-foreground"
                )}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trafficData}>
              <defs>
                <linearGradient id="trafficGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="time" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
              />
              <Area
                type="monotone"
                dataKey="requests"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fill="url(#trafficGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Region Distribution */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-2xl p-6"
        >
          <h2 className="font-semibold text-lg mb-6">Geographic Distribution</h2>
          <div className="flex items-center gap-6">
            <div className="w-40 h-40">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={regionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {regionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-3">
              {regionData.map((region) => (
                <div key={region.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: region.color }}
                    />
                    <span className="text-sm">{region.name}</span>
                  </div>
                  <span className="text-sm font-medium">{region.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Latency by Region */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="glass-card rounded-2xl p-6"
        >
          <h2 className="font-semibold text-lg mb-6">Latency by Region</h2>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={latencyData} layout="vertical">
                <XAxis 
                  type="number" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  tickFormatter={(value) => `${value}ms`}
                />
                <YAxis 
                  type="category" 
                  dataKey="region"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  width={70}
                />
                <Bar 
                  dataKey="latency" 
                  fill="hsl(var(--primary))"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
