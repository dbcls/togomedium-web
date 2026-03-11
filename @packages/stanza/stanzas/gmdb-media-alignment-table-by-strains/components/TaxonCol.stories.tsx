import { data1 } from "%api/mediaStrainsAlignment/data1";
import { TaxonCol } from "%stanza/stanzas/gmdb-media-alignment-table-by-strains/components/TaxonCol";
import { __SB_TEST__ } from "%stanza/stanzas/gmdb-media-alignment-table-by-strains/functions/processMediaCell";
import { StoryProvider } from "%storybook/StoryProvider";
import type { Meta, StoryObj } from "@storybook/react-vite";

const { processTaxonCol, makeTaxonTreesFromData } = __SB_TEST__;
const data = makeTaxonTreesFromData(data1);

const meta = {
  component: TaxonCol,
  decorators: [
    (Story) => (
      <StoryProvider>
        <Story />
      </StoryProvider>
    ),
  ],
} satisfies Meta<typeof TaxonCol>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Species = {
  args: {
    rank: "species",
    taxonList: processTaxonCol(data, "species", "strain"),
  },
} satisfies Story;
export const Order = {
  args: {
    rank: "order",
    taxonList: processTaxonCol(data, "order", "strain"),
  },
} satisfies Story;
export const Superkingdom = {
  args: {
    rank: "superkingdom",
    taxonList: processTaxonCol(data, "superkingdom", "strain"),
  },
} satisfies Story;
