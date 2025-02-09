import { Meta, StoryObj } from "@storybook/react";
import { ComponentSelect } from "%stanza/stanzas/gmdb-find-media-by-components/components/ComponentSelect";
import { ComponentWrapper } from "%storybook/components/ComponentWrapper";

const meta: Meta<typeof ComponentSelect> = {
  component: ComponentSelect,
  decorators: [
    (Story) => (
      <ComponentWrapper>
        <Story />
      </ComponentWrapper>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof ComponentSelect>;
export const Primary: Story = {
  args: {
    onChangeSelection: (ids) => {
      console.log(ids);
    },
  },
};
