import { data1 } from "%api/listMedia/data1";
import { StanzaView } from "%stanza/stanzas/gmdb-meta-list/components/StanzaView";
import { StoryProvider } from "%storybook/StoryProvider";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  component: StanzaView,
  decorators: [
    (Story) => (
      <StoryProvider>
        <Story />
      </StoryProvider>
    ),
    (Story) => <Story />,
  ],
} satisfies Meta<typeof StanzaView>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Primary = {
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
} satisfies Story;

export const NotFound = {
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
} satisfies Story;
