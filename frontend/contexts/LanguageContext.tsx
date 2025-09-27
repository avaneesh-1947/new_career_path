'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { getTranslation, formatTranslation, Translation } from '@/lib/i18n'

interface LanguageContextType {
  language: string
  setLanguage: (lang: string) => void
  t: (key: string, params?: Record<string, string>) => string
  availableLanguages: Array<{ code: string; name: string; nativeName: string }>
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

interface LanguageProviderProps {
  children: React.ReactNode
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<string>('en')

  const availableLanguages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
    { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
    { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' }
  ]

  useEffect(() => {
    // Load language from localStorage on mount
    const savedLanguage = localStorage.getItem('career-platform-language')
    if (savedLanguage && availableLanguages.some(lang => lang.code === savedLanguage)) {
      setLanguageState(savedLanguage)
    }
  }, [])

  const setLanguage = (lang: string) => {
    setLanguageState(lang)
    localStorage.setItem('career-platform-language', lang)
    
    // Update document direction for RTL languages if needed
    if (lang === 'ar') {
      document.documentElement.dir = 'rtl'
    } else {
      document.documentElement.dir = 'ltr'
    }
  }

  const t = (key: string, params?: Record<string, string>): string => {
    if (params) {
      return formatTranslation(key, params, language)
    }
    return getTranslation(key, language)
  }

  const value: LanguageContextType = {
    language,
    setLanguage,
    t,
    availableLanguages
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}
