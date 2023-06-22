/// <reference types="./vite-env-override.d.ts" />
import { defineConfig, loadEnv } from "vite";
import solidPlugin from "vite-plugin-solid";
import solidSvg from "vite-plugin-solid-svg";
// import devtools from 'solid-devtools/vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    define: {
      "process.env": {
        RAPID_API_HOST: env.RAPID_API_HOST,
        RAPID_API_KEY: env.RAPID_API_KEY,
      },
    },
    plugins: [
      /* 
        Uncomment the following line to enable solid-devtools.
        For more info see https://github.com/thetarnav/solid-devtools/tree/main/packages/extension#readme
      */
      // devtools(),
      solidPlugin(),
      solidSvg(),
    ],
    server: {
      port: 3000,
    },
    build: {
      target: "esnext",
    },
  };
});
