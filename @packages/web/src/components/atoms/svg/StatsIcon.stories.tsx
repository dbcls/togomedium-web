import type { Meta, StoryObj } from "@storybook/react-vite";
import { StatsIcon } from "./StatsIcon";
const meta = {
  component: StatsIcon,
  args: { className: "size-5 text-gray-400" },
} satisfies Meta<typeof StatsIcon>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Primary = {} satisfies Story;
export const Large = { args: { className: "size-12 text-gray-400" } } satisfies Story;
export const PrimaryColor = { args: { className: "size-5 text-primary-dark" } } satisfies Story;
