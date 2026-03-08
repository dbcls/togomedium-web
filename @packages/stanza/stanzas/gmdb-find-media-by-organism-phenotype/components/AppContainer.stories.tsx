import { AppContainer } from "%stanza/stanzas/gmdb-find-media-by-organism-phenotype/components/AppContainer";
import { Meta, StoryObj } from "@storybook/react-vite";

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
