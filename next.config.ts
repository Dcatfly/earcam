import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true, // Better for SEO with static exports
  images: {
    unoptimized: true,
  },
  // Remove X-Powered-By header for security
  poweredByHeader: false,
};

export default nextConfig;
