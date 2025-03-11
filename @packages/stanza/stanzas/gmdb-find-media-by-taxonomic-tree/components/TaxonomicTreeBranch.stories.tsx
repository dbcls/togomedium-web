import { Meta, StoryObj } from "@storybook/react";
import { TaxonomicTreeBranch } from "%stanza/stanzas/gmdb-find-media-by-taxonomic-tree/components/TaxonomicTreeBranch";
import { useTaxonomyTypeMutators } from "%stanza/stanzas/gmdb-find-media-by-taxonomic-tree/states/taxonomyType";

const meta: Meta<typeof TaxonomicTreeBranch> = {
  component: TaxonomicTreeBranch,
  decorators: [(Story) => <Story />],
  parameters: {},
};
export default meta;

type Story = StoryObj<typeof TaxonomicTreeBranch>;
export const Primary: Story = {
  args: {
    id: "2157",
  },
  decorators: [
    (Story) => {
      const { setApiType } = useTaxonomyTypeMutators();
      setApiType("NCBI");
      return <Story />;
    },
  ],
};

export const GTDB: Story = {
  args: {
    id: "d__Bacteria",
  },
  decorators: [
    (Story) => {
      const { setApiType } = useTaxonomyTypeMutators();
      setApiType("GTDB");
      return <Story />;
    },
  ],
};
