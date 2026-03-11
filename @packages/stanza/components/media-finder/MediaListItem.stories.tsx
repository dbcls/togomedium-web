import { MediaListItem } from "%stanza/components/media-finder/MediaListItem";
import { StoryProvider } from "%storybook/StoryProvider";
import { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof MediaListItem> = {
  component: MediaListItem,
};
export default meta;

type Story = StoryObj<typeof MediaListItem>;
export const Primary: Story = {
  args: {
    id: "HM_D00535",
    label: "TRYPTICASE SOY BROTH AGAR",
  },
};
export const Long: Story = {
  args: {
    id: "HM_D00535",
    label:
      "This is very long label, This is very long label, This is very long label, This is very long label, This is very long label, This is very long label, This is very long label, This is very long label, This is very long label, ",
  },
};

export const List: Story = {
  args: {
    id: "HM_D00535",
    label: "TRYPTICASE SOY BROTH AGAR",
  },
  decorators: [
    (Story) => (
      <StoryProvider>
        <Story />
      </StoryProvider>
    ),
    (StoryItem) => (
      <div>
        <StoryItem />
        <StoryItem />
        <StoryItem />
      </div>
    ),
  ],
};
