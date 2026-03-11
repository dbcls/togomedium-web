import { FoundOrganismsList } from "%stanza/stanzas/gmdb-find-media-by-organism-phenotype/components/FoundOrganismsList";
import { StoryProvider } from "%storybook/StoryProvider";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  component: FoundOrganismsList,
  decorators: [
    (Story) => (
      <StoryProvider reactQuery mui>
        <Story />
      </StoryProvider>
    ),
  ],
} satisfies Meta<typeof FoundOrganismsList>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Primary = {} satisfies Story;
