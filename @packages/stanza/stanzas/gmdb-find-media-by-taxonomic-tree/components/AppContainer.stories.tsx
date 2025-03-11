import { Meta, StoryObj } from "@storybook/react";
import { AppContainer } from "%stanza/stanzas/gmdb-find-media-by-taxonomic-tree/components/AppContainer";
import { useTaxonListMutators } from "%stanza/stanzas/gmdb-find-media-by-taxonomic-tree/states/taxonList";
import { useTaxonomyTypeMutators } from "%stanza/stanzas/gmdb-find-media-by-taxonomic-tree/states/taxonomyType";

const meta: Meta<typeof AppContainer> = {
  component: AppContainer,
  // parameters: {
  //   msw: makeMswParameter([
  //     ...mediaByAttributesMocks,
  //     ...mediaByTaxonMocks,
  //     ...organismsByPhenotypesMocks,
  //   ]),
  // },
};
export default meta;

type Story = StoryObj<typeof AppContainer>;
export const Primary: Story = {
  args: {
    taxonomyType: "NCBI",
  },
};

export const GTDB: Story = {
  args: {
    taxonomyType: "GTDB",
  },
};
