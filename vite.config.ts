import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import fs from "fs";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
  server: {
    host: true,
    https: {
      key: fs.readFileSync("/certs/localhost+3-key.pem"),
      cert: fs.readFileSync("/certs/localhost+3.pem"),
    },
  },
});
