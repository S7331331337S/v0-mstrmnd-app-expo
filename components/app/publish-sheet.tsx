"use client"

import { motion } from "framer-motion"
import { X, Globe, Info, ChevronRight, ExternalLink, User } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface PublishSheetProps {
  isOpen: boolean
  onClose: () => void
  project: {
    name: string
    version: number
    thumbnail: string
    status: "ready" | "building" | "error"
    domains: string[]
    author: string
    updatedAt: string
  }
}

export function PublishSheet({ isOpen, onClose, project }: PublishSheetProps) {
  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="absolute bottom-0 left-0 right-0 bg-card rounded-t-3xl max-h-[90vh] overflow-y-auto"
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 rounded-full bg-muted" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <span className="font-bold text-primary">M</span>
            </div>
            <div>
              <h3 className="font-semibold">{project.name}</h3>
              <p className="text-xs text-muted-foreground">Version {project.version}</p>
            </div>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 px-5 py-3">
          <Button variant="outline" className="flex-1 h-11 rounded-xl">
            Share
          </Button>
          <Button className="flex-1 h-11 rounded-xl bg-foreground text-background hover:bg-foreground/90">
            Publish
          </Button>
        </div>

        {/* Preview Image */}
        <div className="px-5 py-3">
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-secondary">
            {project.thumbnail ? (
              <Image
                src={project.thumbnail}
                alt={project.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-4xl font-bold text-muted-foreground/20">M</span>
              </div>
            )}
          </div>
        </div>

        {/* Info Rows */}
        <div className="px-5 py-2">
          {/* Status */}
          <div className="flex items-center justify-between py-4 border-b border-border/30">
            <div className="flex items-center gap-3">
              <Info className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm">Status</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${
                project.status === "ready" ? "bg-green-500" :
                project.status === "building" ? "bg-chart-4" : "bg-destructive"
              }`} />
              <span className="text-sm capitalize">{project.status}</span>
            </div>
          </div>

          {/* Updated */}
          <div className="flex items-center justify-between py-4 border-b border-border/30">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm">Updated {project.updatedAt}</span>
            </div>
            <span className="text-sm text-muted-foreground">@{project.author}</span>
          </div>

          {/* Domains */}
          <motion.button
            whileTap={{ scale: 0.99 }}
            className="w-full flex items-center justify-between py-4 border-b border-border/30"
          >
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm">Domains</span>
              <span className="px-2 py-0.5 rounded-md bg-secondary text-xs">
                {project.domains.length}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{project.domains[0]}</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
          </motion.button>

          {/* Inspect on Vercel */}
          <motion.button
            whileTap={{ scale: 0.99 }}
            className="w-full flex items-center justify-between py-4"
          >
            <div className="flex items-center gap-3">
              <ExternalLink className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm">Inspect on Vercel</span>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </motion.button>
        </div>

        {/* Bottom Actions */}
        <div className="flex gap-3 px-5 py-5 pb-8">
          <Button variant="outline" className="flex-1 h-12 rounded-xl">
            Visit Site
          </Button>
          <Button className="flex-1 h-12 rounded-xl bg-foreground text-background hover:bg-foreground/90">
            Publish
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
}
