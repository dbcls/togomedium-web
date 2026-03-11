import { StanzaView } from "%stanza/stanzas/gmdb-medium-detail/components/StanzaView";
import { data1 } from "%stanza/stanzas/gmdb-medium-detail/testing/data1";
import { StoryProvider } from "%storybook/StoryProvider";
import { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof StanzaView> = {
  component: StanzaView,
  decorators: [
    (Story) => (
      <StoryProvider>
        <Story />
      </StoryProvider>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof StanzaView>;
export const Primary: Story = {
  args: data1,
};
