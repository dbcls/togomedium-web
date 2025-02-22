import react from "@vitejs/plugin-react";
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react(),tsconfigPaths()],
  test: {
    include: ["**/*.spec.tsx","**/*.spec.ts"],
    globals: true,
    environment:"happy-dom"
  },
});
