'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Send, 
  Bot, 
  User, 
  Loader2, 
  MessageCircle,
  Lightbulb,
  BookOpen,
  MapPin,
  Target,
  ArrowRight,
  RotateCcw,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  suggestedActions?: Array<{
    type: string
    label: string
    url: string
  }>
}

const CareerGenie = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Load initial suggestions
    const initialSuggestions = [
      "What career options are available for science stream students?",
      "How do I choose between engineering and medicine?",
      "What are the best government colleges for computer science?",
      "How can I improve my chances of getting into IIT?",
      "What skills should I develop for a career in data science?"
    ]
    setSuggestions(initialSuggestions)

    // Add welcome message
    const welcomeMessage: Message = {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm CareerGenie, your AI career guidance assistant. I'm here to help you discover your perfect career path, explore educational opportunities, and make informed decisions about your future. How can I assist you today?",
      timestamp: new Date(),
      suggestedActions: [
        { type: 'navigate', label: 'Take Aptitude Test', url: '/aptitude-test' },
        { type: 'navigate', label: 'Explore Career Paths', url: '/career-mapping' },
        { type: 'navigate', label: 'Find Colleges', url: '/colleges' }
      ]
    }
    setMessages([welcomeMessage])
  }, [])

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateAIResponse(inputMessage),
        timestamp: new Date(),
        suggestedActions: generateSuggestedActions(inputMessage)
      }

      setMessages(prev => [...prev, aiResponse])
    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion)
  }

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()
    
    if (lowerMessage.includes('career') && lowerMessage.includes('science')) {
      return "Great question! For science stream students, there are numerous exciting career paths available:\n\n**Engineering Fields:**\n- Software Engineering (High demand, ₹6-15 LPA)\n- Data Science (Growing field, ₹8-20 LPA)\n- Biotechnology (Research opportunities)\n\n**Medical Fields:**\n- Medicine (MBBS, MD)\n- Dentistry (BDS)\n- Pharmacy (B.Pharm)\n\n**Pure Sciences:**\n- Research Scientist\n- Environmental Science\n- Physics/Chemistry research\n\nI'd recommend taking our aptitude test to get personalized career recommendations based on your interests and strengths. Would you like to explore any specific field in detail?"
    }
    
    if (lowerMessage.includes('engineering') && lowerMessage.includes('medicine')) {
      return "This is a common dilemma! Here's how to decide between Engineering and Medicine:\n\n**Choose Engineering if:**\n- You enjoy problem-solving and technology\n- You prefer structured, logical thinking\n- You want faster career entry (4 years vs 5.5+ years)\n- You're interested in innovation and building things\n\n**Choose Medicine if:**\n- You have a strong desire to help people directly\n- You're comfortable with long study periods\n- You enjoy biology and human anatomy\n- You want a stable, respected profession\n\n**Consider:**\n- Your aptitude test results\n- Your interests and personality\n- Career goals and lifestyle preferences\n- Financial considerations\n\nWould you like to take our aptitude test to get personalized insights?"
    }
    
    if (lowerMessage.includes('college') && lowerMessage.includes('computer science')) {
      return "Excellent choice! Computer Science is a highly sought-after field. Here are some top government colleges for CS:\n\n**IITs (Most Prestigious):**\n- IIT Delhi, Bombay, Madras, Kanpur\n- Cut-off: 99+ percentile in JEE Advanced\n- Fees: ₹2-3 LPA\n\n**NITs:**\n- NIT Trichy, Warangal, Surathkal\n- Cut-off: 95+ percentile in JEE Main\n- Fees: ₹1.5-2 LPA\n\n**State Universities:**\n- Delhi University (B.Sc CS)\n- Anna University, Chennai\n- Jadavpur University, Kolkata\n\n**Admission Process:**\n- JEE Main/Advanced for IITs/NITs\n- University-specific entrance exams\n- Merit-based for some colleges\n\nWould you like me to help you find colleges near your location or explain the admission process?"
    }
    
    if (lowerMessage.includes('iit') || lowerMessage.includes('jee')) {
      return "Getting into IIT is a great goal! Here's a comprehensive preparation strategy:\n\n**Academic Preparation:**\n- Strong foundation in Physics, Chemistry, Mathematics\n- Regular practice of JEE Main and Advanced papers\n- Focus on conceptual understanding over rote learning\n\n**Study Plan:**\n- 6-8 hours daily study\n- Solve previous year papers\n- Take mock tests regularly\n- Identify and work on weak areas\n\n**Resources:**\n- NCERT books (essential)\n- Coaching materials (if taking coaching)\n- Online platforms like Khan Academy\n- JEE preparation apps\n\n**Timeline:**\n- Start early (Class 11)\n- Consistent practice\n- Regular revision\n- Mock test analysis\n\n**Alternative Paths:**\n- NITs (excellent options)\n- IIITs (specialized in IT)\n- State engineering colleges\n\nWould you like specific study tips or information about coaching options?"
    }
    
    if (lowerMessage.includes('skill') && lowerMessage.includes('data science')) {
      return "Data Science is an excellent career choice! Here are the essential skills to develop:\n\n**Technical Skills:**\n- **Programming:** Python (most important), R, SQL\n- **Statistics & Mathematics:** Probability, Linear Algebra, Calculus\n- **Machine Learning:** Algorithms, Model Building, Evaluation\n- **Data Visualization:** Tableau, Power BI, Matplotlib\n\n**Tools & Technologies:**\n- **Databases:** MySQL, PostgreSQL, MongoDB\n- **Big Data:** Hadoop, Spark, Kafka\n- **Cloud Platforms:** AWS, Google Cloud, Azure\n- **Version Control:** Git, GitHub\n\n**Soft Skills:**\n- Problem-solving mindset\n- Business acumen\n- Communication skills\n- Critical thinking\n\n**Learning Path:**\n1. Start with Python basics\n2. Learn statistics and mathematics\n3. Practice with real datasets\n4. Build projects and portfolio\n5. Get certified in relevant tools\n\n**Resources:**\n- Coursera, edX, Udemy courses\n- Kaggle competitions\n- GitHub projects\n- Data Science blogs\n\nWould you like specific course recommendations or project ideas?"
    }
    
    return "That's an interesting question! I'd be happy to help you with that. Could you provide a bit more context about your specific situation? For example:\n\n- What's your current academic background?\n- What are your main interests?\n- What are your career goals?\n- Any specific concerns or challenges you're facing?\n\nThe more details you share, the better I can assist you with personalized guidance. You can also take our aptitude test to get comprehensive career recommendations based on your interests and strengths."
  }

  const generateSuggestedActions = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase()
    const actions = []

    if (lowerMessage.includes('career') || lowerMessage.includes('job')) {
      actions.push({ type: 'navigate', label: 'Explore Career Paths', url: '/career-mapping' })
    }
    
    if (lowerMessage.includes('college') || lowerMessage.includes('university')) {
      actions.push({ type: 'navigate', label: 'Find Colleges', url: '/colleges' })
    }
    
    if (lowerMessage.includes('test') || lowerMessage.includes('aptitude')) {
      actions.push({ type: 'navigate', label: 'Take Aptitude Test', url: '/aptitude-test' })
    }
    
    if (lowerMessage.includes('skill') || lowerMessage.includes('learn')) {
      actions.push({ type: 'external', label: 'Skill Development', url: 'https://www.coursera.org' })
    }

    return actions
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="bg-primary-600 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <MessageCircle className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Career Genie
          </h1>
          <p className="text-xl text-gray-600">
            Your AI-powered career guidance assistant
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-xl h-[600px] flex flex-col">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-start space-x-3 max-w-[80%] ${
                        message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                      }`}>
                        <div className={`p-2 rounded-full ${
                          message.role === 'user' 
                            ? 'bg-primary-600' 
                            : 'bg-secondary-600'
                        }`}>
                          {message.role === 'user' ? (
                            <User className="h-5 w-5 text-white" />
                          ) : (
                            <Bot className="h-5 w-5 text-white" />
                          )}
                        </div>
                        <div className={`rounded-2xl p-4 ${
                          message.role === 'user'
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}>
                          <p className="whitespace-pre-line">{message.content}</p>
                          <p className={`text-xs mt-2 ${
                            message.role === 'user' ? 'text-primary-100' : 'text-gray-500'
                          }`}>
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="p-2 rounded-full bg-secondary-600">
                        <Bot className="h-5 w-5 text-white" />
                      </div>
                      <div className="bg-gray-100 rounded-2xl p-4">
                        <div className="flex items-center space-x-2">
                          <Loader2 className="h-4 w-4 animate-spin text-secondary-600" />
                          <span className="text-gray-600">CareerGenie is thinking...</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Suggested Actions */}
              {messages.length > 0 && messages[messages.length - 1].suggestedActions && (
                <div className="px-6 pb-4">
                  <div className="flex flex-wrap gap-2">
                    {messages[messages.length - 1].suggestedActions?.map((action, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          if (action.type === 'navigate') {
                            window.location.href = action.url
                          } else if (action.type === 'external') {
                            window.open(action.url, '_blank')
                          }
                        }}
                        className="bg-primary-100 hover:bg-primary-200 text-primary-800 px-3 py-2 rounded-lg text-sm transition-colors duration-200 flex items-center space-x-1"
                      >
                        <span>{action.label}</span>
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="p-6 border-t border-gray-200">
                <div className="flex space-x-4">
                  <div className="flex-1 relative">
                    <textarea
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me anything about careers, colleges, or education..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                      rows={2}
                      disabled={isLoading}
                    />
                  </div>
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isLoading}
                    className="btn-primary px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Suggestions */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <Lightbulb className="h-5 w-5 text-accent-600" />
                <span>Quick Questions</span>
              </h3>
              <div className="space-y-2">
                {suggestions.slice(0, 5).map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full text-left p-3 bg-gray-50 hover:bg-primary-50 rounded-lg text-sm transition-colors duration-200"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => window.location.href = '/aptitude-test'}
                  className="w-full btn-primary flex items-center justify-center space-x-2"
                >
                  <Target className="h-4 w-4" />
                  <span>Take Aptitude Test</span>
                </button>
                <button 
                  onClick={() => window.location.href = '/career-mapping'}
                  className="w-full btn-outline flex items-center justify-center space-x-2"
                >
                  <BookOpen className="h-4 w-4" />
                  <span>Career Mapping</span>
                </button>
                <button 
                  onClick={() => window.location.href = '/colleges'}
                  className="w-full btn-outline flex items-center justify-center space-x-2"
                >
                  <MapPin className="h-4 w-4" />
                  <span>Find Colleges</span>
                </button>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">💡 Pro Tips</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Be specific about your interests and goals</li>
                <li>• Ask about career prospects and salary ranges</li>
                <li>• Inquire about required skills and qualifications</li>
                <li>• Get information about admission processes</li>
                <li>• Ask for alternative career paths</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CareerGenie
