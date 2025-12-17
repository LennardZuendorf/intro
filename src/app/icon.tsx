import { basehub } from 'basehub';
import { ImageResponse } from 'next/og';

// Image metadata - standard favicon size
export const size = {
  width: 32,
  height: 32
};
export const contentType = 'image/png';

// Image generation function using SVG logo from BaseHub CMS
export default async function Icon() {
  // Fetch the logo SVG from BaseHub CMS
  const data = await basehub().query({
    globals: {
      icon: {
        url: true
      }
    }
  });

  // Use the logo URL from CMS, fallback to local file if not available
  const logoSrc = data.globals.icon?.url || '/img/logo-dark.svg';

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent'
      }}
    >
      {/* biome-ignore lint/performance/noImgElement: ImageResponse context requires img element */}
      <img
        src={logoSrc}
        alt='Lennard Zuendorf Logo'
        width='32'
        height='32'
        style={{
          width: '100%',
          height: '100%'
        }}
      />
    </div>,
    // ImageResponse options
    {
      ...size
    }
  );
}
