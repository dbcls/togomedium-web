import dotenv from "rollup-plugin-dotenv";
import { join } from "path";

export default function config(environment) {
  return {
    rollup: {
      plugins: [dotenv()],
      alias: [
        {
          find: /^%stanza\//,
          replacement: join(__dirname, "../", "stanza/"),
        },
        {
          find: /^%storybook\//,
          replacement: join(__dirname, "../", "storybook/src/"),
        },
        {
          find: /^%core\//,
          replacement: join(__dirname, "../", "core/src/"),
        },
        {
          find: /^%api\//,
          replacement: join(__dirname, "../", "api/src/"),
        },
      ],
    },
  };
}
