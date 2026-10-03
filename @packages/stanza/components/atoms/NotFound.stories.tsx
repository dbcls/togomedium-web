import { ComponentWrapper } from "%stanza/.storybook/components/ComponentWrapper";
import { StoryProvider } from "%stanza/.storybook/StoryProvider";
import { NotFound } from "%stanza/components/atoms/NotFound";
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
