import { PhenotypeSearchArea } from "%stanza/stanzas/gmdb-find-media-by-organism-phenotype/components/PhenotypeSearchArea";
import { StoryProvider } from "%storybook/StoryProvider";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  component: PhenotypeSearchArea,
  decorators: [
    (Story) => (
      <StoryProvider mui>
        <Story />
      </StoryProvider>
    ),
  ],
} satisfies Meta<typeof PhenotypeSearchArea>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Primary = {} satisfies Story;
