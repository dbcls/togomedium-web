import { App } from "%stanza/stanzas/gmdb-medium-detail/App";
import { StoryProvider } from "%storybook/StoryProvider";
import type { Meta, StoryObj } from "@storybook/react-vite";
//
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

export const Primary = {
  args: {
    gm_id: "M1470",
  },
} satisfies Story;
export const Secondary = {
  args: {
    gm_id: "M439",
  },
} satisfies Story;
