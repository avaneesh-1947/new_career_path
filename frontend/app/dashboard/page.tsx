'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Avatar from '@/components/Avatar'
import { 
  User, 
  BookOpen, 
  Target, 
  TrendingUp, 
  Bell, 
  Calendar,
  Award,
  MapPin,
  MessageCircle,
  BarChart3,
  Clock,
  Star,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  GraduationCap,
  Briefcase,
  Heart
} from 'lucide-react'
// Import Recharts components directly for better compatibility
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts'

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [chartsLoaded, setChartsLoaded] = useState(false)
  const [user, setUser] = useState({
    name: 'Avaneesh ',
    email: 'avaneesh.m234@email.com',
    class: '12th Grade',
    stream: 'Science',
    location: 'Jhansi',
    avatar: '/api/placeholder/150/150/3b82f6/ffffff/PS'
  })

  useEffect(() => {
    // Simulate chart loading
    const timer = setTimeout(() => {
      setChartsLoaded(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const progressData = [
    { month: 'Jan', progress: 20 },
    { month: 'Feb', progress: 35 },
    { month: 'Mar', progress: 50 },
    { month: 'Apr', progress: 65 },
    { month: 'May', progress: 80 },
    { month: 'Jun', progress: 95 }
  ]

  const interestData = [
    { name: 'Technology', value: 35, color: '#3b82f6' },
    { name: 'Science', value: 25, color: '#10b981' },
    { name: 'Arts', value: 20, color: '#8b5cf6' },
    { name: 'Commerce', value: 20, color: '#f59e0b' }
  ]

  const notifications = [
    {
      id: 1,
      type: 'admission',
      title: 'Delhi University Admission Open',
      message: 'Applications for undergraduate courses are now open. Deadline: July 15, 2024',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      type: 'scholarship',
      title: 'Merit Scholarship Available',
      message: 'You qualify for the National Merit Scholarship. Apply before June 30, 2024',
      time: '1 day ago',
      read: false
    },
    {
      id: 3,
      type: 'career',
      title: 'Career Recommendation Updated',
      message: 'Based on your latest test, we recommend exploring Computer Science programs',
      time: '3 days ago',
      read: true
    }
  ]

  const upcomingEvents = [
    {
      id: 1,
      title: 'JEE Main 2024',
      date: '2024-06-15',
      type: 'exam',
      priority: 'high'
    },
    {
      id: 2,
      title: 'DU Admission Deadline',
      date: '2024-07-15',
      type: 'admission',
      priority: 'high'
    },
    {
      id: 3,
      title: 'Scholarship Application',
      date: '2024-06-30',
      type: 'scholarship',
      priority: 'medium'
    }
  ]

  const recommendedColleges = [
    {
      id: 1,
      name: 'Delhi University',
      location: 'New Delhi',
      rating: 4.8,
      match: 95,
      courses: ['B.Sc Computer Science', 'B.Tech IT']
    },
    {
      id: 2,
      name: 'JNU',
      location: 'New Delhi',
      rating: 4.9,
      match: 92,
      courses: ['B.Sc Physics', 'B.A Economics']
    },
    {
      id: 3,
      name: 'IIT Delhi',
      location: 'New Delhi',
      rating: 4.9,
      match: 88,
      courses: ['B.Tech Computer Science']
    }
  ]

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'career', name: 'Career Path', icon: Target },
    { id: 'colleges', name: 'Colleges', icon: MapPin },
    { id: 'notifications', name: 'Notifications', icon: Bell }
  ]

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'admission': return GraduationCap
      case 'scholarship': return Award
      case 'career': return Target
      default: return Bell
    }
  }

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'exam': return BookOpen
      case 'admission': return GraduationCap
      case 'scholarship': return Award
      default: return Calendar
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <Avatar
                  src={user.avatar}
                  alt={user.name}
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-full object-cover border-4 border-primary-200"
                  fallbackText="PS"
                />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
                  <p className="text-gray-600">{user.class} • {user.stream} • {user.location}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-gray-500">Career Match Score</p>
                  <p className="text-2xl font-bold text-primary-600">92%</p>
                </div>
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                  <Target className="h-8 w-8 text-primary-600" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="bg-white rounded-2xl shadow-xl p-2">
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-primary-600 text-white shadow-lg'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{tab.name}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {activeTab === 'overview' && (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Progress Chart */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Progress</h2>
                  {chartsLoaded ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={progressData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="progress"
                          stroke="#3b82f6"
                          strokeWidth={3}
                          dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-[300px] bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading your progress chart...</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Interest Distribution */}
              <div>
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Interest Areas</h2>
                  {chartsLoaded ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={interestData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {interestData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-[300px] bg-gradient-to-br from-purple-50 to-pink-100 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading interest areas...</p>
                      </div>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {interestData.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm text-gray-600">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="lg:col-span-3">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-white rounded-2xl shadow-xl p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Tests Completed</p>
                        <p className="text-3xl font-bold text-gray-900">3</p>
                      </div>
                      <div className="bg-primary-100 p-3 rounded-full">
                        <BookOpen className="h-6 w-6 text-primary-600" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-2xl shadow-xl p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Colleges Shortlisted</p>
                        <p className="text-3xl font-bold text-gray-900">8</p>
                      </div>
                      <div className="bg-secondary-100 p-3 rounded-full">
                        <MapPin className="h-6 w-6 text-secondary-600" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-2xl shadow-xl p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Scholarships Found</p>
                        <p className="text-3xl font-bold text-gray-900">5</p>
                      </div>
                      <div className="bg-accent-100 p-3 rounded-full">
                        <Award className="h-6 w-6 text-accent-600" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-2xl shadow-xl p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Career Match</p>
                        <p className="text-3xl font-bold text-gray-900">92%</p>
                      </div>
                      <div className="bg-green-100 p-3 rounded-full">
                        <Target className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'career' && (
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommended Career Path</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary-600 p-3 rounded-full">
                      <GraduationCap className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Computer Science Engineer</h3>
                      <p className="text-gray-600">Design and develop software applications</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-sm text-gray-500">Match: 95%</span>
                        <span className="text-sm text-green-600">High Growth</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-secondary-600 p-3 rounded-full">
                      <Briefcase className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Data Scientist</h3>
                      <p className="text-gray-600">Analyze data to drive business decisions</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-sm text-gray-500">Match: 88%</span>
                        <span className="text-sm text-green-600">Very High Growth</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-accent-600 p-3 rounded-full">
                      <Target className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Product Manager</h3>
                      <p className="text-gray-600">Lead product development and strategy</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-sm text-gray-500">Match: 82%</span>
                        <span className="text-sm text-green-600">High Growth</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Events</h2>
                  <div className="space-y-4">
                    {upcomingEvents.map((event) => {
                      const Icon = getEventIcon(event.type)
                      return (
                        <div key={event.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                          <div className="bg-primary-100 p-2 rounded-lg">
                            <Icon className="h-5 w-5 text-primary-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900">{event.title}</h3>
                            <p className="text-sm text-gray-600">{event.date}</p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(event.priority)}`}>
                            {event.priority}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Skills to Develop</h2>
                  <div className="space-y-3">
                    {['Programming', 'Problem Solving', 'Communication', 'Leadership'].map((skill, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-gray-900">{skill}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-primary-600 h-2 rounded-full" 
                              style={{ width: `${85 - index * 10}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-500">{85 - index * 10}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'colleges' && (
            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommended Colleges</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recommendedColleges.map((college) => (
                    <div key={college.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-200">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-gray-900">{college.name}</h3>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">{college.rating}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-gray-600 mb-4">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">{college.location}</span>
                      </div>
                      
                      <div className="mb-4">
                        <p className="text-sm text-gray-500 mb-2">Match Score</p>
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-primary-600 h-2 rounded-full" 
                              style={{ width: `${college.match}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-gray-900">{college.match}%</span>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <p className="text-sm text-gray-500 mb-2">Available Courses</p>
                        <div className="space-y-1">
                          {college.courses.map((course, index) => (
                            <span key={index} className="block text-sm text-gray-600">• {course}</span>
                          ))}
                        </div>
                      </div>
                      
                      <button className="w-full btn-primary flex items-center justify-center space-x-2">
                        <span>View Details</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Notifications</h2>
              <div className="space-y-4">
                {notifications.map((notification) => {
                  const Icon = getNotificationIcon(notification.type)
                  return (
                    <div 
                      key={notification.id} 
                      className={`flex items-start space-x-4 p-4 rounded-xl border-l-4 ${
                        notification.read 
                          ? 'bg-gray-50 border-gray-200' 
                          : 'bg-primary-50 border-primary-500'
                      }`}
                    >
                      <div className={`p-2 rounded-full ${
                        notification.read ? 'bg-gray-200' : 'bg-primary-100'
                      }`}>
                        <Icon className={`h-5 w-5 ${
                          notification.read ? 'text-gray-600' : 'text-primary-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-medium ${
                          notification.read ? 'text-gray-700' : 'text-gray-900'
                        }`}>
                          {notification.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-primary-600 rounded-full" />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard
