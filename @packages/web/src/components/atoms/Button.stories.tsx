import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";
const meta = {
  component: Button,
  args: { label: "Search", type: "button" },
} satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Primary = {} satisfies Story;
export const FullWidth = {
  args: { label: "Compare selected media", className: "w-full" },
} satisfies Story;
