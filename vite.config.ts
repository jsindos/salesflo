import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProd = mode === "production";
  return {
    base: "/",
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(path.resolve(), "src"),
      },
    },
    build: {
      outDir: "server/dist/client",
    },
    define: {
      "import.meta.env.BASE_URL": isProd ? JSON.stringify("") : JSON.stringify("http://localhost:8080"),
    },
  };
});
