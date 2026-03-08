import { mediaAlignmentTableResponse2 } from "%api/mediaComponentAlignment/response2";
import { Meta, StoryObj } from "@storybook/react-vite";

import { ScrollableTable } from "./ScrollableTable";

const meta: Meta<typeof ScrollableTable> = {
  component: ScrollableTable,
};
export default meta;

type Story = StoryObj<typeof ScrollableTable>;
export const Primary: Story = {
  args: {
    data: mediaAlignmentTableResponse2,
  },
};
