import App from "%stanza/stanzas/gmdb-find-media-by-organism-phenotype/App";
import { StoryProvider } from "%storybook/StoryProvider";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  component: App,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <StoryProvider reactQuery mui>
        <Story />
      </StoryProvider>
    ),
    (S) => (
      <div style={{ backgroundColor: "aqua", height: "100vh" }}>
        <S />
      </div>
    ),
  ],
} satisfies Meta<typeof App>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Primary = {} satisfies Story;
