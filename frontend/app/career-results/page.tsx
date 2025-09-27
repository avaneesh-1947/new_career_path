'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { 
  ArrowRight, 
  Star, 
  TrendingUp, 
  Users, 
  DollarSign,
  BookOpen,
  MapPin,
  Award,
  Target,
  Heart,
  Briefcase,
  GraduationCap,
  BarChart3,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon
} from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
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
  Cell,
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts'

interface CareerData {
  id: string
  name: string
  description: string
  salaryRange: string
  growthRate: number
  demand: 'High' | 'Medium' | 'Low'
  education: string[]
  skills: string[]
  match: number
  icon: any
  color: string
  category: string
}

interface SuccessStory {
  id: string
  name: string
  career: string
  company: string
  achievement: string
  quote: string
  image: string
  education: string
  experience: string
}

const CareerResults = () => {
  const router = useRouter()
  const { t } = useLanguage()
  const [selectedCareer, setSelectedCareer] = useState<CareerData | null>(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [interestPayload, setInterestPayload] = useState<any>(null)

  // Sample career data - in real app, this would come from API
  const careerData: CareerData[] = [
    {
      id: '1',
      name: 'Software Engineer',
      description: 'Design, develop, and maintain software applications and systems',
      salaryRange: '₹6-20 LPA',
      growthRate: 25,
      demand: 'High',
      education: ['B.Tech Computer Science', 'B.Sc Computer Science', 'MCA'],
      skills: ['Programming', 'Problem Solving', 'System Design', 'Database Management'],
      match: 95,
      icon: BookOpen,
      color: '#3b82f6',
      category: 'Technology'
    },
    {
      id: '2',
      name: 'Data Scientist',
      description: 'Analyze complex data to help organizations make informed decisions',
      salaryRange: '₹8-25 LPA',
      growthRate: 35,
      demand: 'High',
      education: ['B.Tech Data Science', 'M.Sc Statistics', 'MBA Analytics'],
      skills: ['Python', 'Machine Learning', 'Statistics', 'Data Visualization'],
      match: 88,
      icon: BarChart3,
      color: '#10b981',
      category: 'Analytics'
    },
    {
      id: '3',
      name: 'Product Manager',
      description: 'Lead product development and strategy for technology companies',
      salaryRange: '₹10-30 LPA',
      growthRate: 20,
      demand: 'High',
      education: ['MBA', 'B.Tech + MBA', 'Business Administration'],
      skills: ['Leadership', 'Strategic Thinking', 'Communication', 'Market Analysis'],
      match: 82,
      icon: Target,
      color: '#f59e0b',
      category: 'Management'
    }
  ]

  useEffect(() => {
    try {
      const stored = localStorage.getItem('riasecResults')
      if (stored) setInterestPayload(JSON.parse(stored))
    } catch {}
  }, [])

  const successStories: SuccessStory[] = [
    {
      id: '1',
      name: 'Priya Sharma',
      career: 'Software Engineer',
      company: 'Google',
      achievement: 'Led development of AI-powered search features used by 2 billion users',
      quote: 'The key to success in tech is continuous learning and staying curious about new technologies.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      education: 'B.Tech Computer Science, IIT Delhi',
      experience: '5 years'
    },
    {
      id: '2',
      name: 'Arjun Patel',
      career: 'Data Scientist',
      company: 'Microsoft',
      achievement: 'Developed machine learning models that improved customer satisfaction by 40%',
      quote: 'Data science is about finding patterns that others miss and turning them into actionable insights.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      education: 'M.Sc Statistics, IISc Bangalore',
      experience: '6 years'
    },
    {
      id: '3',
      name: 'Sneha Reddy',
      career: 'Product Manager',
      company: 'Amazon',
      achievement: 'Launched 3 successful products generating $50M+ in revenue',
      quote: 'Great products come from understanding users deeply and solving real problems.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      education: 'MBA, IIM Ahmedabad',
      experience: '7 years'
    }
  ]

  // Chart data
  const salaryData = [
    { career: 'Software Engineer', salary: 12, growth: 25 },
    { career: 'Data Scientist', salary: 15, growth: 35 },
    { career: 'Product Manager', salary: 18, growth: 20 }
  ]

  const skillData = [
    { skill: 'Programming', value: 90 },
    { skill: 'Problem Solving', value: 85 },
    { skill: 'Communication', value: 80 },
    { skill: 'Leadership', value: 75 },
    { skill: 'Analytics', value: 88 }
  ]

  const demandData = [
    { name: 'High Demand', value: 60, color: '#10b981' },
    { name: 'Medium Demand', value: 30, color: '#f59e0b' },
    { name: 'Low Demand', value: 10, color: '#ef4444' }
  ]

  const radarData = [
    {
      subject: 'Technical Skills',
      Software: 90,
      Data: 88,
      Product: 70
    },
    {
      subject: 'Communication',
      Software: 75,
      Data: 80,
      Product: 95
    },
    {
      subject: 'Leadership',
      Software: 60,
      Data: 70,
      Product: 90
    },
    {
      subject: 'Analytics',
      Software: 85,
      Data: 95,
      Product: 85
    },
    {
      subject: 'Creativity',
      Software: 80,
      Data: 75,
      Product: 88
    }
  ]

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'careers', name: 'Career Details', icon: Briefcase },
    { id: 'stories', name: 'Success Stories', icon: Award },
    { id: 'colleges', name: 'Colleges', icon: GraduationCap }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="bg-primary-600 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <Target className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Your Career Analysis
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Based on your assessment, here are your top career matches with detailed insights.
          </p>
          {interestPayload && (
            <div className="mt-6 max-w-3xl mx-auto bg-white rounded-xl shadow p-4">
              <p className="text-sm text-gray-600 mb-2">Your top interests</p>
              <div className="flex flex-wrap gap-2">
                {interestPayload.results.slice(0,3).map((r: any) => (
                  <span key={r.type} className="px-3 py-1 rounded-full text-sm" style={{backgroundColor: r.color+"20", color: r.color}}>
                    {r.name} {r.percentage}%
                  </span>
                ))}
              </div>
            </div>
          )}
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
            <div className="space-y-8">
              {/* Career Cards */}
              <div className="grid md:grid-cols-3 gap-6">
                {careerData.map((career, index) => {
                  const Icon = career.icon
                  return (
                    <motion.div
                      key={career.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 cursor-pointer"
                      onClick={() => setSelectedCareer(career)}
                    >
                      <div className="flex items-center space-x-3 mb-4">
                        <div 
                          className="p-3 rounded-full"
                          style={{ backgroundColor: career.color + '20' }}
                        >
                          <Icon className="h-6 w-6" style={{ color: career.color }} />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{career.name}</h3>
                          <p className="text-sm text-gray-600">{career.category}</p>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-4 text-sm">{career.description}</p>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Match Score</span>
                          <span className="font-medium">{career.match}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full transition-all duration-1000"
                            style={{ 
                              width: `${career.match}%`,
                              backgroundColor: career.color
                            }}
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Salary</p>
                          <p className="font-medium text-gray-900">{career.salaryRange}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Growth</p>
                          <p className="font-medium text-green-600">+{career.growthRate}%</p>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* Charts Section */}
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Salary Comparison Chart */}
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Salary Comparison</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={salaryData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="career" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="salary" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Demand Distribution */}
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Market Demand</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={demandData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {demandData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Skills Radar Chart */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Skills Comparison</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis />
                    <Radar
                      name="Software Engineer"
                      dataKey="Software"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.3}
                    />
                    <Radar
                      name="Data Scientist"
                      dataKey="Data"
                      stroke="#10b981"
                      fill="#10b981"
                      fillOpacity={0.3}
                    />
                    <Radar
                      name="Product Manager"
                      dataKey="Product"
                      stroke="#f59e0b"
                      fill="#f59e0b"
                      fillOpacity={0.3}
                    />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {activeTab === 'careers' && (
            <div className="space-y-8">
              {careerData.map((career, index) => {
                const Icon = career.icon
                return (
                  <motion.div
                    key={career.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white rounded-2xl shadow-xl p-8"
                  >
                    <div className="flex items-start space-x-4 mb-6">
                      <div 
                        className="p-3 rounded-full"
                        style={{ backgroundColor: career.color + '20' }}
                      >
                        <Icon className="h-8 w-8" style={{ color: career.color }} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{career.name}</h3>
                        <p className="text-gray-600 mb-4">{career.description}</p>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Star className="h-5 w-5 text-yellow-500 fill-current" />
                            <span className="font-medium">{career.match}% Match</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <TrendingUp className="h-5 w-5 text-green-500" />
                            <span className="text-green-600">+{career.growthRate}% Growth</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Information</h4>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <DollarSign className="h-5 w-5 text-gray-400" />
                            <div>
                              <p className="text-sm text-gray-500">Salary Range</p>
                              <p className="font-medium text-gray-900">{career.salaryRange}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Users className="h-5 w-5 text-gray-400" />
                            <div>
                              <p className="text-sm text-gray-500">Market Demand</p>
                              <p className="font-medium text-gray-900">{career.demand}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <TrendingUp className="h-5 w-5 text-gray-400" />
                            <div>
                              <p className="text-sm text-gray-500">Growth Rate</p>
                              <p className="font-medium text-gray-900">{career.growthRate}% annually</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Required Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {career.skills.map((skill, idx) => (
                            <span
                              key={idx}
                              className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Education Path</h4>
                      <div className="space-y-2">
                        {career.education.map((edu, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-gray-700">{edu}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}

          {activeTab === 'stories' && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Success Stories</h2>
                <p className="text-xl text-gray-600">
                  Real professionals who found success in these career paths
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {successStories.map((story, index) => (
                  <motion.div
                    key={story.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300"
                  >
                    <div className="text-center mb-4">
                      <img
                        src={story.image}
                        alt={story.name}
                        className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                      />
                      <h3 className="text-xl font-bold text-gray-900">{story.name}</h3>
                      <p className="text-primary-600 font-medium">{story.career}</p>
                      <p className="text-gray-600 text-sm">{story.company}</p>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Key Achievement</h4>
                      <p className="text-gray-600 text-sm">{story.achievement}</p>
                    </div>

                    <blockquote className="mb-4 p-4 bg-gray-50 rounded-lg">
                      <p className="text-gray-700 italic">"{story.quote}"</p>
                    </blockquote>

                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-500">Education: </span>
                        <span className="text-gray-900">{story.education}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Experience: </span>
                        <span className="text-gray-900">{story.experience}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'colleges' && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Recommended Colleges</h2>
                <p className="text-xl text-gray-600">
                  Top institutions offering programs in your recommended career fields
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    name: 'IIT Delhi',
                    location: 'New Delhi',
                    programs: ['B.Tech Computer Science', 'M.Tech Data Science'],
                    rating: 4.9,
                    match: 95
                  },
                  {
                    name: 'IISc Bangalore',
                    location: 'Bangalore',
                    programs: ['M.Sc Statistics', 'PhD Data Science'],
                    rating: 4.8,
                    match: 92
                  },
                  {
                    name: 'IIM Ahmedabad',
                    location: 'Ahmedabad',
                    programs: ['MBA', 'PGP in Management'],
                    rating: 4.9,
                    match: 88
                  }
                ].map((college, index) => (
                  <motion.div
                    key={college.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900">{college.name}</h3>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="font-medium">{college.rating}</span>
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
                      <p className="text-sm text-gray-500 mb-2">Programs</p>
                      <div className="space-y-1">
                        {college.programs.map((program, idx) => (
                          <span key={idx} className="block text-sm text-gray-600">• {program}</span>
                        ))}
                      </div>
                    </div>
                    
                    <button className="w-full btn-primary flex items-center justify-center space-x-2">
                      <span>View Details</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default CareerResults
