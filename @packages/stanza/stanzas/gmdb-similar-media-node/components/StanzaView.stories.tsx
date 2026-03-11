import { StanzaView } from "%stanza/stanzas/gmdb-similar-media-node/components/StanzaView";
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
  args: {
    gmId: "M2294",
  },
} satisfies Story;
