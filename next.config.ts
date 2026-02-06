import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: [
    'http://172.20.10.2',
    'http://21.0.5.41',
    'http://localhost:3000',
    'http://localhost:3001',
  ],
};

export default nextConfig;
