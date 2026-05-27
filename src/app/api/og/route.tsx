import { ImageResponse } from 'next/og'
import type { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const title = searchParams.get('title') ?? 'calaos'

  return new ImageResponse(
    (
      <div
        style={{
          background: '#0a0a0a',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Top bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span style={{ color: '#888888', fontSize: '14px', letterSpacing: '3px', textTransform: 'uppercase' }}>
            calaos
          </span>
        </div>

        {/* Title */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <h1
            style={{
              color: '#f0f0f0',
              fontSize: title.length > 50 ? '42px' : '56px',
              fontWeight: '400',
              lineHeight: '1.2',
              letterSpacing: '-0.02em',
              maxWidth: '900px',
              margin: 0,
            }}
          >
            {title}
          </h1>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <span style={{ color: '#444444', fontSize: '14px' }}>Design & Craft</span>
          <span style={{ color: '#222222', fontSize: '14px' }}>·</span>
          <span style={{ color: '#444444', fontSize: '14px' }}>calaos.io</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
