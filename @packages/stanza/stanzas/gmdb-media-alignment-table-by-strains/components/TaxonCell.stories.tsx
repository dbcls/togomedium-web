import { TaxonCell } from "%stanza/stanzas/gmdb-media-alignment-table-by-strains/components/TaxonCell";
import { useFilterTaxonMutators } from "%stanza/stanzas/gmdb-media-alignment-table-by-strains/states/filterTaxon";
import { StoryProvider } from "%storybook/StoryProvider";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ComponentProps, useEffect } from "react";

type WithCustomArgs = ComponentProps<typeof TaxonCell> & { filterId: string };
const meta = {
  component: TaxonCell,
  decorators: [
    (Story) => (
      <StoryProvider>
        <Story />
      </StoryProvider>
    ),
    (StoryItem, { args }) => {
      const { filterId } = args;
      const { setFilterTaxon } = useFilterTaxonMutators();
      useEffect(() => {
        setFilterTaxon(filterId);
      }, [filterId, setFilterTaxon]);
      return <StoryItem />;
    },
  ],
} satisfies Meta<WithCustomArgs>;
export default meta;

const defaultArgs: WithCustomArgs = {
  id: "201224",
  label: "Rhizophydium sp.",
  size: 1,
  rank: "species",
  filterId: "",
  isFolded: false,
};

type Story = StoryObj<typeof meta>;

export const Primary = {
  args: { ...defaultArgs },
} satisfies Story;
export const Filtered = {
  args: { ...defaultArgs, filterId: "201224" },
} satisfies Story;
