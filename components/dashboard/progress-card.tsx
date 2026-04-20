"use client"

import { motion } from "framer-motion"
import { BarChart, Bar, XAxis, ResponsiveContainer, Cell } from "recharts"

const data = [
  { day: "15", value: 20 },
  { day: "16", value: 35 },
  { day: "17", value: 25 },
  { day: "18", value: 85 },
  { day: "19", value: 65 },
  { day: "20", value: 45 },
  { day: "21", value: 55 },
  { day: "22", value: 30 },
  { day: "23", value: 80 },
  { day: "24", value: 50 },
  { day: "25", value: 20 },
]

export function ProgressCard() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-2xl p-5 relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />
      
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">
            Progress
          </div>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold tracking-tight">49%</span>
            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full font-medium">
              +5.37
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">
            Last Updated
          </div>
          <div className="text-xs font-medium">25 Sep, 2024</div>
          <div className="text-[10px] text-muted-foreground">05:30 PM</div>
        </div>
      </div>

      <div className="h-32 relative">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barCategoryGap="15%">
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={1} />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.6} />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="day" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
              dy={5}
            />
            <Bar 
              dataKey="value" 
              radius={[3, 3, 0, 0]}
              fill="url(#barGradient)"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Reflection glow line */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent mt-2" />
    </motion.div>
  )
}
