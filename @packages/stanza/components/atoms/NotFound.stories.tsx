import { NotFound } from "%stanza/components/atoms/NotFound";
import { ComponentWrapper } from "%storybook/components/ComponentWrapper";
import { StoryProvider } from "%storybook/StoryProvider";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
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
} satisfies Meta<typeof NotFound>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Primary = {
  args: {},
} satisfies Story;
