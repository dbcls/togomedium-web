import { TopInfo } from "%stanza/stanzas/gmdb-meta-list/components/TopInfo";
import { StoryProvider } from "%storybook/StoryProvider";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  component: TopInfo,
  decorators: [
    (Story) => (
      <StoryProvider>
        <Story />
      </StoryProvider>
    ),
  ],
} satisfies Meta<typeof TopInfo>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Primary = {
  args: {
    total: 999,
    limit: 20,
    setOffset: () => {},
    setLimit: () => {},
  },
} satisfies Story;
