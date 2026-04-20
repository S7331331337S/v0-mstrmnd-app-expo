import { Navigation } from "@/components/navigation"
import { ParticlesBackground } from "@/components/particles-background"
import { MobileNav } from "@/components/mobile-nav"

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen noise-overlay">
      <ParticlesBackground />
      <Navigation />
      <main className="pt-16 pb-24 md:pb-8 relative z-10">
        {children}
      </main>
      <MobileNav />
    </div>
  )
}
