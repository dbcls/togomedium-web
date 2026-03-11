import App from "%stanza/stanzas/gmdb-strain-detail/App";
import { StoryProvider } from "%storybook/StoryProvider";
import { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof App> = {
  component: App,
  decorators: [
    (Story) => (
      <StoryProvider reactQuery>
        <Story />
      </StoryProvider>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof App>;
export const Result1: Story = {
  args: {
    strain_id: "S602",
  },
};

export const Result2: Story = {
  args: {
    strain_id: "S1238",
  },
};
