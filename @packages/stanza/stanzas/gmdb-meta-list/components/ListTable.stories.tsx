import { data1 } from "%api/listMedia/data1";
import { StanzaWrapper } from "%stanza/components/styled/StanzaWrapper";
import { ListTable } from "%stanza/stanzas/gmdb-meta-list/components/ListTable";
import { StoryProvider } from "%storybook/StoryProvider";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  component: ListTable,
  decorators: [
    (Story) => (
      <StoryProvider>
        <Story />
      </StoryProvider>
    ),
    (Story) => (
      <StanzaWrapper>
        <Story />
      </StanzaWrapper>
    ),
  ],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof ListTable>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Primary = {
  args: {
    data: data1,
    showColumnNames: true,
    columnSizes: [15, 15, 70],
    limit: 20,
  },
} satisfies Story;
