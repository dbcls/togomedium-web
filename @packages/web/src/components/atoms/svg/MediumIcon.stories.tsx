import type { Meta, StoryObj } from "@storybook/react-vite";
import { MediumIcon } from "./MediumIcon";
const meta = {
  component: MediumIcon,
  args: { className: "size-5 text-gray-400" },
} satisfies Meta<typeof MediumIcon>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Primary = {} satisfies Story;
export const Large = { args: { className: "size-12 text-gray-400" } } satisfies Story;
export const PrimaryColor = { args: { className: "size-5 text-primary-dark" } } satisfies Story;
