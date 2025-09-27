'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle, 
  Clock, 
  Brain,
  Target,
  Award,
  BookOpen,
  Users,
  Lightbulb,
  Wrench,
  Heart,
  BarChart3,
  Palette,
  Calculator
} from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import toast from 'react-hot-toast'
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip
} from 'recharts'

interface RIASECQuestion {
  id: number
  question: string
  options: Array<{
    text: string
    type: 'R' | 'I' | 'A' | 'S' | 'E' | 'C'
  }>
  category: string
}

interface RIASECResult {
  type: 'R' | 'I' | 'A' | 'S' | 'E' | 'C'
  score: number
  percentage: number
  name: string
  description: string
  icon: any
  color: string
}

const RIASECQuiz = () => {
  const router = useRouter()
  const { t } = useLanguage()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isCompleted, setIsCompleted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(1800) // 30 minutes
  const [showResults, setShowResults] = useState(false)
  const [riasecResults, setRiasecResults] = useState<RIASECResult[]>([])

  const riasecQuestions: RIASECQuestion[] = [
    // Realistic (R) Questions
    {
      id: 1,
      question: "I enjoy working with my hands and building things",
      options: [
        { text: "Strongly Agree", type: "R" },
        { text: "Agree", type: "R" },
        { text: "Neutral", type: "I" },
        { text: "Disagree", type: "S" },
        { text: "Strongly Disagree", type: "A" }
      ],
      category: "Work Style"
    },
    {
      id: 2,
      question: "I prefer working outdoors rather than in an office",
      options: [
        { text: "Strongly Agree", type: "R" },
        { text: "Agree", type: "R" },
        { text: "Neutral", type: "I" },
        { text: "Disagree", type: "S" },
        { text: "Strongly Disagree", type: "A" }
      ],
      category: "Work Environment"
    },
    {
      id: 3,
      question: "I like to fix and repair mechanical things",
      options: [
        { text: "Strongly Agree", type: "R" },
        { text: "Agree", type: "R" },
        { text: "Neutral", type: "I" },
        { text: "Disagree", type: "S" },
        { text: "Strongly Disagree", type: "A" }
      ],
      category: "Interests"
    },
    // Investigative (I) Questions
    {
      id: 4,
      question: "I enjoy solving complex problems and puzzles",
      options: [
        { text: "Strongly Agree", type: "I" },
        { text: "Agree", type: "I" },
        { text: "Neutral", type: "R" },
        { text: "Disagree", type: "S" },
        { text: "Strongly Disagree", type: "A" }
      ],
      category: "Problem Solving"
    },
    {
      id: 5,
      question: "I like to research and analyze data",
      options: [
        { text: "Strongly Agree", type: "I" },
        { text: "Agree", type: "I" },
        { text: "Neutral", type: "R" },
        { text: "Disagree", type: "S" },
        { text: "Strongly Disagree", type: "A" }
      ],
      category: "Research"
    },
    {
      id: 6,
      question: "I enjoy learning about how things work",
      options: [
        { text: "Strongly Agree", type: "I" },
        { text: "Agree", type: "I" },
        { text: "Neutral", type: "R" },
        { text: "Disagree", type: "S" },
        { text: "Strongly Disagree", type: "A" }
      ],
      category: "Learning"
    },
    // Artistic (A) Questions
    {
      id: 7,
      question: "I enjoy creating art, music, or writing",
      options: [
        { text: "Strongly Agree", type: "A" },
        { text: "Agree", type: "A" },
        { text: "Neutral", type: "I" },
        { text: "Disagree", type: "C" },
        { text: "Strongly Disagree", type: "R" }
      ],
      category: "Creativity"
    },
    {
      id: 8,
      question: "I like to express myself through creative projects",
      options: [
        { text: "Strongly Agree", type: "A" },
        { text: "Agree", type: "A" },
        { text: "Neutral", type: "I" },
        { text: "Disagree", type: "C" },
        { text: "Strongly Disagree", type: "R" }
      ],
      category: "Self Expression"
    },
    {
      id: 9,
      question: "I appreciate beauty and aesthetics",
      options: [
        { text: "Strongly Agree", type: "A" },
        { text: "Agree", type: "A" },
        { text: "Neutral", type: "I" },
        { text: "Disagree", type: "C" },
        { text: "Strongly Disagree", type: "R" }
      ],
      category: "Aesthetics"
    },
    // Social (S) Questions
    {
      id: 10,
      question: "I enjoy helping and working with people",
      options: [
        { text: "Strongly Agree", type: "S" },
        { text: "Agree", type: "S" },
        { text: "Neutral", type: "A" },
        { text: "Disagree", type: "I" },
        { text: "Strongly Disagree", type: "R" }
      ],
      category: "People Skills"
    },
    {
      id: 11,
      question: "I like to teach or mentor others",
      options: [
        { text: "Strongly Agree", type: "S" },
        { text: "Agree", type: "S" },
        { text: "Neutral", type: "A" },
        { text: "Disagree", type: "I" },
        { text: "Strongly Disagree", type: "R" }
      ],
      category: "Teaching"
    },
    {
      id: 12,
      question: "I enjoy working in teams and collaborating",
      options: [
        { text: "Strongly Agree", type: "S" },
        { text: "Agree", type: "S" },
        { text: "Neutral", type: "A" },
        { text: "Disagree", type: "I" },
        { text: "Strongly Disagree", type: "R" }
      ],
      category: "Teamwork"
    },
    // Enterprising (E) Questions
    {
      id: 13,
      question: "I like to lead and take charge of projects",
      options: [
        { text: "Strongly Agree", type: "E" },
        { text: "Agree", type: "E" },
        { text: "Neutral", type: "S" },
        { text: "Disagree", type: "I" },
        { text: "Strongly Disagree", type: "A" }
      ],
      category: "Leadership"
    },
    {
      id: 14,
      question: "I enjoy selling or persuading others",
      options: [
        { text: "Strongly Agree", type: "E" },
        { text: "Agree", type: "E" },
        { text: "Neutral", type: "S" },
        { text: "Disagree", type: "I" },
        { text: "Strongly Disagree", type: "A" }
      ],
      category: "Persuasion"
    },
    {
      id: 15,
      question: "I like to start my own business or projects",
      options: [
        { text: "Strongly Agree", type: "E" },
        { text: "Agree", type: "E" },
        { text: "Neutral", type: "S" },
        { text: "Disagree", type: "I" },
        { text: "Strongly Disagree", type: "A" }
      ],
      category: "Entrepreneurship"
    },
    // Conventional (C) Questions
    {
      id: 16,
      question: "I prefer following established procedures and rules",
      options: [
        { text: "Strongly Agree", type: "C" },
        { text: "Agree", type: "C" },
        { text: "Neutral", type: "E" },
        { text: "Disagree", type: "A" },
        { text: "Strongly Disagree", type: "I" }
      ],
      category: "Structure"
    },
    {
      id: 17,
      question: "I enjoy working with numbers and data",
      options: [
        { text: "Strongly Agree", type: "C" },
        { text: "Agree", type: "C" },
        { text: "Neutral", type: "E" },
        { text: "Disagree", type: "A" },
        { text: "Strongly Disagree", type: "I" }
      ],
      category: "Data Processing"
    },
    {
      id: 18,
      question: "I like to organize and maintain records",
      options: [
        { text: "Strongly Agree", type: "C" },
        { text: "Agree", type: "C" },
        { text: "Neutral", type: "E" },
        { text: "Disagree", type: "A" },
        { text: "Strongly Disagree", type: "I" }
      ],
      category: "Organization"
    }
  ]

  const riasecTypes = {
    R: { name: 'Realistic', description: 'Practical, hands-on, mechanical', icon: Wrench, color: '#ef4444' },
    I: { name: 'Investigative', description: 'Analytical, scientific, intellectual', icon: Brain, color: '#3b82f6' },
    A: { name: 'Artistic', description: 'Creative, expressive, original', icon: Palette, color: '#8b5cf6' },
    S: { name: 'Social', description: 'Helpful, cooperative, caring', icon: Heart, color: '#10b981' },
    E: { name: 'Enterprising', description: 'Leadership, persuasive, ambitious', icon: Target, color: '#f59e0b' },
    C: { name: 'Conventional', description: 'Organized, detail-oriented, systematic', icon: Calculator, color: '#6b7280' }
  }

  useEffect(() => {
    if (timeLeft > 0 && !isCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      handleSubmit()
    }
  }, [timeLeft, isCompleted])

  const handleAnswerSelect = (answerType: string) => {
    setSelectedAnswer(answerType)
  }

  const handleNext = () => {
    if (selectedAnswer === null) {
      toast.error(t('quiz.selectAnswer'))
      return
    }

    setAnswers({
      ...answers,
      [riasecQuestions[currentQuestion].id]: selectedAnswer
    })
    setSelectedAnswer(null)

    if (currentQuestion < riasecQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setIsCompleted(true)
      calculateResults()
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      const previousAnswer = answers[riasecQuestions[currentQuestion - 1].id]
      setSelectedAnswer(previousAnswer || null)
    }
  }

  const calculateResults = () => {
    const scores: Record<string, number> = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 }
    
    // Calculate scores based on answers
    Object.entries(answers).forEach(([questionId, answerType]) => {
      const question = riasecQuestions.find(q => q.id === parseInt(questionId))
      if (question) {
        const option = question.options.find(opt => opt.type === answerType)
        if (option) {
          scores[option.type] += 1
        }
      }
    })

    // Convert to percentages and create results
    const totalQuestions = riasecQuestions.length
    const results: RIASECResult[] = Object.entries(scores).map(([type, score]) => {
      const percentage = Math.round((score / totalQuestions) * 100)
      const typeInfo = riasecTypes[type as keyof typeof riasecTypes]
      return {
        type: type as keyof typeof riasecTypes,
        score,
        percentage,
        name: typeInfo.name,
        description: typeInfo.description,
        icon: typeInfo.icon,
        color: typeInfo.color
      }
    }).sort((a, b) => b.percentage - a.percentage)

    setRiasecResults(results)
    setShowResults(true)
    toast.success(t('quiz.testCompleted'))
  }

  const handleSubmit = () => {
    if (selectedAnswer !== null && currentQuestion === riasecQuestions.length - 1) {
      setAnswers({
        ...answers,
        [riasecQuestions[currentQuestion].id]: selectedAnswer
      })
    }
    setIsCompleted(true)
    calculateResults()
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const getProgress = () => {
    return ((currentQuestion + 1) / riasecQuestions.length) * 100
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="bg-primary-600 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <Award className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t('quiz.testCompleted')}
            </h1>
            <p className="text-xl text-gray-600">
              {t('quiz.personalizedRecommendations')}
            </p>
          </motion.div>

          {/* Interest Profile Results */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Your Interest Profile</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {riasecResults.map((result, index) => {
                const Icon = result.icon
                return (
                  <motion.div
                    key={result.type}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`p-6 rounded-xl border-2 ${
                      index < 3 ? 'border-primary-200 bg-primary-50' : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <div 
                        className="p-2 rounded-full"
                        style={{ backgroundColor: result.color + '20' }}
                      >
                        <Icon className="h-6 w-6" style={{ color: result.color }} />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{result.name}</h3>
                        <p className="text-sm text-gray-600">{result.description}</p>
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Score</span>
                        <span>{result.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full transition-all duration-1000"
                          style={{ 
                            width: `${result.percentage}%`,
                            backgroundColor: result.color
                          }}
                        />
                      </div>
                    </div>
                    {index < 3 && (
                      <div className="text-xs text-primary-600 font-medium">
                        Top {index + 1} Match
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </div>
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Interest Distribution</h3>
              <div className="bg-gray-50 rounded-xl p-4">
                <ResponsiveContainer width="100%" height={350}>
                  <RadarChart data={riasecResults.map(r => ({ trait: r.name, value: r.percentage }))}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="trait" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar name="You" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.25} />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>

          {/* Career Recommendations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-2xl shadow-xl p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Top Career Matches</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {riasecResults.slice(0, 3).map((result, index) => {
                const careers = getCareersForType(result.type)
                return (
                  <div key={result.type} className="p-6 border border-gray-200 rounded-xl">
                    <div className="flex items-center space-x-3 mb-4">
                      <div 
                        className="p-2 rounded-full"
                        style={{ backgroundColor: result.color + '20' }}
                      >
                        {React.createElement(result.icon, { 
                          className: "h-6 w-6", 
                          style: { color: result.color } 
                        })}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{result.name}</h3>
                        <p className="text-sm text-gray-600">{result.percentage}% Match</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {careers.map((career, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm text-gray-700">{career}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button 
              onClick={() => {
                try {
                  const payload = { results: riasecResults, topTypes: riasecResults.slice(0, 3).map(r => r.type), timestamp: Date.now() }
                  localStorage.setItem('riasecResults', JSON.stringify(payload))
                } catch {}
                router.push('/career-results')
              }}
              className="btn-primary text-lg px-8 py-3 flex items-center justify-center space-x-2"
            >
              <span>{t('results.viewCareerMapping')}</span>
              <ArrowRight className="h-5 w-5" />
            </button>
            <button 
              onClick={() => router.push('/colleges')}
              className="btn-outline text-lg px-8 py-3 flex items-center justify-center space-x-2"
            >
              <span>{t('results.findColleges')}</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="bg-primary-600 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <Brain className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Interest Assessment
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Discover your career interests and find the perfect career path
          </p>
          
          {/* Timer */}
          <div className="flex items-center justify-center space-x-2 bg-white rounded-full px-6 py-3 shadow-lg">
            <Clock className="h-5 w-5 text-primary-600" />
            <span className="font-mono text-lg font-bold text-gray-900">
              {formatTime(timeLeft)}
            </span>
          </div>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="bg-white rounded-full p-1 shadow-lg">
            <div className="bg-gray-200 rounded-full h-3">
              <motion.div
                className="bg-gradient-to-r from-primary-600 to-secondary-600 h-3 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${getProgress()}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>{t('quiz.question')} {currentQuestion + 1} {t('quiz.of')} {riasecQuestions.length}</span>
            <span>{Math.round(getProgress())}% {t('quiz.complete')}</span>
          </div>
        </motion.div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-xl p-8 mb-8"
          >
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-4">
                <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium">
                  {riasecQuestions[currentQuestion].category}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 leading-relaxed">
                {riasecQuestions[currentQuestion].question}
              </h2>
            </div>

            <div className="space-y-3">
              {riasecQuestions[currentQuestion].options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleAnswerSelect(option.type)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                    selectedAnswer === option.type
                      ? 'border-primary-600 bg-primary-50 text-primary-900'
                      : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswer === option.type
                        ? 'border-primary-600 bg-primary-600'
                        : 'border-gray-300'
                    }`}>
                      {selectedAnswer === option.type && (
                        <CheckCircle className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <span className="text-lg">{option.text}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-between items-center"
        >
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="flex items-center space-x-2 px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-600 hover:border-primary-600 hover:text-primary-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>{t('common.previous')}</span>
          </button>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              {currentQuestion + 1} {t('quiz.of')} {riasecQuestions.length} {t('quiz.question').toLowerCase()}s
            </p>
          </div>

          {currentQuestion === riasecQuestions.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={selectedAnswer === null}
              className="btn-primary px-8 py-3 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{t('quiz.submitTest')}</span>
              <CheckCircle className="h-5 w-5" />
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={selectedAnswer === null}
              className="btn-primary px-6 py-3 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{t('common.next')}</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          )}
        </motion.div>
      </div>
    </div>
  )
}

// Helper function to get careers for each RIASEC type
const getCareersForType = (type: string): string[] => {
  const careers: Record<string, string[]> = {
    R: ['Engineer', 'Architect', 'Mechanic', 'Pilot', 'Farmer', 'Construction Manager'],
    I: ['Scientist', 'Doctor', 'Researcher', 'Data Analyst', 'Software Developer', 'Mathematician'],
    A: ['Artist', 'Writer', 'Musician', 'Designer', 'Actor', 'Photographer'],
    S: ['Teacher', 'Counselor', 'Social Worker', 'Nurse', 'Therapist', 'Human Resources'],
    E: ['Manager', 'Entrepreneur', 'Sales Representative', 'Lawyer', 'Politician', 'Business Owner'],
    C: ['Accountant', 'Banker', 'Administrator', 'Librarian', 'Auditor', 'Office Manager']
  }
  return careers[type] || []
}

export default RIASECQuiz
