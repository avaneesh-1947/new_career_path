'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  Star, 
  MessageCircle, 
  Phone, 
  Mail, 
  MapPin, 
  Award, 
  Calendar, 
  Clock,
  Search,
  Filter,
  ArrowRight,
  GraduationCap,
  Briefcase,
  Globe,
  BookOpen,
  Target,
  Heart,
  CheckCircle,
  User,
  X
} from 'lucide-react'

const Mentors = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedField, setSelectedField] = useState('all')
  const [selectedExperience, setSelectedExperience] = useState('all')
  const [selectedMentor, setSelectedMentor] = useState<any>(null)
  const [showFilters, setShowFilters] = useState(false)

  const mentors = [
    {
      id: 1,
      name: 'Dr. Priya Sharma',
      field: 'Engineering & Technology',
      specialization: 'Computer Science & AI',
      experience: '15+ years',
      company: 'Microsoft India',
      rating: 4.9,
      students: 250,
      location: 'Bangalore, Karnataka',
      languages: ['English', 'Hindi', 'Kannada'],
      availability: 'Mon-Fri, 6 PM - 9 PM',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face',
      description: 'Senior Software Engineer with expertise in AI/ML, helping students build successful careers in technology.',
      achievements: ['Microsoft MVP', 'Published 20+ Research Papers', 'Mentored 250+ Students'],
      education: 'PhD in Computer Science, IIT Delhi',
      responseTime: 'Within 2 hours',
      successRate: '95%'
    },
    {
      id: 2,
      name: 'Rajesh Kumar',
      field: 'Business & Management',
      specialization: 'Finance & Investment Banking',
      experience: '12+ years',
      company: 'Goldman Sachs',
      rating: 4.8,
      students: 180,
      location: 'Mumbai, Maharashtra',
      languages: ['English', 'Hindi', 'Marathi'],
      availability: 'Weekends, 10 AM - 6 PM',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      description: 'Investment Banking professional helping students understand finance, career planning, and business strategy.',
      achievements: ['CFA Charterholder', 'MBA from IIM Ahmedabad', 'Mentored 180+ Students'],
      education: 'MBA Finance, IIM Ahmedabad',
      responseTime: 'Within 4 hours',
      successRate: '92%'
    },
    {
      id: 3,
      name: 'Dr. Anjali Patel',
      field: 'Medicine & Healthcare',
      specialization: 'Cardiology & Medical Research',
      experience: '18+ years',
      company: 'Apollo Hospitals',
      rating: 4.9,
      students: 120,
      location: 'Delhi, NCR',
      languages: ['English', 'Hindi', 'Gujarati'],
      availability: 'Mon-Wed-Fri, 7 PM - 9 PM',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
      description: 'Senior Cardiologist guiding students through medical career paths, NEET preparation, and research opportunities.',
      achievements: ['MD Cardiology', 'Published 30+ Medical Papers', 'Mentored 120+ Students'],
      education: 'MD Cardiology, AIIMS Delhi',
      responseTime: 'Within 6 hours',
      successRate: '98%'
    },
    {
      id: 4,
      name: 'Vikram Singh',
      field: 'Arts & Humanities',
      specialization: 'Literature & Creative Writing',
      experience: '10+ years',
      company: 'Freelance Author & Editor',
      rating: 4.7,
      students: 95,
      location: 'Kolkata, West Bengal',
      languages: ['English', 'Hindi', 'Bengali'],
      availability: 'Tue-Thu-Sat, 5 PM - 8 PM',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      description: 'Award-winning author and editor helping students develop writing skills and pursue careers in literature.',
      achievements: ['Sahitya Akademi Award', 'Published 15+ Books', 'Mentored 95+ Students'],
      education: 'MA English Literature, Jadavpur University',
      responseTime: 'Within 3 hours',
      successRate: '89%'
    },
    {
      id: 5,
      name: 'Dr. Meera Reddy',
      field: 'Science & Research',
      specialization: 'Biotechnology & Life Sciences',
      experience: '14+ years',
      company: 'CSIR - Centre for Cellular and Molecular Biology',
      rating: 4.8,
      students: 160,
      location: 'Hyderabad, Telangana',
      languages: ['English', 'Hindi', 'Telugu'],
      availability: 'Mon-Fri, 6 PM - 8 PM',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      description: 'Senior Research Scientist guiding students in biotechnology, research methodologies, and career development.',
      achievements: ['PhD Biotechnology', '15+ Research Publications', 'Mentored 160+ Students'],
      education: 'PhD Biotechnology, IISc Bangalore',
      responseTime: 'Within 4 hours',
      successRate: '94%'
    },
    {
      id: 6,
      name: 'Arjun Nair',
      field: 'Engineering & Technology',
      specialization: 'Mechanical Engineering & Manufacturing',
      experience: '16+ years',
      company: 'Tata Motors',
      rating: 4.9,
      students: 200,
      location: 'Pune, Maharashtra',
      languages: ['English', 'Hindi', 'Marathi', 'Malayalam'],
      availability: 'Weekends, 9 AM - 5 PM',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
      description: 'Senior Mechanical Engineer helping students understand manufacturing, design, and automotive engineering careers.',
      achievements: ['MTech Mechanical', '15+ Patents', 'Mentored 200+ Students'],
      education: 'MTech Mechanical Engineering, IIT Bombay',
      responseTime: 'Within 3 hours',
      successRate: '96%'
    },
    {
      id: 7,
      name: 'Dr. Kavita Joshi',
      field: 'Psychology & Counseling',
      specialization: 'Educational Psychology & Career Counseling',
      experience: '13+ years',
      company: 'Private Practice',
      rating: 4.8,
      students: 140,
      location: 'Ahmedabad, Gujarat',
      languages: ['English', 'Hindi', 'Gujarati'],
      availability: 'Mon-Sat, 4 PM - 7 PM',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face',
      description: 'Licensed psychologist specializing in career counseling, helping students make informed educational and career choices.',
      achievements: ['PhD Psychology', 'Licensed Counselor', 'Mentored 140+ Students'],
      education: 'PhD Psychology, Gujarat University',
      responseTime: 'Within 2 hours',
      successRate: '91%'
    },
    {
      id: 8,
      name: 'Suresh Agarwal',
      field: 'Commerce & Finance',
      specialization: 'Chartered Accountancy & Taxation',
      experience: '20+ years',
      company: 'Agarwal & Associates (CA Firm)',
      rating: 4.9,
      students: 300,
      location: 'Delhi, NCR',
      languages: ['English', 'Hindi'],
      availability: 'Mon-Fri, 7 PM - 9 PM',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face',
      description: 'Senior Chartered Accountant with extensive experience in taxation, helping students pursue CA and finance careers.',
      achievements: ['CA, CS, CMA', '20+ Years Experience', 'Mentored 300+ Students'],
      education: 'CA, CS, CMA',
      responseTime: 'Within 4 hours',
      successRate: '97%'
    }
  ]

  const fields = ['all', 'Engineering & Technology', 'Business & Management', 'Medicine & Healthcare', 'Arts & Humanities', 'Science & Research', 'Psychology & Counseling', 'Commerce & Finance']
  const experienceLevels = ['all', '5+ years', '10+ years', '15+ years', '20+ years']

  const filteredMentors = mentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.field.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesField = selectedField === 'all' || mentor.field === selectedField
    const matchesExperience = selectedExperience === 'all' || mentor.experience.includes(selectedExperience)
    
    return matchesSearch && matchesField && matchesExperience
  })

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
        duration: 0.5
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-4">
            <div className="bg-primary-600 p-3 rounded-full mr-4">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Expert Mentors</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with experienced professionals who can guide you on your career journey. 
            Get personalized advice from industry experts across various fields.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div 
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search mentors by name, field, or specialization..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </button>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <motion.div 
              className="mt-4 pt-4 border-t border-gray-200"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Field</label>
                  <select
                    value={selectedField}
                    onChange={(e) => setSelectedField(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    {fields.map(field => (
                      <option key={field} value={field}>
                        {field === 'all' ? 'All Fields' : field}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
                  <select
                    value={selectedExperience}
                    onChange={(e) => setSelectedExperience(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    {experienceLevels.map(level => (
                      <option key={level} value={level}>
                        {level === 'all' ? 'All Experience Levels' : level}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Mentors Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredMentors.map((mentor) => (
            <motion.div
              key={mentor.id}
              variants={itemVariants}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedMentor(mentor)}
            >
              <div className="p-6">
                {/* Mentor Image and Basic Info */}
                <div className="flex items-start space-x-4 mb-4">
                  <img
                    src={mentor.image}
                    alt={mentor.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{mentor.name}</h3>
                    <p className="text-sm text-primary-600 font-medium">{mentor.field}</p>
                    <p className="text-sm text-gray-600">{mentor.specialization}</p>
                  </div>
                </div>

                {/* Rating and Stats */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-900">{mentor.rating}</span>
                    <span className="text-sm text-gray-500">({mentor.students} students)</span>
                  </div>
                  <div className="text-sm text-gray-600">{mentor.experience}</div>
                </div>

                {/* Company and Location */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Briefcase className="h-4 w-4 mr-2" />
                    {mentor.company}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {mentor.location}
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{mentor.description}</p>

                {/* Availability */}
                <div className="text-sm text-gray-500">
                  <span>{mentor.availability}</span>
                </div>

                {/* Connect Button */}
                <button className="w-full mt-4 bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Connect Now
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredMentors.length === 0 && (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No mentors found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
          </motion.div>
        )}
      </div>

      {/* Mentor Detail Modal */}
      {selectedMentor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div 
            className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start space-x-4">
                  <img
                    src={selectedMentor.image}
                    alt={selectedMentor.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedMentor.name}</h2>
                    <p className="text-primary-600 font-medium">{selectedMentor.field}</p>
                    <p className="text-gray-600">{selectedMentor.specialization}</p>
                    <div className="flex items-center mt-2">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm font-medium">{selectedMentor.rating}</span>
                      <span className="ml-2 text-sm text-gray-500">({selectedMentor.students} students)</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedMentor(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">About</h3>
                  <p className="text-gray-600 mb-4">{selectedMentor.description}</p>
                  
                  <h4 className="font-medium text-gray-900 mb-2">Education</h4>
                  <p className="text-gray-600 mb-4">{selectedMentor.education}</p>
                  
                  <h4 className="font-medium text-gray-900 mb-2">Achievements</h4>
                  <ul className="space-y-1">
                    {selectedMentor.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact & Availability</h3>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      {selectedMentor.location}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      {selectedMentor.availability}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Globe className="h-4 w-4 mr-2" />
                      Languages: {selectedMentor.languages.join(', ')}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Session Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Response Time:</span>
                        <span className="font-medium">{selectedMentor.responseTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Success Rate:</span>
                        <span className="font-medium text-green-600">{selectedMentor.successRate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button className="flex-1 bg-primary-600 text-white py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Start Mentoring Session
                </button>
                <button className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center">
                  <Phone className="h-5 w-5 mr-2" />
                  Schedule Call
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default Mentors
