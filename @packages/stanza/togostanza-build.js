import dotenv from "rollup-plugin-dotenv";
import { join } from "path";

export default function config(environment) {
  return {
    rollup: {
      plugins: [dotenv()],
      alias: [
        {
          find: /^%viewer\//,
          replacement: join(__dirname, "../", "viewer/src/"),
        },
        {
          find: /^%editor\//,
          replacement: join(__dirname, "../", "editor/src/"),
        },
        {
          find: /^%core\//,
          replacement: join(__dirname, "../", "core/src/"),
        },
        {
          find: /^%schema\//,
          replacement: join(__dirname, "../", "schema/src/"),
        },
      ],
    },
  };
}
