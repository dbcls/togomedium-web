import { Meta, StoryObj } from "@storybook/react";
import { TaxonomicTreeSection } from "%stanza/stanzas/gmdb-find-media-by-taxonomic-tree/components/TaxonomicTreeSection";
import { useTaxonomyTypeMutators } from "%stanza/stanzas/gmdb-find-media-by-taxonomic-tree/states/taxonomyType";

const meta: Meta<typeof TaxonomicTreeSection> = {
  component: TaxonomicTreeSection,
};
export default meta;

type Story = StoryObj<typeof TaxonomicTreeSection>;
export const Primary: Story = {
  decorators: [
    (Story) => {
      const { setApiType } = useTaxonomyTypeMutators();
      setApiType("NCBI");
      return <Story />;
    },
  ],
  args: {},
};

export const GTDB: Story = {
  decorators: [
    (Story) => {
      const { setApiType } = useTaxonomyTypeMutators();
      setApiType("GTDB");
      return <Story />;
    },
  ],
};
