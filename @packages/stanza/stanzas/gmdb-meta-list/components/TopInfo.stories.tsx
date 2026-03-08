import { TopInfo } from "%stanza/stanzas/gmdb-meta-list/components/TopInfo";
import { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof TopInfo> = {
  component: TopInfo,
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
