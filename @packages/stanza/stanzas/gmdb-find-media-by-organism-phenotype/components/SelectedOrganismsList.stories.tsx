import { SelectedOrganismsList } from "%stanza/stanzas/gmdb-find-media-by-organism-phenotype/components/SelectedOrganismsList";
import { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof SelectedOrganismsList> = {
  component: SelectedOrganismsList,
};
export default meta;

type Story = StoryObj<typeof SelectedOrganismsList>;
export const Primary: Story = {};
