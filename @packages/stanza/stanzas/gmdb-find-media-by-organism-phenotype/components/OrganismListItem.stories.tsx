import { OrganismListItem } from "%stanza/stanzas/gmdb-find-media-by-organism-phenotype/components/OrganismListItem";
import { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof OrganismListItem> = {
  component: OrganismListItem,
  parameters: {
    layout: "fullscreen",
  },
};
export default meta;

type Story = StoryObj<typeof OrganismListItem>;
export const Primary: Story = {
  args: {
    id: "666685",
    label: "Rhodanobacter denitrificans",
    isChecked: true,
    onClick: () => {},
  },
};
