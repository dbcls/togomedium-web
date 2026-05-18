import { data1 } from "%api/mediaStrainsAlignment/data1";
import { processDisplayData } from "%stanza/stanzas/gmdb-media-alignment-table-by-strains/functions/processMediaCell";
import { StoryProvider } from "%storybook/StoryProvider";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { MediaCol } from "./MediaCol";

const meta = {
  component: MediaCol,
  decorators: [
    (Story) => (
      <StoryProvider>
        <Story />
      </StoryProvider>
    ),
  ],
} satisfies Meta<typeof MediaCol>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Primary = {
  args: {
    mediaList: processDisplayData(data1).media,
  },
} satisfies Story;
