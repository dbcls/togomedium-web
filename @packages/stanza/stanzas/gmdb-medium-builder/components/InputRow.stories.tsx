import type { Meta, StoryObj } from "@storybook/react-vite";

import { InputRow } from "./InputRow";

const meta = {
  component: InputRow,
  args: {},
  decorators: [],
} satisfies Meta<typeof InputRow>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary = {} satisfies Story;
