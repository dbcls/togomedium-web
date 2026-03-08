import { OrganismTab } from "%stanza/stanzas/gmdb-find-media-by-organism-phenotype/components/OrganismTab";
import { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof OrganismTab> = {
  component: OrganismTab,
};
export default meta;

type Story = StoryObj<typeof OrganismTab>;
export const Primary: Story = {};
