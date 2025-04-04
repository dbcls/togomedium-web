import { Meta, StoryObj } from "@storybook/react";
import { FoundMediaList } from "%stanza/components/media-finder/FoundMediaList";

const meta: Meta<typeof FoundMediaList> = {
  component: FoundMediaList,
};
export default meta;

type Story = StoryObj<typeof FoundMediaList>;
export const Primary: Story = {
  args: {},
};
