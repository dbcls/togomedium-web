import type { Meta, StoryObj } from "@storybook/react-vite";
import { ApiIcon } from "./ApiIcon";
const meta = {
  component: ApiIcon,
  args: { className: "size-5 text-gray-400" },
} satisfies Meta<typeof ApiIcon>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Primary = {} satisfies Story;
export const Large = { args: { className: "size-12 text-gray-400" } } satisfies Story;
export const PrimaryColor = { args: { className: "size-5 text-primary-dark" } } satisfies Story;
