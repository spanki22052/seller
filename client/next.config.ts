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
    ],
  },
  // Note: src/compositions is for FSD page compositions, not Next.js routes
  // Next.js routes are in src/app directory (App Router)
  // src/pages is FSD architecture layer, not Next.js Pages Router
  pageExtensions: ["tsx", "ts", "jsx", "js"],
  typedRoutes: false,
};

export default nextConfig;
