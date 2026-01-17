/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: '**.onrender.com',  // This allows any Render subdomain
        pathname: '/media/**',
      },
    ],
  },
};

export default nextConfig;
