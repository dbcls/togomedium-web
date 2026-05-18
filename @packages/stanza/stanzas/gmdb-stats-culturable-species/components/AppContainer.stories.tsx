import { ComponentWrapper } from "%storybook/components/ComponentWrapper";
import { StoryProvider } from "%storybook/StoryProvider";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { AppContainer } from "./AppContainer";

const meta = {
  component: AppContainer,
  args: {
    data: [
      { bin: "0-10", frequency: 10 },
      { bin: "10-20", frequency: 30 },
      { bin: "20-30", frequency: 20 },
      { bin: "30-40", frequency: 25 },
    ],
  },
  decorators: [
    (Story) => (
      <StoryProvider>
        <Story />
      </StoryProvider>
    ),
    (Story) => (
      <ComponentWrapper>
        <Story />
      </ComponentWrapper>
    ),
  ],
} satisfies Meta<typeof AppContainer>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Primary = {} satisfies Story;
