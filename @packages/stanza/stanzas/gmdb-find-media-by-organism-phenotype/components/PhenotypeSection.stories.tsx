import { PhenotypeSection } from "%stanza/stanzas/gmdb-find-media-by-organism-phenotype/components/PhenotypeSection";
import { StoryProvider } from "%storybook/StoryProvider";
import { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof PhenotypeSection> = {
  component: PhenotypeSection,
  decorators: [
    (Story) => (
      <StoryProvider mui>
        <Story />
      </StoryProvider>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof PhenotypeSection>;
export const Primary: Story = {};
