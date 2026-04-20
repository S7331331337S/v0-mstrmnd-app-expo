"use client"

import { motion, AnimatePresence, PanInfo } from "framer-motion"
import { useState } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface OnboardingSlide {
  id: number
  title: string
  subtitle?: string
  image?: string
  bgImage?: string
}

const slides: OnboardingSlide[] = [
  {
    id: 1,
    title: "Turn your ideas",
    subtitle: "into apps",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_8364-TAHKg5L8bJD79eeWWtrW1VpDDoQVfW.png"
  },
  {
    id: 2,
    title: "All your projects",
    subtitle: "in your pocket.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_8359-RXQdD1lc7bM3zv7ArvqDivqGRLbZo1.png"
  },
  {
    id: 3,
    title: "Preview your",
    subtitle: "changes",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_8360-A2KMS8u33lPJa7p3yXaqlzoixBjLD2.png"
  },
  {
    id: 4,
    title: "Make changes",
    subtitle: "on the fly",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_8363-0e0DYUxkbtjTpyhuPfN7nscp1sTtkO.png"
  },
  {
    id: 5,
    title: "Publish to",
    subtitle: "the world",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_8362-qdfDxc1FAX3dvbe1JIeECoRJFJlteX.png"
  },
]

interface OnboardingCarouselProps {
  isOpen: boolean
  onClose: () => void
}

export function OnboardingCarousel({ isOpen, onClose }: OnboardingCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState(0)

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  }

  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity
  }

  const swipeConfidenceThreshold = 10000

  const paginate = (newDirection: number) => {
    const newSlide = currentSlide + newDirection
    if (newSlide >= 0 && newSlide < slides.length) {
      setDirection(newDirection)
      setCurrentSlide(newSlide)
    }
  }

  const handleDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, { offset, velocity }: PanInfo) => {
    const swipe = swipePower(offset.x, velocity.x)
    if (swipe < -swipeConfidenceThreshold) {
      paginate(1)
    } else if (swipe > swipeConfidenceThreshold) {
      paginate(-1)
    }
  }

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-background"
    >
      {/* Close button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onClose}
        className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-foreground flex items-center justify-center"
      >
        <X className="w-5 h-5 text-background" />
      </motion.button>

      {/* Slides */}
      <div className="h-full flex flex-col">
        <div className="flex-1 relative overflow-hidden">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={handleDragEnd}
              className="absolute inset-0 flex flex-col items-center justify-center px-8 cursor-grab active:cursor-grabbing"
            >
              {/* Phone mockup */}
              <div className="relative w-full max-w-[280px] aspect-[9/19] rounded-[2.5rem] bg-card border border-border/50 overflow-hidden shadow-2xl shadow-black/50 mb-8">
                {slides[currentSlide].image && (
                  <Image
                    src={slides[currentSlide].image!}
                    alt={slides[currentSlide].title}
                    fill
                    className="object-cover"
                  />
                )}
              </div>

              {/* Title */}
              <h2 className="text-3xl font-bold text-center">
                {slides[currentSlide].title}
              </h2>
              {slides[currentSlide].subtitle && (
                <h2 className="text-3xl font-bold text-center">
                  {slides[currentSlide].subtitle}
                </h2>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation dots */}
        <div className="flex items-center justify-center gap-2 py-4">
          {slides.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setDirection(index > currentSlide ? 1 : -1)
                setCurrentSlide(index)
              }}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentSlide ? "bg-foreground" : "bg-muted"
              }`}
            />
          ))}
        </div>

        {/* Bottom buttons */}
        <div className="px-8 pb-12">
          {currentSlide === slides.length - 1 ? (
            <Button
              onClick={onClose}
              className="w-full h-14 rounded-2xl bg-foreground text-background hover:bg-foreground/90 text-lg font-semibold"
            >
              Get Started
            </Button>
          ) : (
            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1 h-14 rounded-2xl"
              >
                Skip
              </Button>
              <Button
                onClick={() => paginate(1)}
                className="flex-1 h-14 rounded-2xl bg-foreground text-background hover:bg-foreground/90"
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
