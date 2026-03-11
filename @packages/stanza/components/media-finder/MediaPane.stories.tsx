import { MediaPane } from "%stanza/components/media-finder/MediaPane";
import { StoryProvider } from "%storybook/StoryProvider";
import { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof MediaPane> = {
  component: MediaPane,
  decorators: [
    (Story) => (
      <StoryProvider mui>
        <Story />
      </StoryProvider>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof MediaPane>;
export const Primary: Story = {
  args: {
    dispatchEvent: () => {},
  },
};
