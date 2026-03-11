import { OrganismTab } from "%stanza/stanzas/gmdb-find-media-by-organism-phenotype/components/OrganismTab";
import { StoryProvider } from "%storybook/StoryProvider";
import { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof OrganismTab> = {
  component: OrganismTab,
  decorators: [
    (Story) => (
      <StoryProvider mui>
        <Story />
      </StoryProvider>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof OrganismTab>;
export const Primary: Story = {};
