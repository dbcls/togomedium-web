import type { Preview } from "@storybook/react-vite";
import "./tailwind.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      options: {
        dark: {
          name: "dark",
          value: "#2A6A6F",
        },

        white: {
          name: "white",
          value: "#ffffff",
        },
      },
    },
  },

  initialGlobals: {
    backgrounds: {
      value: "dark",
    },
  },
};

export default preview;
