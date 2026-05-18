import { mediaAlignmentTableResponse1 } from "%api/mediaComponentAlignment/response1";
import { InfoColumns } from "%stanza/stanzas/gmdb-media-alignment-table-by-components/components/InfoColumns";
import { StoryProvider } from "%storybook/StoryProvider";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  component: InfoColumns,
  args: {
    prioritizedOrganism: [],
  },
  decorators: [
    (Story) => (
      <StoryProvider>
        <Story />
      </StoryProvider>
    ),
  ],
} satisfies Meta<typeof InfoColumns>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Primary = {
  args: {
    data: mediaAlignmentTableResponse1,
  },
} satisfies Story;
