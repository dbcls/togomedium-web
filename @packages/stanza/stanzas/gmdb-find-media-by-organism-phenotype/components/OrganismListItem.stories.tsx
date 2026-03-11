import { OrganismListItem } from "%stanza/stanzas/gmdb-find-media-by-organism-phenotype/components/OrganismListItem";
import { StoryProvider } from "%storybook/StoryProvider";
import { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof OrganismListItem> = {
  component: OrganismListItem,
  decorators: [
    (Story) => (
      <StoryProvider mui>
        <Story />
      </StoryProvider>
    ),
  ],
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
