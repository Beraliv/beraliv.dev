import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
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
  plugins: [tsconfigPaths()],
});
