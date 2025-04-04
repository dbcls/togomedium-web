import { Meta, StoryObj } from "@storybook/react";
import { ComponentProps, useEffect } from "react";
import { SelectedMediaList } from "%stanza/components/media-finder/SelectedMediaList";
import { useSelectedMediaMutators } from "%stanza/state/media-finder/selectedMedia";
import { LabelInfo } from "%stanza/utils/labelInfo";
import { ComponentWrapper } from "%storybook/components/ComponentWrapper";

type WithCustomArgs = { media: LabelInfo[] } & ComponentProps<typeof SelectedMediaList>;
const meta: Meta<WithCustomArgs> = {
  component: SelectedMediaList,
  decorators: [
    (StoryItem, { args }) => {
      const { media } = args;
      const { setSelectedMedia } = useSelectedMediaMutators();
      useEffect(() => {
        setSelectedMedia(media);
      }, [media, setSelectedMedia]);
      return (
        <ComponentWrapper>
          <StoryItem />
        </ComponentWrapper>
      );
    },
  ],
};
export default meta;

type Story = StoryObj<WithCustomArgs>;
export const Primary: Story = {
  args: {
    media: [
      { label: "AAA", id: "AAA" },
      { label: "BBB", id: "BBB" },
      { label: "CCC", id: "CCC" },
      { label: "DDD", id: "DDD" },
      { label: "EEE", id: "EEE" },
      { label: "FFF", id: "FFF" },
      { label: "GGG", id: "GGG" },
      { label: "HHH", id: "HHH" },
      { label: "III", id: "III" },
      { label: "JJJ", id: "JJJ" },
      { label: "KKK", id: "KKK" },
      { label: "LLL", id: "LLL" },
      { label: "MMM", id: "MMM" },
      { label: "NNN", id: "NNN" },
      { label: "OOO", id: "OOO" },
      { label: "PPP", id: "PPP" },
      { label: "QQQ", id: "QQQ" },
      { label: "RRR", id: "RRR" },
      { label: "SSS", id: "SSS" },
      { label: "TTT", id: "TTT" },
      { label: "UUU", id: "UUU" },
      { label: "VVV", id: "VVV" },
    ],
  },
};
