import { DoubleAngleLeftIcon } from "%stanza/components/icons/DoubleAngleLeftIcon";
import { StoryProvider } from "%storybook/StoryProvider";
import { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof DoubleAngleLeftIcon> = {
  component: DoubleAngleLeftIcon,
  decorators: [
    (Story) => (
      <StoryProvider>
        <Story />
      </StoryProvider>
    ),
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
