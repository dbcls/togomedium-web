import { DoubleAngleRightIcon } from "%stanza/components/icons/DoubleAngleRightIcon";
import { StoryProvider } from "%storybook/StoryProvider";
import { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof DoubleAngleRightIcon> = {
  component: DoubleAngleRightIcon,
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

type Story = StoryObj<typeof DoubleAngleRightIcon>;
export const Primary: Story = {};
