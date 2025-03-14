import type { StorybookConfig } from "@storybook/react-vite";

// "../../core/src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
// "../../editor/src/**/*.stories.@(js|jsx|mjs|ts|tsx)",

const config: StorybookConfig = {
  stories: [
    {
      directory: "../../stanza/",
      files: "**/*.stories.@(js|jsx|mjs|ts|tsx)",
      titlePrefix: "Stanza",
    },
    {
      directory: "../../web/src/",
      files: "**/*.stories.@(js|jsx|mjs|ts|tsx)",
      titlePrefix: "Web",
    },
    // {
    //   directory: "../../editor/src/",
    //   files: "**/*.stories.@(js|jsx|mjs|ts|tsx)",
    //   titlePrefix: "Editor",
    // },
  ],
  addons: [
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

};
export default config;
