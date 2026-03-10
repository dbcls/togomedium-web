import type { Meta, StoryObj } from "@storybook/react-vite";

import { LayoutStyles } from "./LayoutStyles";

const meta = {
  component: LayoutStyles,
  args: {},
  decorators: [],
} satisfies Meta<typeof LayoutStyles>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary = {} satisfies Story;
