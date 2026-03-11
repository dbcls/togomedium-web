import App from "%stanza/stanzas/gmdb-media-alignment-table-by-components/App";
import { StoryProvider } from "%storybook/StoryProvider";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
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
} satisfies Meta<typeof App>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Result1 = {
  args: { gm_ids: ["HM_D00001a", "HM_D00065"] },
} satisfies Story;
export const Priority = {
  args: {
    gm_ids: ["HM_D00001a", "HM_D00065"],
    prioritizedOrganism: ["1124983", "446421"],
  },
} satisfies Story;
