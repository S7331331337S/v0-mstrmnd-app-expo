"use client"

import { motion } from "framer-motion"
import { Search, Edit3, Star, Clock, Settings, ChevronDown, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const favorites = [
  {
    id: 1,
    name: "AI Image Generator",
    timestamp: "2d ago",
    thumbnail: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dd090ad5-b46f-486f-8484-c3a8bd2725c9.jpeg",
    status: "ready"
  },
  {
    id: 2,
    name: "Dashboard Analytics",
    timestamp: "5d ago",
    thumbnail: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/0136ae2c-d217-4cc3-958a-c8489fc173d4.jpeg",
    status: "ready"
  },
  {
    id: 3,
    name: "Portfolio Template",
    timestamp: "7d ago",
    thumbnail: null,
    status: "building"
  },
]

const recents = [
  {
    id: 4,
    name: "E-commerce Store",
    timestamp: "Aug 14",
    thumbnail: null,
    status: "ready"
  },
  {
    id: 5,
    name: "Landing Page",
    timestamp: "Aug 14",
    thumbnail: null,
    status: "ready"
  },
  {
    id: 6,
    name: "Blog Platform",
    timestamp: "Aug 12",
    thumbnail: null,
    status: "ready"
  },
]

export function ProjectsList() {
  const [selectedProject, setSelectedProject] = useState<number | null>(3)

  return (
    <div className="flex flex-col h-full">
      {/* Search Bar */}
      <div className="px-4 pb-4">
        <div className="flex items-center gap-2">
          <div className="flex-1 flex items-center gap-3 bg-secondary/60 rounded-xl px-4 py-3">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="w-11 h-11 flex items-center justify-center bg-secondary/60 rounded-xl"
          >
            <Edit3 className="w-4 h-4 text-muted-foreground" />
          </motion.button>
        </div>
      </div>

      {/* Projects List */}
      <div className="flex-1 overflow-y-auto px-4">
        {/* Favorites Section */}
        <div className="mb-6">
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
            Favorites
          </h3>
          <div className="space-y-1">
            {favorites.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={`/app/project/${project.id}`}>
                  <motion.div
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                      selectedProject === project.id
                        ? "bg-secondary/80"
                        : "hover:bg-secondary/40"
                    }`}
                    onClick={() => setSelectedProject(project.id)}
                  >
                    {/* Thumbnail */}
                    <div className="w-12 h-12 rounded-lg bg-secondary/60 overflow-hidden flex-shrink-0">
                      {project.thumbnail ? (
                        <Image
                          src={project.thumbnail}
                          alt={project.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-6 h-6 rounded bg-muted-foreground/20" />
                        </div>
                      )}
                    </div>
                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">{project.name}</h4>
                      <p className="text-xs text-muted-foreground">{project.timestamp}</p>
                    </div>
                    {/* Status indicator */}
                    {project.status === "building" && (
                      <div className="w-2 h-2 rounded-full bg-chart-4 animate-pulse" />
                    )}
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recents Section */}
        <div className="mb-6">
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
            Recents
          </h3>
          <div className="space-y-1">
            {recents.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + index * 0.05 }}
              >
                <Link href={`/app/project/${project.id}`}>
                  <motion.div
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                      selectedProject === project.id
                        ? "bg-secondary/80"
                        : "hover:bg-secondary/40"
                    }`}
                    onClick={() => setSelectedProject(project.id)}
                  >
                    {/* Thumbnail */}
                    <div className="w-12 h-12 rounded-lg bg-secondary/60 overflow-hidden flex-shrink-0 flex items-center justify-center">
                      <div className="w-6 h-6 rounded bg-muted-foreground/20" />
                    </div>
                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">{project.name}</h4>
                      <p className="text-xs text-muted-foreground">{project.timestamp}</p>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer with credits and profile */}
      <div className="px-4 py-4 border-t border-border/50">
        {/* Credits */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-muted-foreground">Credits</span>
          <span className="text-sm font-mono">3.73/5</span>
        </div>
        
        {/* Profile Switcher */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-between p-3 rounded-xl bg-secondary/40 hover:bg-secondary/60 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-xs font-bold text-primary">M</span>
            </div>
            <span className="font-medium text-sm">MSTRMND</span>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </div>
          <Settings className="w-5 h-5 text-muted-foreground" />
        </motion.button>
      </div>
    </div>
  )
}
