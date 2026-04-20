"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Quote } from "lucide-react"

const testimonials = [
  {
    quote: "MSTRMND transformed how we build and deploy systems. What used to take weeks now happens in hours.",
    author: "Sarah Chen",
    role: "CTO, TechFlow",
    avatar: "SC",
  },
  {
    quote: "The AI-powered building is like having a senior architect on call 24/7. Game changer for our team.",
    author: "Marcus Rodriguez",
    role: "Lead Engineer, Scale Labs",
    avatar: "MR",
  },
  {
    quote: "We went from idea to production in under a day. The future of development is here.",
    author: "Emily Park",
    role: "Founder, Nexus AI",
    avatar: "EP",
  },
]

export function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-balance">
            Loved by builders{" "}
            <span className="gradient-text">worldwide</span>
          </h2>
          <p className="text-muted-foreground text-lg text-pretty">
            Join thousands of teams building the future with MSTRMND.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card rounded-2xl p-6 relative"
            >
              <Quote className="w-8 h-8 text-primary/30 absolute top-6 right-6" />
              <p className="text-lg mb-6 relative z-10 text-pretty">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold text-primary">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
