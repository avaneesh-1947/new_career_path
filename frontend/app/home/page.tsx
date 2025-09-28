'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowRight, Brain, Compass, GraduationCap, Globe, Award, TrendingUp, User, BookOpen, MapPin, MessageCircle, BarChart3, Star, Users, Clock, CheckCircle, Target, Lightbulb, BookOpenCheck, Calendar, Phone, Mail, MapPin as LocationIcon } from 'lucide-react'
import Link from 'next/link'
import ImageCarousel from '../../components/ImageCarousel'

export default function HomePage() {
  const router = useRouter()
  const [user, setUser] = useState<{ name?: string; email: string } | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Carousel slides data for authenticated users
  const carouselSlides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
      title: `Welcome back, ${user?.name || 'Student'}!`,
      description: "Ready to continue your career journey? Let's explore new opportunities and take the next step towards your dreams.",
      gradient: "bg-gradient-to-br from-primary-50/90 via-white/90 to-secondary-50/90",
      isWelcomeSlide: true
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Explore New Opportunities",
      description: "Discover new career paths and opportunities that align with your interests and skills.",
      gradient: "bg-gradient-to-br from-green-600/80 to-teal-600/80"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1523240798034-6a5b4b4b4b4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Connect with Mentors",
      description: "Get guidance from industry experts and accelerate your career development with professional mentorship.",
      gradient: "bg-gradient-to-br from-purple-600/80 to-pink-600/80"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Track Your Achievements",
      description: "Monitor your progress and celebrate your achievements as you work towards your career goals.",
      gradient: "bg-gradient-to-br from-orange-600/80 to-red-600/80"
    }
  ]

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
        {/* Hero Carousel Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.1),transparent_50%),radial-gradient(circle_at_80%_30%,rgba(34,197,94,0.08),transparent_50%),radial-gradient(circle_at_40%_80%,rgba(234,179,8,0.08),transparent_50%)]"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
            <ImageCarousel
              slides={carouselSlides}
              autoPlay={true}
              autoPlayInterval={5000}
              showControls={true}
              showIndicators={true}
              onStartAptitudeTest={() => router.push('/aptitude-test')}
              onViewCareerRoadmap={() => router.push('/career-mapping')}
              className="h-[400px] md:h-[450px] lg:h-[500px] rounded-3xl shadow-2xl"
            />
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

        {/* Your Progress Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-r from-primary-50 to-secondary-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
              >
                Your Progress
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-xl text-gray-600"
              >
                Track your career journey milestones
              </motion.p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: Target, value: "3", label: "Assessments Completed", color: "text-blue-600" },
                { icon: CheckCircle, value: "12", label: "Goals Achieved", color: "text-green-600" },
                { icon: Clock, value: "45", label: "Hours Studied", color: "text-amber-600" },
                { icon: Star, value: "8.5", label: "Average Score", color: "text-purple-600" }
              ].map((stat, index) => {
                const Icon = stat.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="text-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className={`w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-4`}>
                      <Icon className={`h-8 w-8 ${stat.color}`} />
                    </div>
                    <div className={`text-3xl font-bold ${stat.color} mb-2`}>
                      {stat.value}
                    </div>
                    <div className="text-gray-600 font-medium">
                      {stat.label}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Recent Activity Section */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
              >
                Recent Activity
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-xl text-gray-600"
              >
                Your latest career development activities
              </motion.p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-6">Upcoming Tasks</h3>
                <div className="space-y-4">
                  {[
                    { task: "Complete Aptitude Test", due: "Today", priority: "high" },
                    { task: "Research Engineering Colleges", due: "Tomorrow", priority: "medium" },
                    { task: "Update Career Profile", due: "This Week", priority: "low" }
                  ].map((task, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-3 ${
                          task.priority === 'high' ? 'bg-red-500' : 
                          task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                        }`}></div>
                        <span className="font-medium text-gray-900">{task.task}</span>
                      </div>
                      <span className="text-sm text-gray-500">{task.due}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-6">Achievements</h3>
                <div className="space-y-4">
                  {[
                    { achievement: "Completed Career Assessment", date: "2 days ago", icon: Award },
                    { achievement: "Explored 15 Colleges", date: "1 week ago", icon: MapPin },
                    { achievement: "Set Career Goals", date: "2 weeks ago", icon: Target }
                  ].map((achievement, index) => {
                    const Icon = achievement.icon
                    return (
                      <div key={index} className="flex items-center p-4 bg-white rounded-xl shadow-sm">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-4">
                          <Icon className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{achievement.achievement}</div>
                          <div className="text-sm text-gray-500">{achievement.date}</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
