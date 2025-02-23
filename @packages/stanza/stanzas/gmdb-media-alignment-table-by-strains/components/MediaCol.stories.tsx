import { Meta, StoryObj } from "@storybook/react";
import { MediaCol } from "./MediaCol";
import { data1 } from "%api/mediaStrainsAlignment/data1";
import { processDisplayData } from "%stanza/stanzas/gmdb-media-alignment-table-by-strains/functions/processMediaCell";

const meta: Meta<typeof MediaCol> = {
  component: MediaCol,
};
export default meta;

type Story = StoryObj<typeof MediaCol>;
export const Primary: Story = {
  args: {
    mediaList: processDisplayData(data1).media,
  },
};
