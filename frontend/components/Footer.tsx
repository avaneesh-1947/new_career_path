'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  GraduationCap, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Globe,
  Heart
} from 'lucide-react'

const Footer = () => {
  const pathname = usePathname()
  // Always show navbar/footer
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    platform: [
      { name: 'Aptitude Test', href: '/aptitude-test' },
      { name: 'Career Mapping', href: '/career-mapping' },
      { name: 'College Directory', href: '/colleges' },
      { name: 'Career Genie', href: '/career-genie' },
      { name: 'Dashboard', href: '/dashboard' }
    ],
    resources: [
      { name: 'Scholarships', href: '/scholarships' },
      { name: 'Admission Updates', href: '/admissions' },
      { name: 'Preparation Resources', href: '/resources' },
      { name: 'Mentorship Hub', href: '/mentorship' },
      { name: 'Success Stories', href: '/testimonials' }
    ],
    support: [
      { name: 'Help Center', href: '/help' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'FAQ', href: '/faq' }
    ],
    languages: [
      { name: 'English', code: 'en' },
      { name: 'हिन्दी', code: 'hi' },
      { name: 'தமிழ்', code: 'ta' },
      { name: 'తెలుగు', code: 'te' },
      { name: 'বাংলা', code: 'bn' }
    ]
  }

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' }
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <div className="bg-primary-600 p-2 rounded-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">
                Career<span className="text-primary-400">Guide</span>
              </span>
            </Link>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              Empowering students across India with comprehensive career guidance, 
              helping them make informed decisions about their educational and professional future.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary-400" />
                <span className="text-gray-300">support@careerguide.in</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary-400" />
                <span className="text-gray-300">+91 1800 123 4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-primary-400" />
                <span className="text-gray-300">New Delhi, India</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="bg-gray-800 hover:bg-primary-600 p-2 rounded-lg transition-colors duration-200"
                    aria-label={social.name}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Platform</h3>
            <ul className="space-y-2">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-primary-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-primary-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Language */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 mb-6">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-primary-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Language Selector */}
            <div>
              <h4 className="text-sm font-semibold mb-3 text-gray-400">Languages</h4>
              <div className="flex flex-wrap gap-2">
                {footerLinks.languages.map((lang) => (
                  <button
                    key={lang.code}
                    className="text-xs bg-gray-800 hover:bg-primary-600 px-2 py-1 rounded transition-colors duration-200"
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-gray-400">
              <span>© {currentYear} Career Guide Platform. Made with</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span>for students across India.</span>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>Government Approved Platform</span>
              <div className="flex items-center space-x-1">
                <Globe className="h-4 w-4" />
                <span>Available in 5+ Languages</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
