import { Meta, StoryObj } from "@storybook/react";
import { OrganismPane } from "%stanza/stanzas/gmdb-find-media-by-organism-phenotype/components/OrganismPane";
const meta: Meta<typeof OrganismPane> = {
  component: OrganismPane,
};
export default meta;

type Story = StoryObj<typeof OrganismPane>;
export const Primary: Story = {};
