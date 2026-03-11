import { AppContainer } from "%stanza/stanzas/gmdb-find-media-by-organism-phenotype/components/AppContainer";
import { StoryProvider } from "%storybook/StoryProvider";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  component: AppContainer,
  args: {
    dispatchEvent: () => {},
  },
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
} satisfies Meta<typeof AppContainer>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Primary = {} satisfies Story;
