/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/api/images/**",
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: "/api/images/:path*",
        destination: "https://mazhar-backend.vercel.app/api/images/:path*",
      },
    ];
  },
};

export default nextConfig;
