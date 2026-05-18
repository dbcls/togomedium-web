import App from "%stanza/stanzas/gmdb-stats-culturable-species/App";
import { ComponentWrapper } from "%storybook/components/ComponentWrapper";
import { StoryProvider } from "%storybook/StoryProvider";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  component: App,
  args: {
    gmo_id: "GMO_0000001",
  },
  decorators: [
    (Story) => (
      <StoryProvider reactQuery>
        <Story />
      </StoryProvider>
    ),
    (Story) => (
      <ComponentWrapper>
        <Story />
      </ComponentWrapper>
    ),
  ],
} satisfies Meta<typeof App>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Result1 = {} satisfies Story;
