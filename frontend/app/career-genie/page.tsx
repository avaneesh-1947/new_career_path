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
  ThumbsDown,
  X,
  Star,
  Clock,
  Zap,
  Brain,
  Heart,
  Sparkles,
  ChevronDown,
  Copy,
  Check,
  RefreshCw
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
  isTyping?: boolean
  isLiked?: boolean
  isDisliked?: boolean
}

const CareerGenie = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

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
    inputRef.current?.focus()
  }

  const handleLikeMessage = (messageId: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, isLiked: !msg.isLiked, isDisliked: false }
        : msg
    ))
  }

  const handleDislikeMessage = (messageId: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, isDisliked: !msg.isDisliked, isLiked: false }
        : msg
    ))
  }

  const handleCopyMessage = async (content: string, messageId: string) => {
    try {
      await navigator.clipboard.writeText(content)
      setCopiedMessageId(messageId)
      setTimeout(() => setCopiedMessageId(null), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const handleClearChat = () => {
    setMessages([])
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
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="relative">
            <div className="bg-gradient-to-r from-primary-600 to-secondary-600 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center shadow-lg">
              <MessageCircle className="h-10 w-10 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 bg-accent-500 rounded-full p-2">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Career Genie
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your AI-powered career guidance assistant. Get personalized advice, explore career paths, and make informed decisions about your future.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Chat Interface */}
          <div className="flex-1 lg:flex-[3]">
            <div className="bg-white rounded-2xl shadow-xl h-[600px] lg:h-[700px] flex flex-col relative overflow-hidden">
              {/* Chat Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-primary-50 to-secondary-50">
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-primary-600 to-secondary-600 p-2 rounded-full">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Career Genie</h3>
                    <p className="text-sm text-gray-500">AI Career Assistant</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleClearChat}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Clear Chat"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </button>
                </div>
              </div>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4">
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
                      <div className={`flex items-start space-x-3 max-w-[85%] lg:max-w-[80%] ${
                        message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                      }`}>
                        <div className={`p-2 rounded-full flex-shrink-0 ${
                          message.role === 'user' 
                            ? 'bg-gradient-to-r from-primary-600 to-primary-700' 
                            : 'bg-gradient-to-r from-secondary-600 to-secondary-700'
                        }`}>
                          {message.role === 'user' ? (
                            <User className="h-4 w-4 lg:h-5 lg:w-5 text-white" />
                          ) : (
                            <Bot className="h-4 w-4 lg:h-5 lg:w-5 text-white" />
                          )}
                        </div>
                        <div className={`rounded-2xl p-4 relative group ${
                          message.role === 'user'
                            ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white'
                            : 'bg-gray-100 text-gray-900 border border-gray-200'
                        }`}>
                          <p className="whitespace-pre-line text-sm lg:text-base leading-relaxed">{message.content}</p>
                          <div className="flex items-center justify-between mt-3">
                            <p className={`text-xs ${
                              message.role === 'user' ? 'text-primary-100' : 'text-gray-500'
                            }`}>
                              {message.timestamp.toLocaleTimeString()}
                            </p>
                            {message.role === 'assistant' && (
                              <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                  onClick={() => handleLikeMessage(message.id)}
                                  className={`p-1 rounded ${
                                    message.isLiked 
                                      ? 'bg-green-100 text-green-600' 
                                      : 'hover:bg-gray-200 text-gray-400'
                                  }`}
                                  title="Like"
                                >
                                  <ThumbsUp className="h-3 w-3" />
                                </button>
                                <button
                                  onClick={() => handleDislikeMessage(message.id)}
                                  className={`p-1 rounded ${
                                    message.isDisliked 
                                      ? 'bg-red-100 text-red-600' 
                                      : 'hover:bg-gray-200 text-gray-400'
                                  }`}
                                  title="Dislike"
                                >
                                  <ThumbsDown className="h-3 w-3" />
                                </button>
                                <button
                                  onClick={() => handleCopyMessage(message.content, message.id)}
                                  className="p-1 rounded hover:bg-gray-200 text-gray-400"
                                  title="Copy"
                                >
                                  {copiedMessageId === message.id ? (
                                    <Check className="h-3 w-3 text-green-600" />
                                  ) : (
                                    <Copy className="h-3 w-3" />
                                  )}
                                </button>
                              </div>
                            )}
                          </div>
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
                    <div className="flex items-start space-x-3 max-w-[85%] lg:max-w-[80%]">
                      <div className="p-2 rounded-full bg-gradient-to-r from-secondary-600 to-secondary-700 flex-shrink-0">
                        <Bot className="h-4 w-4 lg:h-5 lg:w-5 text-white" />
                      </div>
                      <div className="bg-gray-100 rounded-2xl p-4 border border-gray-200">
                        <div className="flex items-center space-x-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-secondary-600 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-secondary-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-secondary-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                          <span className="text-gray-600 text-sm">CareerGenie is thinking...</span>
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
              <div className="p-4 lg:p-6 border-t border-gray-200 bg-gray-50">
                <div className="flex flex-col space-y-3">
                  {/* Quick Suggestions */}
                  {showSuggestions && suggestions.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {suggestions.slice(0, 3).map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="text-xs bg-white border border-gray-300 text-gray-700 px-3 py-1 rounded-full hover:bg-primary-50 hover:border-primary-300 hover:text-primary-700 transition-colors"
                        >
                          {suggestion.length > 30 ? `${suggestion.substring(0, 30)}...` : suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex space-x-3">
                    <div className="flex-1 relative">
                      <textarea
                        ref={inputRef}
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask me anything about careers, colleges, or education..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none text-sm lg:text-base"
                        rows={2}
                        disabled={isLoading}
                      />
                      <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                        {inputMessage.length}/500
                      </div>
                    </div>
                    <button
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim() || isLoading}
                      className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-4 lg:px-6 py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 hover:from-primary-700 hover:to-primary-800 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      <Send className="h-4 w-4 lg:h-5 lg:w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-80 space-y-6">
            {/* Quick Suggestions */}
            <div className="bg-white rounded-2xl shadow-xl p-4 lg:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 flex items-center space-x-2">
                  <Lightbulb className="h-5 w-5 text-accent-600" />
                  <span>Quick Questions</span>
                </h3>
                <button
                  onClick={() => setShowSuggestions(!showSuggestions)}
                  className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${showSuggestions ? 'rotate-180' : ''}`} />
                </button>
              </div>
              {showSuggestions && (
                <div className="space-y-2">
                  {suggestions.slice(0, 5).map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full text-left p-3 bg-gray-50 hover:bg-primary-50 rounded-lg text-sm transition-colors duration-200 border border-transparent hover:border-primary-200"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-xl p-4 lg:p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <Zap className="h-5 w-5 text-primary-600" />
                <span>Quick Actions</span>
              </h3>
              <div className="space-y-3">
                <button 
                  onClick={() => window.location.href = '/aptitude-test'}
                  className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-3 px-4 rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                >
                  <Target className="h-4 w-4" />
                  <span>Take Aptitude Test</span>
                </button>
                <button 
                  onClick={() => window.location.href = '/career-mapping'}
                  className="w-full border-2 border-primary-200 text-primary-700 py-3 px-4 rounded-xl hover:bg-primary-50 hover:border-primary-300 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <BookOpen className="h-4 w-4" />
                  <span>Career Mapping</span>
                </button>
                <button 
                  onClick={() => window.location.href = '/colleges'}
                  className="w-full border-2 border-secondary-200 text-secondary-700 py-3 px-4 rounded-xl hover:bg-secondary-50 hover:border-secondary-300 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <MapPin className="h-4 w-4" />
                  <span>Find Colleges</span>
                </button>
                <button 
                  onClick={() => window.location.href = '/mentors'}
                  className="w-full border-2 border-accent-200 text-accent-700 py-3 px-4 rounded-xl hover:bg-accent-50 hover:border-accent-300 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <Heart className="h-4 w-4" />
                  <span>Connect with Mentors</span>
                </button>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-4 lg:p-6 border border-primary-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <Brain className="h-5 w-5 text-primary-600" />
                <span>Pro Tips</span>
              </h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="bg-primary-100 rounded-full p-1 mt-0.5">
                    <Star className="h-3 w-3 text-primary-600" />
                  </div>
                  <p className="text-sm text-gray-600">Be specific about your interests and goals</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-primary-100 rounded-full p-1 mt-0.5">
                    <Star className="h-3 w-3 text-primary-600" />
                  </div>
                  <p className="text-sm text-gray-600">Ask about career prospects and growth opportunities</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-primary-100 rounded-full p-1 mt-0.5">
                    <Star className="h-3 w-3 text-primary-600" />
                  </div>
                  <p className="text-sm text-gray-600">Inquire about required skills and qualifications</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-primary-100 rounded-full p-1 mt-0.5">
                    <Star className="h-3 w-3 text-primary-600" />
                  </div>
                  <p className="text-sm text-gray-600">Get information about admission processes</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-primary-100 rounded-full p-1 mt-0.5">
                    <Star className="h-3 w-3 text-primary-600" />
                  </div>
                  <p className="text-sm text-gray-600">Ask for alternative career paths</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default CareerGenie
