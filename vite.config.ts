import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: true,
  },
  build: {
    rollupOptions: {
      // The Mini App SDK is provided by the Farcaster host environment at runtime.
      // Mark it as external so Vite/Rollup does not try to bundle it during SSR/build.
      external: ["@farcaster/miniapp-sdk"],
    },
  },
});
