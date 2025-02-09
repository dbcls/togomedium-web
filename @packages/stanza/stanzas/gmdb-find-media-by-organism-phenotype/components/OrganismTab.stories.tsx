import { Meta, StoryObj } from "@storybook/react";
import { OrganismTab } from "%stanza/stanzas/gmdb-find-media-by-organism-phenotype/components/OrganismTab";

const meta: Meta<typeof OrganismTab> = {
  component: OrganismTab,
};
export default meta;

type Story = StoryObj<typeof OrganismTab>;
export const Primary: Story = {};
