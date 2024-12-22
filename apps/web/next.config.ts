import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'web.archive.org',
        port: '',
        pathname: '/**',
      }
    ]
  }
};

export default nextConfig;
