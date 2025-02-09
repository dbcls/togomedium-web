import { Meta, StoryObj } from "@storybook/react";
import { TaxonomicTreeSection } from "%stanza/stanzas/gmdb-find-media-by-taxonomic-tree/components/TaxonomicTreeSection";

const meta: Meta<typeof TaxonomicTreeSection> = {
  component: TaxonomicTreeSection,
};
export default meta;

type Story = StoryObj<typeof TaxonomicTreeSection>;
export const Primary: Story = {
  args: {},
};
