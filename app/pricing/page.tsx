"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Check, 
  Zap, 
  Shield, 
  Users, 
  Sparkles,
  ArrowRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ParticlesBackground } from "@/components/particles-background"
import { cn } from "@/lib/utils"
import Link from "next/link"

const plans = [
  {
    name: "Hobby",
    price: "Free",
    description: "No credit card required",
    tagline: "Everything you need to start building.",
    features: [
      "Unlimited applications",
      "5,000 monthly requests",
      "Community support",
      "Basic analytics",
      "Single region deployment",
    ],
    cta: "Start building for free",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$20",
    billing: "Per month, billed annually",
    tagline: "Scale with full-featured authentication.",
    features: [
      "Everything in Hobby, plus:",
      "50,000 MAU included per app",
      "Multi-factor authentication",
      "Priority support",
      "Advanced analytics",
      "Multi-region deployment",
      "Custom domains",
    ],
    cta: "Upgrade to Pro plan",
    highlighted: true,
  },
  {
    name: "Business",
    price: "$250",
    billing: "Per month, billed annually",
    tagline: "Tackle compliance and growing teams.",
    features: [
      "Everything in Pro, plus:",
      "10 dashboard seats included",
      "SOC2/HIPAA compliance",
      "Dedicated support",
      "Custom SLAs",
      "Audit logs",
      "SSO/SAML",
    ],
    cta: "Upgrade to Business plan",
    highlighted: false,
  },
  {
    name: "Enterprise",
    price: "Custom",
    billing: "Only billed annually",
    tagline: "Tailored solutions and guarantees.",
    features: [
      "Everything in Business, plus:",
      "Tiered usage pricing available",
      "Custom integrations",
      "Dedicated account manager",
      "On-premise deployment",
      "99.99% SLA",
      "24/7 phone support",
    ],
    cta: "Talk to sales",
    highlighted: false,
  },
]

const highlights = [
  { icon: Users, text: "50k Monthly retained users free" },
  { icon: Shield, text: "MFA on the Pro plan" },
  { icon: Sparkles, text: "Unlimited apps per plan" },
]

export default function PricingPage() {
  const [billing, setBilling] = useState<"monthly" | "annual">("annual")

  return (
    <main className="relative min-h-screen noise-overlay">
      <ParticlesBackground />
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance">
              New plans,{" "}
              <span className="text-muted-foreground italic">more value</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 text-pretty">
              Choose the perfect plan for your needs. All plans include core features.
            </p>
          </motion.div>

          {/* Pricing Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
          >
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className={cn(
                  "glass-card rounded-2xl p-6 flex flex-col relative overflow-hidden",
                  plan.highlighted && "ring-1 ring-primary/50"
                )}
              >
                {plan.highlighted && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-chart-2" />
                )}
                
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{plan.name}</h3>
                    {(plan.name === "Pro" || plan.name === "Business") && (
                      <div className="flex rounded-lg bg-secondary/50 p-0.5 text-xs">
                        <button 
                          className={cn(
                            "px-2 py-1 rounded-md transition-colors",
                            billing === "monthly" ? "bg-background" : "text-muted-foreground"
                          )}
                          onClick={() => setBilling("monthly")}
                        >
                          Monthly
                        </button>
                        <button 
                          className={cn(
                            "px-2 py-1 rounded-md transition-colors",
                            billing === "annual" ? "bg-background" : "text-muted-foreground"
                          )}
                          onClick={() => setBilling("annual")}
                        >
                          Annual
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <div className="text-3xl font-bold mb-1">{plan.price}</div>
                  <div className="text-sm text-muted-foreground">
                    {plan.billing || plan.description}
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-6">
                  {plan.tagline}
                </p>

                <Button
                  className={cn(
                    "w-full mb-6 min-h-[44px]",
                    plan.highlighted
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "bg-secondary/50 hover:bg-secondary"
                  )}
                  asChild
                >
                  <Link href={plan.name === "Enterprise" ? "#" : "/app"}>
                    {plan.cta}
                  </Link>
                </Button>

                <div className="space-y-3 flex-1">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className={cn(
                        i === 0 && feature.includes("Everything") 
                          ? "text-muted-foreground" 
                          : ""
                      )}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-card rounded-2xl p-6 md:p-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={highlight.text}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <highlight.icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-lg font-semibold">{highlight.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Enterprise CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-16 text-center"
          >
            <h2 className="text-2xl font-bold mb-4">Need a custom solution?</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto text-pretty">
              Contact our sales team to discuss enterprise pricing, custom integrations,
              and dedicated support options.
            </p>
            <Button size="lg" variant="outline" className="min-h-[48px]">
              Contact Sales
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
