import { Navigation } from "@/components/navigation"
import { ParticlesBackground } from "@/components/particles-background"
import { MobileNav } from "@/components/mobile-nav"

export const metadata = {
  title: "MSTRMND App - Dashboard",
  description: "Build systems, not apps. Turn intent into execution.",
}

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen noise-overlay">
      <ParticlesBackground />
      {/* Desktop Navigation */}
      <div className="hidden md:block">
        <Navigation />
      </div>
      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-40 px-4 py-3 bg-background/80 backdrop-blur-xl border-b border-border/30 safe-area-inset-top">
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold tracking-tight">mstrmnd</span>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
              <span className="text-xs font-bold">M</span>
            </div>
          </div>
        </div>
      </header>
      <main className="pt-14 md:pt-16 relative z-10">
        {children}
      </main>
      <MobileNav />
    </div>
  )
}
