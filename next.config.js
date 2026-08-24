/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.professionaltechs.co",
          },
        ],
        destination: "https://professionaltechs.co/:path*",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;