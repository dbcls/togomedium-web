import { StoryProvider } from "%storybook/StoryProvider";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { InputBlock } from "./InputBlock";

const meta = {
  component: InputBlock,
  args: {
    id: "123",
  },
  decorators: [
    (Story) => (
      <StoryProvider reactQuery mui>
        <Story />
      </StoryProvider>
    ),
  ],
} satisfies Meta<typeof InputBlock>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary = {} satisfies Story;
