import { Meta, StoryObj } from "@storybook/react";
import { RangeSlider } from "./RangeSlider";
import { ComponentWrapper } from "%storybook/components/ComponentWrapper";

const meta: Meta<typeof RangeSlider> = {
  component: RangeSlider,
  decorators: [
    (Story) => (
      <ComponentWrapper>
        <Story />
      </ComponentWrapper>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof RangeSlider>;
export const Primary: Story = {
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
};
