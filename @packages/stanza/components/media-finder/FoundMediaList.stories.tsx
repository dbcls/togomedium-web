import { FoundMediaList } from "%stanza/components/media-finder/FoundMediaList";
import { StoryProvider } from "%storybook/StoryProvider";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  component: FoundMediaList,
  decorators: [
    (Story) => (
      <StoryProvider>
        <Story />
      </StoryProvider>
    ),
  ],
} satisfies Meta<typeof FoundMediaList>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Primary = {
  args: {},
} satisfies Story;
