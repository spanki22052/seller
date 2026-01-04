import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3001,
    proxy: {
      "/api": {
        target: process.env.VITE_API_URL || "http://localhost:3002",
        changeOrigin: true, // Changes Host header, but Origin should remain
        secure: false,
        ws: true, // Enable WebSocket proxying
        headers: {
          // Preserve the original origin
          Connection: "keep-alive",
        },
        configure: (proxy) => {
          proxy.on("error", (err) => {
            console.log("proxy error", err);
          });
          proxy.on("proxyReq", (proxyReq, req) => {
            // Log the origin header being sent
            const origin = req.headers.origin;
            console.log("Sending Request to the Target:", req.method, req.url);
            console.log("Original Origin:", origin);
            // Ensure origin is preserved
            if (origin) {
              proxyReq.setHeader("Origin", origin);
            }
          });
          proxy.on("proxyRes", (proxyRes, req) => {
            console.log(
              "Received Response from the Target:",
              proxyRes.statusCode,
              req.url
            );
          });
        },
      },
    },
  },
});
