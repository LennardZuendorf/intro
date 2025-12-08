/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {},
  async redirects() {
    return [
      {
        source: '/linkedin',
        destination: '/linkd',
        permanent: true
      },
      {
        source: '/linkd',
        destination: 'https://www.linkedin.com/in/lennard-zuendorf/',
        permanent: true
      },
      {
        source: '/github',
        destination: 'https://www.github.com/lennardzuendorf',
        permanent: true
      },
      {
        source: '/cv',
        destination: 'https://www.zuendorf.me/docs/cv.pdf',
        permanent: true
      }
    ];
  }
};

export default nextConfig;
