'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowRight, Brain, Compass, GraduationCap, Globe, Award, TrendingUp, User, BookOpen, MapPin, MessageCircle, BarChart3, Star, Users, Clock, CheckCircle, Target, Lightbulb, BookOpenCheck, Calendar, Phone, Mail, MapPin as LocationIcon } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  const router = useRouter()
  const [user, setUser] = useState<{ name?: string; email: string } | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = () => {
      try {
        const stored = localStorage.getItem('mockAuthUser')
        if (stored) {
          setUser(JSON.parse(stored))
        } else {
          setUser(null)
        }
      } catch {
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }
    
    checkAuth()
    
    // Listen for storage changes to update auth state
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'mockAuthUser') {
        checkAuth()
      }
    }
    
    // Listen for custom auth change events
    const handleAuthChange = () => {
      checkAuth()
    }
    
    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('authChange', handleAuthChange)
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('authChange', handleAuthChange)
    }
  }, [])

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // If no user, redirect to login
  if (!user) {
    router.replace('/login')
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Main Content */}
      <div className="pt-16 min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.1),transparent_50%),radial-gradient(circle_at_80%_30%,rgba(34,197,94,0.08),transparent_50%),radial-gradient(circle_at_40%_80%,rgba(234,179,8,0.08),transparent_50%)]"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
            <div className="text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-6"
              >
                <Star className="h-4 w-4 mr-2" />
                Welcome back!
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
              >
                Welcome back,{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">
                  {user?.name || 'Student'}!
                </span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0"
              >
                Ready to continue your career journey? Let's explore new opportunities and take the next step towards your dreams.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
              >
                <button 
                  onClick={() => router.push('/aptitude-test')}
                  className="group bg-gradient-to-r from-primary-600 to-primary-700 text-white text-lg px-8 py-4 rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                >
                  <Brain className="h-5 w-5" />
                  <span>Start Aptitude Test</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => router.push('/career-mapping')}
                  className="group border-2 border-primary-600 text-primary-600 text-lg px-8 py-4 rounded-xl font-semibold hover:bg-primary-600 hover:text-white hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Compass className="h-5 w-5" />
                  <span>View Career Roadmap</span>
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Quick Actions Section */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
              >
                Quick Actions
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-xl text-gray-600 max-w-2xl mx-auto"
              >
                Choose your next step and continue building your career path
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Brain,
                  title: "Take Assessment",
                  description: "Discover your interests, strengths, and personality traits with our comprehensive aptitude test.",
                  color: "from-blue-500 to-blue-600",
                  bgColor: "bg-blue-50",
                  iconColor: "text-blue-600",
                  href: "/aptitude-test"
                },
                {
                  icon: Compass,
                  title: "Career Roadmap",
                  description: "Get a personalized career path with step-by-step guidance tailored to your goals.",
                  color: "from-green-500 to-green-600",
                  bgColor: "bg-green-50",
                  iconColor: "text-green-600",
                  href: "/career-mapping"
                },
                {
                  icon: MapPin,
                  title: "Explore Colleges",
                  description: "Find the perfect colleges and programs that match your career aspirations.",
                  color: "from-amber-500 to-amber-600",
                  bgColor: "bg-amber-50",
                  iconColor: "text-amber-600",
                  href: "/colleges"
                },
                {
                  icon: MessageCircle,
                  title: "Career Genie",
                  description: "Get instant answers to your career questions with our AI-powered assistant.",
                  color: "from-purple-500 to-purple-600",
                  bgColor: "bg-purple-50",
                  iconColor: "text-purple-600",
                  href: "/career-genie"
                },
                {
                  icon: BarChart3,
                  title: "Progress Tracking",
                  description: "Monitor your career development progress and achievements over time.",
                  color: "from-indigo-500 to-indigo-600",
                  bgColor: "bg-indigo-50",
                  iconColor: "text-indigo-600",
                  href: "/dashboard"
                },
                {
                  icon: BookOpenCheck,
                  title: "Learning Resources",
                  description: "Access curated study materials and preparation resources for your career goals.",
                  color: "from-pink-500 to-pink-600",
                  bgColor: "bg-pink-50",
                  iconColor: "text-pink-600",
                  href: "/dashboard"
                }
              ].map((action, index) => {
                const Icon = action.icon
                return (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => router.push(action.href)}
                    className="group text-left bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200"
                  >
                    <div className={`w-16 h-16 rounded-2xl ${action.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`h-8 w-8 ${action.iconColor}`} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {action.description}
                    </p>
                    <div className="flex items-center text-primary-600 font-medium group-hover:text-primary-700">
                      <span>Get Started</span>
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.button>
                )
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
