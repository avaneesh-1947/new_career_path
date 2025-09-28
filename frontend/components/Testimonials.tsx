'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { 
  Star, 
  Quote, 
  ChevronLeft, 
  ChevronRight,
  GraduationCap,
  Briefcase,
  Award
} from 'lucide-react'

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Computer Science Student',
      college: 'Delhi University',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      content: 'The aptitude test helped me discover my passion for technology. The career mapping feature showed me exactly what opportunities await after my degree. I\'m now confident about my future path!',
      rating: 5,
      achievement: 'Got admission in top engineering college'
    },
    {
      name: 'Arjun Patel',
      role: 'Commerce Graduate',
      college: 'Mumbai University',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      content: 'The platform\'s college directory was a game-changer. I found the perfect government college near my home with all the facilities I needed. The scholarship notifications helped me secure financial aid.',
      rating: 5,
      achievement: 'Secured scholarship worth ₹50,000'
    },
    {
      name: 'Sneha Reddy',
      role: 'Arts Student',
      college: 'Osmania University',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      content: 'I was confused between Arts and Science streams. The Career Genie chatbot answered all my questions and helped me understand the career prospects in both fields. Now I\'m pursuing my passion!',
      rating: 5,
      achievement: 'Started successful career in journalism'
    },
    {
      name: 'Rahul Kumar',
      role: 'Engineering Student',
      college: 'IIT Delhi',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      content: 'The mentorship hub connected me with industry professionals who guided me through my career decisions. The preparation resources helped me crack competitive exams.',
      rating: 5,
      achievement: 'Cracked GATE with 99.5 percentile'
    },
    {
      name: 'Ananya Das',
      role: 'Medical Student',
      college: 'AIIMS Delhi',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      content: 'The personalized dashboard kept me updated with all admission deadlines and scholarship opportunities. The multilingual support made it easy for my parents to understand the platform.',
      rating: 5,
      achievement: 'Got admission in AIIMS Delhi'
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Success{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">
              Stories
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Hear from students who have transformed their lives with Fyndor.
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="relative">
          <motion.div
            key={currentTestimonial}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20">
              {/* Quote Icon */}
              <div className="flex justify-center mb-8">
                <div className="bg-primary-600 p-4 rounded-full">
                  <Quote className="h-8 w-8 text-white" />
                </div>
              </div>

              {/* Testimonial Content */}
              <div className="text-center mb-8">
                <p className="text-xl md:text-2xl text-gray-700 leading-relaxed italic mb-8">
                  "{testimonials[currentTestimonial].content}"
                </p>

                {/* Rating */}
                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Achievement Badge */}
                <div className="inline-flex items-center bg-secondary-100 text-secondary-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Award className="h-4 w-4 mr-2" />
                  {testimonials[currentTestimonial].achievement}
                </div>
              </div>

              {/* User Info */}
              <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
                <div className="relative">
                  <img
                    src={testimonials[currentTestimonial].image}
                    alt={testimonials[currentTestimonial].name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-primary-600 p-1 rounded-full">
                    <GraduationCap className="h-4 w-4 text-white" />
                  </div>
                </div>
                
                <div className="text-center md:text-left">
                  <h4 className="text-xl font-bold text-gray-900">
                    {testimonials[currentTestimonial].name}
                  </h4>
                  <p className="text-primary-600 font-medium">
                    {testimonials[currentTestimonial].role}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {testimonials[currentTestimonial].college}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
          >
            <ChevronRight className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center space-x-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentTestimonial === index 
                  ? 'bg-primary-600 w-8' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
        >
          <div className="text-center">
            <div className="bg-primary-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <GraduationCap className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">95%</h3>
            <p className="text-gray-600">Students got admission in their preferred colleges</p>
          </div>
          
          <div className="text-center">
            <div className="bg-secondary-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Briefcase className="h-8 w-8 text-secondary-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">87%</h3>
            <p className="text-gray-600">Students secured scholarships and financial aid</p>
          </div>
          
          <div className="text-center">
            <div className="bg-accent-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Award className="h-8 w-8 text-accent-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">92%</h3>
            <p className="text-gray-600">Students are satisfied with their career choices</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials
