import { StoryProvider } from "%storybook/StoryProvider";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { InputRow } from "./InputRow";

const meta = {
  component: InputRow,
  args: {
    id: "123",
    solutionBlockId: "solution-123",
  },
  decorators: [
    (Story) => (
      <StoryProvider reactQuery mui>
        <Story />
      </StoryProvider>
    ),
  ],
} satisfies Meta<typeof InputRow>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary = {} satisfies Story;
