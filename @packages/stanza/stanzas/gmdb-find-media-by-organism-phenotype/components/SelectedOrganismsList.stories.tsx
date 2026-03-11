import { SelectedOrganismsList } from "%stanza/stanzas/gmdb-find-media-by-organism-phenotype/components/SelectedOrganismsList";
import { StoryProvider } from "%storybook/StoryProvider";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  component: SelectedOrganismsList,
  decorators: [
    (Story) => (
      <StoryProvider mui>
        <Story />
      </StoryProvider>
    ),
  ],
} satisfies Meta<typeof SelectedOrganismsList>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Primary = {} satisfies Story;
