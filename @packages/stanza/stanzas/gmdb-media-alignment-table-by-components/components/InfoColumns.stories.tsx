import { mediaAlignmentTableResponse1 } from "%api/mediaComponentAlignment/response1";
import { InfoColumns } from "%stanza/stanzas/gmdb-media-alignment-table-by-components/components/InfoColumns";
import { Meta, StoryObj } from "@storybook/react-vite";

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
