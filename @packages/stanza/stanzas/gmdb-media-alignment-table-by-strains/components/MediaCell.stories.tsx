import { MediaCell } from "%stanza/stanzas/gmdb-media-alignment-table-by-strains/components/MediaCell";
import { StoryProvider } from "%storybook/StoryProvider";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ComponentProps } from "react";

const meta = {
  component: MediaCell,
  decorators: [
    (Story) => (
      <StoryProvider>
        <Story />
      </StoryProvider>
    ),
  ],
} satisfies Meta<typeof MediaCell>;
export default meta;

const defaultArgs: ComponentProps<typeof MediaCell> = {
  label: "POTATO-SUCROSE AGAR",
  id: "JCM_333",
  size: 1,
};
type Story = StoryObj<typeof meta>;

export const Primary = {
  args: { ...defaultArgs },
} satisfies Story;
export const LargeItem = {
  args: { ...defaultArgs, size: 4 },
} satisfies Story;
export const LongItem = {
  args: { ...defaultArgs, label: "Long long long text long long long text" },
} satisfies Story;
