"use client"

import { motion } from "framer-motion"
import { LineChart, Line, XAxis, ResponsiveContainer, ReferenceLine } from "recharts"
import { Info, ArrowRight, Clock } from "lucide-react"

const data = [
  { week: "W1", retention: 100, lower: 95, upper: 100 },
  { week: "W2", retention: 75, lower: 70, upper: 80 },
  { week: "W3", retention: 55, lower: 50, upper: 60 },
  { week: "W4", retention: 48, lower: 44, upper: 52 },
  { week: "W5", retention: 44, lower: 40, upper: 48 },
  { week: "W6", retention: 42, lower: 38, upper: 46 },
  { week: "W7", retention: 41, lower: 37, upper: 45 },
  { week: "W8", retention: 41, lower: 37, upper: 45 },
]

export function RetentionCard() {
  return (
    <div className="glass-card rounded-2xl p-6 h-full">
      <div className="flex items-start justify-between mb-2">
        <div>
          <div className="font-semibold text-lg mb-1">mstrmnd</div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            Weekly cohort retention
            <Info className="w-4 h-4" />
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="text-4xl font-bold">41%</div>
        <div className="text-sm text-muted-foreground">After 8 weeks</div>
      </div>

      <div className="h-40 relative">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis 
              dataKey="week" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            />
            <ReferenceLine 
              y={40} 
              stroke="hsl(var(--muted-foreground))"
              strokeDasharray="3 3"
              strokeOpacity={0.5}
            />
            {/* Confidence band - upper */}
            <Line
              type="monotone"
              dataKey="upper"
              stroke="transparent"
              fill="transparent"
              dot={false}
            />
            {/* Confidence band - lower */}
            <Line
              type="monotone"
              dataKey="lower"
              stroke="transparent"
              fill="transparent"
              dot={false}
            />
            {/* Main line */}
            <Line
              type="monotone"
              dataKey="retention"
              stroke="hsl(var(--chart-2))"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: "hsl(var(--chart-2))" }}
            />
          </LineChart>
        </ResponsiveContainer>
        
        {/* Goal label */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
          40% goal
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          Updated 1s ago
        </div>
        <motion.button
          whileHover={{ x: 2 }}
          className="flex items-center gap-1 text-sm font-medium text-primary"
        >
          View full report
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  )
}
