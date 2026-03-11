import App from "%stanza/stanzas/gmdb-component-detail/App";
import { StoryProvider } from "%storybook/StoryProvider";
import { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof App> = {
  component: App,
  decorators: [
    (Story) => (
      <StoryProvider>
        <Story />
      </StoryProvider>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof App>;
export const Result1: Story = {
  args: {
    gmo_id: "GMO_001001",
  },
};
export const Result2: Story = {
  args: {
    gmo_id: "GMO_001018",
  },
};
export const Result3: Story = {
  args: {
    gmo_id: "GMO_001113",
  },
};
export const Result4: Story = {
  args: {
    gmo_id: "GMO_001010",
  },
};
