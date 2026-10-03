import type { Meta, StoryObj } from "@storybook/react-vite";
import { NavDivider } from "./NavDivider";
const meta = {
  component: NavDivider,
  decorators: [
    (Story) => (
      <ul className="w-64">
        <li className="p-2">Browse</li>
        <Story />
        <li className="p-2">Tools</li>
      </ul>
    ),
  ],
} satisfies Meta<typeof NavDivider>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Primary = {} satisfies Story;
