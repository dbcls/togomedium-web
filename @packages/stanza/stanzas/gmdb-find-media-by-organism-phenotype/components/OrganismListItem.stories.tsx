import { OrganismListItem } from "%stanza/stanzas/gmdb-find-media-by-organism-phenotype/components/OrganismListItem";
import { StoryProvider } from "%storybook/StoryProvider";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
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
} satisfies Meta<typeof OrganismListItem>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Primary = {
  args: {
    id: "666685",
    label: "Rhodanobacter denitrificans",
    isChecked: true,
    onClick: () => {},
  },
} satisfies Story;
