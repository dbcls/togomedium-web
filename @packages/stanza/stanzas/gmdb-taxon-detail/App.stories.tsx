import App from "%stanza/stanzas/gmdb-taxon-detail/App";
import { StoryProvider } from "%storybook/StoryProvider";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  component: App,
  decorators: [
    (Story) => (
      <StoryProvider reactQuery>
        <Story />
      </StoryProvider>
    ),
  ],
} satisfies Meta<typeof App>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Result1 = {
  args: {
    tax_id: "315405",
  },
} satisfies Story;
export const Result2 = {
  args: {
    tax_id: "1301",
  },
} satisfies Story;
export const Result3 = {
  args: {
    tax_id: "201174",
  },
} satisfies Story;
export const Result4 = {
  args: {
    tax_id: "2636952",
  },
} satisfies Story;
