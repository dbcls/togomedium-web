import App from "%stanza/stanzas/gmdb-component-detail/App";
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
    gmo_id: "GMO_001001",
  },
} satisfies Story;
export const Result2 = {
  args: {
    gmo_id: "GMO_001018",
  },
} satisfies Story;
export const Result3 = {
  args: {
    gmo_id: "GMO_001113",
  },
} satisfies Story;
export const Result4 = {
  args: {
    gmo_id: "GMO_001010",
  },
} satisfies Story;
