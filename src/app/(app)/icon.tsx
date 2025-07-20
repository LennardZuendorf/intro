import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

// Image metadata - standard favicon size
export const size = {
  width: 32,
  height: 32
};
export const contentType = 'image/png';

// Image generation function using existing SVG logo
export default async function Icon() {
  // Read the existing SVG logo file
  const logoData = await readFile(join(process.cwd(), 'src/public/img/logo-dark.svg'));
  // Convert to data URL for img src
  const logoSrc = `data:image/svg+xml;base64,${Buffer.from(logoData).toString('base64')}`;

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
