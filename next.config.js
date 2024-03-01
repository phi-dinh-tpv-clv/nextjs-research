/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // {
      //   source: "/",
      //   destination: "/task-management",
      //   permanent: false,
      // },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/graphql",
        destination: "http://localhost:5001/graphql",
      },
    ];
  },
  output: "standalone",
  reactStrictMode: false,
};

module.exports = nextConfig;
