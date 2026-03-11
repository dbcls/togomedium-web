import { data1 } from "%api/mediaStrainsAlignment/data1";
import { processDisplayData } from "%stanza/stanzas/gmdb-media-alignment-table-by-strains/functions/processMediaCell";
import { StoryProvider } from "%storybook/StoryProvider";
import { Meta, StoryObj } from "@storybook/react-vite";

import { MediaCol } from "./MediaCol";

const meta: Meta<typeof MediaCol> = {
  component: MediaCol,
  decorators: [
    (Story) => (
      <StoryProvider>
        <Story />
      </StoryProvider>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof MediaCol>;
export const Primary: Story = {
  args: {
    mediaList: processDisplayData(data1).media,
  },
};
