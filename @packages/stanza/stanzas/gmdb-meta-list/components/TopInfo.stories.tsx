import { TopInfo } from "%stanza/stanzas/gmdb-meta-list/components/TopInfo";
import { StoryProvider } from "%storybook/StoryProvider";
import { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof TopInfo> = {
  component: TopInfo,
  decorators: [
    (Story) => (
      <StoryProvider>
        <Story />
      </StoryProvider>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof TopInfo>;
export const Primary: Story = {
  args: {
    total: 999,
    limit: 20,
    setOffset: () => {},
    setLimit: () => {},
  },
};
