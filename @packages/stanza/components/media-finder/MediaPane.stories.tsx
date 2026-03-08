import { MediaPane } from "%stanza/components/media-finder/MediaPane";
import { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof MediaPane> = {
  component: MediaPane,
};
export default meta;

type Story = StoryObj<typeof MediaPane>;
export const Primary: Story = {
  args: {
    dispatchEvent: () => {},
  },
};
