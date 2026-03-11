import { mediaAlignmentTableResponse2 } from "%api/mediaComponentAlignment/response2";
import { StoryProvider } from "%storybook/StoryProvider";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { ScrollableTable } from "./ScrollableTable";

const meta = {
  component: ScrollableTable,
  decorators: [
    (Story) => (
      <StoryProvider>
        <Story />
      </StoryProvider>
    ),
  ],
} satisfies Meta<typeof ScrollableTable>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Primary = {
  args: {
    data: mediaAlignmentTableResponse2,
  },
} satisfies Story;
