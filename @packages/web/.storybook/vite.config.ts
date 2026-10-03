import { join } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tailwindcss(), react()],
  resolve: {
    alias: [
      // Replace the transport before resolving the general source alias.
      {
        find: /^@\/utils\/fetch(?:\.ts)?$/,
        replacement: join(import.meta.dirname, "fixtureFetch.ts"),
      },
      { find: /^@\//, replacement: join(import.meta.dirname, "../src/") },
      { find: /^%api\//, replacement: join(import.meta.dirname, "../../api/src/") },
      { find: /^%core\//, replacement: join(import.meta.dirname, "../../core/src/") },
    ],
  },
});
