import type { Meta, StoryObj } from "@storybook/react-vite";
import { GridIcon } from "./GridIcon";
const meta = {
  component: GridIcon,
  args: { className: "size-5 text-gray-400" },
} satisfies Meta<typeof GridIcon>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Primary = {} satisfies Story;
export const Large = { args: { className: "size-12 text-gray-400" } } satisfies Story;
export const PrimaryColor = { args: { className: "size-5 text-primary-dark" } } satisfies Story;
