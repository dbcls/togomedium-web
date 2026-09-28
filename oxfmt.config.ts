import { defineConfig } from "oxfmt";

export default defineConfig({
  ignorePatterns: [
    "@packages/sparql/queries/reference/**/source.md",
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
