'use client'

import { motion } from 'framer-motion'

interface ChartFallbackProps {
  type: 'line' | 'pie' | 'bar'
  title: string
  height?: number
}

export default function ChartFallback({ type, title, height = 300 }: ChartFallbackProps) {
  const getGradient = () => {
    switch (type) {
      case 'line':
        return 'from-blue-50 to-indigo-100'
      case 'pie':
        return 'from-purple-50 to-pink-100'
      case 'bar':
        return 'from-green-50 to-emerald-100'
      default:
        return 'from-gray-50 to-gray-100'
    }
  }

  const getIcon = () => {
    switch (type) {
      case 'line':
        return '📈'
      case 'pie':
        return '🥧'
      case 'bar':
        return '📊'
      default:
        return '📊'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`h-[${height}px] bg-gradient-to-br ${getGradient()} rounded-lg flex items-center justify-center`}
    >
      <div className="text-center">
        <div className="text-4xl mb-4">{getIcon()}</div>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
        <p className="text-gray-600 font-medium">{title}</p>
        <p className="text-gray-500 text-sm mt-1">Loading chart data...</p>
      </div>
    </motion.div>
  )
}
