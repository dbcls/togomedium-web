import { AlignmentCell } from "%stanza/stanzas/gmdb-media-alignment-table-by-components/components/AlignmentCell";
import { StoryProvider } from "%storybook/StoryProvider";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  component: AlignmentCell,
  args: {
    id: "GMO_0000001",
  },
  decorators: [
    (Story) => (
      <StoryProvider>
        <Story />
      </StoryProvider>
    ),
  ],
} satisfies Meta<typeof AlignmentCell>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Available = {
  args: {
    state: "available",
    label: "Sodium chloride",
  },
} satisfies Story;
export const None = {
  args: {
    state: "none",
    label: "Sodium chloride",
  },
} satisfies Story;
export const Grouped = {
  args: {
    state: "grouped",
    label: "Sodium chloride",
  },
} satisfies Story;
