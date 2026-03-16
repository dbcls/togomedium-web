import { defineConfig } from "oxlint";

export default defineConfig({
  categories: {
    correctness: "warn",
  },
  jsPlugins: [
    {
      name: "react-refresh",
      specifier: "eslint-plugin-react-refresh",
    },
  ],
  rules: {
    "typescript/no-empty-object-type": "off",
    "typescript/no-explicit-any": "off",
    "typescript/no-unused-vars": "off",
    "no-unused-expressions": "off",
    "typescript/no-unused-expressions": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
  },
  options: {
    typeAware: false,
    typeCheck: true,
  },
  ignorePatterns: ["@packages/web/src/routeTree.gen.ts"],
});
