import { AlignmentCell } from "%stanza/stanzas/gmdb-media-alignment-table-by-components/components/AlignmentCell";
import { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof AlignmentCell> = {
  component: AlignmentCell,
};
export default meta;

type Story = StoryObj<typeof AlignmentCell>;
export const Available: Story = {
  args: {
    state: "available",
    label: "Sodium chloride",
  },
};
export const None: Story = {
  args: {
    state: "none",
    label: "Sodium chloride",
  },
};
export const Grouped: Story = {
  args: {
    state: "grouped",
    label: "Sodium chloride",
  },
};
