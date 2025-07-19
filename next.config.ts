import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   output: 'export',
     basePath: '/~amdcg',
  assetPrefix: '/~amdcg',
  /* config options here */
   images: {
    domains: [
      'placehold.co', // Add this line
      // Add any other image domains you use, e.g., 'example.com', 'another-cdn.net'
    ],
  },
};

export default nextConfig;
