import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import { join } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  root: "src/",
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: /^%stanza\//,
        replacement: join(__dirname, "../", "stanza/"),
      },
      // {
      //   find: /^%editor\//,
      //   replacement: join(__dirname, "../", "editor/src/"),
      // },
      // {
      //   find: /^%core\//,
      //   replacement: join(__dirname, "../", "core/src/"),
      // },
      // {
      //   find: /^%schema\//,
      //   replacement: join(__dirname, "../", "schema/src/"),
      // },
      // {
      //   find: /^%storybook\//,
      //   replacement: join(__dirname, "../", "storybook/src/"),
      // },
    ],
  },
});
