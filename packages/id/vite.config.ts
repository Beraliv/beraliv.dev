import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import markdownPlugin, { Mode } from "vite-plugin-markdown";

import { msToSeconds } from "./src/utils/msToSeconds";

const BUILD_TIME = msToSeconds(Date.now());
const DEPLOYMENT_TIME = BUILD_TIME + 10 * 60;

export default defineConfig({
  define: {
    BUILD_TIME,
    DEPLOYMENT_TIME,
  },
  esbuild: {
    jsxFactory: "h",
    jsxFragment: "Fragment",
    jsxInject: `import { h, Fragment } from '@jsxRuntime'`,
  },
  plugins: [
    // jsxRuntime is injected using tsconfig paths
    // to avoid relative paths
    tsconfigPaths(),
    markdownPlugin({
      mode: [Mode.HTML],
    }),
  ],
});
