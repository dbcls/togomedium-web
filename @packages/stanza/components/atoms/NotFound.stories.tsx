import { NotFound } from "%stanza/components/atoms/NotFound";
import { ComponentWrapper } from "%storybook/components/ComponentWrapper";
import { StoryProvider } from "%storybook/StoryProvider";
import { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof NotFound> = {
  component: NotFound,
  decorators: [
    (Story) => (
      <StoryProvider>
        <Story />
      </StoryProvider>
    ),
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
