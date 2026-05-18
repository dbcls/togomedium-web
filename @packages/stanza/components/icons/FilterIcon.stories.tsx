import { FilterIcon } from "%stanza/components/icons/FilterIcon";
import { StoryProvider } from "%storybook/StoryProvider";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  component: FilterIcon,
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
} satisfies Meta<typeof FilterIcon>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Primary = {} satisfies Story;
