import { defineConfig, loadEnv } from "vite";
import solidPlugin from "solid-start/vite";
import solidSvg from "vite-plugin-solid-svg";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    define: {
      "process.env": {
        RAPID_API_HOST: env.RAPID_API_HOST,
        RAPID_API_KEY: env.RAPID_API_KEY,
      },
    },
    plugins: [solidPlugin(), solidSvg()],
    server: {
      port: 3000,
    },
    build: {
      target: "esnext",
    },
  };
});
