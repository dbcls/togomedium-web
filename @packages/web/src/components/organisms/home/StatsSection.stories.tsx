import type { Meta, StoryObj } from "@storybook/react-vite";
import { StatsSection } from "./StatsSection";

const meta = {
  component: StatsSection,
  parameters: { web: { showLocation: true } },
} satisfies Meta<typeof StatsSection>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Primary = {} satisfies Story;
export const ZeroCounts = {
  parameters: { web: { counts: { media: 0, strains: 0, components: 0 } } },
} satisfies Story;
export const LargeCounts = {
  parameters: { web: { counts: { media: 123456, strains: 1234567, components: 98765 } } },
} satisfies Story;
