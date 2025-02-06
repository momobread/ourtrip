import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'zmuwonipjizutjtllmoq.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/preview_img/**',
        search: '',
      },
    ],
  },
};

export default nextConfig;
