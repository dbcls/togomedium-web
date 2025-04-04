import { Meta, StoryObj } from "@storybook/react";
import { SelectedOrganismsList } from "%stanza/stanzas/gmdb-find-media-by-organism-phenotype/components/SelectedOrganismsList";

const meta: Meta<typeof SelectedOrganismsList> = {
  component: SelectedOrganismsList,
};
export default meta;

type Story = StoryObj<typeof SelectedOrganismsList>;
export const Primary: Story = {};
