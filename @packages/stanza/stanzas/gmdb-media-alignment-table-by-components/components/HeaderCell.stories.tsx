import { Meta, StoryObj } from "@storybook/react";
import { HeaderCell } from "%stanza/stanzas/gmdb-media-alignment-table-by-components/components/HeaderCell";

const meta: Meta<typeof HeaderCell> = {
  component: HeaderCell,
};
export default meta;

type Story = StoryObj<typeof HeaderCell>;
export const Primary: Story = {
  args: {
    label: "Media",
    isExpanded: false,
  },
};
