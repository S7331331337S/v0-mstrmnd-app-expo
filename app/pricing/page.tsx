"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Check, 
  Zap, 
  Shield, 
  Users, 
  Sparkles,
  ArrowRight,
  ChevronDown
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
  const [expandedPlan, setExpandedPlan] = useState<string | null>(null)

  return (
    <main className="relative min-h-screen noise-overlay">
      <ParticlesBackground />
      <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto mb-12"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-balance">
              New plans,{" "}
              <span className="text-muted-foreground italic">more value</span>
            </h1>
            <p className="text-muted-foreground mb-6 text-pretty">
              Choose the perfect plan for your needs.
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center p-1 bg-secondary/40 rounded-full">
              <button 
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                  billing === "monthly" ? "bg-foreground text-background" : "text-muted-foreground"
                )}
                onClick={() => setBilling("monthly")}
              >
                Monthly
              </button>
              <button 
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                  billing === "annual" ? "bg-foreground text-background" : "text-muted-foreground"
                )}
                onClick={() => setBilling("annual")}
              >
                Annual
              </button>
            </div>
          </motion.div>

          {/* Mobile: Collapsible Cards */}
          <div className="md:hidden space-y-3 mb-12">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className={cn(
                  "glass-card rounded-2xl overflow-hidden",
                  plan.highlighted && "ring-1 ring-primary/50"
                )}
              >
                {plan.highlighted && (
                  <div className="h-1 bg-gradient-to-r from-primary to-chart-2" />
                )}
                
                <button
                  onClick={() => setExpandedPlan(expandedPlan === plan.name ? null : plan.name)}
                  className="w-full p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div>
                      <h3 className="font-semibold text-left">{plan.name}</h3>
                      <div className="text-xl font-bold">{plan.price}</div>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedPlan === plan.name ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  </motion.div>
                </button>

                <motion.div
                  initial={false}
                  animate={{
                    height: expandedPlan === plan.name ? "auto" : 0,
                    opacity: expandedPlan === plan.name ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4">
                    <p className="text-sm text-muted-foreground mb-4">
                      {plan.billing || plan.description}
                    </p>
                    <p className="text-sm mb-4">{plan.tagline}</p>
                    
                    <Button
                      className={cn(
                        "w-full mb-4 h-11 rounded-xl",
                        plan.highlighted
                          ? "bg-foreground text-background hover:bg-foreground/90"
                          : "bg-secondary/60 hover:bg-secondary"
                      )}
                      asChild
                    >
                      <Link href={plan.name === "Enterprise" ? "#" : "/app"}>
                        {plan.cta}
                      </Link>
                    </Button>

                    <div className="space-y-2">
                      {plan.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Desktop: Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
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
                  <h3 className="font-semibold mb-2">{plan.name}</h3>
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
                    "w-full mb-6 h-11 rounded-xl",
                    plan.highlighted
                      ? "bg-foreground text-background hover:bg-foreground/90"
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
            className="glass-card rounded-2xl p-4 md:p-6"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={highlight.text}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center gap-3 flex-1"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <highlight.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-medium text-sm">{highlight.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Enterprise CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-12 text-center"
          >
            <h2 className="text-xl font-bold mb-3">Need a custom solution?</h2>
            <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto text-pretty">
              Contact our sales team to discuss enterprise pricing and dedicated support.
            </p>
            <Button variant="outline" className="h-11 rounded-xl">
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
