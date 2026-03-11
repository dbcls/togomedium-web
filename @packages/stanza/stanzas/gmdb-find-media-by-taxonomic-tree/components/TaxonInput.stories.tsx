import { TaxonInput } from "%stanza/stanzas/gmdb-find-media-by-taxonomic-tree/components/TaxonInput";
import { useTaxonomyTypeMutators } from "%stanza/stanzas/gmdb-find-media-by-taxonomic-tree/states/taxonomyType";
import { sleep } from "%stanza/utils/promise";
import { ComponentWrapper } from "%storybook/components/ComponentWrapper";
import { StoryProvider } from "%storybook/StoryProvider";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { userEvent, within } from "storybook/test";

const meta = {
  component: TaxonInput,
  args: {
    onChange: () => {},
  },
  decorators: [
    (Story) => (
      <StoryProvider reactQuery mui>
        <Story />
      </StoryProvider>
    ),
    (Story) => (
      <ComponentWrapper>
        <Story />
      </ComponentWrapper>
    ),
  ],
  parameters: {},
} satisfies Meta<typeof TaxonInput>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Primary = {
  decorators: [
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

export const Play_NCBI = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("combobox");
    const wrapper = input.parentElement!.parentElement!;
    // const wrapper = canvas.getByText("Search taxon by name");
    // console.log(wrapper);
    await userEvent.click(wrapper, { delay: 100 });
    await sleep(1000);
    await userEvent.type(input, "Deinoc", { delay: 16 });
  },
  decorators: [
    (Story) => {
      const { setApiType } = useTaxonomyTypeMutators();
      setApiType("NCBI");
      return <Story />;
    },
  ],
} satisfies Story;

export const Play_GTDB = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("combobox");
    const wrapper = input.parentElement!.parentElement!;
    // const wrapper = canvas.getByText("Search taxon by name");
    // console.log(wrapper);
    await userEvent.click(wrapper, { delay: 100 });
    await sleep(1000);
    await userEvent.type(input, "Deinoc", { delay: 16 });
  },
  decorators: [
    (Story) => {
      const { setApiType } = useTaxonomyTypeMutators();
      setApiType("GTDB");
      return <Story />;
    },
  ],
} satisfies Story;
