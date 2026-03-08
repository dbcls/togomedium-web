import { FoundMediaList } from "%stanza/components/media-finder/FoundMediaList";
import { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof FoundMediaList> = {
  component: FoundMediaList,
};
export default meta;

type Story = StoryObj<typeof FoundMediaList>;
export const Primary: Story = {
  args: {},
};
