import App from "%stanza/stanzas/gmdb-medium-builder/App";
import { StoryProvider } from "%storybook/StoryProvider";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  component: App,
  decorators: [
    (Story) => (
      <StoryProvider reactQuery mui>
        <Story />
      </StoryProvider>
    ),
  ],
} satisfies Meta<typeof App>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Result1 = {
  args: {},
} satisfies Story;
