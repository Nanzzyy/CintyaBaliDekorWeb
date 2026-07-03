/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // PENTING: untuk Docker optimasi
  images: {
    domains: ['your-domain.com'],
    unoptimized: true,
  },
}

module.exports = nextConfig
