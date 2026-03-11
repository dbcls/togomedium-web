import App from "%stanza/stanzas/gmdb-media-alignment-table-by-components/App";
import { StoryProvider } from "%storybook/StoryProvider";
import { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof App> = {
  component: App,
  decorators: [
    (Story) => (
      <StoryProvider reactQuery mui>
        <Story />
      </StoryProvider>
    ),
  ],
  // parameters: {
  //   msw: makeMswParameter(mediaAlignmentTableMocks),
  // },
};
export default meta;

type Story = StoryObj<typeof App>;
export const Result1: Story = {
  args: { gm_ids: ["HM_D00001a", "HM_D00065"] },
};
export const Priority: Story = {
  args: {
    gm_ids: ["HM_D00001a", "HM_D00065"],
    prioritizedOrganism: ["1124983", "446421"],
  },
};
