/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dev.lush.co.kr',
        port: '',
        pathname: '/upload/**/*',
      }
    ]
  }
}

module.exports = nextConfig
