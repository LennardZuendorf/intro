const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */

const nextConfig = {
  async redirects() {
    return [
      {
        source: "/linkd",
        destination: "https://www.linkedin.com/in/lennard-zuendorf/",
        permanent: true,
      },
      {
        source: "/github",
        destination: "https://www.github.com/lennardzuendorf",
        permanent: true,
      },
      {
        source: "/linkedin",
        destination: "/linkd",
        permanent: true,
      },
      {
        source: "/projects/thesis/preview",
        destination:
          "https://huggingface.co/spaces/LennardZuendorf/thesis-webapp-docker",
        permanent: true,
      },
    ];
  },
};

module.exports = withContentlayer(nextConfig);
