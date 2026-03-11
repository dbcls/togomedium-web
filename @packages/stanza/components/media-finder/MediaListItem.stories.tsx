import { MediaListItem } from "%stanza/components/media-finder/MediaListItem";
import { StoryProvider } from "%storybook/StoryProvider";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  component: MediaListItem,
  args: {
    isChecked: false,
    onClick: () => {},
  },
} satisfies Meta<typeof MediaListItem>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Primary = {
  args: {
    id: "HM_D00535",
    label: "TRYPTICASE SOY BROTH AGAR",
  },
} satisfies Story;
export const Long = {
  args: {
    id: "HM_D00535",
    label:
      "This is very long label, This is very long label, This is very long label, This is very long label, This is very long label, This is very long label, This is very long label, This is very long label, This is very long label, ",
  },
} satisfies Story;

export const List = {
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
} satisfies Story;
