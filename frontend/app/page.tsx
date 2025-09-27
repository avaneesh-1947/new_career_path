'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowRight, Brain, Compass, GraduationCap, Globe, Award, TrendingUp, User, BookOpen, MapPin, MessageCircle, BarChart3, Star, Users, Clock, CheckCircle, Target, Lightbulb, BookOpenCheck, Calendar, Phone, Mail, MapPin as LocationIcon } from 'lucide-react'
import Link from 'next/link'

export default function RootPage() {
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
    
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Main Content */}
      {user ? (
        // Authenticated User Dashboard
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

          {/* Stats Section */}
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
      ) : (
        // Unauthenticated Landing Page
        <div className="min-h-screen">
          {/* Hero Section */}
          <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.1),transparent_50%),radial-gradient(circle_at_80%_30%,rgba(34,197,94,0.08),transparent_50%),radial-gradient(circle_at_40%_80%,rgba(234,179,8,0.08),transparent_50%)]"></div>
            
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-center lg:text-left"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-6"
                  >
                    <Star className="h-4 w-4 mr-2" />
                    Trusted by 50,000+ Students
                  </motion.div>
                  
                  <motion.h1 
                    className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-6 leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    Your Path to{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">
                      Success
                    </span>
                    {' '}Starts Here
                  </motion.h1>
                  
                  <motion.p 
                    className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    Discover your perfect career path with our intelligent guidance platform. 
                    Get personalized recommendations, explore government colleges, and make 
                    informed decisions about your future.
                  </motion.p>

                  <motion.div 
                    className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  >
                    <Link href="/login" className="group btn-primary text-lg px-8 py-4 flex items-center justify-center space-x-2 hover:scale-105 transition-transform">
                      <span>Get Started Free</span>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <button className="btn-outline text-lg px-8 py-4 flex items-center justify-center space-x-2 hover:scale-105 transition-transform">
                      <span>Watch Demo</span>
                      <div className="w-2 h-2 bg-current rounded-full"></div>
                    </button>
                  </motion.div>

                  <motion.div 
                    className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-gray-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                  >
                    <div className="flex items-center space-x-2">
                      <Globe className="h-4 w-4" />
                      <span>Available in 5+ Languages</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Award className="h-4 w-4" />
                      <span>Government Approved</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4" />
                      <span>95% Success Rate</span>
                    </div>
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="relative"
                >
                  <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 lg:p-12 shadow-2xl border border-white/20">
                    <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8 text-center">
                      Platform Impact
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-6">
                      {[
                        { value: '50K+', label: 'Students Guided', color: 'text-blue-600' },
                        { value: '200+', label: 'Colleges Listed', color: 'text-green-600' },
                        { value: '95%', label: 'Success Rate', color: 'text-amber-600' },
                        { value: '15+', label: 'States Covered', color: 'text-purple-600' }
                      ].map((stat, index) => (
                        <motion.div 
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                          className="text-center p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 transition-all duration-300 hover:scale-105"
                        >
                          <div className={`text-3xl lg:text-4xl font-bold ${stat.color} mb-2`}>
                            {stat.value}
                          </div>
                          <div className="text-sm lg:text-base text-gray-600 font-medium">
                            {stat.label}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <motion.div
                    className="absolute -top-4 -right-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-2xl shadow-lg"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <TrendingUp className="h-6 w-6" />
                  </motion.div>
                  
                  <motion.div
                    className="absolute -bottom-4 -left-4 bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-2xl shadow-lg"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  >
                    <Award className="h-6 w-6" />
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-20 lg:py-32 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-20">
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
                >
                  Why Choose CareerGuide?
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-xl text-gray-600 max-w-3xl mx-auto"
                >
                  We provide comprehensive career guidance with cutting-edge technology and personalized support
                </motion.p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                {[
                  {
                    icon: Brain,
                    title: "AI-Powered Assessments",
                    description: "Advanced algorithms analyze your interests, strengths, and personality to provide accurate career recommendations.",
                    color: "from-blue-500 to-blue-600"
                  },
                  {
                    icon: Compass,
                    title: "Personalized Roadmaps",
                    description: "Get step-by-step guidance tailored to your career goals with actionable insights and milestones.",
                    color: "from-green-500 to-green-600"
                  },
                  {
                    icon: Users,
                    title: "Expert Mentorship",
                    description: "Connect with industry professionals and career counselors for personalized guidance and support.",
                    color: "from-purple-500 to-purple-600"
                  },
                  {
                    icon: MapPin,
                    title: "Comprehensive College Database",
                    description: "Access detailed information about 200+ colleges, courses, and admission requirements across India.",
                    color: "from-amber-500 to-amber-600"
                  },
                  {
                    icon: Target,
                    title: "Goal Tracking",
                    description: "Monitor your progress with detailed analytics and achievement tracking throughout your career journey.",
                    color: "from-indigo-500 to-indigo-600"
                  },
                  {
                    icon: Globe,
                    title: "Multi-Language Support",
                    description: "Available in 5+ Indian languages to ensure accessibility for students from all regions.",
                    color: "from-pink-500 to-pink-600"
                  }
                ].map((feature, index) => {
                  const Icon = feature.icon
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="text-center group"
                    >
                      <div className={`w-20 h-20 rounded-3xl bg-gradient-to-r ${feature.color} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="h-10 w-10 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 lg:py-32 bg-gradient-to-r from-primary-600 to-secondary-600">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6"
              >
                Ready to Start Your Career Journey?
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
              >
                Join thousands of students who have found their perfect career path with our guidance platform.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Link href="/login" className="group bg-white text-primary-600 text-lg px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
                  <span>Get Started Now</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button className="border-2 border-white text-white text-lg px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-primary-600 hover:scale-105 transition-all duration-300">
                  Learn More
                </button>
              </motion.div>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}
