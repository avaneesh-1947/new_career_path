import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { params: string[] } }
) {
  const [width, height, bgColor, textColor, text] = params.params

  // Create a simple SVG placeholder
  const svg = `
    <svg width="${width || 150}" height="${height || 150}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#${bgColor || '3b82f6'}"/>
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="24" 
            fill="#${textColor || 'ffffff'}" text-anchor="middle" dy=".3em">
        ${text || 'IMG'}
      </text>
    </svg>
  `

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000',
    },
  })
}
