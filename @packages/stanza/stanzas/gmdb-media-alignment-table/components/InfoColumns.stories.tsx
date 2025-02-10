import { Meta, StoryObj } from "@storybook/react";
import { mediaAlignmentTableResponse1 } from "%stanza/api/media-alignment-table/response1";
import { InfoColumns } from "%stanza/stanzas/gmdb-media-alignment-table/components/InfoColumns";

const meta: Meta<typeof InfoColumns> = {
  component: InfoColumns,
};
export default meta;

type Story = StoryObj<typeof InfoColumns>;
export const Primary: Story = {
  args: {
    data: mediaAlignmentTableResponse1,
  },
};
