import { HeaderCell } from "%stanza/stanzas/gmdb-media-alignment-table-by-components/components/HeaderCell";
import { StoryProvider } from "%storybook/StoryProvider";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  component: HeaderCell,
  args: {
    onClickIcon: () => {},
  },
  decorators: [
    (Story) => (
      <StoryProvider>
        <Story />
      </StoryProvider>
    ),
  ],
} satisfies Meta<typeof HeaderCell>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Primary = {
  args: {
    label: "Media",
    isExpanded: false,
  },
} satisfies Story;
