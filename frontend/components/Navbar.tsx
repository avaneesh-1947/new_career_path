'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { 
  GraduationCap, 
  Menu, 
  X, 
  User, 
  BookOpen, 
  MapPin, 
  MessageCircle,
  BarChart3,
  Globe,
  UserCircle,
  Users
} from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [user, setUser] = useState<{ name?: string; email: string } | null>(null)
  const router = useRouter()
  const pathname = usePathname()
  // Simple i18n fallback to avoid dependency on context during SSR
  const t = (key: string) => {
    const dict: Record<string, string> = {
      'nav.home': 'Home',
      'nav.aptitudeTest': 'Aptitude Test',
      'nav.careerMapping': 'Career Mapping',
      'nav.colleges': 'Colleges',
      'nav.careerGenie': 'Career Genie',
      'nav.mentors': 'Mentors',
      'nav.dashboard': 'Dashboard',
      'nav.login': 'Login',
    }
    return dict[key] ?? key
  }
  const language = 'en'
  const setLanguage = (_: string) => {}
  const availableLanguages = [
    { code: 'en', nativeName: 'English' },
    { code: 'hi', nativeName: 'हिन्दी' },
  ]

  const handleScroll = () => {
    if (typeof window !== 'undefined') {
      setIsScrolled(window.scrollY > 50)
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Sync auth state with localStorage
  useEffect(() => {
    const refreshUser = () => {
      try {
        const stored = localStorage.getItem('mockAuthUser')
        setUser(stored ? JSON.parse(stored) : null)
      } catch {
        setUser(null)
      }
    }
    
    // Initial check
    refreshUser()
    
    // Listen to storage events for cross-tab updates
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'mockAuthUser') {
        refreshUser()
      }
    }
    
    // Listen to focus events for same-tab updates
    const onFocus = () => {
      refreshUser()
    }
    
    // Listen to custom events for same-tab updates
    const onAuthChange = () => {
      refreshUser()
    }
    
    window.addEventListener('storage', onStorage)
    window.addEventListener('focus', onFocus)
    window.addEventListener('authChange', onAuthChange)
    
    return () => {
      window.removeEventListener('storage', onStorage)
      window.removeEventListener('focus', onFocus)
      window.removeEventListener('authChange', onAuthChange)
    }
  }, [])

  const handleLoginLogout = () => {
    if (user) {
      localStorage.removeItem('mockAuthUser')
      setUser(null)
      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('authChange'))
      router.push('/')
    } else {
      router.push('/login')
    }
  }

  const navItems = [
    { name: t('nav.home'), href: '/home', icon: GraduationCap },
    { name: t('nav.aptitudeTest'), href: '/aptitude-test', icon: BookOpen },
    { name: t('nav.careerMapping'), href: '/career-mapping', icon: BarChart3 },
    { name: t('nav.colleges'), href: '/colleges', icon: MapPin },
    { name: t('nav.careerGenie'), href: '/career-genie', icon: MessageCircle },
    { name: t('nav.mentors'), href: '/mentors', icon: Users },
  ]

  return (
    <nav className="fixed top-0 w-full z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/home" className="flex items-center space-x-2">
              <div className="bg-primary-600 p-2 rounded-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">
                Career<span className="text-primary-600">Guide</span>
              </span>
            </Link>
          </div>
          
          {/* Center Navigation - Only show on large screens */}
          {user && (
            <div className="hidden xl:flex items-center space-x-1">
              <Link href="/home" className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-colors">
                <GraduationCap className="h-4 w-4" />
                <span>Home</span>
              </Link>
              <Link href="/aptitude-test" className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-colors">
                <BookOpen className="h-4 w-4" />
                <span>Aptitude</span>
              </Link>
              <Link href="/career-mapping" className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-colors">
                <BarChart3 className="h-4 w-4" />
                <span>Mapping</span>
              </Link>
              <Link href="/colleges" className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-colors">
                <MapPin className="h-4 w-4" />
                <span>Colleges</span>
              </Link>
              <Link href="/career-genie" className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-colors">
                <MessageCircle className="h-4 w-4" />
                <span>Genie</span>
              </Link>
              <Link href="/mentors" className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-colors">
                <Users className="h-4 w-4" />
                <span>Mentors</span>
              </Link>
            </div>
           )}
          
          {/* Right side - Language and Auth */}
          <div className="flex items-center space-x-2">
            {/* Language Selector */}
            <div className="hidden sm:flex items-center space-x-1 px-2 py-1 rounded-md hover:bg-gray-50 transition-colors">
              <Globe className="h-4 w-4 text-gray-500" />
              <select className="bg-transparent border-none text-sm text-gray-600 focus:outline-none cursor-pointer min-w-0">
                <option value="en">EN</option>
                <option value="hi">हिन्दी</option>
              </select>
            </div>
            
            {/* Profile Icon - Only show when user is logged in */}
            {user && (
              <button 
                onClick={() => router.push('/dashboard')}
                className="p-2 rounded-lg text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                title="Dashboard"
              >
                <UserCircle className="h-5 w-5" />
              </button>
            )}
            
            {/* Auth Button */}
            <button 
              onClick={handleLoginLogout} 
              className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              {user ? 'Logout' : t('nav.login')}
            </button>
            
            {/* Mobile menu button for authenticated users */}
            {user && (
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="xl:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            )}
          </div>
        </div>
        
        {/* Mobile Menu Dropdown */}
        {user && isOpen && (
          <div className="xl:hidden bg-white border-t border-gray-100 shadow-lg">
            <div className="px-4 py-2 space-y-1">
              <Link 
                href="/home" 
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <GraduationCap className="h-4 w-4" />
                <span>Home</span>
              </Link>
              <Link 
                href="/aptitude-test" 
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <BookOpen className="h-4 w-4" />
                <span>Aptitude Test</span>
              </Link>
              <Link 
                href="/career-mapping" 
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <BarChart3 className="h-4 w-4" />
                <span>Career Mapping</span>
              </Link>
              <Link 
                href="/colleges" 
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <MapPin className="h-4 w-4" />
                <span>Colleges</span>
              </Link>
              <Link 
                href="/career-genie" 
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <MessageCircle className="h-4 w-4" />
                <span>Career Genie</span>
              </Link>
              <Link 
                href="/mentors" 
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Users className="h-4 w-4" />
                <span>Mentors</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
