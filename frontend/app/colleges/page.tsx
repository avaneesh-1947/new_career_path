'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  MapPin, 
  Star, 
  Users, 
  BookOpen, 
  Wifi, 
  Car, 
  Utensils,
  Search,
  Filter,
  ArrowRight,
  Phone,
  Mail,
  Globe,
  Award,
  Calendar,
  DollarSign,
  GraduationCap
} from 'lucide-react'

const Colleges = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedState, setSelectedState] = useState('all')
  const [selectedStream, setSelectedStream] = useState('all')
  const [selectedCollege, setSelectedCollege] = useState<any>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [userLocation, setUserLocation] = useState<{lat:number, lng:number} | null>(null)

  const colleges = [
    {
      id: 1,
      name: 'Delhi University',
      location: 'New Delhi',
      state: 'Delhi',
      stream: 'All Streams',
      rating: 4.8,
      students: 15000,
      established: 1922,
      type: 'Central University',
      courses: ['B.A', 'B.Sc', 'B.Com', 'B.Tech', 'MBA'],
      facilities: ['Library', 'Hostel', 'WiFi', 'Sports', 'Cafeteria'],
      cutOff: '95%',
      fees: '₹15,000 - ₹50,000',
      website: 'www.du.ac.in',
      phone: '+91 11 2766 7000',
      email: 'info@du.ac.in',
      image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop',
      description: 'One of India\'s premier universities offering world-class education across various disciplines.',
      admissionDates: 'May - July 2024',
      scholarships: ['Merit-based', 'Need-based', 'SC/ST/OBC']
    },
    {
      id: 2,
      name: 'Jawaharlal Nehru University',
      location: 'New Delhi',
      state: 'Delhi',
      stream: 'All Streams',
      rating: 4.9,
      students: 8000,
      established: 1969,
      type: 'Central University',
      courses: ['B.A', 'B.Sc', 'M.A', 'M.Sc', 'PhD'],
      facilities: ['Library', 'Hostel', 'WiFi', 'Research Labs', 'Cafeteria'],
      cutOff: '98%',
      fees: '₹10,000 - ₹30,000',
      website: 'www.jnu.ac.in',
      phone: '+91 11 2670 4000',
      email: 'info@jnu.ac.in',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop',
      description: 'Renowned for its research excellence and academic rigor in social sciences and humanities.',
      admissionDates: 'March - May 2024',
      scholarships: ['Merit-based', 'Research Fellowships', 'International Exchange']
    },
    {
      id: 3,
      name: 'University of Mumbai',
      location: 'Mumbai',
      state: 'Maharashtra',
      stream: 'All Streams',
      rating: 4.6,
      students: 20000,
      established: 1857,
      type: 'State University',
      courses: ['B.A', 'B.Sc', 'B.Com', 'B.Tech', 'BBA'],
      facilities: ['Library', 'Hostel', 'WiFi', 'Sports', 'Cafeteria', 'Transport'],
      cutOff: '90%',
      fees: '₹20,000 - ₹60,000',
      website: 'www.mu.ac.in',
      phone: '+91 22 2652 3000',
      email: 'info@mu.ac.in',
      image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=300&fit=crop',
      description: 'One of the oldest universities in India, known for its diverse academic programs.',
      admissionDates: 'June - August 2024',
      scholarships: ['Merit-based', 'Need-based', 'Minority Scholarships']
    },
    {
      id: 4,
      name: 'Anna University',
      location: 'Chennai',
      state: 'Tamil Nadu',
      stream: 'Engineering',
      rating: 4.7,
      students: 12000,
      established: 1978,
      type: 'State University',
      courses: ['B.Tech', 'M.Tech', 'MBA', 'MCA'],
      facilities: ['Library', 'Hostel', 'WiFi', 'Labs', 'Sports', 'Cafeteria'],
      cutOff: '92%',
      fees: '₹30,000 - ₹80,000',
      website: 'www.annauniv.edu',
      phone: '+91 44 2235 7000',
      email: 'info@annauniv.edu',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop',
      description: 'Premier engineering university known for its technical excellence and industry partnerships.',
      admissionDates: 'April - June 2024',
      scholarships: ['Merit-based', 'Industry Sponsored', 'Research Grants']
    },
    {
      id: 5,
      name: 'Osmania University',
      location: 'Hyderabad',
      state: 'Telangana',
      stream: 'All Streams',
      rating: 4.5,
      students: 18000,
      established: 1918,
      type: 'State University',
      courses: ['B.A', 'B.Sc', 'B.Com', 'B.Tech', 'BBA', 'B.Ed'],
      facilities: ['Library', 'Hostel', 'WiFi', 'Sports', 'Cafeteria', 'Transport'],
      cutOff: '88%',
      fees: '₹15,000 - ₹45,000',
      website: 'www.osmania.ac.in',
      phone: '+91 40 2709 8000',
      email: 'info@osmania.ac.in',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
      description: 'Historic university offering comprehensive education across multiple disciplines.',
      admissionDates: 'May - July 2024',
      scholarships: ['Merit-based', 'Need-based', 'SC/ST/OBC', 'Minority']
    },
    {
      id: 6,
      name: 'Calcutta University',
      location: 'Kolkata',
      state: 'West Bengal',
      stream: 'All Streams',
      rating: 4.4,
      students: 16000,
      established: 1857,
      type: 'State University',
      courses: ['B.A', 'B.Sc', 'B.Com', 'B.Tech', 'BBA', 'B.Ed'],
      facilities: ['Library', 'Hostel', 'WiFi', 'Sports', 'Cafeteria'],
      cutOff: '85%',
      fees: '₹12,000 - ₹40,000',
      website: 'www.caluniv.ac.in',
      phone: '+91 33 2241 0071',
      email: 'info@caluniv.ac.in',
      image: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=400&h=300&fit=crop',
      description: 'One of the oldest universities in India with rich academic heritage.',
      admissionDates: 'June - August 2024',
      scholarships: ['Merit-based', 'Need-based', 'SC/ST/OBC']
    }
  ]

  const states = ['All States', 'Delhi', 'Maharashtra', 'Tamil Nadu', 'Telangana', 'West Bengal']
  const streams = ['All Streams', 'Science', 'Commerce', 'Arts', 'Engineering']

  const filteredColleges = colleges.filter(college => {
    const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         college.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesState = selectedState === 'all' || college.state === selectedState
    const matchesStream = selectedStream === 'all' || 
                         (selectedStream === 'Engineering' && college.stream === 'Engineering') ||
                         (selectedStream !== 'Engineering' && college.stream === 'All Streams')
    
    return matchesSearch && matchesState && matchesStream
  })

  const getFacilityIcon = (facility: string) => {
    switch (facility) {
      case 'WiFi': return Wifi
      case 'Transport': return Car
      case 'Cafeteria': return Utensils
      case 'Library': return BookOpen
      case 'Sports': return Users
      default: return Award
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
          className="text-center mb-12"
        >
          <div className="bg-primary-600 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <MapPin className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Government Colleges Directory
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover government colleges across India with detailed information about 
            courses, admission criteria, facilities, and more.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search colleges by name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors duration-200"
            >
              <Filter className="h-5 w-5" />
              <span>Filters</span>
            </button>
            <button
              onClick={() => {
                if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition((pos) => {
                    setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude })
                  })
                }
              }}
              className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors duration-200"
            >
              <MapPin className="h-5 w-5" />
              <span>Use my location</span>
            </button>
          </div>

          {/* Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6 pt-6 border-t border-gray-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State
                  </label>
                  <select
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    {states.map(state => (
                      <option key={state} value={state === 'All States' ? 'all' : state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stream
                  </label>
                  <select
                    value={selectedStream}
                    onChange={(e) => setSelectedStream(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    {streams.map(stream => (
                      <option key={stream} value={stream === 'All Streams' ? 'all' : stream}>
                        {stream}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-6"
        >
          <p className="text-gray-600">
            Found {filteredColleges.length} colleges matching your criteria
          </p>
        </motion.div>

        {/* Colleges Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredColleges.map((college, index) => (
            <motion.div
              key={college.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
              onClick={() => setSelectedCollege(college)}
            >
              <div className="relative">
                <img
                  src={college.image}
                  alt={college.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{college.rating}</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {college.name}
                </h3>
                
                <div className="flex items-center space-x-2 text-gray-600 mb-3">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{college.location}, {college.state}</span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <p className="text-gray-500">Established</p>
                    <p className="font-medium text-gray-900">{college.established}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Students</p>
                    <p className="font-medium text-gray-900">{college.students.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Cut-off</p>
                    <p className="font-medium text-gray-900">{college.cutOff}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Fees</p>
                    <p className="font-medium text-gray-900">{college.fees}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-2">Available Courses</p>
                  <div className="flex flex-wrap gap-1">
                    {college.courses.slice(0, 3).map((course, idx) => (
                      <span
                        key={idx}
                        className="bg-primary-100 text-primary-800 px-2 py-1 rounded text-xs"
                      >
                        {course}
                      </span>
                    ))}
                    {college.courses.length > 3 && (
                      <span className="text-xs text-gray-500">
                        +{college.courses.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-2">Facilities</p>
                  <div className="flex flex-wrap gap-2">
                    {college.facilities.slice(0, 4).map((facility, idx) => {
                      const Icon = getFacilityIcon(facility)
                      return (
                        <div key={idx} className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded text-xs">
                          <Icon className="h-3 w-3" />
                          <span>{facility}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <button className="w-full btn-primary flex items-center justify-center space-x-2">
                  <span>View Details</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* College Detail Modal */}
        {selectedCollege && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedCollege(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={selectedCollege.image}
                  alt={selectedCollege.name}
                  className="w-full h-64 object-cover"
                />
                <button
                  onClick={() => setSelectedCollege(null)}
                  className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors duration-200"
                >
                  ×
                </button>
              </div>

              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                      {selectedCollege.name}
                    </h2>
                    <div className="flex items-center space-x-2 text-gray-600 mb-4">
                      <MapPin className="h-5 w-5" />
                      <span>{selectedCollege.location}, {selectedCollege.state}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Star className="h-5 w-5 text-yellow-500 fill-current" />
                        <span className="font-medium">{selectedCollege.rating}</span>
                      </div>
                      <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm">
                        {selectedCollege.type}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 mb-8 leading-relaxed">
                  {selectedCollege.description}
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">College Information</h3>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <Calendar className="h-5 w-5 text-primary-600" />
                          <div>
                            <p className="text-sm text-gray-500">Established</p>
                            <p className="font-medium text-gray-900">{selectedCollege.established}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Users className="h-5 w-5 text-primary-600" />
                          <div>
                            <p className="text-sm text-gray-500">Total Students</p>
                            <p className="font-medium text-gray-900">{selectedCollege.students.toLocaleString()}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <DollarSign className="h-5 w-5 text-primary-600" />
                          <div>
                            <p className="text-sm text-gray-500">Annual Fees</p>
                            <p className="font-medium text-gray-900">{selectedCollege.fees}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Award className="h-5 w-5 text-primary-600" />
                          <div>
                            <p className="text-sm text-gray-500">Cut-off Percentage</p>
                            <p className="font-medium text-gray-900">{selectedCollege.cutOff}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <Phone className="h-5 w-5 text-primary-600" />
                          <span className="text-gray-900">{selectedCollege.phone}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Mail className="h-5 w-5 text-primary-600" />
                          <span className="text-gray-900">{selectedCollege.email}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Globe className="h-5 w-5 text-primary-600" />
                          <span className="text-gray-900">{selectedCollege.website}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Available Courses</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {selectedCollege.courses.map((course, index) => (
                          <span
                            key={index}
                            className="bg-primary-100 text-primary-800 px-3 py-2 rounded-lg text-sm text-center"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Facilities</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {selectedCollege.facilities.map((facility, index) => {
                          const Icon = getFacilityIcon(facility)
                          return (
                            <div key={index} className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-lg">
                              <Icon className="h-4 w-4 text-gray-600" />
                              <span className="text-sm text-gray-900">{facility}</span>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Admission & Scholarships</h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-500">Admission Dates</p>
                          <p className="font-medium text-gray-900">{selectedCollege.admissionDates}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Available Scholarships</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {selectedCollege.scholarships.map((scholarship, index) => (
                              <span
                                key={index}
                                className="bg-secondary-100 text-secondary-800 px-2 py-1 rounded text-xs"
                              >
                                {scholarship}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Location Map</h3>
                      <div className="rounded-xl overflow-hidden">
                        <iframe
                          title="map"
                          width="100%"
                          height="250"
                          style={{ border: 0 }}
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          src={`https://www.google.com/maps?q=${encodeURIComponent(selectedCollege.name + ' ' + selectedCollege.location)}&output=embed`}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <button className="btn-primary flex-1 flex items-center justify-center space-x-2">
                    <span>Apply Now</span>
                    <ArrowRight className="h-5 w-5" />
                  </button>
                  <button className="btn-outline flex-1 flex items-center justify-center space-x-2">
                    <span>Save to Favorites</span>
                    <Star className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Colleges
