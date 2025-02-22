import { Meta, StoryObj } from "@storybook/react";
import { data1 } from "%api/listMedia/data1";
import { StanzaView } from "%stanza/stanzas/gmdb-meta-list/components/StanzaView";

const meta: Meta<typeof StanzaView> = {
  component: StanzaView,
  decorators: [(Story) => <Story />],
};
export default meta;

type Story = StoryObj<typeof StanzaView>;
export const Primary: Story = {
  args: {
    data: data1,
    title: "Title",
    showColumnNames: true,
    columnSizes: [20, 30, 50],
    offset: 0,
    setOffset: () => {},
    limit: 20,
    setLimit: () => {},
    showLoading: false,
    errorMessage: "",
  },
};

export const NotFound: Story = {
  args: {
    data: {
      contents: [],
      total: 0,
      offset: 0,
      limit: 20,
      columns: [],
    },
    title: "Title",
    showColumnNames: true,
    columnSizes: [20, 30, 50],
    offset: 0,
    setOffset: () => {},
    limit: 20,
    setLimit: () => {},
    showLoading: false,
    errorMessage: "",
  },
};
