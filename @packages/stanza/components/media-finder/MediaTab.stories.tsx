import { ComponentWrapper } from "%stanza/.storybook/components/ComponentWrapper";
import { StoryProvider } from "%stanza/.storybook/StoryProvider";
import { MediaTab } from "%stanza/components/media-finder/MediaTab";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  component: MediaTab,
  decorators: [
    (Story) => (
      <StoryProvider mui>
        <Story />
      </StoryProvider>
    ),
    (Story) => (
      <ComponentWrapper>
        <Story />
      </ComponentWrapper>
    ),
  ],
} satisfies Meta<typeof MediaTab>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Primary = {} satisfies Story;
