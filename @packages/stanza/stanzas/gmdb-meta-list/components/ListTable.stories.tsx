import { Meta, StoryObj } from "@storybook/react";
import { data1 } from "%stanza/api/all-media/data1";
import { StanzaWrapper } from "%stanza/components/styled/StanzaWrapper";
import { ListTable } from "%stanza/stanzas/gmdb-meta-list/components/ListTable";

const meta: Meta<typeof ListTable> = {
  component: ListTable,
  decorators: [
    (Story) => (
      <StanzaWrapper>
        <Story />
      </StanzaWrapper>
    ),
  ],
  parameters: {
    layout: "fullscreen",
  },
};
export default meta;

type Story = StoryObj<typeof ListTable>;
export const Primary: Story = {
  args: {
    data: data1,
    showColumnNames: true,
    columnSizes: [15, 15, 70],
    limit: 20,
  },
};
