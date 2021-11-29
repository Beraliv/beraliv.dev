module.exports = {
  require: ["ts-node/register/transpile-only"],
  extension: ["ts", "tsx"],
  watchExtensions: ["ts", "tsx"],
  spec: ["**/*.test.ts", "**/*.test.tsx"],
};
