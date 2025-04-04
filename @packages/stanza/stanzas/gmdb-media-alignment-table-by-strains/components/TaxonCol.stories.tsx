import { Meta, StoryObj } from "@storybook/react";
import { data1 } from "%api/mediaStrainsAlignment/data1";
import { TaxonCol } from "%stanza/stanzas/gmdb-media-alignment-table-by-strains/components/TaxonCol";
import { __SB_TEST__ } from "%stanza/stanzas/gmdb-media-alignment-table-by-strains/functions/processMediaCell";

const { processTaxonCol, makeTaxonTreesFromData } = __SB_TEST__;
const data = makeTaxonTreesFromData(data1);

const meta: Meta<typeof TaxonCol> = {
  component: TaxonCol,
};
export default meta;

type Story = StoryObj<typeof TaxonCol>;
export const Species: Story = {
  args: {
    rank: "species",
    taxonList: processTaxonCol(data, "species", "strain"),
  },
};
export const Order: Story = {
  args: {
    rank: "order",
    taxonList: processTaxonCol(data, "order", "strain"),
  },
};
export const Superkingdom: Story = {
  args: {
    rank: "superkingdom",
    taxonList: processTaxonCol(data, "superkingdom", "strain"),
  },
};
