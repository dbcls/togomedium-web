import { StanzaView } from "%stanza/stanzas/gmdb-similar-media-node/components/StanzaView";
import { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof StanzaView> = {
  component: StanzaView,
};
export default meta;

type Story = StoryObj<typeof StanzaView>;
export const Primary: Story = {
  args: {
    gmId: "M2294",
  },
};
