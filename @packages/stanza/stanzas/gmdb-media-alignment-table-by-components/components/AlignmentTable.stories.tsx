import { mediaAlignmentTableResponse1 } from "%api/mediaComponentAlignment/response1";
import { StoryProvider } from "%storybook/StoryProvider";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { AlignmentTable } from "./AlignmentTable";

const meta = {
  component: AlignmentTable,
  args: {
    prioritizedOrganism: [],
  },
  decorators: [
    (Story) => (
      <StoryProvider>
        <Story />
      </StoryProvider>
    ),
  ],
} satisfies Meta<typeof AlignmentTable>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Primary = {
  args: {
    data: mediaAlignmentTableResponse1,
  },
} satisfies Story;
