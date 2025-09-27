// Optimized imports for faster compilation
export { default as dynamic } from 'next/dynamic'
export { Suspense, lazy, memo } from 'react'

// Lazy load heavy libraries
export const lazyLoadRecharts = () => import('recharts')
export const lazyLoadFramerMotion = () => import('framer-motion')
export const lazyLoadReactHotToast = () => import('react-hot-toast')

// Memoized components for better performance
export const memoize = <T extends (...args: any[]) => any>(fn: T): T => {
  const cache = new Map()
  return ((...args: any[]) => {
    const key = JSON.stringify(args)
    if (cache.has(key)) {
      return cache.get(key)
    }
    const result = fn(...args)
    cache.set(key, result)
    return result
  }) as T
}

// Preload critical components
export const preloadComponents = () => {
  if (typeof window !== 'undefined') {
    // Preload on idle
    requestIdleCallback(() => {
      import('@/components/Hero')
      import('@/components/Navbar')
      import('@/components/Footer')
    })
  }
}
