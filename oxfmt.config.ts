import { defineConfig } from "oxfmt";

export default defineConfig({
  ignorePatterns: [
    "@packages/web/src/routeTree.gen.ts",
    "@packages/web/public/data/pathway-test*.json",
  ],
  sortTailwindcss: {
    functions: ["clsx"],
  },
  sortImports: {
    newlinesBetween: false,
  },
});
