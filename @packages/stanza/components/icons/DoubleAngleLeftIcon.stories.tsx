import { Meta, StoryObj } from "@storybook/react";
import { DoubleAngleLeftIcon } from "%stanza/components/icons/DoubleAngleLeftIcon";

const meta: Meta<typeof DoubleAngleLeftIcon> = {
  component: DoubleAngleLeftIcon,
  decorators: [
    (StoryItem) => {
      return (
        <div style={{ width: 64 }}>
          <StoryItem />
        </div>
      );
    },
  ],
};
export default meta;

type Story = StoryObj<typeof DoubleAngleLeftIcon>;
export const Primary: Story = {};
