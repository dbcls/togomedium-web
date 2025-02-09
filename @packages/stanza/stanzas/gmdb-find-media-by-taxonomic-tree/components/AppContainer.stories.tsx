import { Meta, StoryObj } from "@storybook/react";
import { AppContainer } from "%stanza/stanzas/gmdb-find-media-by-taxonomic-tree/components/AppContainer";

const meta: Meta<typeof AppContainer> = {
  component: AppContainer,
  // parameters: {
  //   msw: makeMswParameter([
  //     ...mediaByAttributesMocks,
  //     ...mediaByTaxonMocks,
  //     ...organismsByPhenotypesMocks,
  //   ]),
  // },
};
export default meta;

type Story = StoryObj<typeof AppContainer>;
export const Primary: Story = {};
