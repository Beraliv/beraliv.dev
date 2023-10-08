/// <reference types="vitest" />
/// <reference types="vite/client" />

import { resolve } from "path";
import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import { UserConfig as VitestUserConfig } from "vitest/config";

const vitestConfig: VitestUserConfig = {
  test: {
    deps: {
      registerNodeLoader: true,
    },
    threads: false,
    isolate: false,
  },
};

export default defineConfig({
  plugins: [solidPlugin()],
  server: {
    port: 3000,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        create: resolve(__dirname, "create/index.html"),
      },
    },
    target: "esnext",
  },
  // @ts-expect-error: 'test' does not exist in type 'UserConfigExport'
  test: vitestConfig.test,
});
