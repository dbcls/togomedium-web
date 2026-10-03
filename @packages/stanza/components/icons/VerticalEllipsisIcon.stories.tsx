import { StoryProvider } from "%stanza/.storybook/StoryProvider";
import { VerticalEllipsisIcon } from "%stanza/components/icons/VerticalEllipsisIcon";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  component: VerticalEllipsisIcon,
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
} satisfies Meta<typeof VerticalEllipsisIcon>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Primary = {} satisfies Story;
