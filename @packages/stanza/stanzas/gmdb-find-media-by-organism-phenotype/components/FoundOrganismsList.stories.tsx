import { FoundOrganismsList } from "%stanza/stanzas/gmdb-find-media-by-organism-phenotype/components/FoundOrganismsList";
import { StoryProvider } from "%storybook/StoryProvider";
import { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof FoundOrganismsList> = {
  component: FoundOrganismsList,
  decorators: [
    (Story) => (
      <StoryProvider reactQuery mui>
        <Story />
      </StoryProvider>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof FoundOrganismsList>;
export const Primary: Story = {};
