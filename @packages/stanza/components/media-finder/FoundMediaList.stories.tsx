import { FoundMediaList } from "%stanza/components/media-finder/FoundMediaList";
import { StoryProvider } from "%storybook/StoryProvider";
import { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof FoundMediaList> = {
  component: FoundMediaList,
  decorators: [
    (Story) => (
      <StoryProvider>
        <Story />
      </StoryProvider>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof FoundMediaList>;
export const Primary: Story = {
  args: {},
};
