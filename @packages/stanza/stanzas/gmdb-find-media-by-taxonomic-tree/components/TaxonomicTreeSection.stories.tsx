import { TaxonomicTreeSection } from "%stanza/stanzas/gmdb-find-media-by-taxonomic-tree/components/TaxonomicTreeSection";
import { useTaxonomyTypeMutators } from "%stanza/stanzas/gmdb-find-media-by-taxonomic-tree/states/taxonomyType";
import { StoryProvider } from "%storybook/StoryProvider";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  component: TaxonomicTreeSection,
  args: {
    showLoading: false,
  },
} satisfies Meta<typeof TaxonomicTreeSection>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Primary = {
  decorators: [
    (Story) => (
      <StoryProvider reactQuery mui>
        <Story />
      </StoryProvider>
    ),
    (Story) => {
      const { setApiType } = useTaxonomyTypeMutators();
      setApiType("NCBI");
      return <Story />;
    },
  ],
} satisfies Story;

export const GTDB = {
  decorators: [
    (Story) => {
      const { setApiType } = useTaxonomyTypeMutators();
      setApiType("GTDB");
      return <Story />;
    },
  ],
} satisfies Story;
