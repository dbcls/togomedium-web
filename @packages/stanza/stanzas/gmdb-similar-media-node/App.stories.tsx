import App from "%stanza/stanzas/gmdb-similar-media-node/App";
import { StoryProvider } from "%storybook/StoryProvider";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  component: App,
  decorators: [
    (Story) => (
      <StoryProvider>
        <Story />
      </StoryProvider>
    ),
  ],
} satisfies Meta<typeof App>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Result1 = {
  args: {
    gmId: "M2294",
  },
} satisfies Story;
export const Result2 = {
  args: {
    gmId: "M1015",
  },
} satisfies Story;
export const Result3 = {
  args: {
    gmId: "M2293",
  },
} satisfies Story;
