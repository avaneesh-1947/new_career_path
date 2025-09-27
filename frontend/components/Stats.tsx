'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { 
  Users, 
  GraduationCap, 
  TrendingUp, 
  Award,
  MapPin,
  BookOpen,
  Target,
  Heart
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const Stats = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const stats = [
    {
      icon: Users,
      value: 50000,
      suffix: '+',
      label: 'Students Guided',
      description: 'Successfully helped students discover their career paths',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: GraduationCap,
      value: 200,
      suffix: '+',
      label: 'Government Colleges',
      description: 'Colleges listed with detailed information and admission criteria',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: TrendingUp,
      value: 95,
      suffix: '%',
      label: 'Success Rate',
      description: 'Students who made informed career decisions using our platform',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: MapPin,
      value: 15,
      suffix: '+',
      label: 'States Covered',
      description: 'Comprehensive coverage across different regions of India',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: BookOpen,
      value: 1000,
      suffix: '+',
      label: 'Career Paths',
      description: 'Detailed career mapping and guidance for various fields',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      icon: Award,
      value: 25,
      suffix: '+',
      label: 'Scholarships',
      description: 'Government and private scholarship opportunities tracked',
      color: 'from-indigo-500 to-indigo-600'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  }

  return (
    <section className="py-20 bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Making a Real{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">
              Impact
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our platform has transformed the career guidance landscape, helping thousands 
            of students make informed decisions about their future.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="group"
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/20 h-full">
                  {/* Icon */}
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${stat.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>

                  {/* Value */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="text-4xl md:text-5xl font-bold text-gray-900 mb-2"
                  >
                    {isInView ? (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                      >
                        {stat.value.toLocaleString()}
                      </motion.span>
                    ) : (
                      '0'
                    )}
                    <span className={`text-transparent bg-clip-text bg-gradient-to-r ${stat.color}`}>
                      {stat.suffix}
                    </span>
                  </motion.div>

                  {/* Label */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">
                    {stat.label}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed">
                    {stat.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="mt-6">
                    <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${stat.color} rounded-full`}
                        initial={{ width: 0 }}
                        animate={isInView ? { width: "100%" } : { width: 0 }}
                        transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
            <div className="flex items-center justify-center mb-4">
              <Heart className="h-8 w-8 text-red-500 mr-3" />
              <h3 className="text-2xl font-bold text-gray-900">
                Join Our Success Story
              </h3>
            </div>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Be part of the growing community of students who are making informed 
              career decisions and building successful futures.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary text-lg px-8 py-3">
                Get Started Today
              </button>
              <button className="btn-outline text-lg px-8 py-3">
                View Success Stories
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Stats
