/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Local backend
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/api/images/**",
      },

      // Production domain
      {
        protocol: "https",
        hostname: "www.outletexpense.xyz",
        pathname: "/uploads/**",
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: "/api/images/:path*",
        destination: "http://localhost:5000/api/images/:path*",
      },
    ];
  },
};

export default nextConfig;
