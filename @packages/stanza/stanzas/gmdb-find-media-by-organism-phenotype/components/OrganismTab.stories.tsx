import { OrganismTab } from "%stanza/stanzas/gmdb-find-media-by-organism-phenotype/components/OrganismTab";
import { StoryProvider } from "%storybook/StoryProvider";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  component: OrganismTab,
  decorators: [
    (Story) => (
      <StoryProvider mui>
        <Story />
      </StoryProvider>
    ),
  ],
} satisfies Meta<typeof OrganismTab>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Primary = {} satisfies Story;
