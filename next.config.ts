import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    apiURL: 'https://song-server-omega.vercel.app/api/songs'
  }
};

export default nextConfig;
