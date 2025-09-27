'use client'

import Image from 'next/image'
import { useState } from 'react'

interface AvatarProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  fallbackText?: string
}

export default function Avatar({ 
  src, 
  alt, 
  width, 
  height, 
  className = '', 
  fallbackText = 'U' 
}: AvatarProps) {
  const [imageError, setImageError] = useState(false)

  if (imageError) {
    return (
      <div 
        className={`bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold ${className}`}
        style={{ width, height }}
      >
        {fallbackText}
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={() => setImageError(true)}
      priority
    />
  )
}
