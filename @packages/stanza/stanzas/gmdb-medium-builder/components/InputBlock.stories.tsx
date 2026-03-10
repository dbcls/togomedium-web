import type { Meta, StoryObj } from "@storybook/react-vite";

import { InputBlock } from "./InputBlock";

const meta = {
  component: InputBlock,
  args: {},
  decorators: [],
} satisfies Meta<typeof InputBlock>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary = {} satisfies Story;
