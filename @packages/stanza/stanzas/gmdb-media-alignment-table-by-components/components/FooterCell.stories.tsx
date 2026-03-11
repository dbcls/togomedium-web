import { FooterCell } from "%stanza/stanzas/gmdb-media-alignment-table-by-components/components/FooterCell";
import { StoryProvider } from "%storybook/StoryProvider";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  component: FooterCell,
  decorators: [
    (Story) => (
      <StoryProvider>
        <Story />
      </StoryProvider>
    ),
  ],
} satisfies Meta<typeof FooterCell>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Level0 = {
  args: {
    label: "Distilled Water",
    level: 0,
    hasChildren: false,
    isOpen: false,
    id: "id",
  },
} satisfies Story;
export const Level1 = {
  args: {
    label: "Distilled Water",
    level: 1,
    hasChildren: true,
    isOpen: true,
    id: "id",
  },
} satisfies Story;
