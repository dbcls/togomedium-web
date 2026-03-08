import { mediaAlignmentTableResponse1 } from "%api/mediaComponentAlignment/response1";
import { Meta, StoryObj } from "@storybook/react-vite";

import { AlignmentTable } from "./AlignmentTable";

const meta: Meta<typeof AlignmentTable> = {
  component: AlignmentTable,
};
export default meta;

type Story = StoryObj<typeof AlignmentTable>;
export const Primary: Story = {
  args: {
    data: mediaAlignmentTableResponse1,
  },
};
