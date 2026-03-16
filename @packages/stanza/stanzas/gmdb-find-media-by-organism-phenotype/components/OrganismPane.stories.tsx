import { OrganismPane } from "%stanza/stanzas/gmdb-find-media-by-organism-phenotype/components/OrganismPane";
import { StoryProvider } from "%storybook/StoryProvider";
import type { Meta, StoryObj } from "@storybook/react-vite";
const meta = {
  component: OrganismPane,
  decorators: [
    (Story) => (
      <StoryProvider reactQuery mui>
        <Story />
      </StoryProvider>
    ),
  ],
} satisfies Meta<typeof OrganismPane>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Primary = {} satisfies Story;
