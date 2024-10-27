import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { viteMarkdownPlugin } from "./src/utils/viteMarkdownPlugin";

export default defineConfig({
  esbuild: {
    jsxFactory: "h",
    jsxFragment: "Fragment",
    jsxInject: `import { h, Fragment } from '@jsxRuntime'`,
  },
  plugins: [
    // jsxRuntime is injected using tsconfig paths
    // to avoid relative paths
    tsconfigPaths(),
    viteMarkdownPlugin(),
  ],
});
