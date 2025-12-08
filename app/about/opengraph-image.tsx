import { ImageResponse } from 'next/og';
import { siteMetadata } from '@/data/site';

export const runtime = 'edge';

export const alt = 'About Lennard Zündorf';
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
        {/* Title */}
        <div
          style={{
            fontSize: 56,
            fontWeight: 900,
            background: 'linear-gradient(to bottom, #ffffff, #a1a1aa)',
            backgroundClip: 'text',
            color: 'transparent',
            marginBottom: 30,
            letterSpacing: '-0.02em'
          }}
        >
          About Me
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: 32,
            color: '#e4e4e7',
            textAlign: 'center',
            maxWidth: 900,
            lineHeight: 1.5,
            marginBottom: 30
          }}
        >
          Product Manager passionate about building great digital products
        </div>

        {/* Skills */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 12,
            justifyContent: 'center',
            maxWidth: 900
          }}
        >
          {[
            'Product Management',
            'Software Engineering',
            'Full Stack Development',
            'Innovation Management'
          ].map((skill) => (
            <div
              key={skill}
              style={{
                padding: '8px 20px',
                backgroundColor: '#27272a',
                border: '1px solid #3f3f46',
                borderRadius: '8px',
                fontSize: 20,
                color: '#a1a1aa'
              }}
            >
              {skill}
            </div>
          ))}
        </div>

        {/* URL */}
        <div
          style={{
            fontSize: 24,
            color: '#71717a',
            marginTop: 40
          }}
        >
          zuendorf.me/about
        </div>
      </div>
    </div>,
    {
      ...size
    }
  );
}
