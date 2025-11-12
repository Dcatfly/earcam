import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: process.env.PAGES_BASE_PATH,
  trailingSlash: true, // Better for SEO with static exports
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: process.env.PAGES_BASE_PATH || '',
  },
  // Remove X-Powered-By header for security
  poweredByHeader: false,
};

export default nextConfig;
