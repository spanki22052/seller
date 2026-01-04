import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "9000",
        pathname: "/public/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "9000",
        pathname: "/public/**",
      },
      {
        protocol: "http",
        hostname: "62.181.53.211",
        port: "9000",
        pathname: "/public/**",
      },
    ],
  },
  // Note: src/compositions is for FSD page compositions, not Next.js routes
  // Next.js routes are in src/app directory (App Router)
  // src/pages is FSD architecture layer, not Next.js Pages Router
  pageExtensions: ["tsx", "ts", "jsx", "js"],
  typedRoutes: false,
};

export default nextConfig;
