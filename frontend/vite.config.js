import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/": "https://ecommerce-e1n1.onrender.com",
      "/uploads/": "https://ecommerce-e1n1.onrender.com",
    },
  },
});
