import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone', // <--- This creates the ultra-fast production build
  /* your other config options here */
};

export default nextConfig;