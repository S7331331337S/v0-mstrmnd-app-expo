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
    <div className="glass-card rounded-2xl p-6 h-full">
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider mb-2">
            Progress
          </div>
          <div className="flex items-center gap-3">
            <span className="text-4xl font-bold">49%</span>
            <span className="text-sm bg-green-500/20 text-green-400 px-2 py-1 rounded-full font-medium">
              +5.37
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider mb-2">
            Last Updated
          </div>
          <div className="text-sm font-medium">25 Sep, 2024</div>
          <div className="text-sm text-muted-foreground">05:30 PM</div>
        </div>
      </div>

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barCategoryGap="20%">
            <XAxis 
              dataKey="day" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            />
            <Bar 
              dataKey="value" 
              radius={[4, 4, 0, 0]}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`}
                  fill="hsl(var(--primary))"
                  opacity={0.8 + (entry.value / 100) * 0.2}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Glow effect under bars */}
      <div className="h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent rounded-full" />
    </div>
  )
}
