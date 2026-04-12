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
        backgroundColor: '#1a1a1a',
        backgroundImage:
          'radial-gradient(circle at 25px 25px, #3a3a3a 2%, transparent 0%), radial-gradient(circle at 75px 75px, #3a3a3a 2%, transparent 0%)',
        backgroundSize: '100px 100px'
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#242424',
          border: '3px solid #000',
          borderRadius: '16px',
          padding: '80px 100px',
          boxShadow: '8px 8px 0px 0px #ffdb33'
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            color: '#f5f5f5',
            marginBottom: 20,
            letterSpacing: '-0.02em'
          }}
        >
          Lennard Z&uuml;ndorf
        </div>

        <div
          style={{
            fontSize: 40,
            fontWeight: 600,
            color: '#ffdb33',
            marginBottom: 40
          }}
        >
          Fullstack Product Builder
        </div>

        <div
          style={{
            fontSize: 28,
            color: '#a0a0a0',
            textAlign: 'center',
            maxWidth: 800,
            lineHeight: 1.4
          }}
        >
          Turning customer pain and business needs into real products, strategy, and systems that
          work.
        </div>

        <div
          style={{
            fontSize: 24,
            color: '#5c5c5c',
            marginTop: 40,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          zuendorf.me
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginTop: 40,
          padding: '12px 24px',
          backgroundColor: '#ffdb33',
          border: '2px solid #000',
          borderRadius: '8px'
        }}
      >
        <div
          style={{
            fontSize: 18,
            color: '#000',
            fontFamily: 'monospace',
            fontWeight: 600
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
