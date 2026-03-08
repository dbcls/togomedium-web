import { NotFound } from "%stanza/components/atoms/NotFound";
import { ComponentWrapper } from "%storybook/components/ComponentWrapper";
import { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof NotFound> = {
  component: NotFound,
  decorators: [
    (Story) => (
      <ComponentWrapper>
        <Story />
      </ComponentWrapper>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof NotFound>;
export const Primary: Story = {
  args: {},
};
