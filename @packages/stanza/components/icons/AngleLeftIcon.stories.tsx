import { AngleLeftIcon } from "%stanza/components/icons/AngleLeftIcon";
import { StoryProvider } from "%storybook/StoryProvider";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  component: AngleLeftIcon,
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
} satisfies Meta<typeof AngleLeftIcon>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Primary = {} satisfies Story;
