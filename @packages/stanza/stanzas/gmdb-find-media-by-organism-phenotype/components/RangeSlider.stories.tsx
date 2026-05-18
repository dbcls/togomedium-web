import { ComponentWrapper } from "%storybook/components/ComponentWrapper";
import { StoryProvider } from "%storybook/StoryProvider";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { RangeSlider } from "./RangeSlider";

const meta = {
  component: RangeSlider,
  decorators: [
    (Story) => (
      <StoryProvider mui>
        <Story />
      </StoryProvider>
    ),
    (Story) => (
      <ComponentWrapper>
        <Story />
      </ComponentWrapper>
    ),
  ],
} satisfies Meta<typeof RangeSlider>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Primary = {
  args: {
    min: 0,
    max: 110,
    label: "Growth Temperature",
    marks: [
      { value: 0, label: "0°C" },
      { value: 37, label: "37°C" },
      { value: 110, label: "110°C" },
    ],
    queryKey: "",
    handleValueChange: () => {},
    handleEnabledChange: () => {},
  },
} satisfies Story;
