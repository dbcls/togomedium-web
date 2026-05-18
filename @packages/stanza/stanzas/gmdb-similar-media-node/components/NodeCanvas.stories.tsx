import { StoryProvider } from "%storybook/StoryProvider";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { data1 } from "../utils/data1";
import { data2 } from "../utils/data2";
import { NodeCanvas } from "./NodeCanvas";

const meta = {
  component: NodeCanvas,
  decorators: [
    (Story) => (
      <StoryProvider>
        <Story />
      </StoryProvider>
    ),
  ],
} satisfies Meta<typeof NodeCanvas>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Primary = {
  args: {
    data: data1,
  },
} satisfies Story;
export const Secondary = {
  args: {
    data: data2,
  },
} satisfies Story;
