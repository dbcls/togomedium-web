import { ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "jotai";
import React from "react";
import { EmotionGlobalStyles } from "../../stanza/components/EmotionGlobalStyles";
import { muiTheme } from "../../stanza/components/muiTheme";
import type { Preview } from "@storybook/react";
const queryClient = new QueryClient();
const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "dark",
      values: [
        {
          name: "dark",
          value: "#2A6A6F",
        },
        {
          name: "white",
          value: "#ffffff",
        },
      ],
    },
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Provider>
          <ThemeProvider theme={muiTheme}>
            <EmotionGlobalStyles />
            <Story />
          </ThemeProvider>
        </Provider>
      </QueryClientProvider>
    ),
  ],
};

export default preview;
