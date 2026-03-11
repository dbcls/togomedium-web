import { MediaPane } from "%stanza/components/media-finder/MediaPane";
import { StoryProvider } from "%storybook/StoryProvider";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  component: MediaPane,
  decorators: [
    (Story) => (
      <StoryProvider mui>
        <Story />
      </StoryProvider>
    ),
  ],
} satisfies Meta<typeof MediaPane>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Primary = {
  args: {
    dispatchEvent: () => {},
  },
} satisfies Story;
