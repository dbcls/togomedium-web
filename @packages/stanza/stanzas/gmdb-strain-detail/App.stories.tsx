import App from "%stanza/stanzas/gmdb-strain-detail/App";
import { StoryProvider } from "%storybook/StoryProvider";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  component: App,
  decorators: [
    (Story) => (
      <StoryProvider reactQuery>
        <Story />
      </StoryProvider>
    ),
  ],
} satisfies Meta<typeof App>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Result1 = {
  args: {
    strain_id: "S602",
  },
} satisfies Story;

export const Result2 = {
  args: {
    strain_id: "S1238",
  },
} satisfies Story;
