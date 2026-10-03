import { join } from "node:path";
import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: [
    {
      directory: "../",
      files: "**/*.stories.@(js|jsx|mjs|ts|tsx)",
      titlePrefix: "Stanza",
    },
  ],
  addons: ["@storybook/addon-docs"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  core: {
    builder: {
      name: "@storybook/builder-vite",
      options: { viteConfigPath: join(import.meta.dirname, "vite.config.ts") },
    },
  },
};
export default config;
