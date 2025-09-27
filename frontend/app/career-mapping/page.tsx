'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowRight, 
  BookOpen, 
  Briefcase, 
  GraduationCap,
  Target,
  TrendingUp,
  Users,
  Award,
  MapPin,
  Clock,
  DollarSign,
  Star
} from 'lucide-react'
// Import Recharts components directly
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

const CareerMapping = () => {
  const [selectedStream, setSelectedStream] = useState('science')
  const [selectedCareer, setSelectedCareer] = useState('software-engineer')

  const streams = [
    {
      id: 'science',
      name: 'Science',
      icon: BookOpen,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      id: 'commerce',
      name: 'Commerce',
      icon: Briefcase,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      id: 'arts',
      name: 'Arts',
      icon: GraduationCap,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    }
  ]

  const careerPaths = {
    science: [
      {
        id: 'software-engineer',
        title: 'Software Engineer',
        degree: 'B.Tech Computer Science',
        duration: '4 years',
        salary: '₹6-15 LPA',
        growth: 'High',
        description: 'Design and develop software applications, websites, and systems.',
        skills: ['Programming', 'Problem Solving', 'Teamwork', 'Communication'],
        opportunities: ['Tech Companies', 'Startups', 'Government IT', 'Freelancing'],
        chartData: [
          { year: '2024', salary: 6 },
          { year: '2025', salary: 8 },
          { year: '2026', salary: 10 },
          { year: '2027', salary: 12 },
          { year: '2028', salary: 15 }
        ]
      },
      {
        id: 'data-scientist',
        title: 'Data Scientist',
        degree: 'B.Sc Data Science',
        duration: '3 years',
        salary: '₹8-20 LPA',
        growth: 'Very High',
        description: 'Analyze complex data to help organizations make informed decisions.',
        skills: ['Statistics', 'Machine Learning', 'Python', 'Analytics'],
        opportunities: ['Tech Giants', 'Consulting', 'Research', 'Finance'],
        chartData: [
          { year: '2024', salary: 8 },
          { year: '2025', salary: 10 },
          { year: '2026', salary: 13 },
          { year: '2027', salary: 16 },
          { year: '2028', salary: 20 }
        ]
      },
      {
        id: 'doctor',
        title: 'Doctor',
        degree: 'MBBS',
        duration: '5.5 years',
        salary: '₹10-25 LPA',
        growth: 'Stable',
        description: 'Diagnose and treat patients, provide medical care and advice.',
        skills: ['Medical Knowledge', 'Empathy', 'Decision Making', 'Communication'],
        opportunities: ['Hospitals', 'Private Practice', 'Research', 'Government'],
        chartData: [
          { year: '2024', salary: 10 },
          { year: '2025', salary: 12 },
          { year: '2026', salary: 15 },
          { year: '2027', salary: 18 },
          { year: '2028', salary: 25 }
        ]
      }
    ],
    commerce: [
      {
        id: 'chartered-accountant',
        title: 'Chartered Accountant',
        degree: 'B.Com + CA',
        duration: '5 years',
        salary: '₹8-18 LPA',
        growth: 'High',
        description: 'Manage financial records, audit accounts, and provide financial advice.',
        skills: ['Accounting', 'Taxation', 'Auditing', 'Financial Analysis'],
        opportunities: ['CA Firms', 'Corporations', 'Government', 'Consulting'],
        chartData: [
          { year: '2024', salary: 8 },
          { year: '2025', salary: 10 },
          { year: '2026', salary: 12 },
          { year: '2027', salary: 15 },
          { year: '2028', salary: 18 }
        ]
      },
      {
        id: 'investment-banker',
        title: 'Investment Banker',
        degree: 'B.Com Finance',
        duration: '3 years',
        salary: '₹12-30 LPA',
        growth: 'Very High',
        description: 'Help companies raise capital and provide financial advisory services.',
        skills: ['Financial Modeling', 'Negotiation', 'Analytics', 'Communication'],
        opportunities: ['Investment Banks', 'Private Equity', 'Hedge Funds', 'Corporations'],
        chartData: [
          { year: '2024', salary: 12 },
          { year: '2025', salary: 15 },
          { year: '2026', salary: 18 },
          { year: '2027', salary: 22 },
          { year: '2028', salary: 30 }
        ]
      }
    ],
    arts: [
      {
        id: 'journalist',
        title: 'Journalist',
        degree: 'B.A Journalism',
        duration: '3 years',
        salary: '₹4-12 LPA',
        growth: 'Moderate',
        description: 'Research, write, and report news stories for various media outlets.',
        skills: ['Writing', 'Research', 'Communication', 'Critical Thinking'],
        opportunities: ['News Channels', 'Newspapers', 'Online Media', 'Freelancing'],
        chartData: [
          { year: '2024', salary: 4 },
          { year: '2025', salary: 5 },
          { year: '2026', salary: 7 },
          { year: '2027', salary: 9 },
          { year: '2028', salary: 12 }
        ]
      },
      {
        id: 'psychologist',
        title: 'Psychologist',
        degree: 'B.A Psychology',
        duration: '3 years',
        salary: '₹5-15 LPA',
        growth: 'High',
        description: 'Study human behavior and provide mental health support.',
        skills: ['Empathy', 'Active Listening', 'Analysis', 'Communication'],
        opportunities: ['Hospitals', 'Schools', 'Private Practice', 'Research'],
        chartData: [
          { year: '2024', salary: 5 },
          { year: '2025', salary: 6 },
          { year: '2026', salary: 8 },
          { year: '2027', salary: 11 },
          { year: '2028', salary: 15 }
        ]
      }
    ]
  }

  const selectedCareerData = careerPaths[selectedStream as keyof typeof careerPaths]?.find(
    career => career.id === selectedCareer
  )

  const pieData = [
    { name: 'Technical Skills', value: 40, color: '#3b82f6' },
    { name: 'Soft Skills', value: 30, color: '#10b981' },
    { name: 'Domain Knowledge', value: 20, color: '#8b5cf6' },
    { name: 'Experience', value: 10, color: '#f59e0b' }
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
            Career Path Mapping
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore detailed career pathways, salary trends, and growth opportunities 
            for different educational streams and professions.
          </p>
        </motion.div>

        {/* Stream Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Choose Your Educational Stream
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {streams.map((stream) => {
              const Icon = stream.icon
              return (
                <motion.button
                  key={stream.id}
                  onClick={() => {
                    setSelectedStream(stream.id)
                    setSelectedCareer(careerPaths[stream.id as keyof typeof careerPaths]?.[0]?.id || '')
                  }}
                  className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                    selectedStream === stream.id
                      ? 'border-primary-600 bg-primary-50 shadow-lg'
                      : 'border-gray-200 bg-white hover:border-primary-300 hover:shadow-md'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={`inline-flex p-4 rounded-xl ${stream.bgColor} mb-4`}>
                    <Icon className={`h-8 w-8 ${stream.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {stream.name}
                  </h3>
                  <p className="text-gray-600">
                    Explore career opportunities in {stream.name.toLowerCase()} stream
                  </p>
                </motion.button>
              )
            })}
          </div>
        </motion.div>

        {/* Career Paths */}
        {selectedStream && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Available Career Paths
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {careerPaths[selectedStream as keyof typeof careerPaths]?.map((career) => (
                <motion.button
                  key={career.id}
                  onClick={() => setSelectedCareer(career.id)}
                  className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                    selectedCareer === career.id
                      ? 'border-primary-600 bg-primary-50 shadow-lg'
                      : 'border-gray-200 bg-white hover:border-primary-300 hover:shadow-md'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {career.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {career.degree}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-green-600 font-medium">
                      {career.salary}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      career.growth === 'Very High' ? 'bg-green-100 text-green-800' :
                      career.growth === 'High' ? 'bg-blue-100 text-blue-800' :
                      career.growth === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {career.growth} Growth
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Detailed Career Information */}
        {selectedCareerData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid lg:grid-cols-2 gap-8"
          >
            {/* Left Column - Career Details */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {selectedCareerData.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {selectedCareerData.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <BookOpen className="h-5 w-5 text-primary-600" />
                    <div>
                      <p className="text-sm text-gray-500">Degree</p>
                      <p className="font-medium text-gray-900">{selectedCareerData.degree}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-primary-600" />
                    <div>
                      <p className="text-sm text-gray-500">Duration</p>
                      <p className="font-medium text-gray-900">{selectedCareerData.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <DollarSign className="h-5 w-5 text-primary-600" />
                    <div>
                      <p className="text-sm text-gray-500">Starting Salary</p>
                      <p className="font-medium text-gray-900">{selectedCareerData.salary}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="h-5 w-5 text-primary-600" />
                    <div>
                      <p className="text-sm text-gray-500">Growth</p>
                      <p className="font-medium text-gray-900">{selectedCareerData.growth}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Required Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCareerData.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Career Opportunities</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCareerData.opportunities.map((opportunity, index) => (
                        <span
                          key={index}
                          className="bg-secondary-100 text-secondary-800 px-3 py-1 rounded-full text-sm"
                        >
                          {opportunity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Charts */}
            <div className="space-y-6">
              {/* Salary Growth Chart */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h4 className="text-lg font-bold text-gray-900 mb-4">
                  Salary Growth Projection
                </h4>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={selectedCareerData.chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`₹${value} LPA`, 'Salary']} />
                    <Line 
                      type="monotone" 
                      dataKey="salary" 
                      stroke="#3b82f6" 
                      strokeWidth={3}
                      dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Skills Distribution */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h4 className="text-lg font-bold text-gray-900 mb-4">
                  Skills Distribution
                </h4>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {pieData.map((item, index) => (
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
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Start Your Career Journey?
            </h3>
            <p className="text-gray-600 mb-6">
              Find the perfect colleges and courses to achieve your career goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary text-lg px-8 py-3 flex items-center justify-center space-x-2">
                <span>Find Colleges</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              <button className="btn-outline text-lg px-8 py-3 flex items-center justify-center space-x-2">
                <span>Take Aptitude Test</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default CareerMapping
