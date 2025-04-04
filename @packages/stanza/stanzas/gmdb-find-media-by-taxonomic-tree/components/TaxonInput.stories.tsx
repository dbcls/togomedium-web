import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/test";
import { TaxonInput } from "%stanza/stanzas/gmdb-find-media-by-taxonomic-tree/components/TaxonInput";
import { useTaxonomyTypeMutators } from "%stanza/stanzas/gmdb-find-media-by-taxonomic-tree/states/taxonomyType";
import { sleep } from "%stanza/utils/promise";
import { ComponentWrapper } from "%storybook/components/ComponentWrapper";

const meta: Meta<typeof TaxonInput> = {
  component: TaxonInput,
  decorators: [
    (Story) => (
      <ComponentWrapper>
        <Story />
      </ComponentWrapper>
    ),
  ],
  parameters: {},
};
export default meta;

type Story = StoryObj<typeof TaxonInput>;
export const Primary: Story = {
  decorators: [
    (Story) => {
      const { setApiType } = useTaxonomyTypeMutators();
      setApiType("NCBI");
      return <Story />;
    },
  ],
};

export const GTDB: Story = {
  decorators: [
    (Story) => {
      const { setApiType } = useTaxonomyTypeMutators();
      setApiType("GTDB");
      return <Story />;
    },
  ],
};

export const Play_NCBI: Story = {
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
};

export const Play_GTDB: Story = {
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
};
