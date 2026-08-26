import { defineConfig, globalIgnores } from "eslint/config";

const eslintConfig = defineConfig([
  globalIgnores([
    "dist/**",
    "node_modules/**",
    "server/dist/**",
    "wbm/**"
  ]),
]);

export default eslintConfig;

