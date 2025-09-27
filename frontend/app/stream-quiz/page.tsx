'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle, 
  Clock, 
  BookOpen,
  Target,
  Award,
  Calculator,
  Palette,
  Users,
  Microscope,
  Building,
  Heart,
  BarChart3
} from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import toast from 'react-hot-toast'

interface StreamQuestion {
  id: number
  question: string
  options: Array<{
    text: string
    streams: string[]
    weight: number
  }>
  category: string
  subject: string
}

interface StreamResult {
  stream: string
  score: number
  percentage: number
  name: string
  description: string
  icon: any
  color: string
  careers: string[]
  subjects: string[]
}

const StreamQuiz = () => {
  const router = useRouter()
  const { t } = useLanguage()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isCompleted, setIsCompleted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(1200) // 20 minutes
  const [showResults, setShowResults] = useState(false)
  const [streamResults, setStreamResults] = useState<StreamResult[]>([])

  const streamQuestions: StreamQuestion[] = [
    // A. Logical & Analytical Skills (Science/Math Focus)
    {
      id: 1,
      question: 'Find the next number in the series: 2, 6, 12, 20, ?',
      options: [
        { text: '24', streams: ['arts'], weight: 1 },
        { text: '28', streams: ['arts'], weight: 1 },
        { text: '30', streams: ['science'], weight: 3 },
        { text: '32', streams: ['arts'], weight: 1 }
      ],
      category: 'Logical Reasoning',
      subject: 'Math'
    },
    {
      id: 2,
      question: 'If 5 pens cost ₹50, how much do 12 pens cost?',
      options: [
        { text: '₹100', streams: ['arts'], weight: 1 },
        { text: '₹110', streams: ['arts'], weight: 1 },
        { text: '₹120', streams: ['science'], weight: 3 },
        { text: '₹130', streams: ['arts'], weight: 1 }
      ],
      category: 'Applied Math',
      subject: 'Math'
    },
    {
      id: 3,
      question: 'Find the odd one out: 3, 6, 9, 12, 14',
      options: [
        { text: '6', streams: ['arts'], weight: 1 },
        { text: '12', streams: ['arts'], weight: 1 },
        { text: '14', streams: ['science'], weight: 3 },
        { text: '9', streams: ['arts'], weight: 1 }
      ],
      category: 'Number Series',
      subject: 'Math'
    },
    {
      id: 4,
      question: 'A clock shows 4:20. What is the angle between hour and minute hands?',
      options: [
        { text: '10°', streams: ['arts'], weight: 1 },
        { text: '20°', streams: ['arts'], weight: 1 },
        { text: '30°', streams: ['science'], weight: 3 },
        { text: '40°', streams: ['arts'], weight: 1 }
      ],
      category: 'Logical Reasoning',
      subject: 'Math'
    },

    // B. Numerical & Financial Ability (Commerce/Finance Focus)
    {
      id: 5,
      question: 'A student spends ₹300 out of ₹1000 pocket money. What percentage did he save?',
      options: [
        { text: '60%', streams: ['commerce'], weight: 3 },
        { text: '70%', streams: ['arts'], weight: 1 },
        { text: '30%', streams: ['arts'], weight: 1 },
        { text: '40%', streams: ['arts'], weight: 1 }
      ],
      category: 'Percentage',
      subject: 'Commerce Math'
    },
    {
      id: 6,
      question: 'Which is larger: 7/8 or 3/4?',
      options: [
        { text: '7/8', streams: ['commerce'], weight: 3 },
        { text: '3/4', streams: ['arts'], weight: 1 },
        { text: 'Both equal', streams: ['arts'], weight: 1 },
        { text: 'Cannot say', streams: ['arts'], weight: 1 }
      ],
      category: 'Fractions',
      subject: 'Commerce Math'
    },
    {
      id: 7,
      question: 'A shopkeeper increases the price of an item costing ₹200 by 10%. What is the new price?',
      options: [
        { text: '₹210', streams: ['commerce'], weight: 3 },
        { text: '₹220', streams: ['arts'], weight: 1 },
        { text: '₹200', streams: ['arts'], weight: 1 },
        { text: '₹230', streams: ['arts'], weight: 1 }
      ],
      category: 'Profit & Loss',
      subject: 'Commerce'
    },
    {
      id: 8,
      question: 'You want to save money for a new bike. Which activity suits you best?',
      options: [
        { text: 'Invest in a bank account', streams: ['commerce'], weight: 3 },
        { text: 'Calculate weekly allowance', streams: ['commerce'], weight: 2 },
        { text: 'Start creative projects', streams: ['arts'], weight: 1 },
        { text: 'Read stories', streams: ['arts'], weight: 1 }
      ],
      category: 'Financial Awareness',
      subject: 'Commerce'
    },

    // C. Verbal & Communication Skills (Arts/Humanities Focus)
    {
      id: 9,
      question: 'Choose the word most similar to “Cheerful”:',
      options: [
        { text: 'Sad', streams: ['science'], weight: 1 },
        { text: 'Happy', streams: ['arts'], weight: 3 },
        { text: 'Angry', streams: ['science'], weight: 1 },
        { text: 'Lazy', streams: ['science'], weight: 1 }
      ],
      category: 'Vocabulary',
      subject: 'English'
    },
    {
      id: 10,
      question: 'Which sentence is correct?',
      options: [
        { text: 'She don’t like chocolate.', streams: ['science'], weight: 1 },
        { text: 'She doesn’t like chocolate.', streams: ['arts'], weight: 3 },
        { text: 'She not likes chocolate.', streams: ['science'], weight: 1 },
        { text: 'She no like chocolate.', streams: ['science'], weight: 1 }
      ],
      category: 'Grammar',
      subject: 'English'
    },
    {
      id: 11,
      question: 'Fill in the blank: He is good ___ painting.',
      options: [
        { text: 'at', streams: ['arts'], weight: 3 },
        { text: 'in', streams: ['science'], weight: 1 },
        { text: 'on', streams: ['science'], weight: 1 },
        { text: 'for', streams: ['science'], weight: 1 }
      ],
      category: 'Prepositions',
      subject: 'English'
    },
    {
      id: 12,
      question: 'Choose the synonym of “Generous”:',
      options: [
        { text: 'Kind', streams: ['arts'], weight: 3 },
        { text: 'Cruel', streams: ['science'], weight: 1 },
        { text: 'Lazy', streams: ['science'], weight: 1 },
        { text: 'Angry', streams: ['science'], weight: 1 }
      ],
      category: 'Synonyms',
      subject: 'English'
    },

    // D. Creative Thinking & Imagination (Design/Arts Focus)
    {
      id: 13,
      question: 'Which activity do you enjoy most?',
      options: [
        { text: 'Solving science puzzles', streams: ['science'], weight: 3 },
        { text: 'Calculating numbers and budgets', streams: ['commerce'], weight: 3 },
        { text: 'Writing stories or debating', streams: ['arts'], weight: 3 },
        { text: 'Drawing, painting, or designing', streams: ['arts'], weight: 3 }
      ],
      category: 'Interests',
      subject: 'General'
    },
    {
      id: 14,
      question: 'Imagine you want to design a new product. What is your first step?',
      options: [
        { text: 'Research scientific feasibility', streams: ['science'], weight: 3 },
        { text: 'Calculate costs and budget', streams: ['commerce'], weight: 3 },
        { text: 'Write a plan or story about it', streams: ['arts'], weight: 2 },
        { text: 'Sketch or model the design', streams: ['arts'], weight: 3 }
      ],
      category: 'Creativity',
      subject: 'Design'
    },
    {
      id: 15,
      question: 'If your school project could be anything, what would you choose?',
      options: [
        { text: 'Science experiment', streams: ['science'], weight: 3 },
        { text: 'Finance/budget planning', streams: ['commerce'], weight: 3 },
        { text: 'History or social study', streams: ['arts'], weight: 3 },
        { text: 'Art or design project', streams: ['arts'], weight: 3 }
      ],
      category: 'Project Preference',
      subject: 'General'
    },
    {
      id: 16,
      question: 'How do you solve problems creatively?',
      options: [
        { text: 'Use logic and formulas', streams: ['science'], weight: 3 },
        { text: 'Plan practical solutions', streams: ['commerce'], weight: 3 },
        { text: 'Think about people and communication', streams: ['arts'], weight: 3 },
        { text: 'Use imagination and visuals', streams: ['arts'], weight: 3 }
      ],
      category: 'Problem Solving',
      subject: 'General'
    }
  ]

  const streamTypes = {
    science: { 
      name: 'Science', 
      description: 'Mathematics, Physics, Chemistry, Biology', 
      icon: Microscope, 
      color: '#3b82f6',
      careers: ['Engineer', 'Doctor', 'Scientist', 'Researcher', 'Data Analyst', 'Software Developer'],
      subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science']
    },
    commerce: { 
      name: 'Commerce', 
      description: 'Business, Economics, Accounting, Finance', 
      icon: Building, 
      color: '#10b981',
      careers: ['Accountant', 'Business Analyst', 'Banker', 'Entrepreneur', 'Financial Advisor', 'Marketing Manager'],
      subjects: ['Mathematics', 'Economics', 'Business Studies', 'Accountancy', 'Statistics']
    },
    arts: { 
      name: 'Arts', 
      description: 'Literature, History, Geography, Languages', 
      icon: Palette, 
      color: '#8b5cf6',
      careers: ['Teacher', 'Writer', 'Journalist', 'Lawyer', 'Social Worker', 'Artist'],
      subjects: ['English', 'History', 'Geography', 'Political Science', 'Psychology']
    }
  }

  useEffect(() => {
    if (timeLeft > 0 && !isCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      handleSubmit()
    }
  }, [timeLeft, isCompleted])

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex.toString())
  }

  const handleNext = () => {
    if (selectedAnswer === null) {
      toast.error(t('quiz.selectAnswer'))
      return
    }

    setAnswers({
      ...answers,
      [streamQuestions[currentQuestion].id]: selectedAnswer
    })
    setSelectedAnswer(null)

    if (currentQuestion < streamQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setIsCompleted(true)
      calculateResults()
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      const previousAnswer = answers[streamQuestions[currentQuestion - 1].id]
      setSelectedAnswer(previousAnswer || null)
    }
  }

  const calculateResults = () => {
    const scores: Record<string, number> = { science: 0, commerce: 0, arts: 0 }
    
    // Calculate scores based on answers
    Object.entries(answers).forEach(([questionId, answerIndex]) => {
      const question = streamQuestions.find(q => q.id === parseInt(questionId))
      if (question) {
        const option = question.options[parseInt(answerIndex)]
        if (option) {
          option.streams.forEach(stream => {
            scores[stream] += option.weight
          })
        }
      }
    })

    // Convert to percentages and create results
    const totalPossibleScore = streamQuestions.length * 3 // Maximum possible score
    const results: StreamResult[] = Object.entries(scores).map(([stream, score]) => {
      const percentage = Math.round((score / totalPossibleScore) * 100)
      const typeInfo = streamTypes[stream as keyof typeof streamTypes]
      return {
        stream,
        score,
        percentage,
        name: typeInfo.name,
        description: typeInfo.description,
        icon: typeInfo.icon,
        color: typeInfo.color,
        careers: typeInfo.careers,
        subjects: typeInfo.subjects
      }
    }).sort((a, b) => b.percentage - a.percentage)

    setStreamResults(results)
    setShowResults(true)
    toast.success(t('quiz.testCompleted'))

    // Persist stream results for later pages (career-results, colleges)
    try {
      const payload = { results, topStreams: results.slice(0,3).map(r => r.stream), timestamp: Date.now() }
      localStorage.setItem('streamResults', JSON.stringify(payload))
    } catch {}
  }

  const handleSubmit = () => {
    if (selectedAnswer !== null && currentQuestion === streamQuestions.length - 1) {
      setAnswers({
        ...answers,
        [streamQuestions[currentQuestion].id]: selectedAnswer
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
    return ((currentQuestion + 1) / streamQuestions.length) * 100
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

          {/* Stream Results */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Your Stream Recommendations</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {streamResults.map((result, index) => {
                const Icon = result.icon
                return (
                  <motion.div
                    key={result.stream}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`p-6 rounded-xl border-2 ${
                      index === 0 ? 'border-primary-200 bg-primary-50' : 'border-gray-200 bg-gray-50'
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
                        <span>Match</span>
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
                    {index === 0 && (
                      <div className="text-xs text-primary-600 font-medium">
                        Recommended Stream
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Charts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid lg:grid-cols-2 gap-8 mb-8"
          >
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Match Distribution</h3>
              <div className="w-full">
                <div className="h-2 bg-gray-200 rounded-full mb-3">
                  <div className="h-2 bg-primary-600 rounded-full" style={{width: `${streamResults[0]?.percentage || 0}%`}} />
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{streamResults[0]?.name}</span>
                  <span>{streamResults[0]?.percentage}%</span>
                </div>
                <div className="mt-6 h-2 bg-gray-200 rounded-full mb-3">
                  <div className="h-2 bg-secondary-600 rounded-full" style={{width: `${streamResults[1]?.percentage || 0}%`}} />
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{streamResults[1]?.name}</span>
                  <span>{streamResults[1]?.percentage}%</span>
                </div>
                <div className="mt-6 h-2 bg-gray-200 rounded-full mb-3">
                  <div className="h-2 bg-emerald-500 rounded-full" style={{width: `${streamResults[2]?.percentage || 0}%`}} />
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{streamResults[2]?.name}</span>
                  <span>{streamResults[2]?.percentage}%</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Suggested Subjects Emphasis</h3>
              <div className="grid grid-cols-2 gap-3">
                {streamResults[0]?.subjects.slice(0,6).map((subj, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
                    <span className="text-sm text-gray-700">{subj}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{backgroundColor: (streamResults[0]?.color||'#3b82f6')+'20', color: streamResults[0]?.color}}>
                      Core
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Detailed Recommendations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-2xl shadow-xl p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Stream Details</h2>
            <div className="space-y-8">
              {streamResults.map((result, index) => {
                const Icon = result.icon
                return (
                  <div key={result.stream} className="border border-gray-200 rounded-xl p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div 
                        className="p-2 rounded-full"
                        style={{ backgroundColor: result.color + '20' }}
                      >
                        <Icon className="h-6 w-6" style={{ color: result.color }} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{result.name}</h3>
                        <p className="text-gray-600">{result.description}</p>
                        <p className="text-sm text-primary-600 font-medium">{result.percentage}% Match</p>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Key Subjects</h4>
                        <div className="flex flex-wrap gap-2">
                          {result.subjects.map((subject, idx) => (
                            <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                              {subject}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Career Options</h4>
                        <div className="space-y-1">
                          {result.careers.slice(0, 4).map((career, idx) => (
                            <div key={idx} className="flex items-center space-x-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span className="text-sm text-gray-700">{career}</span>
                            </div>
                          ))}
                        </div>
                      </div>
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
              onClick={() => router.push('/career-results')}
              className="btn-primary text-lg px-8 py-3 flex items-center justify-center space-x-2"
            >
              <span>View Career Paths</span>
              <ArrowRight className="h-5 w-5" />
            </button>
            <button 
              onClick={() => router.push('/colleges')}
              className="btn-outline text-lg px-8 py-3 flex items-center justify-center space-x-2"
            >
              <span>Find Colleges</span>
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
            <BookOpen className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Stream Selection Quiz
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Discover the perfect stream for your 11th and 12th grade studies
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
            <span>{t('quiz.question')} {currentQuestion + 1} {t('quiz.of')} {streamQuestions.length}</span>
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
                  {streamQuestions[currentQuestion].category}
                </span>
                <span className="bg-secondary-100 text-secondary-800 px-3 py-1 rounded-full text-sm font-medium">
                  {streamQuestions[currentQuestion].subject}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 leading-relaxed">
                {streamQuestions[currentQuestion].question}
              </h2>
            </div>

            <div className="space-y-3">
              {streamQuestions[currentQuestion].options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                    selectedAnswer === index.toString()
                      ? 'border-primary-600 bg-primary-50 text-primary-900'
                      : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50 text-gray-900'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswer === index.toString()
                        ? 'border-primary-600 bg-primary-600'
                        : 'border-gray-300'
                    }`}>
                      {selectedAnswer === index.toString() && (
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
              {currentQuestion + 1} {t('quiz.of')} {streamQuestions.length} {t('quiz.question').toLowerCase()}s
            </p>
          </div>

          {currentQuestion === streamQuestions.length - 1 ? (
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

export default StreamQuiz
