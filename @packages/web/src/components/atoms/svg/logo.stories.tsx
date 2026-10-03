import type { Meta, StoryObj } from "@storybook/react-vite";
import { Logo } from "./logo";
const meta = {
  component: Logo,
  args: { className: "w-48" },
} satisfies Meta<typeof Logo>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Primary = {} satisfies Story;
export const Compact = { args: { className: "w-32" } } satisfies Story;
export const Large = { args: { className: "w-80" } } satisfies Story;
