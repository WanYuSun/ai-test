import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, { params }: { params: { params: string[] } }) {
  try {
    const [width = '400', height = '240'] = params.params || []
    const searchParams = request.nextUrl.searchParams
    const customText = searchParams.get('text')

    // 解析宽度和高度
    const w = parseInt(width) || 400
    const h = parseInt(height) || 240

    // 限制尺寸范围
    const finalWidth = Math.min(Math.max(w, 50), 1920)
    const finalHeight = Math.min(Math.max(h, 50), 1080)

    // 确定显示文本
    const displayText = customText || `${finalWidth} × ${finalHeight}`

    // 根据尺寸调整字体大小
    const fontSize = Math.max(12, Math.min(finalWidth / 20, 24))

    // 创建SVG占位符
    const svg = `
      <svg width="${finalWidth}" height="${finalHeight}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:1" />
          </linearGradient>
          <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="1" fill="white" opacity="0.1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grad)"/>
        <rect width="100%" height="100%" fill="url(#dots)"/>
        <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="${fontSize}" fill="white" text-anchor="middle" dy=".3em" font-weight="500">
          ${displayText}
        </text>
      </svg>
    `.trim()

    return new NextResponse(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (error) {
    console.error('Placeholder API error:', error)

    // 返回默认的占位符
    const defaultSvg = `
      <svg width="400" height="240" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#e5e7eb"/>
        <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="16" fill="#6b7280" text-anchor="middle" dy=".3em">
          Image failed to load
        </text>
      </svg>
    `

    return new NextResponse(defaultSvg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Access-Control-Allow-Origin': '*',
      },
    })
  }
}
