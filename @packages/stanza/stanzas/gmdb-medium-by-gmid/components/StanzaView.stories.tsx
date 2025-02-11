import { Meta, StoryObj } from "@storybook/react";
import { StanzaView } from "%stanza/stanzas/gmdb-medium-by-gmid/components/StanzaView";
import { data1 } from "%stanza/stanzas/gmdb-medium-by-gmid/testing/data1";

const meta: Meta<typeof StanzaView> = {
  component: StanzaView,
};
export default meta;

type Story = StoryObj<typeof StanzaView>;
export const Primary: Story = {
  args: data1,
};
