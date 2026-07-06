/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // PENTING: untuk Docker optimasi
  images: {
<<<<<<< HEAD
    domains: ['your-domain.com'],
    unoptimized: true,
  },
}

module.exports = nextConfig
=======
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  },
};

module.exports = nextConfig;
>>>>>>> 380df23ce009fbc0877bf92a43e148d857e57871
