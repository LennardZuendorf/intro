/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/linkd',
                destination: 'https://www.linkedin.com/in/lennard-zuendorf/',
                permanent: true,
            },
            {
                source: '/github',
                destination: 'https://www.github.com/lennardzuendorf',
                permanent: true,
            },
            {
                source: '/linkedin',
                destination: '/linkd',
                permanent: true,
            },
            {
                source: '/mail',
                destination: 'mailto:lennard@zuendorf.me',
                permanent: true,
            },
        ];
    },
};

module.exports = nextConfig
