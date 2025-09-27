'use client'

import dynamic from 'next/dynamic'
import { Suspense, memo } from 'react'

// Optimized loading components
const HeroSkeleton = memo(() => (
  <div className="h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 animate-pulse" />
))

const FeaturesSkeleton = memo(() => (
  <div className="py-20 bg-gray-50 animate-pulse" />
))

const StatsSkeleton = memo(() => (
  <div className="py-20 bg-gradient-to-br from-primary-50 via-white to-secondary-50 animate-pulse" />
))

const TestimonialsSkeleton = memo(() => (
  <div className="py-20 bg-white animate-pulse" />
))

const CTASkeleton = memo(() => (
  <div className="py-20 bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 animate-pulse" />
))

// Lazy load heavy components with optimized loading
export const LazyHero = dynamic(() => import('./Hero'), {
  loading: () => <HeroSkeleton />,
  ssr: false
})

export const LazyFeatures = dynamic(() => import('./Features'), {
  loading: () => <FeaturesSkeleton />,
  ssr: false
})

export const LazyStats = dynamic(() => import('./Stats'), {
  loading: () => <StatsSkeleton />,
  ssr: false
})

export const LazyTestimonials = dynamic(() => import('./Testimonials'), {
  loading: () => <TestimonialsSkeleton />,
  ssr: false
})

export const LazyCTA = dynamic(() => import('./CTA'), {
  loading: () => <CTASkeleton />,
  ssr: false
})

// Optimized loading component
export const LoadingSpinner = memo(() => (
  <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
      <p className="text-gray-600">Loading...</p>
    </div>
  </div>
))
