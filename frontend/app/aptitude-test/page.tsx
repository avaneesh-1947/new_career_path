'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
  GraduationCap
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'
import toast from 'react-hot-toast'

interface Question {
  id: number
  question: string
  options: string[]
  category: string
}

interface Answer {
  questionId: number
  answer: number
  category: string
}

const AptitudeTest = () => {
  const router = useRouter()
  const { t } = useLanguage()
  const [showClassSelection, setShowClassSelection] = useState(true)
  const [selectedClass, setSelectedClass] = useState<string>('')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isCompleted, setIsCompleted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(1800) // 30 minutes
  const [showResults, setShowResults] = useState(false)

  const questions: Question[] = [
    {
      id: 1,
      question: "Which activity do you enjoy most?",
      options: ["Solving puzzles and problems", "Creating art or music", "Working with numbers and data", "Helping others and socializing"],
      category: "Interest"
    },
    {
      id: 2,
      question: "What type of work environment do you prefer?",
      options: ["Quiet office with minimal distractions", "Dynamic team environment", "Outdoor or field work", "Creative studio or workshop"],
      category: "Work Style"
    },
    {
      id: 3,
      question: "Which subject interests you most?",
      options: ["Mathematics and Science", "Literature and Languages", "History and Social Studies", "Arts and Design"],
      category: "Academic Interest"
    },
    {
      id: 4,
      question: "How do you prefer to learn new things?",
      options: ["Through hands-on practice", "By reading and research", "Through group discussions", "By watching demonstrations"],
      category: "Learning Style"
    },
    {
      id: 5,
      question: "What motivates you most?",
      options: ["Financial success and stability", "Making a positive impact", "Personal growth and development", "Recognition and achievement"],
      category: "Motivation"
    },
    {
      id: 6,
      question: "Which skill would you like to develop most?",
      options: ["Technical and analytical skills", "Communication and leadership", "Creative and artistic skills", "Problem-solving and critical thinking"],
      category: "Skill Development"
    },
    {
      id: 7,
      question: "What type of challenges do you enjoy?",
      options: ["Complex technical problems", "Creative design challenges", "Social and interpersonal issues", "Strategic planning and analysis"],
      category: "Challenge Preference"
    },
    {
      id: 8,
      question: "How do you handle stress?",
      options: ["By analyzing the problem systematically", "By talking to friends and family", "By engaging in creative activities", "By taking action immediately"],
      category: "Stress Management"
    },
    {
      id: 9,
      question: "What is your ideal career outcome?",
      options: ["Becoming an expert in a specific field", "Leading and managing teams", "Creating innovative solutions", "Making a difference in society"],
      category: "Career Goals"
    },
    {
      id: 10,
      question: "Which type of work schedule appeals to you?",
      options: ["Regular 9-to-5 schedule", "Flexible and varied hours", "Project-based deadlines", "Seasonal or contract work"],
      category: "Work Schedule"
    }
  ]

  useEffect(() => {
    if (timeLeft > 0 && !isCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      handleSubmit()
    }
  }, [timeLeft, isCompleted])

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNext = () => {
    if (selectedAnswer === null) {
      toast.error('Please select an answer before proceeding')
      return
    }

    const newAnswer: Answer = {
      questionId: questions[currentQuestion].id,
      answer: selectedAnswer,
      category: questions[currentQuestion].category
    }

    setAnswers([...answers, newAnswer])
    setSelectedAnswer(null)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setIsCompleted(true)
      setShowResults(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      const previousAnswer = answers.find(a => a.questionId === questions[currentQuestion - 1].id)
      setSelectedAnswer(previousAnswer ? previousAnswer.answer : null)
    }
  }

  const handleClassSelection = (classLevel: string) => {
    setSelectedClass(classLevel)
    setShowClassSelection(false)
    
    // Redirect to appropriate quiz based on class
    if (classLevel === '10th') {
      router.push('/stream-quiz')
    } else if (classLevel === '12th') {
      router.push('/riasec-quiz')
    } else {
      // For other classes, show the general aptitude test
      setShowClassSelection(false)
    }
  }

  const handleSubmit = () => {
    if (selectedAnswer !== null && currentQuestion === questions.length - 1) {
      const newAnswer: Answer = {
        questionId: questions[currentQuestion].id,
        answer: selectedAnswer,
        category: questions[currentQuestion].category
      }
      setAnswers([...answers, newAnswer])
    }
    setIsCompleted(true)
    setShowResults(true)
    toast.success(t('quiz.testCompleted'))
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const getProgress = () => {
    return ((currentQuestion + 1) / questions.length) * 100
  }

  if (showClassSelection) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
              Choose Your Assessment
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Select your current class to get the most relevant career guidance
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-100"
              onClick={() => handleClassSelection('10th')}
            >
              <div className="text-center">
                <div className="mx-auto mb-4 w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-600/20 ring-1 ring-blue-500/20 flex items-center justify-center shadow-inner">
                  <BookOpen className="h-9 w-9 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">10th Grade</h3>
                <p className="text-gray-600 mb-4">Stream Selection Quiz</p>
                <p className="text-sm text-gray-500 mb-6">
                  Discover which stream (Science, Commerce, Arts) suits you best for 11th and 12th grade
                </p>
                <div className="space-y-2 text-sm text-left">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-gray-700 flex-1">Subject-based questions</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-gray-700 flex-1">Stream recommendations</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-gray-700 flex-1">Career path guidance</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-100"
              onClick={() => handleClassSelection('12th')}
            >
              <div className="text-center">
                <div className="mx-auto mb-4 w-20 h-20 rounded-2xl bg-gradient-to-br from-green-500/10 to-green-600/20 ring-1 ring-green-500/20 flex items-center justify-center shadow-inner">
                  <Target className="h-9 w-9 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">12th Grade</h3>
                <p className="text-gray-600 mb-4">Interest Assessment</p>
                <p className="text-sm text-gray-500 mb-6">
                  Comprehensive career assessment based on your interests, personality, and skills
                </p>
                <div className="space-y-2 text-sm text-left">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-gray-700 flex-1">Interest-based questions</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-gray-700 flex-1">Career recommendations</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-gray-700 flex-1">Success stories</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-100"
              onClick={() => handleClassSelection('other')}
            >
              <div className="text-center">
                <div className="mx-auto mb-4 w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500/10 to-purple-600/20 ring-1 ring-purple-500/20 flex items-center justify-center shadow-inner">
                  <Users className="h-9 w-9 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Other Classes</h3>
                <p className="text-gray-600 mb-4">General Aptitude Test</p>
                <p className="text-sm text-gray-500 mb-6">
                  General aptitude and interest assessment for students in other classes
                </p>
                <div className="space-y-2 text-sm text-left">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-gray-700 flex-1">General questions</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-gray-700 flex-1">Basic recommendations</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-gray-700 flex-1">Future planning</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    )
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
              Test Completed!
            </h1>
            <p className="text-xl text-gray-600">
              Your personalized career recommendations are ready
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Career Profile</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Brain className="h-6 w-6 text-primary-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Primary Interest</h3>
                    <p className="text-gray-600">Technology & Innovation</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Target className="h-6 w-6 text-secondary-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Recommended Stream</h3>
                    <p className="text-gray-600">Science (Computer Science)</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <BookOpen className="h-6 w-6 text-accent-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Career Path</h3>
                    <p className="text-gray-600">Software Engineering</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 mb-3">Recommended Courses</h3>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-gray-600">B.Tech Computer Science</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-gray-600">B.Sc Computer Science</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-gray-600">BCA (Bachelor of Computer Applications)</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button 
              onClick={() => router.push('/career-mapping')}
              className="btn-primary text-lg px-8 py-3 flex items-center justify-center space-x-2"
            >
              <span>View Career Mapping</span>
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
            <Brain className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Aptitude & Interest Assessment
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Discover your strengths and find the perfect career path
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
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{Math.round(getProgress())}% Complete</span>
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
                  {questions[currentQuestion].category}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 leading-relaxed">
                {questions[currentQuestion].question}
              </h2>
            </div>

            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                    selectedAnswer === index
                      ? 'border-primary-600 bg-primary-50 text-primary-900'
                      : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswer === index
                        ? 'border-primary-600 bg-primary-600'
                        : 'border-gray-300'
                    }`}>
                      {selectedAnswer === index && (
                        <CheckCircle className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <span className="text-lg">{option}</span>
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
            <span>Previous</span>
          </button>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              {currentQuestion + 1} of {questions.length} questions
            </p>
          </div>

          {currentQuestion === questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={selectedAnswer === null}
              className="btn-primary px-8 py-3 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Submit Test</span>
              <CheckCircle className="h-5 w-5" />
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={selectedAnswer === null}
              className="btn-primary px-6 py-3 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Next</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default AptitudeTest
