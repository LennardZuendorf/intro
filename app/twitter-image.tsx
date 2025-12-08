import { ImageResponse } from 'next/og';
import { siteMetadata } from '@/data/site';

export const runtime = 'edge';

export const alt = siteMetadata.title;
export const size = {
  width: 1200,
  height: 630
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#09090b',
        backgroundImage:
          'radial-gradient(circle at 25px 25px, #27272a 2%, transparent 0%), radial-gradient(circle at 75px 75px, #27272a 2%, transparent 0%)',
        backgroundSize: '100px 100px'
      }}
    >
      {/* Main Card */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#18181b',
          border: '1px solid #27272a',
          borderRadius: '24px',
          padding: '80px 100px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)'
        }}
      >
        {/* Name */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            background: 'linear-gradient(to bottom, #ffffff, #a1a1aa)',
            backgroundClip: 'text',
            color: 'transparent',
            marginBottom: 20,
            letterSpacing: '-0.02em'
          }}
        >
          Lennard Zündorf
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 40,
            fontWeight: 600,
            color: '#e4e4e7',
            marginBottom: 40
          }}
        >
          Fullstack Product Builder
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: 28,
            color: '#a1a1aa',
            textAlign: 'center',
            maxWidth: 800,
            lineHeight: 1.4
          }}
        >
          Turning customer pain and business needs into real products, strategy, and systems that
          work.
        </div>

        {/* URL */}
        <div
          style={{
            fontSize: 24,
            color: '#71717a',
            marginTop: 40,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          zuendorf.me
        </div>
      </div>

      {/* Badge */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginTop: 40,
          padding: '12px 24px',
          backgroundColor: '#18181b',
          border: '1px solid #27272a',
          borderRadius: '12px'
        }}
      >
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            backgroundColor: '#22c55e',
            marginRight: 12
          }}
        />
        <div
          style={{
            fontSize: 18,
            color: '#a1a1aa',
            fontFamily: 'monospace'
          }}
        >
          Currently at CHECK24 Flug
        </div>
      </div>
    </div>,
    {
      ...size
    }
  );
}
