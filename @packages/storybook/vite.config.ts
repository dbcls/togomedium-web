import { join } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  root: "src/",
  plugins: [tailwindcss(), react()],
  resolve: {
    alias: [
      {
        find: /^%stanza\//,
        replacement: join(import.meta.dirname, "../", "stanza/"),
      },
      {
        find: /^%storybook\//,
        replacement: join(import.meta.dirname, "../", "storybook/src/"),
      },
      {
        find: /^%core\//,
        replacement: join(import.meta.dirname, "../", "core/src/"),
      },
      {
        find: /^%api\//,
        replacement: join(import.meta.dirname, "../", "api/src/"),
      },
      {
        find: /^%web\//,
        replacement: join(import.meta.dirname, "../", "web/src/"),
      },
    ],
  },
});
