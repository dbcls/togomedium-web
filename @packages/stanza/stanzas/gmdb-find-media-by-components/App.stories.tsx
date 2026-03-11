import App from "%stanza/stanzas/gmdb-find-media-by-components/App";
import { StoryProvider } from "%storybook/StoryProvider";
import { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof App> = {
  component: App,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <StoryProvider reactQuery mui>
        <Story />
      </StoryProvider>
    ),
    (S) => (
      <div style={{ backgroundColor: "aqua", height: "100vh" }}>
        <S />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof App>;
export const Primary: Story = {};
