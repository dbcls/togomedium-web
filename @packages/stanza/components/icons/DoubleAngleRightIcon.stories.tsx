import { DoubleAngleRightIcon } from "%stanza/components/icons/DoubleAngleRightIcon";
import { StoryProvider } from "%storybook/StoryProvider";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
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
} satisfies Meta<typeof DoubleAngleRightIcon>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Primary = {} satisfies Story;
