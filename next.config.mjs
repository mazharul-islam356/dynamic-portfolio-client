/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/images/:path*',
        destination: 'http://localhost:5000/api/images/:path*',
      },
    ];
  },
};

export default nextConfig;
