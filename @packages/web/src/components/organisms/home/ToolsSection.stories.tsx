import type { Meta, StoryObj } from "@storybook/react-vite";
import { ToolsSection } from "./ToolsSection";

const meta = {
  component: ToolsSection,
} satisfies Meta<typeof ToolsSection>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Primary = {} satisfies Story;
