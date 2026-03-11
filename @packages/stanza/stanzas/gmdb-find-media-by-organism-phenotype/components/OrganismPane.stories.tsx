import { OrganismPane } from "%stanza/stanzas/gmdb-find-media-by-organism-phenotype/components/OrganismPane";
import { StoryProvider } from "%storybook/StoryProvider";
import { Meta, StoryObj } from "@storybook/react-vite";
const meta: Meta<typeof OrganismPane> = {
  component: OrganismPane,
  decorators: [
    (Story) => (
      <StoryProvider reactQuery mui>
        <Story />
      </StoryProvider>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof OrganismPane>;
export const Primary: Story = {};
