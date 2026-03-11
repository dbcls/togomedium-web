import { StanzaView } from "%stanza/stanzas/gmdb-similar-media-node/components/StanzaView";
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
  args: {
    gmId: "M2294",
  },
};
