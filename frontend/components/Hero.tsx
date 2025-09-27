'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowRight, 
  Play, 
  Users, 
  BookOpen, 
  Target,
  TrendingUp,
  Award,
  Globe
} from 'lucide-react'
import Link from 'next/link'

const Hero = () => {
  const [currentStat, setCurrentStat] = useState(0)
  
  const stats = [
    { icon: Users, value: '50K+', label: 'Students Guided' },
    { icon: BookOpen, value: '200+', label: 'Colleges Listed' },
    { icon: Target, value: '95%', label: 'Success Rate' },
    { icon: Award, value: '15+', label: 'States Covered' }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50"></div>
      
      {/* Animated Background Elements */}
      {/* <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-bounce-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-bounce-slow" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-accent-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-bounce-slow" style={{animationDelay: '2s'}}></div>
      </div> */}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Your Path to{' '}
              <span className=" text-primary-600">
                Success
              </span>
              {' '}Starts Here
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-600 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Discover your perfect career path with our intelligent guidance platform. 
              Get personalized recommendations, explore government colleges, and make 
              informed decisions about your future.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link href="/aptitude-test" className="btn-primary text-lg px-8 py-3 flex items-center justify-center space-x-2">
                <span>Start Aptitude Test</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              
              <button className="btn-outline text-lg px-8 py-3 flex items-center justify-center space-x-2">
                <Play className="h-5 w-5" />
                <span>Watch Demo</span>
              </button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div 
              className="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-gray-500"
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

          {/* Right Content - Interactive Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Platform Impact
              </h3>
              
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => {
                  const Icon = stat.icon
                  return (
                    <motion.div
                      key={index}
                      className={`text-center p-4 rounded-xl transition-all duration-500 ${
                        currentStat === index 
                          ? 'bg-primary-100 scale-105 shadow-lg' 
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className={`inline-flex p-3 rounded-full mb-3 ${
                        currentStat === index ? 'bg-primary-600' : 'bg-gray-200'
                      }`}>
                        <Icon className={`h-6 w-6 ${
                          currentStat === index ? 'text-white' : 'text-gray-600'
                        }`} />
                      </div>
                      <div className={`text-2xl font-bold mb-1 ${
                        currentStat === index ? 'text-primary-600' : 'text-gray-900'
                      }`}>
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-600">
                        {stat.label}
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* Progress Indicator */}
              <div className="flex justify-center space-x-2 mt-6">
                {stats.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      currentStat === index ? 'bg-primary-600 w-6' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              className="absolute -top-4 -right-4 bg-secondary-500 text-white p-3 rounded-full shadow-lg"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <TrendingUp className="h-6 w-6" />
            </motion.div>
            
            <motion.div
              className="absolute -bottom-4 -left-4 bg-accent-500 text-white p-3 rounded-full shadow-lg"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
              <Award className="h-6 w-6" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
