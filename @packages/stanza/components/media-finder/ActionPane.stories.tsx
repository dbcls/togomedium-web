import { ActionPane } from "%stanza/components/media-finder/ActionPane";
import { useSelectedMediaMutators } from "%stanza/state/media-finder/selectedMedia";
import { LabelInfo } from "%stanza/utils/labelInfo";
import { StoryProvider } from "%storybook/StoryProvider";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ComponentProps, useEffect } from "react";

type WithCustomArgs = { selectedMedia: LabelInfo[] } & ComponentProps<typeof ActionPane>;
const meta = {
  component: ActionPane,
  decorators: [
    (Story) => (
      <StoryProvider mui>
        <Story />
      </StoryProvider>
    ),
    (StoryItem, { args }) => {
      const { selectedMedia } = args;
      const { setSelectedMedia } = useSelectedMediaMutators();
      useEffect(() => {
        setSelectedMedia(selectedMedia);
      }, [selectedMedia, setSelectedMedia]);
      return <StoryItem />;
    },
  ],
  args: {
    actionLabel: "compare media",
    dispatchEvent: () => {},
  },
} satisfies Meta<WithCustomArgs>;
export default meta;

type Story = StoryObj<typeof meta>;
export const NoSelection = {
  args: {
    selectedMedia: [],
  },
} satisfies Story;
export const OneSelection = {
  args: {
    selectedMedia: [{ id: "aa", label: "aa" }],
  },
} satisfies Story;
export const MultipleSelection = {
  args: {
    selectedMedia: [
      { id: "aa", label: "aa" },
      { id: "bb", label: "bb" },
      { id: "cc", label: "cc" },
    ],
  },
} satisfies Story;
