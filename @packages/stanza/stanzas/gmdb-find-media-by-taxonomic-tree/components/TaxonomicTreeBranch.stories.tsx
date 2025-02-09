import { Meta, StoryObj } from "@storybook/react";
import { TaxonomicTreeBranch } from "%stanza/stanzas/gmdb-find-media-by-taxonomic-tree/components/TaxonomicTreeBranch";

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
};
