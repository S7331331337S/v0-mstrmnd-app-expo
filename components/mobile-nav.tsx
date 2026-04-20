"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Home, FolderOpen, Camera, MessageSquare, User } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/app", icon: Home, label: "Home", exactMatch: true },
  { href: "/app/analytics", icon: FolderOpen, label: "Projects" },
  { href: "/app/capture", icon: Camera, label: "Capture" },
  { href: "/app/chat", icon: MessageSquare, label: "Chat" },
  { href: "#", icon: User, label: "Profile" },
]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
    >
      {/* Blur background */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-xl border-t border-border/30" />
      
      <div className="relative flex items-center justify-around py-2 px-2 safe-area-inset-bottom">
        {navItems.map((item) => {
          const isActive = item.exactMatch 
            ? pathname === item.href
            : pathname === item.href || pathname.startsWith(item.href + "/")

          return (
            <Link key={item.href} href={item.href} className="flex-1">
              <motion.div
                whileTap={{ scale: 0.9 }}
                className={cn(
                  "flex flex-col items-center gap-1 py-2 px-3 rounded-2xl transition-all min-h-[56px] justify-center relative",
                  isActive ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {/* Active background */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-secondary/60 rounded-2xl"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                
                <item.icon className={cn(
                  "w-5 h-5 relative z-10 transition-colors",
                  isActive && "text-primary"
                )} />
                <span className="text-[10px] font-medium relative z-10">{item.label}</span>
              </motion.div>
            </Link>
          )
        })}
      </div>
    </motion.nav>
  )
}
