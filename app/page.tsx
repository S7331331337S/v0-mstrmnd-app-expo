import { ParticlesBackground } from "@/components/particles-background"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/landing/hero-section"
import { FeaturesSection } from "@/components/landing/features-section"
import { ShowcaseSection } from "@/components/landing/showcase-section"
import { TestimonialsSection } from "@/components/landing/testimonials-section"
import { CTASection } from "@/components/landing/cta-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="relative noise-overlay">
      <ParticlesBackground />
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <ShowcaseSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  )
}
