import { AppContainer } from "%stanza/stanzas/gmdb-find-media-by-organism-phenotype/components/AppContainer";
import { StoryProvider } from "%storybook/StoryProvider";
import { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof AppContainer> = {
  component: AppContainer,
  decorators: [
    (Story) => (
      <StoryProvider reactQuery mui>
        <Story />
      </StoryProvider>
    ),
  ],
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
