'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Brain, Compass, ArrowRight, Star, Play, Pause } from 'lucide-react'

interface CarouselSlide {
  id: number
  image: string
  title: string
  description: string
  gradient: string
  isWelcomeSlide?: boolean
}

interface ImageCarouselProps {
  slides: CarouselSlide[]
  autoPlay?: boolean
  autoPlayInterval?: number
  showControls?: boolean
  showIndicators?: boolean
  className?: string
  onStartAptitudeTest?: () => void
  onViewCareerRoadmap?: () => void
}

const ImageCarousel = ({
  slides,
  autoPlay = false,
  autoPlayInterval = 5000,
  showControls = true,
  showIndicators = true,
  className = '',
  onStartAptitudeTest,
  onViewCareerRoadmap
}: ImageCarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [isPlaying, autoPlayInterval, slides.length])

  // Touch/swipe functionality
  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      goToNext()
    }
    if (isRightSwipe) {
      goToPrevious()
    }
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <div 
      className={`relative w-full h-full overflow-hidden rounded-2xl ${className}`}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Main Carousel Container */}
      <div className="relative w-full h-full">
        <div className="relative w-full h-full overflow-hidden">
          <motion.div
            className="flex w-full h-full"
            animate={{ x: `-${currentSlide * 100}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className="w-full h-full flex-shrink-0 relative"
              >
                {/* Background Image with Gradient Overlay */}
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${slide.image})` }}
                />
                <div className={`absolute inset-0 ${slide.gradient}`} />
                
                {/* Content Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center px-8 max-w-4xl">
                      {slide.isWelcomeSlide ? (
                        // Welcome Slide Content
                        <div className="text-center lg:text-left">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6 }}
                          className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 text-white text-sm font-medium mb-6 backdrop-blur-[2px]"
                        >
                          <Star className="h-4 w-4 mr-2" />
                          Welcome back!
                        </motion.div>
                        
                        <motion.h2
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.1 }}
                          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
                        >
                          Welcome back,{' '}
                          <span className="text-white">
                            {slide.title.split('Welcome back, ')[1]?.replace('!', '') || 'Student'}!
                          </span>
                        </motion.h2>
                        
                        <motion.p
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.2 }}
                          className="text-xl text-white/90 mb-8 max-w-2xl mx-auto lg:mx-0"
                        >
                          {slide.description}
                        </motion.p>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.3 }}
                          className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
                        >
                          <button
                            onClick={onStartAptitudeTest}
                            className="group bg-gradient-to-r from-primary-600 to-primary-700 text-white text-lg px-8 py-4 rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                          >
                            <Brain className="h-5 w-5" />
                            <span>Start Aptitude Test</span>
                            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                          </button>
                          <button
                            onClick={onViewCareerRoadmap}
                            className="group border-2 border-white/80 text-white text-lg px-8 py-4 rounded-xl font-semibold bg-white/10 hover:bg-white hover:text-gray-900 hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 backdrop-blur-[2px]"
                          >
                            <Compass className="h-5 w-5" />
                            <span>View Career Roadmap</span>
                          </button>
                          </motion.div>
                        </div>
                      ) : (
                      // Regular Slide Content
                      <div className="text-center text-white">
                        <motion.h2
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.2 }}
                          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                        >
                          {slide.title}
                        </motion.h2>
                        <motion.p
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.4 }}
                          className="text-lg md:text-xl lg:text-2xl mb-8 opacity-90"
                        >
                          {slide.description}
                        </motion.p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Navigation Controls */}
        {showControls && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
              aria-label="Next slide"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}

        {/* Slide Indicators */}
        {showIndicators && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? 'bg-white scale-125'
                    : 'bg-white/50 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Play/Pause Button */}
        <button
          onClick={togglePlayPause}
          className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
          aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
        >
          {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
        </button>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
          <motion.div
            className="h-full bg-white"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: autoPlayInterval / 1000, ease: "linear" }}
            key={currentSlide}
          />
        </div>

      </div>
    </div>
  )
}

export default ImageCarousel