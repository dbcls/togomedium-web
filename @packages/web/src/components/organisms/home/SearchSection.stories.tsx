import type { Meta, StoryObj } from "@storybook/react-vite";
import { SearchSection } from "./SearchSection";

const meta = {
  component: SearchSection,
} satisfies Meta<typeof SearchSection>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Primary = {} satisfies Story;
