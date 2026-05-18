import { DoubleAngleLeftIcon } from "%stanza/components/icons/DoubleAngleLeftIcon";
import { StoryProvider } from "%storybook/StoryProvider";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
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
} satisfies Meta<typeof DoubleAngleLeftIcon>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Primary = {} satisfies Story;
