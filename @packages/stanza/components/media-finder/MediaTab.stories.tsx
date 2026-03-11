import { MediaTab } from "%stanza/components/media-finder/MediaTab";
import { ComponentWrapper } from "%storybook/components/ComponentWrapper";
import { StoryProvider } from "%storybook/StoryProvider";
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
