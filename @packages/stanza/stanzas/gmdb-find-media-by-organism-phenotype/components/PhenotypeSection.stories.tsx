import { PhenotypeSection } from "%stanza/stanzas/gmdb-find-media-by-organism-phenotype/components/PhenotypeSection";
import { StoryProvider } from "%storybook/StoryProvider";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  component: PhenotypeSection,
  decorators: [
    (Story) => (
      <StoryProvider mui>
        <Story />
      </StoryProvider>
    ),
  ],
} satisfies Meta<typeof PhenotypeSection>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Primary = {} satisfies Story;
