import { Meta, StoryObj } from "@storybook/react";
import { MediaTab } from "%stanza/components/media-finder/MediaTab";
import { ComponentWrapper } from "%storybook/components/ComponentWrapper";

const meta: Meta<typeof MediaTab> = {
  component: MediaTab,
  decorators: [
    (Story) => (
      <ComponentWrapper>
        <Story />
      </ComponentWrapper>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof MediaTab>;
export const Primary: Story = {};
