import { StanzaView } from "%stanza/stanzas/gmdb-medium-detail/components/StanzaView";
import { data1 } from "%stanza/stanzas/gmdb-medium-detail/testing/data1";
import { StoryProvider } from "%storybook/StoryProvider";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  component: StanzaView,
  decorators: [
    (Story) => (
      <StoryProvider>
        <Story />
      </StoryProvider>
    ),
  ],
} satisfies Meta<typeof StanzaView>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Primary = {
  args: data1,
} satisfies Story;
