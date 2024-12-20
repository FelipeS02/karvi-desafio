import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [{ source: '/', destination: '/catalog', permanent: true }];
  },
};

export default nextConfig;
